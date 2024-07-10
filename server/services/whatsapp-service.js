const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const { parseJsonFile } = require("../utils/fileParser");
const { AiData } = require("../models/AiData");
const OpenAI = require("openai");
const { Conversation } = require("../models/Conversation");

const openai = new OpenAI();

async function sendWhatsAppMessage(to, message) {
  try {
    const response = await client.messages.create({
      body: message,
      from: `whatsapp:${process.env.WHATSAPP_NUMBER}`, // Your Twilio Sandbox Number
      to: `whatsapp:${to}`,
    });
    await Conversation.create({
      from: `whatsapp:${process.env.WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
      text: message,
      conversationType: "whatsapp",
    });
    console.log(`Message sent to ${to}: ${response.sid}`);
  } catch (error) {
    console.error(`Failed to send message: ${error}`);
  }
}

const generateResponse = async (message) => {
  const aiData = await AiData.findOne();
  let newMessages = [];
  if (aiData.aiTrainingDataFiles.length > 0) {
    try {
      newMessages = parseJsonFile(aiData.aiTrainingDataFiles[0]);

      newMessages.push({
        role: "user",
        content: message,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  const response = await openai?.chat?.completions?.create({
    model: "gpt-3.5-turbo",
    messages: newMessages,
    temperature: 0.5,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

const replyWhatsappMessage = async (from, body) => {
  try {
    await Conversation.create({
      from: `whatsapp:${from}`,
      to: `whatsapp:${process.env.WHATSAPP_NUMBER}`,
      text: body,
      conversationType: "whatsapp",
    });
    const response = await generateResponse(body);

    await client.messages.create({
      body: response,
      from: `whatsapp:${process.env.WHATSAPP_NUMBER}`,
      to: `whatsapp:${from}`,
    });

    await Conversation.create({
      from: `whatsapp:${process.env.WHATSAPP_NUMBER}`,
      to: `whatsapp:${from}`,
      text: response,
      conversationType: "whatsapp",
    });
  } catch (error) {
    console.log(error.message);
  }

  //   var parents = fs.readFileSync("parents.json");
  //   parents = JSON.parse(parents);

  //   for (var i = 0; i < parents.length; i++) {
  //     var numbers = parents[i].number + "@c.us";
  //     var text =
  //       "Dear Mr/Mrs " +
  //       parents[i].number +
  //       ", \nwe inform you that " +
  //       parents[i].student +
  //       " is ..... . \nThank you";

  //     whatsapp.sendMessage(numbers, text);
  //   }

  //   whatsapp.sendMessage("+40739465963", "Hello Mihai");

  //   res.send(parents);
};

module.exports = {
  sendWhatsAppMessage,
  replyWhatsappMessage,
  generateResponse,
};
