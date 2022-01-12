const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? "frontend website address": "*"
    }
});


var position = {
    x: 0,
    y: 270
};
var position2 = {
    x: 495,
    y: 270
};

Socketio.on("connection", socket => {
   // console.log("connected");
    socket.emit("position", position);
    socket.on("move", data => {
        switch(data) {
            case "left": position.x -= 45;
            Socketio.emit("position", position);
            if (position.x === position2.x && position.y === position2.y) {
                position2.x -=90;
                Socketio.emit("position2", position2);
            };
            break;
            case "right": position.x += 45;
            Socketio.emit("position", position);
            if (position.x === position2.x && position.y === position2.y) {
                position2.x +=90;
                Socketio.emit("position2", position2);
            };
            break;
            case "up": position.y -= 45;
            Socketio.emit("position", position);
            if (position.x === position2.x && position.y === position2.y) {
                position2.y -=90;
                Socketio.emit("position2", position2);
            };
            break;
            case "down": position.y += 45;
            Socketio.emit("position", position);
            if (position.x === position2.x && position.y === position2.y) {
                position2.y +=90;
                Socketio.emit("position2", position2);
            };
            break;
        }
    });
    socket.emit("position2", position2);
    socket.on("move2", data => {
        switch(data) {
            case "left2": position2.x -= 45;
            Socketio.emit("position2", position2);
            if (position2.x === position.x && position2.y === position.y) {
                position.x -=90;
                Socketio.emit("position", position);
            };
            break;
            case "right2": position2.x += 45;
            Socketio.emit("position2", position2);
            if (position2.x === position.x && position2.y === position.y) {
                position.x +=90;
                Socketio.emit("position", position);
            };
            break;
            case "up2": position2.y -= 45;
            Socketio.emit("position2", position2);
            if (position2.x === position.x && position2.y === position.y) {
                position.y -=90;
                Socketio.emit("position", position);
            };
            break;
            case "down2": position2.y += 45;
            Socketio.emit("position2", position2);
            if (position2.x === position.x && position2.y === position.y) {
                position.y +=90;
                Socketio.emit("position", position);
            };
            break;
        }
    });
});

Http.listen(3000, () => {
    console.log("listening at :3000...");
});

