
<template>
    <div class="container">
        <!-- <router-link :to="{path: '/register'}"></router-link> -->
        <h2>LOGIN</h2>
        <br>
        <div class="col-">
            <div class="row">

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

                <b-button class="col-4" @click="register(form)">Submit</b-button>
                </div>


            </div>
        </div>

    </div>
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

</style>
