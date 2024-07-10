const mongoose = require("mongoose");
const Joi = require("joi");

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const validateComment = (comment) => {
  const schema = Joi.object({
    author: Joi.string(),
    text: Joi.string().required(),
  });
  return schema.validate(comment);
};

const issueSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const validateIssue = (issue) => {
  const schema = Joi.object({
    author: Joi.string(),
    text: Joi.string().required(),
    status: Joi.boolean(),
  });
  return schema.validate(issue);
};

const projectSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "open",
    },
    comments: [commentSchema],
    issues: [issueSchema],
  },
  { timestamps: true }
);

const validateProject = (project) => {
  const schema = Joi.object({
    author: Joi.string(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required(),
    issues: Joi.array(),
    comments: Joi.array(),
  });
  return schema.validate(project);
};

const Project = mongoose.model("Project", projectSchema);

module.exports = {
  Project,
  validateComment,
  validateIssue,
  validateProject,
};
