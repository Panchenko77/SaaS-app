const express = require("express");
const router = express.Router();

const { upload, uploadAiData } = require("../config/multer");
const {
  uploadFiles,
  getParsedUsersFromFiles,
  uploadFilesToAiData,
  getParsedUsersFromAllFiles,
} = require("../controllers/dataController");

router.post("/upload", upload.array("files"), uploadFiles);
router.get("/getParsedUsersFromFiles", getParsedUsersFromFiles);
router.get("/getParsedUsersFromAllFiles", getParsedUsersFromAllFiles);
router.post("/uploadAiData", uploadAiData.array("files"), uploadFilesToAiData);

module.exports = router;
