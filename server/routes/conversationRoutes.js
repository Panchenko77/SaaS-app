const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createConversation,
  getConversations,
  getRecording,
} = require("../controllers/conversationController");

router.post("/", createConversation);
router.get("/", authMiddleware, getConversations);
router.get("/recording/:sid", authMiddleware, getRecording);

module.exports = router;
