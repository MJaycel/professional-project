<template>
  <div id="app">
    <header>
      <router-link :to="{name: 'home', params: userId}">Home</router-link>
      <h1>
        My Music
      </h1>
    </header>
    <main>
      <section class="player">
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
        
      </section>
      <div>
        <section>
          <youtube
            :video-id="videoId"
            :player-width="500"
            :player-height="300"
            @ready="ready"
            @playing="playing"
          ></youtube>
        </section>
        <button class="np-ib np-button" @click="playYTvideo">Play</button>
        <button class="np-ib np-button" @click="pauseYTvideo">Pause</button>
        <button class="np-ib np-button" @click="stopYTvideo">Stop</button>
        <button class="np-ib np-button" @click="getAllVideos">Get All</button>

        
        <div>
          <input type="name" placeholder="Insert Link Here" v-model="videoDetails.youtube_link">
          <input type="name" placeholder="Insert Video Title Here" v-model="videoDetails.video_title">
          <button class="np-ib np-button" @click="insertVideo(videoDetails)">Insert Video</button>
        </div>

        <!-- <button
          v-for="video in videos" :key="video._id"
        >
          <h4 @click="changeLink(video.youtube_link)">{{video.video_title}}</h4>
        </button> -->

          <select v-model="youtube_link" @change="changeLink()">
            <option v-for="video in videos" :key="video._id" :value="video.youtube_link">
              {{ video.video_title }} 
            </option>
          </select>
      </div>
      

      <!-- WITHIN THE MODAL -->
      <!-- <div>
        <b-button v-b-modal.modal-1>Launch demo modal</b-button>
        <b-modal id="modal-1" title="BootstrapVue">
          <section class="player">
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
            
          </section>
          <div>
            <section>
              <youtube
                :video-id="videoId"
                :player-width="500"
                :player-height="300"
                @ready="ready"
                @playing="playing"
              ></youtube>
            </section>
            <button class="np-ib np-button" @click="playYTvideo">Play</button>
            <button class="np-ib np-button" @click="pauseYTvideo">Pause</button>
            <button class="np-ib np-button" @click="stopYTvideo">Stop</button>
            <button class="np-ib np-button" @click="getAllVideos">Get All</button>
            <div>
              <input type="name" placeholder="Insert Link Here" v-model="videoDetails.youtube_link">
              <input type="name" placeholder="Insert Video Title Here" v-model="videoDetails.video_title">
              <button class="np-ib np-button" @click="insertVideo(videoDetails)">Insert Video</button>
            </div>
            <select v-model="youtube_link" @change="changeLink()">
              <option v-for="video in videos" :key="video._id" :value="video.youtube_link">
                {{ video.video_title }} 
              </option>
            </select>
          </div>
        </b-modal>
      </div> -->





    </main>
    
  </div>
</template>

<script>
import axios from 'axios';
import { getIdFromURL } from "vue-youtube-embed";
let videoId = getIdFromURL("https://www.youtube.com/watch?v=lTRiuFIWV54&ab_channel=LofiGirl");

export default {
  name: 'MusicPlayer',
  data(){
    return{
      videoId,
      
      videos: [],
      videoDetails:{
        youtube_link: "",
        video_title: "",
        user_id: localStorage.getItem('userId'),
      },
      youtube_link:"",
      current:{},
      index: 0,
      isPlaying: false,
      songs:[
        {
        title:'Biscuit',
        artist: 'Lukrembo',
        src: require('../assets/Lukrembo - Biscuit [FTUM Release].mp3')
        },
        {
        title:'Serenity',
        artist: 'Riddiman',
        src: require('../assets/Serenity - Riddiman.mp3')
        },
        {
        title:'Tranquillity',
        artist: 'Riddiman',
        src: require('../assets/Tranquillity - Riddiman.mp3')
        }
      
      ],

      isVisibility: false,

      player: new Audio()
    }
  },

  mounted(){
    this.getAllVideos()
    this.changeLink()
  },

  methods:{
    play(song){
      if(typeof song.src != "undefined"){
        this.current = song;
        this.player.src = this.current.src;
      }

      this.player.play();
      this.isPlaying = true;
    },

    pause(){
      this.player.pause();
      this.isPlaying = false;
    },

    next(){
      this.index++;

      //if the song is less than the index total it brings it to the index 0
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
      this.test = event.target;
    },
    playing() {
      console.log("playing");
    },
    change() {
      //this.videoId = "use another video id";
    },
    stopYTvideo() {
      this.test.stopVideo();
    },
    pauseYTvideo() {
      this.test.pauseVideo();
      console.log("paused");
    },
    playYTvideo() {
      this.test.playVideo();
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

  shuffle(){
    
  }
}


</script>

<style scoped>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  font-family: sans-serif;
}

header{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-color: #212121;
  color: #FFF;
}


</style>
