<template>
    <body class="background_green">
        <div class="container d-flex justify-content-center">
            <br>
            <div class="background_white col-6">

                <h2 class="focus_hub_login">FocusHub</h2>
                <router-link class="register_link" :to="{path: '/register'}">Create an account</router-link>


                <div class="mt-4">
                    <p class="form-labels">Email</p>
                    <input class="col form-size" type="email" v-model="form.email">
                </div>
                <div class="mt-4">
                    <p class="form-labels">Password</p>
                    <input class="col form-size" type="password" v-model="form.password">                        
                </div>

                <p v-if="loginError" class="errors" >Invalid Email or Password. Please try again</p>


                <br>
            
                <div class="d-flex justify-content-end">
                    <b-button class="cancel__btn" @click="goBack"> Cancel</b-button>
                    <b-button class="addItem__btn" @click="login(form)"> Login</b-button>
                </div>
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
                email: "",
                password: ""
            },
        }
    },
    computed: {
        ...mapState(['isLoggedIn', 'loginError'])
    },
    mounted(){
        this.$store.commit('setLoginError',false)
    },
    methods: {

        ...mapActions(['login']),

        login() {
            this.$store.dispatch('login', this.form)
        },
        goBack(){
            this.$router.push({path: '/'})       
        }
    }
}
</script>

<style>



/* .center{
    justify-content: center;
} */

.custom_button{
    background: #AA96DA;
    border-radius: 54px;    
	color: #FFFFFF;
	border: none;
	padding: 20;
	font: inherit;
    width: 179px;
    height: 52px;
}



</style>
