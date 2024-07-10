const mongoose = require("mongoose");
const Joi = require("joi");

const prospectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    firstName: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    phoneNumber: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      default: "notContacted",
      // required: true,
    },
  },
  { timestamps: true }
);

const validateProspect = (user) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    firstName: Joi.string().required(),
    email: Joi.email().required(),
    phoneNumber: Joi.string().required(),
    status: Joi.string(),
  });
  return schema.validate(user);
};

const campaignSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    prospects: {
      type: [prospectSchema],
      // required: true,
    },
    campaignType: {
      type: mongoose.Schema.Types.Mixed,
      default: { voice: true, whatsapp: false, email: false },
      // required: true,
    },
    startDate: {
      type: Date,
      // required: true,
    },
    endDate: {
      type: Date,
      // required: true,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

const validateCampaign = (campaign) => {
  const schema = Joi.object({
    author: Joi.string().required(),
    prospects: Joi.array().required(),
    campaignType: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    role: Joi.string(),
  });
  return schema.validate(campaign);
};

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = {
  Campaign,
  validateProspect,
  validateCampaign,
};
