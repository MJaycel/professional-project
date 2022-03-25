<template>
    <body class="background_green">
        <div class="container">
            <!-- <router-link :to="{path: '/register'}"></router-link> -->
            <br>
            <div class=" background_white ">

                <h1>FOCUS</h1>

                <div class="">
                    <span v-if="loginError" class="errors text-danger" >Invalid Email or Password. Please try again</span>

                    <p>Email</p>
                    <input class="col-8" type="email" v-model="form.email">

                    <br>

                    <p>Password</p>
                    <input class="col-8" type="password" v-model="form.password">


                </div>

                <br>
                <b-row class="row d-flex justify-content-end">
                    <b-col>
                        <router-link class="col-4" :to="{path: '/'}">cancel</router-link>

                    </b-col>
                    <b-col>
                        <b-button class="col-4" @click="login(form)">Submit</b-button>

                    </b-col>
                </b-row>
            </div>

        </div>
    </body>

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


.background_green{
    background-color: #A4D1A2;
    padding-bottom: 200px;
}

.background_white{
    background-color: white;
    padding: 100px;
    border-radius: 23px;
}

.center{
    justify-content: center;
}


</style>
