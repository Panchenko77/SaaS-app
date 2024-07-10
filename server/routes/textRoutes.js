const express = require("express");
const router = express.Router();

const {
  makeOutboundWhatsApp,
  makeOutBoundEmail,
  replyWhatsApp,
  replyEmail,
} = require("../controllers/textController");

router.post("/:type/outbound", (req, res) => {
  const { type } = req.params;
  return type === "whatsapp"
    ? makeOutboundWhatsApp(req, res)
    : makeOutBoundEmail(req, res);
});
router.post("/:type/reply", (req, res) => {
  const { type } = req.params;
  return type === "whatsapp" ? replyWhatsApp(req, res) : replyEmail(req, res);
});

module.exports = router;
