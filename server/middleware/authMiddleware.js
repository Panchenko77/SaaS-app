const { verifyToken } = require("../utils/token");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const parts = authHeader.split(" ");
  const token = parts[1];
  try {
    const user = await verifyToken(token);
    req.user = user.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
