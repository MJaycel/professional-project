<template>
  <div>
      <div class="container welcome_display">
            <h2>
                Welcome to FocusHub
            </h2>

            <router-link :to="{path: '/login'}">Login</router-link>

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

.welcome_display{
    margin-top: 50px;
}

</style>
