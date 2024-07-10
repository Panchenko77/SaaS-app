const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const aiStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/aiData");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /csv|xlsx|xls/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
};

const aiFileFilter = (req, file, cb) => {
  const filetypes = /json/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const uploadAiData = multer({
  storage: aiStorage,
  aiFileFilter: aiFileFilter,
});

module.exports = {
  upload,
  uploadAiData,
};
