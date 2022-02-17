<template>
    <div class="container">
        <!-- <router-link :to="{path: '/register'}"></router-link> -->
        <h2>LOGIN</h2>
        <br>
        <div class="col-">
            <div class="row">
                <span v-if="loginError" class="errors text-danger" >Invalid Email or Password. Please try again</span>

                <p>Email</p>
                <input type="email" v-model="form.email">

                <br>

                <p>Password</p>
                <input type="password" v-model="form.password">

                <br>

                <div class="col d-flex justify-content-end">
                <router-link :to="{path: '/'}">cancel</router-link>

                <b-button class="col-4" @click="login(form)">Submit</b-button>
                </div>


            </div>
        </div>

    </div>
</template>

<script>

import {mapState, mapActions} from 'vuex'

export default {
    name: "Login",
    data() {
        return{
            form: {
                email: "zion@gmail.com",
                password: "thomasthetankengine"
            },
        }
    },
    computed: {
        ...mapState(['isLoggedIn', 'loginError'])
    },
    methods: {

        ...mapActions(['login']),

        login() {
            this.$store.dispatch('login', this.form)
        }
    }
}
</script>

<style>

</style>
