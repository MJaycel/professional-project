<template>
    <body class="background_green">
        <div class="container ">
            <br>
            <div class=" background_white ">

                <h1>FOCUS</h1>
                <router-link :to="{path: '/register'}">Create an account</router-link>

                <div class="">
                    <span v-if="loginError" class="errors text-danger" >Invalid Email or Password. Please try again</span>

                    <p>Email</p>
                    <input class="col-8" type="email" v-model="form.email">

                    <br>

                    <p>Password</p>
                    <input class="col-8" type="password" v-model="form.password">


                </div>
                <br>
                <div class="col-8 row">
                    <div class="col d-flex justify-content-end">
                        <router-link :to="{path: '/'}">cancel</router-link>

                        <button class="col-4 custom_button" @click="login(form)">Submit</button>
                    </div>
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
