const peers  = new Map();

const filesLocation = new Map();
const customLogger = () => {
  console.log("-------");
  console.log("Peers - Number of peers:", peers.size);
  console.log("Peers:");
  peers.forEach((value, key) => {
      console.log(`  ${key}: ${value}`);
  });
  console.log("Files Location:");
  filesLocation.forEach((value, key) => {
      console.log(`  ${key}:`);
      value.forEach(peer => {
          console.log(`    - ${peer}`);
      });
  });
  console.log("-------");
}


module.exports = {
  peers,
  filesLocation,
  customLogger
};
