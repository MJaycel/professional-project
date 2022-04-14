<template>
  <div>
    <div class="container-fluid" >
      <div class="row ">
        <div class="side__bar" style="height: 100vh;width: 65px !important;">
          <div class="mt-5 links">
              <router-link class="home__link" :to="{name: 'home', params: {id: this.userId}}">
                  <b-icon icon="house-door-fill"></b-icon>
              </router-link>
          </div>
          <div class="links">
              <router-link class="home__link" :to="{name: 'calendar',params: {id: this.userId} }">
                  <b-icon icon="calendar-date-fill"></b-icon>
              </router-link>
          </div>
          <div class="links">
              <router-link class="home__link" :to="{name: 'todo_page',params: {id: this.userId} }">
                  <b-icon icon="card-checklist"></b-icon>
              </router-link>
          </div>
        </div>

        
        <div class="col">
          <!-- {{ $store.state.songClicked ? $store.state.background : background }} -->
          
          <img class="background-image" :src="require(`../assets/lofi-images/${$store.state.songClicked ? $store.state.background : background}.jpg`)" alt="">
          <Timer/>
        </div>
        
        <a v-b-toggle.collapse-2 class="music-link" href="#music_player">Music</a>
        <!-- <b-button v-b-toggle.collapse-2 class="music-link">View Music</b-button> -->
        <b-collapse id="collapse-2" class="background_red">
          <div class="" id="music_player">
            <MusicPlayer/>
          </div>
        </b-collapse>
        
      </div>

    </div>
  </div>
</template>

<script>
import Timer from "../components/timer.vue"
import MusicPlayer from '../components/musicPlayer.vue'

export default {
  name: 'PomodoroTimer',
  components: {
    Timer,
    MusicPlayer
  },
  data(){
    return{
      background: "timer-background",
    }
  },
  mounted(){
      console.log(this.$store.state.background)
  },
  methods:{
    changeBackground(){
      console.log(this.$store.state.background)

    }
  }
}
</script>

<style>



.background_red{
  background-color: #ECCFCF;
  padding-bottom: 70px;
}

.background-image{
  width: 102%;
  height: 850px;
  object-fit: cover;
  margin-left: -15px;
  filter: brightness(40%)

}

.music-link{
  font-family: 'Poppins',sans-serif;
  text-align: center;
  position: absolute;
  top: 90%;
  left: 10%;
  width: 200px;
  transform: translate(-50%, -50%);
  color: white;
}



</style>
