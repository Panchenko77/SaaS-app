const express = require("express");
const ExpressWs = require("express-ws");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const passport = require("./config/passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Imap = require("imap");
const { simpleParser } = require("mailparser");

const { GptService } = require("./services/gpt-service");
const { StreamService } = require("./services/stream-service");
const { TranscriptionService } = require("./services/transcription-service");
const { TextToSpeechService } = require("./services/tts-service");
const { recordingService } = require("./services/recording-service");
const { generateResponse } = require("./services/whatsapp-service");
const { sendEmail } = require("./utils/email");
const { Conversation } = require("./models/Conversation");

const apiRouter = require("./routes");

const app = express();
ExpressWs(app);
const PORT = process.env.PORT || 5001;

// MONGOOSE CONNECT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// CORS MIDDLEWARE
app.use(cors());

// TO PARSE JSON BODIES
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// API ROUTER
app.use("/api", apiRouter);

// SOCKET CONNECT
app.ws("/connection/:from", (ws, req) => {
  try {
    ws.on("error", console.error);
    // Filled in from start message
    let streamSid;
    let callSid;

    const gptService = new GptService();
    const streamService = new StreamService(ws);
    const transcriptionService = new TranscriptionService();
    const ttsService = new TextToSpeechService({});

    let marks = [];
    let interactionCount = 0;

    const now = new Date();
    const timestamp =
      now.toISOString().replace(/T/, " ").replace(/\..+/, "") +
      `.${now.getMilliseconds()}`;
    console.log(timestamp + "here is wss connection");

    const from = req.params.from;

    ws.on("message", function message(data) {
      const msg = JSON.parse(data);
      if (msg.event === "start") {
        streamSid = msg.start.streamSid;
        callSid = msg.start.callSid;

        streamService.setStreamSid(streamSid);
        gptService.setCallSid(callSid);

        const text = "Hello Mihai";
        // Set RECORDING_ENABLED='true' in .env to record calls
        recordingService(ttsService, callSid).then(() => {
          const now = new Date();
          const timestamp =
            now.toISOString().replace(/T/, " ").replace(/\..+/, "") +
            `.${now.getMilliseconds()}`;
          console.log(
            timestamp +
              `Twilio -> Starting Media Stream for ${streamSid}`.underline.red
          );
          ttsService.generate(
            {
              partialResponseIndex: null,
              partialResponse: text,
            },
            0
          );
        });
      } else if (msg.event === "media") {
        transcriptionService.send(msg.media.payload);
      } else if (msg.event === "mark") {
        const label = msg.mark.name;

        const now = new Date();
        const timestamp =
          now.toISOString().replace(/T/, " ").replace(/\..+/, "") +
          `.${now.getMilliseconds()}`;
        console.log(
          timestamp +
            `Twilio -> Audio completed mark (${msg.sequenceNumber}): ${label}`
              .red
        );
        marks = marks.filter((m) => m !== msg.mark.name);
      } else if (msg.event === "stop") {
        const now = new Date();
        const timestamp =
          now.toISOString().replace(/T/, " ").replace(/\..+/, "") +
          `.${now.getMilliseconds()}`;
        console.log(
          timestamp + `Twilio -> Media stream ${streamSid} ended.`.underline.red
        );
      }
    });

    transcriptionService.on("utterance", async (text) => {
      // This is a bit of a hack to filter out empty utterances
      if (marks.length > 0 && text?.length > 5) {
        const now = new Date();
        const timestamp =
          now.toISOString().replace(/T/, " ").replace(/\..+/, "") +
          `.${now.getMilliseconds()}`;
        console.log(timestamp + "Twilio -> Interruption, Clearing stream".red);
        ws.send(
          JSON.stringify({
            streamSid,
            event: "clear",
          })
        );
      }
    });

    transcriptionService.on("transcription", async (text) => {
      if (!text) {
        return;
      }

      const now = new Date();
      const timestamp =
        now.toISOString().replace(/T/, " ").replace(/\..+/, "") +
        `.${now.getMilliseconds()}`;
      console.log(
        timestamp +
          `Interaction ${interactionCount} – STT -> GPT: ${text}`.yellow
      );
      gptService.completion(text, interactionCount);
      interactionCount += 1;
      await Conversation.create({
        from: from,
        to: process.env.FROM_NUMBER,
        text: text,
        conversationType: "voice",
      });
    });

    gptService.on("gptreply", async (gptReply, icount) => {
      const now = new Date();
      const timestamp =
        now.toISOString().replace(/T/, " ").replace(/\..+/, "") +
        `.${now.getMilliseconds()}`;
      console.log(
        timestamp +
          `Interaction ${icount}: GPT -> TTS: ${gptReply.partialResponse}`.green
      );
      ttsService.generate(gptReply, icount);
    });

    ttsService.on("speech", async (responseIndex, audio, label, icount) => {
      const now = new Date();
      const timestamp =
        now.toISOString().replace(/T/, " ").replace(/\..+/, "") +
        `.${now.getMilliseconds()}`;
      console.log(
        timestamp + `Interaction ${icount}: TTS -> TWILIO: ${label}`.blue
      );
      streamService.buffer(responseIndex, audio);
      await Conversation.create({
        from: process.env.FROM_NUMBER,
        to: from,
        text: label,
        conversationType: "voice",
      });
    });

    streamService.on("audiosent", (markLabel) => {
      marks.push(markLabel);
    });
  } catch (err) {
    const now = new Date();
    const timestamp =
      now.toISOString().replace(/T/, " ").replace(/\..+/, "") +
      `.${now.getMilliseconds()}`;
    console.log(timestamp + err);
  }
});

const imapConfig = {
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASS, // For production, consider using OAuth2 or environment variables for security
  host: "imap.gmail.com",
  port: 993,
  tls: true,
  tlsOptions: {
    rejectUnauthorized: false,
  },
};

const imap = new Imap(imapConfig);

function openInbox(cb) {
  imap.openBox("INBOX", false, cb);
}

imap.once("ready", function () {
  openInbox(function (err, box) {
    if (err) throw err;
    imap.on("mail", function () {
      const fetch = imap.seq.fetch(`${box.messages.total}:*`, {
        bodies: "",
        struct: true,
      });

      fetch.on("message", function (msg, seqno) {
        msg.on("body", function (stream, info) {
          simpleParser(stream, async (err, mail) => {
            if (err) {
              console.error("Error parsing email:", err);
              return;
            }
            await Conversation.create({
              from: mail.from.value[0].address,
              to: process.env.EMAIL_USER,
              text: mail.text,
              conversationType: "email",
            });
            const msg = await generateResponse(mail.text);
            await sendEmail(
              mail.from.value[0].address,
              `To ${mail.from.value[0].address}`,
              msg
            );
            await Conversation.create({
              from: process.env.EMAIL_USER,
              to: mail.from.value[0].address,
              text: msg,
              conversationType: "email",
            });
            // Here you can store the email data in a database or perform other actions
          });
        });

        msg.once("attributes", function (attrs) {
          const { uid } = attrs;
          imap.addFlags(uid, ["\\Seen"], (err) => {
            if (err) {
              console.error("Error marking email as seen:", err);
            }
          });
        });
      });

      fetch.once("error", function (err) {
        console.error("Fetch error:", err);
      });
    });
  });
});

imap.once("error", function (err) {
  console.error(err);
});

imap.once("end", function () {
  console.log("Connection ended");
});

imap.connect();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
