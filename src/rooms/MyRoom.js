const colyseus = require('colyseus');
const { MyRoomState, Player } = require('./schema/gameSchema');



exports.MyRoom = class extends colyseus.Room {

  onCreate (teamNumber) { 

    let teamNumber = 1;

    player = new Player(teamNumber);

    this.setState(new MyRoomState());

    this.onMessage("type", (client, message) => {
      //
      // handle "type" message.
      //
    });

  }

  onJoin (client, teamNumber) {
    console.log(client.sessionId, "joined!");
    player = new Player(teamNumber);
    
  }

  onLeave (client, consented) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}


