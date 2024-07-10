const mongoose = require("mongoose");
const Joi = require("joi");

const dataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    aiTrainingDataFiles: Array,
  },
  { timestamps: true }
);

const AiData = mongoose.model("AiData", dataSchema);

const validateAiData = (data) => {
  const schema = Joi.object({
    userId: Joi.string(),
    aiTrainingDataFiles: Joi.array().items(Joi.string().required()),
  });
  return schema.validate(data);
};

module.exports = {
  AiData,
  validateAiData,
};
