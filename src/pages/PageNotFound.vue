<template>
    <div class="container">
        <!-- <b-button @click="goHome()">Home</b-button> -->
        <div class="row d-flex justify-content-center" style="margin-top:20%;">
            <b-icon icon="emoji-frown-fill" style="width:90px;height:90px;color:#747474;"></b-icon>
            <!-- <router-link :to="{name:'calendar'}">Calendar</router-link> -->
            <h2 class="text-center" style="font-family: 'Poppins',sans-serif;" >Oops, Something went wrong</h2>
            <router-link class="text-center heading_font" style="color:#AA96DA;" :to="{name: 'home', params: {id: this.id}}">Home</router-link>

        </div>

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
        ...mapState(['isLoggedIn'])
    },
}
</script>

<style>

</style>
