<template>
  <div class="">
    
   
    <!-- Timer gets displayed up here -->

    <div>
      
      <div class="text">
        <h2 class="title">{{message}}</h2>
        <div id="timer2" v-html="time"></div>
        <div class="buttons">
          
          <button @click="timerRun" v-if="!timerRunning">Start</button>
          <button @click="timerRun, minutesSet = (25), totalTime = (25*60)" v-if="!timerRunning">Total Time 25</button>
          <button @click="timerRun, minutesSet = (30), totalTime = (30*60)" v-if="!timerRunning">Total Time 30</button>
          <button @click="timerRun, totalTime = (35 * 60)" v-if="!timerRunning">Total Time 35</button>
          <button @click="timerRun, totalTime = (40 * 60)" v-if="!timerRunning">Total Time 40</button>
          <button @click="timerRun, totalTime = (45 * 60)" v-if="!timerRunning">Total Time 45</button>
    
          <button @click="timerPause" v-if="timerRunning">Pause</button>
    
          <button @click="timerReset" v-if="timerRunning">Restart</button>
        </div>
      </div>
      
    </div>
  </div>
</template>
 
<script>
export default {
name: 'Timer',
  data: function() {
      return{
        message: 'Begin working',
 
        // this is where the user can chose the length of time
        // default total time
        totalTime: (25 * 60),
        minutesSet: 1,
        timerRunning: false,
        timerPaused: false,
        interval: null,
        sessions: false,
        shortBreakRemaining: 2
    }
  },
 
 
 
  computed: {
 
    //function for the timer to display
    time: function() {
      return this.minutes + " : " + this.seconds;
    },
 
 
    // calculates the number of minutes
    minutes: function() {
 
        // divides the number by the total time by 60 to get the minutes
        var min = Math.floor(this.totalTime / 60);
 
        // ternary opeartor
        // min is greater or equal to 10 return "0" and the remaining minutes left
        return min >= 10 ? min : '0' + min;
    },
 
    // calculates the number of minutes
    seconds: function() {
      var sec = this.totalTime - (this.minutes * 60);
      return sec >= 10 ? sec : '0' + sec;
    }
  },
 
 
 
  methods: {
 
    // buttons for when the timer is running
 
    timerRun() {
      this.timerRunning = true;
      this.message = 'Focus..';
 
      this.interval = setInterval( this.countdownTimer , 1000);
 
      console.log(this.totalTime);
      console.log(this.minutes);
    },
 
    timerPause() {
      this.message = 'Be determined..';
      this.timerRunning = false;
      clearInterval(this.interval);
    },
 
    timerReset() {
      this.message = 'Let the countdown begin!!';
      this.timerRunning = false;
 
      clearInterval(this.interval)
 
      this.totalTime = (25 * 60);
    },
 
    timerCountdown() {
      console.log('Working');
      this.timerRunning = true;
      this.interval = setInterval(this.updateCurrentTime, 1000);
      // Counts down from 60 seconds times 1000.
      setInterval( () => {
        this.timerMinutes--
      }, 60 * 1000)
     
     
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Check if seconds at double zero and then make it a 59 to countdown from.
      // need another method of checking the number while in the loop and then adding a zero on the number under 10
      // if(this.timerSeconds === '00'){
      //   this.timerSeconds = 59;
      //   setInterval( () => {
      //     this.timerSeconds--
      //   }, 1000);
      // } else {
      //   setInterval( () => {
      //     this.timerSeconds--
      //   }, 1000);
      // }
 
      if(this.timerSeconds === '00'){
 
        this.timerSeconds = 59;
 
        setInterval( () => {
 
          this.timerSeconds--
 
        }, 1000);
 
      } else {
 
        setInterval( () => {
 
          this.timerSeconds--
 
        }, 1000);
      }
 
     
 
//////////////////////// THIS IS WHERE THE PROBLEM IS //////////////////////////////////////////////////////////////////////////////////////////////////////
    },
 
 
    countdownTimer() {
      if (this.timerRunning == true) {
          this.totalTime--;
      }

      if(this.minutes === '00' && this.seconds === '00'){      
       
        if(this.sessions === false){
          this.message = 'Goodjob!!! Now take a break!';

          if(this.shortBreakRemaining === 0){
            // this is the long break
            this.message = 'Take a long break!';
            this.totalTime = (30 * 60)
            this.shortBreakRemaining = 2
          }else{

            // this is the default breaktime
            // this is where the time is changed and is currently set to 2 seconds
            this.totalTime = ( 1 * 3 ) 
            this.shortBreakRemaining--
          }

          setInterval( () => {
            this.timerSeconds--
          }, this.totalTime);
          this.sessions = true
        }

        // this is to allow the user to work again
        else if(this.sessions === true){
          console.log("WORK AGAIN LOG")
          this.message = 'Keep pushing forward!';
 
          this.totalTime = (this.minutesSet * 60); //sets work again
          console.log(this.minutesSet)
          setInterval( () => {
            this.timerSeconds--
          }, this.totalTime);

          this.sessions = false
        }
      }
    }
 
    // repeat(){
    //   this.sessions = !this.sessions;
    //   console.log(this.sessions + " test sessions")
    //   if(this.sessions === false){
 
    //       this.message = 'test!';
 
 
    //       this.sessions = true;
    //     }
    // }
 
   
  }
}
 
 
</script>
 
<style scoped>


.text{
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}

.center {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
 
#timer,
#timer2{
    font-size: 200px;
    line-height: 1;
    color: white;
}
.title {
    text-align: center;
    font-size: 1.4em;
}
.buttons {
    text-align: center;
}
 
.buttons button {
    background-color: transparent;
    color: #f5f5f5;
    border: none;
    padding:12px;
}
</style>
