
<template>
    <body class="background_green">
        <div class="container">
            <!-- <router-link :to="{path: '/register'}"></router-link> -->

            <br>

            <div class=" background_white ">
                <h2>REGISTER AN ACCOUNT</h2>
                <br>
                <div class="">
                    <div class="row col-8" >

                        <p>Name</p>
                        <input type="email" v-model="form.name">
                        <span class="error text-danger" v-if="errorsStatus">{{errors.name ? errors.name.message : ''}}</span>


                        <p>Email</p>
                        <input type="email" v-model="form.email">
                        <span class="error text-danger" v-if="errorsStatus">{{errors.email ? errors.email.message : ''}}</span>

                        <br>

                        <p>Password</p>
                        <input type="password" v-model="form.password">
                        <span class="error text-danger" v-if="errorsStatus">{{errors.password ? errors.password.message : ''}}</span>

                        <br>

                        <div class="col d-flex justify-content-end">
                        <router-link :to="{path: '/'}">cancel</router-link>

                        <button class="col-4 custom_button" @click="register(form)">Submit</button>
                        </div>


                    </div>
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
        }
    },
    computed: {
        ...mapState(['isLoggedIn', 'errors', 'errorsStatus'])
    },
    methods: {

        ...mapActions(['register']),

        register() {
            this.$store.dispatch('register', this.form)
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
