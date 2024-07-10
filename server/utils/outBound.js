const { sendEmail } = require("./email");
const { sendWhatsAppMessage } = require("../services/whatsapp-service");

const makeOutBoundCall = async (number) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const client = require("twilio")(accountSid, authToken);

    console.log(`https://${process.env.SERVER}/api/call/incoming`, number);

    await client.calls
      .create({
        url: `https://${process.env.SERVER}/api/call/incoming`,
        to: "+" + number,
        from: process.env.FROM_NUMBER,
      })
      .then((call) => console.log(call.sid));
  } catch (error) {
    console.log(error);
  }
};

const makeOutBoundEmail = async (email) => {
  try {
    await sendEmail(email, `To ${email}`, `Hello ${email}`);
  } catch (error) {
    console.log(error);
  }
};

const makeOutboundWhatsApp = async (number) => {
  try {
    await sendWhatsAppMessage("+" + number, "Hello Mihai!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  makeOutBoundCall,
  makeOutBoundEmail,
  makeOutboundWhatsApp,
};
