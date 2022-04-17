<template>
  <div class="container-fluid">
      <div class="row">
        <div class="col-5 landing-content" style="height:100vh;">
          <div style="padding-bottom:130px;padding-left:100px;">
            <p class="welcome_display">Welcome to</p>
            <h2 class="focus_hub">FocusHub</h2>
            <div>
              <p class="sub_title">Stay focused with FocusHub</p> 

              <p class="site_desc">See your events, calm your anxieties and give yourself a way to manage your everyday tasks and focus on your work</p> 
            </div>

            <b-button class="addItem__btn" @click="goLogin">Login</b-button>
            <router-link class="register_landing_page__link" :to="{path: '/register'}">Create an account</router-link>

          </div>
        </div>
        <div class="col-6 landing-content" style="height:100vh;">
          <!-- <img src="@/assets/Frame22.svg" style="width:120%;"> -->
          <img src="@/assets/Frame23.svg" style="width:120%;">

        </div>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'LandingPage',
  components: {
  },
  mounted() {
      if(!this.isLoggedIn){
        this.$store.commit('setLoginError', false)
      }
    },
    computed: {
        ...mapState(['isLoggedIn','loginError']),
    },
    methods:{
      goLogin(){
        this.$router.push({name: 'login'})     
      }
    }
}
</script>

<style>

.welcome_display{
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 10px;

}

.landing-content {
  display: flex;
  align-items: center;
  /* margin-bottom: 100px; */

}
.focus_hub{
font-family: 'Croissant One', cursive;
font-style: normal;
font-weight: 400;
font-size: 130px;
line-height: 144.37%;
letter-spacing: -0.165em;
}

.sub_title{
  font-family: 'Poppins',sans-serif;
  font-size: 25px;
  font-weight: 500;
}

.site_desc{
  font-family: 'Poppins',sans-serif;
  font-size: 16px;
}

.register_landing_page__link{
  font-family: 'Poppins',sans-serif;
  font-size: 16px !important;
  color: black;
  margin-left:26px;
}
</style>
