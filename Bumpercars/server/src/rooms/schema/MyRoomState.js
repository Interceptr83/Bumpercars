const schema = require('@colyseus/schema');


class Position extends schema.Schema {
  constructor() {
    super();
    this.x = null;
    this.y = null;
  }

}
schema.defineTypes(Position, {
  
  x: "number",
  y: "number",
  
});

class Player extends schema.Schema {
  constructor() {
    super();
    this.name = "";
    this.position = new Position();
    this.score = 0;
  }

}
schema.defineTypes(Player, {
  name: "string",
  x: "number",
  y: "number",
  score: "number",
});



class MyRoomState extends schema.Schema {
  constructor() {
    super();
    this.players = new schema.MapSchema();
}
}
schema.defineTypes(MyRoomState, {
players: { map: Player }
});

exports.MyRoomState = MyRoomState;
exports.Player = Player;
exports.Position = Position;