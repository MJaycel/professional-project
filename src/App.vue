<template>
  <div>
    <link href="https://unpkg.com/bootstrap@4.5.2/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="https://unpkg.com/bootstrap-vue@2.16.0/dist/bootstrap-vue.css" rel="stylesheet" />
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> -->

    <!-- <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css" rel="stylesheet">
    <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet"> -->
    <!-- <script src="https://kit.fontawesome.com/91a51980b0.js" crossorigin="anonymous"></script> -->
    <router-view/>
  </div>
</template>
<script>
require("@/css/main.css")


export default {
  name: 'App',
  components: {
    
  },
  mounted(){
        //// couldnt put script tag inside template 
        //// For font awesome -- wont work with installation so need a kit script tag
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', 'https://kit.fontawesome.com/5db9b1848b.js')
        document.head.appendChild(recaptchaScript)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
