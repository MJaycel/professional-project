<template>
    <div>
        <!-- <b-button @click="goHome()">Home</b-button> -->
        <router-link :to="{name: 'home', params: {id: this.id}}">Home</router-link>
        <!-- <router-link :to="{name:'calendar'}">Calendar</router-link> -->
        <h2>Oops, Somethings went wrong</h2>

    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: "PageNotFound",
    data() {
        return{
            id: localStorage.getItem('userId')
        }
    },
    components: {
    
    },
    mounted(){
        console.log('user',this.$store.state.isLoggedIn)
    },
    methods: {
    },
        computed: {
        ...mapState(['loggedIn'])
    },
}
</script>

<style>

</style>
