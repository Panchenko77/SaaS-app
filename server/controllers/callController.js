const VoiceResponse = require("twilio").twiml.VoiceResponse;
require("dotenv").config();

const makeOutBoundCall = async (req, res) => {
  try {
    const { number } = req.query;
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const client = require("twilio")(accountSid, authToken);

    console.log(`https://${process.env.SERVER}/api/call/incoming`, number);

    const call = await client.calls.create({
      url: `https://${process.env.SERVER}/api/call/incoming`,
      to: "+" + number,
      from: process.env.FROM_NUMBER,
    });

    console.log(call.sid);

    return res.status(200).send({ message: "makeOutBoundCall" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error" + error.message, error });
  }
};

const makeInboundCall = async (req, res) => {
  try {
    const VoiceResponse = require("twilio").twiml.VoiceResponse;
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const client = require("twilio")(accountSid, authToken);

    let twiml = new VoiceResponse();
    twiml.pause({ length: 10 });
    twiml.say("Which models of airpods do you have available right now?");
    twiml.pause({ length: 30 });
    twiml.hangup();

    console.log(twiml.toString());

    const call = await client.calls.create({
      twiml: twiml.toString(),
      to: process.env.APP_NUMBER,
      from: process.env.FROM_NUMBER,
    });

    console.log(call.sid);

    return res.status(200).send({ message: "makeInBoundCall" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error" + error.message, error });
  }
};

const handleIncomingCall = (req, res) => {
  try {
    const response = new VoiceResponse();
    const connect = response.connect();
    connect.stream({
      url: `wss://${process.env.SERVER}/connection/${encodeURIComponent(
        req.body.To
      )}`,
    });
    res.type("text/xml");
    res.end(response.toString());
  } catch (err) {
    console.log(err);
  }
};

const handleErrors = (req, res) => {
  console.log("error", req.body);
};

module.exports = {
  makeOutBoundCall,
  makeInboundCall,
  handleIncomingCall,
  handleErrors,
};
