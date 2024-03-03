const { filesLocation, peers } = require( "./mock-data");
const { uuid } = require('uuidv4');


const addPeer =  (peer) => {
  const peerIdentificatorCopy = uuid();
  peers.set(peerIdentificatorCopy,peer);
  return peerIdentificatorCopy;
}

const findPeer =  (peerIdentificator) => {
  return peers.get(peerIdentificator);
}

const removePeer =  (peerIdentificator) => {
  peers.delete(peerIdentificator);
}

const addFileLocation =  (filename, peerIdentificator) => {
  if(!filesLocation.has(filename)){
    filesLocation.set(filename, new Set());
  }
  filesLocation.get(filename).add(peerIdentificator);
}

const removeFileLocation =  (filename, peerIdentificator) => {
  if(!filesLocation.has(filename)) return;
  filesLocation.get(filename).delete(peerIdentificator);
}


const getFileLocation =  (filename) => {
  if (!filesLocation.has(filename)) return [];
  return filesLocation.get(filename);
}


module.exports = {
  addPeer,
  removeFileLocation,
  removePeer,
  addFileLocation,
  getFileLocation,
  findPeer
};

