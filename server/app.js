const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? "frontend website address": "*"
    }
});

var position = {
    x: 100,
    y: 200
};

Socketio.on("connection", socket => {
    console.log("connected");
    socket.emit("position", position);
    socket.on("move", data => {
        switch(data) {
            case "left": position.x -= 20;
            Socketio.emit("position", position);
            break;
            case "right": position.x += 20;
            Socketio.emit("position", position);
            break;
            case "up": position.y -= 20;
            Socketio.emit("position", position);
            break;
            case "down": position.y += 20;
            Socketio.emit("position", position);
            break;
        }
    });
});

Http.listen(3000, () => {
    console.log("listening at :3000...");
});

