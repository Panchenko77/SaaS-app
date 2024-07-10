const mongoose = require("mongoose");
const Joi = require("joi");

const conversationSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    conversationType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const validateConversation = (conversation) => {
  const schema = Joi.object({
    from: Joi.required(),
    to: Joi.required(),
    text: Joi.string().required(),
    conversationType: Joi.string().required(),
  });
  return schema.validate(conversation);
};

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = { Conversation, validateConversation };
