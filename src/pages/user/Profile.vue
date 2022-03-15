<template>
    <div class="container">
        <!-- <router-link :to="{path: '/register'}"></router-link> -->
        <h2>Profile</h2>
        <br>
        <div class="col-">
            <div class="row">
                <p>{{this.user.name}}</p>
                <p>{{this.user.email}}</p>
                <p>{{this.user.password}}</p>
                

            </div>
        </div>

    </div>
</template>

<script>

import axios from 'axios'
export default {
    name: "Profile",
    data() {
        return{
            user: {}
        }
    },
    computed: {
    },
    mounted() {
        let userId = localStorage.getItem('userId')
        axios.get(`http://localhost:3030/user/${userId}`)
        .then(response => {
            this.user = response.data
            console.log(this.user)
        })
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap');

</style>
