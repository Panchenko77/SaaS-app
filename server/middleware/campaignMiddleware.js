const { Campaign } = require("../models/Campaign");

const campaignMiddleware = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const campaign = await Campaign.findById(campaignId);
    req.campaign = campaign;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = campaignMiddleware;
