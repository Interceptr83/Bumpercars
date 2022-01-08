const colyseus = require('colyseus');
const { MyRoomState } = require('./schema/MyRoomState');

exports.MyRoom = class extends colyseus.Room {

  onCreate (options) {
    // Creates fresh room state
    this.setState(new MyRoomState());

    // Assigns random 5 digit number to room ID.
    this.roomId = generateId();

    this.onMessage("type", (client, message) => {
      // Handles client messages of "type" to room (eg. of "type": "move", "addScore")
    });

  }
  

  onJoin (client, options) {
    console.log(client.sessionId, "joined!");
  }

  onLeave (client, consented) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}

function generateId() {
  return Math.floor(Math.random()*90000) + 10000;
}