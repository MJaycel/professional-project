<template>
  <div id="app">
    <div class="background_white">
      <header>
        <img src="../assets/headphones.svg" />

      </header>
      <main>

        <!-- <section class="player">
          <h2 class="song-title">{{current.title}} - <span>{{current.artist}}</span></h2>
          <div class="control">
            <button class="prev" @click="prev">Prev</button>
            <button class="play" v-if="!isPlaying" @click="play">Play</button>
            <button class="pause" v-else @click="pause">Pause</button>
            <button class="next" @click="next">Next</button>
          </div>
        </section>
        <section class="playlist">
          <h3>The Playlist</h3>
          <button v-for="song in songs" :key="song.src" @click="play(song)" :class="(song.src == current.src) ? 'song playing' : 'song'" >{{song.title}} - {{song.artist}}</button>
          
        </section> -->

        <section class="my_container my_center breathe">
          <!-- <h2 class="song-title">{{song.title}} - <span>{{song.artist}}</span></h2> -->
          <div @click="songClicked(song.html_link, song.cover_image)" class="player" v-for="song in songs" :key="song._id" >
            
            <img  class="music-image" 
            :src="require(`../assets/lofi-images/${song.cover_image}.jpg`)" alt="">
            <div class="image-header"><h4 class="image-text">{{song.title}} -<br> {{song.artist}}</h4></div>

          </div>
          <!-- <audio :src="audio_controller" controls/> -->

          <!-- <div class="control">
            <button class="prev" @click="prev">Prev</button>
            <button class="play" v-if="!isPlaying" @click="play(current)">Play</button>
            <button class="pause" v-else @click="pause">Pause</button>
            <button class="play"  @click="loop()">Loop</button>
            <button class="next" @click="next">Next</button>
          </div> -->
          
        </section>
        <audio class="audio_width breathe" :src="audio_controller" controls/>

        <!-- YOUTUBE PLAYER -->
        <div class="breathe_large">
          <h1 class="header">Add Your Own Playlist From Youtube!</h1>
          <section class="breathe">
            <youtube
              :video-id="videoId"
              :player-width="500"
              :player-height="300"
              @ready="ready"
              @playing="playing"
            ></youtube>
          </section>
          <div class="breathe" />

          <!-- <section class="my_container my_center header">
            <button class="np-ib np-button custom_button" @click="playYTvideo">Play</button>
            <button class="np-ib np-button custom_button" @click="pauseYTvideo">Pause</button>
            <button class="np-ib np-button custom_button" @click="stopYTvideo">Stop</button>
            
          </section> -->
          <h4 class="breathe header">Select Video</h4>
          <select class="breathe" text="Select Videos" v-model="youtube_link" @change="changeLink()">
            <option  v-for="video in videos" :key="video._id" :value="video.youtube_link">
              {{ video.video_title }} 
            </option>
          </select>
          <br>

          <button v-b-modal.collapse-3 class="breathe custom_button ">Add a New Video</button>
          <b-modal id="collapse-3">
            
            <div class="col my_container my_center">
              <div>
                <input class="row" type="name" placeholder="Add Video Title Here" v-model="videoDetails.video_title">
                <br>
                <input class="row" type="name" placeholder="Add Youtube Link Here" v-model="videoDetails.youtube_link">
              </div>
              <br>
            </div>
            <div class="breathe my_container my_center">
              <button class=" custom_button" @click="insertVideo(videoDetails)">Add Video</button>
            </div>
          </b-modal>
          <!-- <button
            v-for="video in videos" :key="video._id"
          >
            <h4 @click="changeLink(video.youtube_link)">{{video.video_title}}</h4>
          </button> -->
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import { getIdFromURL } from "vue-youtube-embed";
// import {mapActions} from 'vuex'

export default {
  name: 'MusicPlayer',
  data(){
    return{
      //-----youtube video player-----//////////////////////////
      videoId: "",
      videos: [],
      videoDetails:{
        youtube_link: "",
        video_title: "",
        user_id: localStorage.getItem('userId'),
      },
      youtube_link:"",
      //-----music-----/////////////////////////////////////////
      isLoop: false,
      currentTime: 0,

      current:{},
      index: 0,
      isPlaying: false,
      // songs:[{
      //   title:'Biscuit',
      //   artist: 'Lukrembo',
      //   src: require('../assets/Lukrembo - Biscuit [FTUM Release].mp3')
      //   },
      //   {
      //   title:'Serenity',
      //   artist: 'Riddiman',
      //   src: require('../assets/Serenity - Riddiman.mp3')
      //   },
      //   {
      //   title:'Tranquillity',
      //   artist: 'Riddiman',
      //   src: require('../assets/Tranquillity - Riddiman.mp3')
      // }],
      songs: [],
      audio_controller: 'https://professional-project-storage.s3.eu-west-1.amazonaws.com/LukremboMix.mp3',
      isVisibility: false,
      player: new Audio(),
      background: ''
    }
  },

  mounted(){
    this.getAllVideos()
    this.changeLink()
    this.getAudio()
    this.defaultVideo()
  },

  methods:{
    defaultVideo(){
      this.videoId = this.getID("https://www.youtube.com/watch?v=1fueZCTYkpA&ab_channel=LofiGirl")
    },

    songClicked(link, cover){

      this.audio_controller = link;
      this.$store.dispatch('changeBackground', cover)
    },
    
    // play(song){

    //   if(typeof song === "undefined"){
    //     this.next()
    //   }

    //   else if(typeof song.path != "undefined"){
    //     this.current = song;
    //     let src = require(`../assets/music/${this.current.path}`)
    //     // let src = src(`${this.test}`)
    //     console.log(src)
    //     this.player.src = src;
    //   }
    //   this.player.play();
    //   this.isPlaying = true;
    //   console.log("Is playing: ",this.isPlaying)

    //   // this.isPlaying = false;
      
    //   if(this.isPlaying == false){
    //     this.next()
    //   }
    // },

    getAudio(){
      axios
      .get(`http://localhost:3030/songs`)
      .then(response => {
        console.log("music is here", response.data)
        this.songs = response.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    pause(){
      this.player.pause();
      this.isPlaying = false;
    },
    loop(){
     this.isLoop = !this.isLoop
    },
    next(){
      this.index++;
      //if the index is greater than the songs length it brings it to the index 0
      if(this.index > this.songs.length - 1){
        this.index = 0;
      }

      this.current = this.songs[this.index];
      this.play(this.current);
    },
    prev(){
      this.index--;

      // places it to the end of the playlist
      if(this.index < 0){
        this.index = this.songs.length - 1;
      }

      this.current = this.songs[this.index];
      this.play(this.current);
    },

// yt videos

    ready(event) {
      this.YTPlayer = event.target;
    },
    playing() {
      console.log("playing");
    },
    change() {
      //this.videoId = "use another video id";
    },
    stopYTvideo() {
      this.YTPlayer.stopVideo();
    },
    pauseYTvideo() {
      this.YTPlayer.pauseVideo();
      console.log("paused");
    },
    playYTvideo() {
      this.YTPlayer.playVideo();
      console.log("paused");
    },
    insertVideo(videoDetails){
      // let userId = localStorage.getItem('userId')
      axios.post(`http://localhost:3030/youtube/add/${this.user_id}`, {
        youtube_link: videoDetails.youtube_link,
        video_title: videoDetails.video_title,
        user_id: videoDetails.user_id
      })
      .then(response => {
        console.log("data is here",response)
        this.getAllVideos()
      })
      .catch(error => {
        console.log(error)
      })
      
    },

    getAllVideos(){
      let userId = localStorage.getItem('userId')
      axios.get(`http://localhost:3030/youtube/${userId}`)
      .then(response => {
        console.log("data is here", response.data)
        this.videos = response.data
      })
      .catch(error => {
        console.log(error)
      })
    },

    getID(link){
      let mySubString = link.substring(
          link.indexOf("v") + 1, 
          link.lastIndexOf("&")
      );

      mySubString = mySubString.replace('=', '');

      return mySubString;
    },
    changeLink(){
      console.log(this.youtube_link)
      this.videoId = this.getID(this.youtube_link)
      console.log(this.videoId)
    }
  },
  created(){
    this.current = this.songs[this.index];
    this.player.src = this.current.src;
  },
  // shuffle(){
  // },

  // ...mapActions(['changeBackground']),

  
  
}

</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.insert-vid{
  font-family: 'Poppins',sans-serif;
  text-align: center;
  color: black;
}

.background_white{
    background-color: white;
    padding: 50px 40px 50px 40px;
    margin-left: 100px;
    margin-right: 100px;
    border-radius: 25px;
    height: 1250px;
}

/* .header{ */
  /* font-family: 'Poppins',sans-serif;
} */
.player{
  position: relative; 
  width: 100%; /* for IE 6 */
  cursor: pointer;
}
.image-header{ 

  background: rgb(0, 0, 0); 
  background: rgba(65, 64, 64, 0.3);
  /* background-repeat: repeat; */
  /* background-image: url("https://t3.ftcdn.net/jpg/02/51/42/54/360_F_251425426_ZaolrImRaeP6Q3VWtYqyr05lD3VfRDfr.jpg"); */
  /* opacity: 0.5; */
  padding: 10px; 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width:100%;
  height:100%;
  border-radius: 20px;
}

.image-text{
  color: white; 
  font-family:'Poppins', Sans-Serif; 
  font-size: 20px;
  letter-spacing: -1px;  
  margin-top: 50px;
  opacity: 1 !important;
}
/* .header{
    position: relative;
} */
/* .header:after {
    content:'';
    background: url('http://placehold.it/500x100') no-repeat center center;
    position: absolute;
    top:0px;
    left: 0px;
    width:100%;
    height:100%;
    z-index:-1;
    opacity: 0.2; 
} */

.music-image{
  width: 225px;
  height: 162px;
  object-fit: cover;
  border-radius: 20px;
  cursor: pointer;
}

.breathe{
  margin-top: 20px;
}

.breathe_large{
  margin-top: 70px;
}

.my_container{
    display: flex;
    flex-direction: row;
    column-gap: 10px;
}

.my_center{
  justify-content: center;
}

.audio_width{
  width: 800px;
}

button, input[type="submit"], input[type="reset"] {
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
}

.custom_button{
  font-family: 'Poppins',sans-serif;
  background-color: #ECCFCF;
  padding: 5px;
}

</style>
