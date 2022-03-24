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
          <timer/>
          <img class="background-image" src="../assets/lofi-images/timer-background.jpg" alt="">
        </div>
        
        <a class="music-link">music</a>
        <div class="background_red">
          <music-player/>
        </div>
        
      </div>

    </div>
    
    
    
   
    
  </div>
</template>

<script>
import Timer from "@/components/timer.vue"
import MusicPlayer from '../components/musicPlayer.vue'

export default {
  components: {
    Timer,
    MusicPlayer
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
  height: 100%;
  object-fit: cover;
  margin-left: -15px;

}

.music-link{
  text-align: center;
  position: absolute;
  top: 90%;
  left: 10%;
  transform: translate(-50%, -50%);
  color: white;
}



</style>
