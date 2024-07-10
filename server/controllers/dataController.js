const { Data, validate } = require("../models/Data");
const { AiData, validateAiData } = require("../models/AiData");
const { fileParser } = require("../utils/fileParser");
const {
  AvailableAddOnListInstance,
} = require("twilio/lib/rest/preview/marketplace/availableAddOn");

const uploadFiles = async (req, res) => {
  try {
    if (req.files.length === 0) {
      return res.status(400).send("No files uploaded or invalid file format.");
    }
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const files = req.files;
    const userId = req.body.userId;
    const filePaths = files.map((file) => file.path);

    const data = await Data.findOne({
      userId: userId,
    });
    if (data) {
      data.files = data.files.concat(filePaths);
      await data.save();
    } else {
      await Data.create({ userId: userId, files: filePaths });
    }

    return res.status(201).json({ message: "Uploaded successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error" + error.message, error });
  }
};

const uploadFilesToAiData = async (req, res) => {
  try {
    if (req.files.length === 0) {
      return res.status(400).send("No files uploaded or invalid file format.");
    }
    const { error } = validateAiData(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const files = req.files;
    const userId = req.body.userId;
    console.log(files);
    const filePaths = files.map((file) => file.path);

    const data = await AiData.findOne({
      userId: userId,
    });

    if (data) {
      data.aiTrainingDataFiles = data.aiTrainingDataFiles.concat(filePaths);
      await data.save();
    } else {
      await AiData.create({ userId: userId, aiTrainingDataFiles: filePaths });
    }

    return res.status(201).json({ message: "Uploaded successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error" + error.message, error });
  }
};

const getParsedUsersFromFiles = async (req, res) => {
  try {
    const { userId } = req.query;
    const data = await Data.findOne({ userId: userId });
    if (!data || !data.files || data.files.length === 0) {
      return res.status(404).json({ message: "Cannot find CSV files" });
    }

    const users = await fileParser(data.files);

    return res.status(200).json({ users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error" + error.message, error });
  }
};

const getParsedUsersFromAllFiles = async (req, res) => {
  try {
    let users = [];
    let uniqueUsers = [];
    const datas = await Data.find();

    if (!datas || datas.length === 0) {
      return res.status(404).json({ message: "Cannot find Data Records" });
    }

    console.log(datas);
    datas.map(async (data, key) => {
      if (users.length === 0) users = await fileParser(data.files);
      else {
        const key = "phoneNumber";
        users.push(await fileParser(data.files));

        uniqueUsers.push([
          ...new Map(users.map((item) => [item[key], item])).values(),
        ]);
      }
    });

    return res.status(200).json({ allProspects: uniqueUsers });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error" + error.message, error });
  }
};

const getParsedTrainingDataFromAiFiles = async (req, res) => {
  try {
    const { userId } = req.query;
    const data = await AiData.findOne({ userId: userId });
    if (!data || !data.files || data.files.length === 0) {
      return res.status(404).json({ message: "Cannot find CSV files" });
    }

    const users = await fileParser(data.files);

    return res.status(200).json({ users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error" + error.message, error });
  }
};

module.exports = {
  uploadFiles,
  getParsedUsersFromFiles,
  uploadFilesToAiData,
  getParsedUsersFromAllFiles,
};
