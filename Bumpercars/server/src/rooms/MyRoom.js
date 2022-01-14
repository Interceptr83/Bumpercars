const colyseus = require('colyseus');
const { MyRoomState, Player } = require('./schema/MyRoomState');

exports.MyRoom = class extends colyseus.Room {

  async onCreate (options) {
    
  try{
    this.setState(new MyRoomState());
    let player = new Player();
    this.state.players.set('one', player);
    player.position.x = 0;
    player.position.y = 0;
    console.log(player.position);
    this.broadcast("position", player.position);
  }
  catch(e){
    console.log('Error creating room: ', e);
  }
    
    this.onMessage("type", (client, message) => {
      
    });


    this.onMessage("move", async (client, data) => {
      try{

        let player = await this.state.players.get('one');
        let player2 = await this.state.players.get('two');
        
        console.log("PLAYER MOVE", data)
      
      
      switch(data) {
            case "left": player.position.x -= 45;
            this.broadcast("position", player.position);
            if (player.position.x === player2.position.x && player.position.y === player2.position.y) {
              player2.position.x -=90;
              this.broadcast("position2", player2.position);
          };
            break;
            case "right": player.position.x += 45;
            this.broadcast("position", player.position);
            if (player.position.x === player2.position.x && player.position.y === player2.position.y) {
              player2.position.x +=90;
              this.broadcast("position2", player2.position);
          };
            break;
            case "up": player.position.y -= 45;
            this.broadcast("position", player.position);
            if (player.position.x === player2.position.x && player.position.y === player2.position.y) {
              player2.position.y -=90;
              this.broadcast("position2", player2.position);
          };
            break;
            case "down": player.position.y += 45;
            this.broadcast("position", player.position);
            if (player.position.x === player2.position.x && player.position.y === player2.position.y) {
              player2.position.y +=90;
              this.broadcast("position2", player2.position);
          };
            break;
      }
    }
    catch(e){
      console.log('Error: ', e);
    }
      
    });

    this.onMessage("move2", (client, data) => {
    try {
      
      let player = this.state.players.get('one');
      let player2 = this.state.players.get('two');

      console.log("PLAYER MOVE", data)
      
      switch(data) {
            case "left2": player2.position.x -= 45;
            this.broadcast("position2", player2.position);
            if (player2.position.x === player.position.x && player2.position.y === player.position.y) {
              player.position.x -=90;
              this.broadcast("position", player.position);
          };
            break;
            case "right2": player2.position.x += 45;
            this.broadcast("position2", player2.position);
            if (player2.position.x === player.position.x && player2.position.y === player.position.y) {
              player.position.x +=90;
              this.broadcast("position", player.position);
          };
            break;
            case "up2": player2.position.y -= 45;
            this.broadcast("position2", player2.position);
            if (player2.position.x === player.position.x && player2.position.y === player.position.y) {
              player.position.y -=90;
              this.broadcast("position", player.position);
          };
            break;
            case "down2": player2.position.y += 45;
            this.broadcast("position2", player2.position);
            if (player.position.x === player2.position.x && player.position.y === player2.position.y) {
              player.position.y +=90;
              this.broadcast("position", player.position);
          };
            break;
      }
    }
    catch(e){
      console.log('Error: ', e);
    }
    });

  }

  onJoin (client, options) {
    console.log(client.sessionId, "joined!");
    let player = new Player();
    this.state.players.set(client.sessionId, player);
    player.position.x = 450;
    player.position.y = 450;
    this.broadcast("position2", player.position);

    
  }

  onLeave (client, consented) {
    console.log(client.sessionId, "left!");
    
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
