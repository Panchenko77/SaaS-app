const express = require("express");
const passport = require("passport");
const router = express.Router();

const { generateToken } = require("../utils/token");

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "/api/auth/google/success",
    failureRedirect: "/api/auth/google/failure",
  })
);

router.get("/success", async (req, res) => {
  const { user } = req;
  if (!user) {
    return;
  }
  const token = await generateToken(user);
  return res.redirect(
    `${process.env.CLIENT_URL}/?token=${token}&userId=${user._id}`
  );
});

router.get("/failure", (req, res) => {
  return res.status(400).send({ message: "Google Authentication Failure" });
});

module.exports = router;
