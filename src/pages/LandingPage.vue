<template>
  <div>
      <div v-if="!isLoggedIn" class="container welcome_display">
            <h2>
                Welcome to FocusHub
            </h2>

            <router-link :to="{path: '/login'}">Login</router-link>
            <br>
            <router-link :to="{path: '/register'}">Create an Account</router-link>
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
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap');

.welcome_display{
    margin-top: 50px;
}

</style>
