
<template>
    <body class="background_green">
        <div class="container d-flex justify-content-center">
            <br>
            <div class="background_white col-6">

                <h2 class="focus_hub_login">FocusHub</h2>
                <router-link class="register_link" :to="{path: '/login'}">Login</router-link>

                <div class="">
                    <div class="mt-4">
                        <p class="form-labels">Name</p>
                        <input class="col form-size" type="email" v-model="form.name">
                        <p class="errors" style="margin-top:10px;" v-if="errorsStatus">{{errors.name ? errors.name.message : ''}}</p>

                    </div>
                    <div class="mt-4">
                        <p class="form-labels">Email</p>
                        <input class="col form-size" type="email" v-model="form.email">
                        <p class="errors" style="margin-top:10px;" v-if="errorsStatus === true && emailExist === false">{{errors.email ? errors.email.message : ''}}</p>
                        <p class="errors" style="margin-top:10px;" v-if="emailExist === true">Email already exist</p>


                    </div>
                    <div class="mt-4">
                        <p class="form-labels">Password</p>
                        <input class="col form-size" type="password" v-model="form.password">          
                        <p class="errors" v-if="errorsStatus">{{errors.password ? errors.password.message : ''}}</p>

                    </div>
                </div>
                <br>
            
                <div class="d-flex justify-content-end">
                    <b-button class="cancel__btn" @click="goBack"> Cancel</b-button>
                    <b-button class="addItem__btn" @click="register(form)"> Register</b-button>
                </div>
            </div>

        </div>
    </body>

</template>

<script>

import {mapState, mapActions} from 'vuex'

export default {
    name: "Register",
    data() {
        return{
            form: {
                name: "",
                email: "",
                password: ""
            },
            users: [],
           emailExist: false,
        }
    },
    computed: {
        ...mapState(['isLoggedIn', 'errors', 'errorsStatus']),

    },
    methods: {
        ...mapActions(['register']),
        register() {
            this.$store.dispatch('register', this.form)
        },
        goBack(){
            this.$router.push({path: '/'})       
        },
    }
}
</script>

<style>



</style>
