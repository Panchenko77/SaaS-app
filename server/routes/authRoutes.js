const express = require("express");

const {
  register,
  login,
  verify,
  resetPassword,
  forgotPassword,
  resendEmail,
  getUserById,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.get("/verify/:id/:token", verify);
router.get("/getUserById", getUserById);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:id/:token", resetPassword);
router.put("/resend/:email", resendEmail);

module.exports = router;
