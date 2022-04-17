<template>
  <div>
    <link href="https://unpkg.com/bootstrap@4.5.2/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="https://unpkg.com/bootstrap-vue@2.16.0/dist/bootstrap-vue.css" rel="stylesheet" />
    <router-view/>

  </div>
</template>
<script>
require("@/css/main.css")

export default {
  name: 'App',

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
@import url('https://fonts.googleapis.com/css2?family=Croissant+One&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
