const { Project } = require("../models/Project");

const projectMiddleware = async (req, res, next) => {
  try {
    const { projectId, type } = req.params;
    const project = await Project.findById(projectId);
    if (!project)
      return res.status(400).json({ message: "Cannot find project" });
    if (type !== "comments" && type !== "issues")
      return res.status(400).json({ message: "Invalid Link" });
    req.project = project;
    req.body.author = req.user._id;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = projectMiddleware;
