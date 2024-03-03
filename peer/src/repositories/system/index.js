const { filenames, customLogger } = require("./mock-data");

const getFileByFilename = (filename) => {
  return filenames.find(file => file === filename);
}

const insertFile = (filename) => {
  filenames.push(filename);
}

module.exports = {
  getFileByFilename,
  insertFile
};