<template>
  <div>
        <canvas ref="game" width="540" height="540" style="border: 1px solid black;"></canvas> 

        <div class="container controls-card">
            <div class="row buttons">
                <div class="col-lg-4">
                    <div class="container redcont">
                        <div class="row midbuts redcont">
                            <div class="col-lg-4 midbuts redcont">
                                <button v-on:click="move('up')"><span class="iconify" data-icon="bx:bxs-up-arrow-square" data-width="50" data-height="50" style="color: gray;"></span></button>
                            </div>
                        </div>
                        <div class="row redcont">
                            <div class="col-lg-4 redcont">
                                <button v-on:click="move('left')"><span class="iconify" data-icon="bx:bxs-left-arrow-square" data-width="50" data-height="50" style="color: gray;"></span></button>
                            </div>
                            <div class="col-lg-4 redcont">
                            </div>
                            <div class="col-lg-4 redcont">
                                <button v-on:click="move('right')"><span class="iconify" data-icon="bx:bxs-right-arrow-square" data-width="50" data-height="50" style="color: gray;"></span></button>
                            </div>
                        </div>
                        <div class="row midbuts redcont">
                            <div class="col-lg-4 midbuts redcont">
                                <button v-on:click="move('down')"><span class="iconify" data-icon="bx:bxs-down-arrow-square" data-width="50" data-height="50" style="color: gray;"></span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                </div>
                <div class="col-lg-4">
                    <div class="container bluecont">
                        <div class="row midbuts bluecont">
                            <div class="col-lg-4 midbuts bluecont">
                                <button v-on:click="move2('up2')"><span class="iconify" data-icon="bx:bxs-up-arrow-square" data-width="50" data-height="50" style="color: gray;"></span></button>
                            </div>
                        </div>
                        <div class="row bluecont">
                            <div class="col-lg-4 bluecont">
                                <button v-on:click="move2('left2')"><span class="iconify" data-icon="bx:bxs-left-arrow-square" data-width="50" data-height="50" style="color: gray;"></span></button>
                            </div>
                            <div class="col-lg-4 bluecont">
                            </div>
                            <div class="col-lg-4 bluecont">
                                <button v-on:click="move2('right2')"><span class="iconify" data-icon="bx:bxs-right-arrow-square" data-width="50" data-height="50" style="color: gray;"></span></button>
                            </div>
                        </div>
                        <div class="row midbuts bluecont">
                            <div class="col-lg-4 midbuts bluecont">
                                <button v-on:click="move2('down2')"><span class="iconify" data-icon="bx:bxs-down-arrow-square" data-width="50" data-height="50" style="color: gray;"></span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
  </div>
    
</template>

<script>
const Colyseus = require('colyseus.js');

export default {
  name: 'bumpercars',
  data() {
    return {
      client:{},
      room:{},
      context:{},
      position:{x: 0, y: 0},
      position2:{x: 50, y: 50}
    }
  },
  created() {
      
  },
  async mounted() {
      const client = new Colyseus.Client('ws://localhost:2567') 
      this.room = await client.joinOrCreate('my_room');
      
      this.context = this.$refs.game.getContext("2d");
      this.room.onMessage("position", data => {
          this.position.x = data.x; 
          this.position.y = data.y;
          this.context.clearRect(0, 0, this.$refs.game.width, this.$refs.game.height);
          this.context.fillStyle = "red";
          this.context.fillRect(this.position.x, this.position.y, 45, 45);
          this.context.fillStyle = "blue";
          this.context.fillRect(this.position2.x, this.position2.y, 45, 45);
      }); 
      this.room.onMessage("position2", data => {
          this.position2.x = data.x; 
          this.position2.y = data.y;
          this.context.clearRect(0, 0, this.$refs.game.width, this.$refs.game.height);
          this.context.fillStyle = "blue";
          this.context.fillRect(this.position2.x, this.position2.y, 45, 45);
          this.context.fillStyle = "red";
          this.context.fillRect(this.position.x, this.position.y, 45, 45);
      }); 
  },
  methods: {
      move(direction) {
        this.room.send("move", direction);
      },
      move2(direction2) {
        this.room.send("move2", direction2);
      },
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  
</style>