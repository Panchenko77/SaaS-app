const {
  sendWhatsAppMessage,
  replyWhatsappMessage,
} = require("../services/whatsapp-service");
const { sendEmail } = require("../utils/email");
const { Conversation } = require("../models/Conversation");

const makeOutboundWhatsApp = async (req, res) => {
  try {
    const { number } = req.query;
    const msg = "Hello Mihai";
    await sendWhatsAppMessage("+" + number, msg);
    return res.status(200).send({ message: "made Outbound whatsapp message" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error" + error.message, error });
  }
};

const replyWhatsApp = async (req, res) => {
  try {
    const message = req.body;
    console.log(req.body);
    await replyWhatsappMessage("+" + message.WaId, message.Body);
    return res.status(200).send({ message: "made Outbound whatsapp message" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error" + error.message, error });
  }
};

const makeOutBoundEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const msg = `Hello ${email}`;
    await sendEmail(email, `To ${email}`, msg);
    await Conversation.create({
      from: process.env.EMAIL_USER,
      to: email,
      text: msg,
      conversationType: "email",
    });
    return res.status(200).json({ message: `sent Email to ${email}` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error" + error.message, error });
  }
};

module.exports = {
  makeOutboundWhatsApp,
  replyWhatsApp,
  makeOutBoundEmail,
};
