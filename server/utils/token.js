const jwt = require("jsonwebtoken");

const generateToken = async (user) => {
  try {
    const token = await jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

const verifyToken = async (token) => {
  try {
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { generateToken, verifyToken };
