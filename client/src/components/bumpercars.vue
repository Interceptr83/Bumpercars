<template>
  <div>
      <canvas ref="game" width="500" height="500" style="border: 1px solid black;"></canvas> 

      <p class="buttons">
        <button v-on:click="move('up')"><span class="iconify" data-icon="bx:bxs-up-arrow-square" data-width="50" data-height="50" style="color: gray;"></span></button>
      </p>
      <p>
        <button v-on:click="move('left')"><span class="iconify" data-icon="bx:bxs-left-arrow-square" data-width="50" data-height="50" style="color: gray;"></span></button>
        <button v-on:click="move('right')"><span class="iconify" data-icon="bx:bxs-right-arrow-square" data-width="50" data-height="50" style="color: gray;"></span></button>
      </p>
      <p class="buttons">
        <button v-on:click="move('down')"><span class="iconify" data-icon="bx:bxs-down-arrow-square" data-width="50" data-height="50" style="color: gray;"></span></button>
      </p> 
  </div>
    
</template>

<script>
  import io from "socket.io-client";


export default {
  name: 'bumpercars',
  data() {
    return {
      socket:{},
      context:{},
      position:{x: 0, y: 0}
    }
  },
  created() {
      this.socket = io("http://localhost:3000");
  },
  mounted() {
      this.context = this.$refs.game.getContext("2d");
      this.socket.on("position", data => {
          this.position = data; 
          this.context.clearRect(0, 0, this.$refs.game.width, this.$refs.game.height);
          this.context.fillRect(this.position.x, this.position.y, 50, 50);
      }); 
  },

  methods: {
      move(direction) {
        this.socket.emit("move", direction);
      }
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .buttons {
    padding-left: 28px;

  }
</style>
