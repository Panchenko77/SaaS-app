const express = require("express");
const router = express.Router();

const {
  createCampaign,
  getCampaigns,
  getCampaign,
  updateCampaign,
  deleteCampaign,
  getAllProspects,
  setProspectsStatus,
} = require("../controllers/campaignController");

// CAMPAIGN
router.post("/", createCampaign);
router.get("/", getCampaigns);
router.get("/getAllProspects", getAllProspects);
router.get("/setProspectsStatus", setProspectsStatus);
router.get("/:id", getCampaign);
router.put("/:id", updateCampaign);
router.delete("/:id", deleteCampaign);

module.exports = router;
