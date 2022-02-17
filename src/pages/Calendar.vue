<template>
    <div>
        <h2> Calendar</h2>
        <!-- <b-button @click="logout()">Logout</b-button> -->
        <!-- <router-link :to="{name: 'calendar',params: {id: this.$store.state.user_id} }">Calendar</router-link> |
        <router-link :to="{name: 'MusicPlayer'}">MusicPlayer</router-link> |
        <router-link :to="{name: 'PomodoroTimer'}">Pomodoro Timer</router-link> -->
        <!-- <Clock/> -->
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
            
        }
    },
        mounted(){
        console.log('user',this.$store.state.user_id)
    },
    computed: {
    },
    methods: {

    }
}
</script>

<style>

</style>
