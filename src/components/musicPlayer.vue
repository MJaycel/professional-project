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
    </main>
    
  </div>
</template>

<script>
export default {
  name: 'MusicPlayer',
  data(){
    return{
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

      player: new Audio()
    }
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
