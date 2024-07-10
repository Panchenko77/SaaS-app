const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  addCommentOrIssue,
  getCommentsOrIssues,
  getCommentOrIssue,
  updateCommentOrIssue,
  deleteCommentOrIssue,
} = require("../controllers/projectController");
const projectMiddleware = require("../middleware/projectMiddleware");

// PROJECT
router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

// COMMENTS
router.post("/:projectId/:type", projectMiddleware, addCommentOrIssue);
router.get("/:projectId/:type", projectMiddleware, getCommentsOrIssues);
router.get("/:projectId/:type/:id", projectMiddleware, getCommentOrIssue);
router.put("/:projectId/:type/:id", projectMiddleware, updateCommentOrIssue);
router.delete("/:projectId/:type/:id", projectMiddleware, deleteCommentOrIssue);

module.exports = router;
