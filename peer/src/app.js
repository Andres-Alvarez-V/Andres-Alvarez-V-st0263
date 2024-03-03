const trackerClient = require("./repositories/grpc/trackerClient");
const controller = require("./controllers");
const express = require("express");
const { filenames } = require("./repositories/system/mock-data");
const { getIpAddress } = require("./utils");

const app = express();


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/descargar", async (req, res) => {
  console.log("/descargar -> ", req.body);
  const file = controller.getFile(req.body);
  res.json({
    filename: file
  });
});

app.post("/buscar", async (req, res) => {
  const body = req.body;
  if (!body.filename) {
    res.status(400).send("Filename is required");
    return;
  }
  const { peers: peersUrl } = await trackerClient.searchFile(body); // obtenemos una lista de url de los peerss que tienen el archivo
  if (peersUrl.length === 0) {
    res.status(404).send(`Archivo ${body.filename} no encontrado en ningun peer`);
    return;
  }
  const file = await controller.findFileOnPeer({filename: body.filename, url: peersUrl[0]});
  controller.saveFile({filename: file});
  await trackerClient.indexFiles({peerIdentifier: app.get("peerIdentifier"), filenames: [file]});
  res.json({filename: file, message: `Archivo descargado existosamente del peer  ${peersUrl[0]}`});


});
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
  console.log("Server running at port %d", PORT);
});

server.on('listening', async () => {
  const response = await trackerClient.login({url: `http://${getIpAddress()}:${PORT}`});
  console.log("response", response);
  await trackerClient.indexFiles({peerIdentifier: response.peerIdentifier, filenames: filenames});
  app.set("peerIdentifier", response.peerIdentifier);
});

// Manejar señal SIGINT (CTRL+C)
process.on('SIGINT', async () => {
  console.log('Caught interrupt signal');
  const peerIdentifier = app.get("peerIdentifier");
  if (peerIdentifier) {
    await trackerClient.logout({ peerIdentifier });
    console.log('Logged out successfully');
  }
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});


// Manejar señal SIGTERM  
process.on('SIGTERM', async () => {
  console.log('Caught interrupt signal');
  const peerIdentifier = app.get("peerIdentifier");
  if (peerIdentifier) {
    await trackerClient.logout({ peerIdentifier });
    console.log('Logged out successfully');
  }
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
