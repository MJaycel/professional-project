
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
                        <p class="errors" style="margin-top:10px;" v-if="errorsStatus">{{errors.email ? errors.email.message : ''}}</p>
                        <!-- <p class="errors" style="margin-top:10px;" v-if="emailExist">Email already exist</p> -->


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
// import axios from 'axios'

export default {
    name: "Register",
    data() {
        return{
            form: {
                name: "",
                email: "",
                password: ""
            },
            email: '',
            emailExist: false,
            users: []
        }
    },
    computed: {
        ...mapState(['isLoggedIn', 'errors', 'errorsStatus'])
    },
    // mounted(){
    //         // this.getAllUsers()
    // },
    methods: {

        ...mapActions(['register']),

        register() {
            // this.validateEmail()
            
            this.$store.dispatch('register', this.form)
        },
        goBack(){
            this.$router.push({path: '/'})       
        },
        // validateEmail(){
        //     // loop through all users excluding current user and compare the email with the other users
        //     // if found the same show error 
        //     Array.from(this.users).forEach((user)=> {
        //         if(this.email === user.email){
        //             this.emailExist = true
        //         } 
                
        //         console.log('fck', user.email, this.email)
        //     })
        //     console.log('fdfsda',this.emailExist,this.form.email)
        // },
        // getAllUsers() {
        //     // let userId = localStorage.getItem('userId')
        //     axios.get(`http://localhost:3030/users`)
        //     .then(response => {
        //         this.users = response.data

        //         // // filter through all users and get all users that is not the current user
        //         // this.users = this.users.filter(item => item._id !== userId)

        //         console.log(this.users)
        //     })
        //     .catch(error => console.log(error))
        // }
    }
}
</script>

<style>



</style>
