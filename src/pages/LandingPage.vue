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

export default {
  name: 'LandingPage',
  components: {
  }
}
</script>

<style>

.welcome_display{
    margin-top: 50px;
}

</style>
