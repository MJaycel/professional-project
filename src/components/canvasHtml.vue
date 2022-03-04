<template>
  <div>
    <canvas id="circle" />
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/p5@1.4.1/lib/p5.js"></script>
<script>
export default ({
  name: 'canvasHtml', 
  data(){
    return{
      ctx: null, 
      percent: ''
    }
  },
  mounted(){
    var c = document.getElementById("circle");
    this.ctx = c.getContext("2d");

    this.percent = this.$store.state.completed;    
  },
  methods: {
     drawProgress(){
            //clear canvas
            // this.ctx.clearRect(0,0, this.ctx.width, this.ctx.height);
            let sizeWidth = 80; 
            let sizeHeight = 80;
            let lineWidth = 10;

            this.ctx.translate(150, 80); // change center
            this.ctx.rotate((-1 / 2 + 0 / 180) * Math.PI); // rotate -90 deg

            //progress circle 100%
            this.ctx.beginPath();
            this.ctx.arc(0, 0, sizeWidth/2, sizeHeight/2, Math.PI * 2, false);
            this.ctx.strokeStyle = '#efefef';
            // this.ctx.lineCap = 'round'; // butt, round or square
            this.ctx.lineWidth = lineWidth
            this.ctx.stroke();

            console.log("refresh", this.$store.state.completed)
            //progress circle 
            var percentage = Math.min(Math.max(0, this.$store.state.completed/100 || 1), 1);
            console.log(Math.PI * 2 * percentage);
            this.ctx.beginPath();
            this.ctx.arc(0, 0, sizeWidth/2, 0, Math.PI * 2 * percentage, false);
            this.ctx.strokeStyle = '#555';
            // this.ctx.lineCap = 'round'; // butt, round or square
            this.ctx.lineWidth = lineWidth
            this.ctx.stroke();
        }
  },
  watch:{
    '$store.state.completed': {
      handler(newValue, oldValue){
        this.ctx.clearRect(0,0, this.ctx.width, this.ctx.height);
        this.drawProgress();
      }
    }
  }

})
</script>

<style>
  canvas {
    /* border: 2px solid black; */
    display: block;
    margin: 0 auto;
    width: 400px;
    height: 300px;
  }

</style>


