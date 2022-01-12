const schema = require('@colyseus/schema');
const { Room } = require('colyseus');

class MyRoomState extends schema.Schema {
  constructor(){
    super();
    this.mySynchronizedProperty = "Hello world";
  }
}

schema.defineTypes(MyRoomState, {
  mySynchronizedProperty: "string",

});

class Player extends Schema {
  constructor(teamNumber) {
    super();
    this.name = "";
    this.color = "";
    this.x = 0;
    this.y = 0;
    this.teamNumber = teamNumber;
    this.score = 0;
  }
}
defineTypes(Player, {
  name: "string",
  color: "number",
  x: "number",
  y: "number",
  teamNumber: "number",
  score: "number",
});

class RoomSchema extends Schema {
  constructor() {
    super();
    this.teams = new ArraySchema();
    this.players = new MapSchema();
  }
 }
 defineTypes(RoomSchema, {
  teams: [Team], // an Array of Team
  players: { map: Player } // a Map of Players
 });

exports.RoomSchema = RoomSchema;
exports.Player = Player;
exports.MyRoomState = MyRoomState;

