<template>
    <div class="container pt-5">
        <h2>Welcome, You are logged in!</h2>
        <!-- <b-button @click="logout()">Logout</b-button> -->
        <router-link :to="{name: 'calendar',params: {id: this.userId} }">Calendar</router-link> |
        <!-- <router-link :to="{name: 'MusicPlayer'}">MusicPlayer</router-link> |
        <router-link :to="{name: 'PomodoroTimer'}">Pomodoro Timer</router-link> -->
        <b-button variant="warning" @click="logout()">Logout</b-button>        
    </div>
</template>

<script>

// import Clock from '@/components/clock.vue'
// import {mapState} from 'vuex'
export default {
    name: "Home",
    components:{
        // Clock
    },
    data() {
        return{
            userId: localStorage.getItem('userId')
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
            this.$router.push({name: 'landing_page'})
        }
    }
}
</script>

<style>

</style>
