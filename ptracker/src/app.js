const PROTO_PATH = __dirname + '/ptracker.proto';

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const { login, logout, indexFiles, searchFile } = require("./controllers");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
});


const TrackerProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

server.addService(TrackerProto.Tracker.service, {
  login: (call, callback) => {
    const peerIdentificator = login(call.request);
    callback(null, { peerIdentifier:  peerIdentificator});
  },
  logout: (call, callback) => {
    logout(call.request);
    callback(null, { message: "Logout"});
  },
  searchFile: (call, callback) => {
    const peers = searchFile(call.request);
    callback(null, { peers: peers});
  },
  indexFiles: (call, callback) => {
    indexFiles(call.request);
    callback(null, { message: "Files indexed"});
  }
});

server.bind(process.env.TRACKER_IP, grpc.ServerCredentials.createInsecure());
console.log(`Server running at ${process.env.TRACKER_IP}`);
server.start();