const PROTO_PATH = __dirname + '/ptracker.proto';

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const Tracker = grpc.loadPackageDefinition(packageDefinition).Tracker;
const client = new Tracker(
    process.env.TRACKER_IP,
    grpc.credentials.createInsecure()
);


module.exports = {
    login: async (body) => {
        return new Promise((resolve, reject) => {
            client.login(body, (err, response) => {
                if (err) {
                    console.error("Tracker -> Error", err);
                    reject(err);
                    return;
                }
                console.log("Tracker -> login", response);
                resolve(response);
            });
        });
    },

    indexFiles: async (body) => {
        return new Promise((resolve, reject) => {
            client.indexFiles(body, (err, response) => {
                if (err) {
                    console.error("Tracker -> Error", err);
                    reject(err);
                    return;
                }
                console.log("Tracker -> indexFiles", response);
                resolve(response);
            });
        });
    },

    logout: async (body) => {
        return new Promise((resolve, reject) => {
            client.logout(body, (err, response) => {
                if (err) {
                    console.error("Tracker -> Error", err);
                    reject(err);
                    return;
                }
                console.log("Tracker -> logout", response);
                resolve(response);
            });
        });
    },

    searchFile: async (body) => {
        return new Promise((resolve, reject) => {
            client.searchFile(body, (err, response) => {
                if (err) {
                    console.error("Tracker -> Error", err);
                    reject(err);
                    return;
                }
                console.log("Tracker -> searchFile", response);
                resolve(response);
            });
        });
    }
};