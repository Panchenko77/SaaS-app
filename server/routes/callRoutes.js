const express = require("express");
const router = express.Router();

const {
  makeOutBoundCall,
  makeInboundCall,
  handleIncomingCall,
  handleErrors,
} = require("../controllers/callController");

router.post("/outbound", makeOutBoundCall);
router.post("/inbound", makeInboundCall);
router.post("/incoming", handleIncomingCall);
router.post("/errors", handleErrors);

module.exports = router;
