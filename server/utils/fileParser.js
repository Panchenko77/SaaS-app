const csvParser = require("csv-parser");
const xlsx = require("xlsx");
const fs = require("fs");

const myCsvParser = (file) => {
  let results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(file)
      .pipe(csvParser({ separator: ";" }))
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
        resolve(results);
        // Optionally, you can do further processing or return results here
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

const myXlsxParser = (file) => {
  let results = [];
  const workbook = xlsx.readFile(file);
  const sheetNames = workbook.SheetNames; // Assuming first sheet is the target
  sheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    results.push(data);
  });
  return results.flat();
};

const fileParser = async (files) => {
  let users = [];
  for (let i = 0; i < files.length; i++) {
    const ext = files[i].split(".").pop().toLowerCase();
    let temp = [];
    switch (ext) {
      case "csv":
        temp = await myCsvParser(files[i]);
        users.push(temp);
        break;
      case "xlsx":
        temp = await myXlsxParser(files[i]);
        users.push(temp);
        break;
      case "xls":
        temp = await myXlsxParser(files[i]);
        users.push(temp);
        break;
      default:
        break;
    }
  }
  return users.flat();
};

const parseJsonFile = (fileName) => {
  return JSON.parse(fs.readFileSync(fileName, "utf8"));
};

module.exports = { fileParser, parseJsonFile };
