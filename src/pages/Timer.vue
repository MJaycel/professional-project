<template>
  <div>
    <div class="container-fluid" >
      <div class="row ">
        <div class="col">
          <img class="background-image" :src="require(`../assets/lofi-images/${$store.state.songClicked ? $store.state.background : background}.jpg`)" alt="">
          <div class="paperOverlay">
            <b-icon icon="arrow-left" style="color: white;width:40px;height:40px;margin-left:20px;margin-top:20px;cursor:pointer" @click="goBack"></b-icon>
          </div>
          
          <Timer/>
        </div>
        
        <!-- <b-button v-b-toggle.collapse-2 class="music-link">View Music</b-button> -->
        <a v-b-toggle.collapse-2 class="music-link" href="#music_player">Music</a>
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

    },
    goBack(){
      let userId = localStorage.getItem('userId')
      this.$router.push({ name: 'home', params: { id: userId} })
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
  width: 102.2%;
  /* height: 850px; */
  height: 100vh;
  object-fit: cover;
  margin-left: -15px;
  filter: brightness(80%);
  mix-blend-mode: multiply;

}
.paperOverlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-repeat: repeat;
  background-image: url("https://t3.ftcdn.net/jpg/02/51/42/54/360_F_251425426_ZaolrImRaeP6Q3VWtYqyr05lD3VfRDfr.jpg");
  filter: brightness(80%);
  opacity: 0.2;
}
.noisy {
  background-image: url(https://utemplates.net/wp-content/uploads/2017/07/White-Construction-Ppaer-Texture-For-Free-Download.jpg);  
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

.music-link:hover{
  text-decoration: none !important;
  color: white !important;
}



</style>
