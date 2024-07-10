const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const dataRoutes = require("./dataRoutes");
const projectRoutes = require("./projectRoutes");
const campaignRoutes = require("./campaignRoutes");

const googleRoutes = require("./googleRoutes");
const appleRoutes = require("./appleRoutes");
const callRoutes = require("./callRoutes");
const textRoutes = require("./textRoutes");
const conversationRoutes = require("./conversationRoutes");

const authMiddleware = require("../middleware/authMiddleware");

// GOOGLE APIS
router.use("/auth/google", googleRoutes);

// APPLE APIS
router.use("/auth/apple", appleRoutes);

// CALL APIS
router.use("/call", callRoutes);

// TEXT APIS
router.use("/text", textRoutes);

// AUTH APIS
router.use("/auth", authRoutes);

// CONVERSATION APIS
router.use("/conversation", conversationRoutes);

// ROUTES
router.use("/data", authMiddleware, dataRoutes);
router.use("/project", authMiddleware, projectRoutes);
router.use("/campaign", authMiddleware, campaignRoutes);

module.exports = router;
