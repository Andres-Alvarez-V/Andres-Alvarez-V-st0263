const { getFileByFilename,insertFile } = require("../repositories/system/index");
const { customLogger } = require("../repositories/system/mock-data");
const axios = require("axios");
const getFile = (body) => {
  console.log("getFile", body);
  const { filename } = body;
  const file = getFileByFilename(filename);
  
  return file;
}

const saveFile = (body) => {
  console.log("saveFile", body);
  const { filename } = body;
  insertFile(filename);
  customLogger();
  return filename;
}

const findFileOnPeer = async (body) => {
  console.log("findFileOnPeer", body);
  const { filename, url } = body;
  const response = await axios.post(`${url}/descargar`, { filename });
  return response.data.filename;
}


module.exports = {
  getFile,
  saveFile,
  findFileOnPeer
};