/**
 * IMPORTANT:
 * ---------
 * Do not manually edit this file if you'd like to use Colyseus Arena
 *
 * If you're self-hosting (without Arena), you can manually instantiate a
 * Colyseus Server as documented here: 👉 https://docs.colyseus.io/server/api/#constructor-options
 */
// Colyseus + Express
const colyseus = require("colyseus");
const http = require("http");
const express = require("express");
const port = process.env.port || 3000;
/**
 * Import your Room files
 */
const { MyRoom } = require("./rooms/MyRoom");


const app = express();
app.use(express.json());

const gameServer = new colyseus.Server({
  server: http.createServer(app)
});

gameServer.define('BumperdotsRoom', MyRoom);

gameServer.listen(port);

