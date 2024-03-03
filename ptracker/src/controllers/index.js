const { addPeer, removeFileLocation, removePeer, addFileLocation, getFileLocation, findPeer } = require("../repositories");
const { customLogger } = require("../repositories/mock-data");


module.exports = {
    login: (body) => {
      console.log("login", body);
      const { url } = body;
      const peerIdentificator = addPeer(url);
      customLogger();
      return peerIdentificator;
  },

  logout: (body) => {
    console.log("logout", body);
    const { peerIdentifier } = body;
    removePeer(peerIdentifier);
    customLogger();
  },

  searchFile: (body) => {
    console.log("searchFile", body);
    const { filename } = body;
    let peers = getFileLocation(filename);
    if(!peers) return [];
    const peersUrls = []
    peers.forEach(peer => {
      const peerData = findPeer(peer);
      if(!peerData) removeFileLocation(fileName, peer);
      else peersUrls.push(peerData);
    });
    console.log("peersUrls", peersUrls);
    customLogger();
    
    return peersUrls;
  },


  indexFiles: (body) => {
    console.log("indexFiles", body);
    const { peerIdentifier, filenames } = body;
    filenames.forEach(file => addFileLocation(file, peerIdentifier));
    customLogger();
  }
}

