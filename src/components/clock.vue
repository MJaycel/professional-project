<template>
  <div>
  <div>
    <div class="clock-inner">
      <div class="hour">{{hours}}</div>
      <div class="dots">:</div>
      <div class="min">{{minutes}}</div>
      <div class="mode"></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Clock',
  props: {
    color: {
      type: String,
      default: 'red'
    }
  },
  data () {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  },
  methods: {


    setTime () {
      //builtin JS function that 
      setInterval(() => {

        // DATE is a built in class 
        const DATE = new Date()
        this.hours = this.checkForSingleDigit(DATE.getHours())
        this.minutes = DATE.getMinutes()
        this.seconds = DATE.getSeconds()

        // this.minutes = this.checkForSingleDigit(DATE.getMinutes())
        // this.seconds = this.checkForSingleDigit(DATE.getSeconds())

        //allows for it to update every second (1000 ms = 1 sc)
      }, 1000)
    },

    
    
    checkForSingleDigit (digit) {
      return ("0" + digit).slice(-2)
    }
  },

  // uses the set time method that we wrote
  mounted () {
    this.setTime()
  }


}
</script>

<style>
  .hour, .min, .secs{
    font-size: 7em;
    font-family: 'Poppins',sans-serif;
    /* font-size: 20px !important; */
  }
  strong {
    color: blue;
  }

  .clock-border {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 700px;
    height: 200px;
    background: linear-gradient(to right, grey, rgb(82, 76, 76));
  }
  .clock-inner {

    display: flex;
    justify-content: start;
    align-items: center;
    /* width: 600px; */
    height: 100px; 
    /* background: orange; */
    /* border-radius: 20px; */
    color: white;
    color: black !important; 
  }
  .dots {
    font-size: 70px;
  }
  .white {
    color: white;
  }
  .yellow {
    color: yellow;
  }
  .green {
    color: green;
  }
</style>
