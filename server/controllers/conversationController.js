const axios = require("axios");
const {
  Conversation,
  validateConversation,
} = require("../models/Conversation");

const createConversation = async (req, res) => {
  const { error } = validateConversation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const conversation = await Conversation.create({
      ...req.body,
    });
    return res.status(201).json({ conversation });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const getConversations = async (req, res) => {
  try {
    const { startDate, endDate, phoneNumber, email } = req.query;

    if (startDate === undefined || endDate === undefined) {
      return res
        .status(404)
        .json({ message: "Set the startDate and endDate." });
    }

    let query = {
      createdAt: {
        $gte: startDate,
        $lte: new Date(endDate).setDate(new Date(endDate).getDate() + 1),
      },
    };

    // Add conditions based on whether phoneNumber and email are defined
    let orConditions = [];

    if (phoneNumber) {
      orConditions.push(
        { from: phoneNumber },
        { to: phoneNumber },
        { from: "whatsapp:" + phoneNumber },
        { to: "whatsapp:" + phoneNumber }
      );
    }

    if (email) {
      orConditions.push({ from: email }, { to: email });
    }

    // Add the $or condition if there are any conditions to add
    if (orConditions.length > 0) {
      query.$or = orConditions;
    }

    // Execute the query
    const conversations = await Conversation.find(query);

    const recordings =
      phoneNumber === undefined
        ? await Conversation.find({ phoneNumber: { $exists: true } })
        : await Conversation.find({ phoneNumber });

    return res.status(200).json({ conversations, recordings });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const getRecording = async (req, res) => {
  const recordingSid = req.params.sid;
  const url = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Recordings/${recordingSid}.wav`;

  try {
    const response = await axios.get(url, {
      auth: {
        username: process.env.TWILIO_ACCOUNT_SID,
        password: process.env.TWILIO_AUTH_TOKEN,
      },
      responseType: "stream",
    });
    res.setHeader("Content-Type", "audio/wav");
    response.data.pipe(res);
  } catch (error) {
    res.status(500).send("Error fetching recording");
  }
};

module.exports = {
  createConversation,
  getConversations,
  getRecording,
};
