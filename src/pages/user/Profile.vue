<template>
    <!-- <div class="container-fluid"> -->
    <b-modal id="profile-settings" hide-footer hide-header centered hide-header-close size="lg" @hide="hideModal">
        <div class="container d-flex justify-content-start mt-4">
            <br>
            <div class="col">

            <h2 style="font-family:'Poppins',sans-serif; font-size:20px;">Profile Settings</h2>

                <div class="">
                    <div class="mt-4">
                        <p class="form-labels">Name</p>
                        <input class="col form-size font__fam" type="email" v-model="name">
                        <p class="errors" style="margin-top:10px;" v-if="nameEmpty">Name is required</p>
                        <p class="errors" style="margin-top:10px;" v-if="nameChar">Name must be at least 3 characters</p>

                    </div>
                    <div class="mt-4">
                        <p class="form-labels">Email</p>
                        <input class="col form-size font__fam" type="email" v-model="email">
                        <p class="errors" style="margin-top:10px;" v-if="emailEmpty">Email is required</p>
                        <p class="errors" style="margin-top:10px;" v-if="emailExist">Email already exist</p>


                    </div>
                    <div class="mt-4">
                        <p class="form-labels">Password</p>
                        <input class="col form-size font__fam" type="password" v-model="password">          
                        <p v-if="showPassError" class="errors">Password must have 8 or more characters</p>

                    </div>
                </div>
                <br>
            
                <div class="d-flex justify-content-end mt-2">
                    <b-button class="cancel__btn" @click="hideModal">cancel</b-button>
                    <b-button class="col-4 addItem__btn" @click="saveChanges">Save Changes</b-button>
                </div>
            </div>
        </div>
    </b-modal>
</template>

<script>

import axios from 'axios'
// import SideBar from '@/components/SideBar.vue'

export default {
    name: "Profile",
    data() {
        return{
            user: {},
            users: [],
            form: {
                name: '',
                email: '',
                password: ''
            },
            password: '',
            showPassError: false,

            email: '',
            emailEmpty: false,
            emailExist: false,

            name: '',
            nameEmpty: false,
            nameChar: false

        }
    },
    computed: {
    },
    mounted() {
        this.$bvModal.show('profile-settings')
        this.getData()
        this.getAllUsers()
    },
    methods:{
        getData(){
            let userId = localStorage.getItem('userId')
            axios.get(`http://localhost:3030/user/${userId}`)
            .then(response => {
                this.user = response.data
                this.password = this.user.password.slice(0,15)
                this.email = this.user.email
                this.name = this.user.name

                console.log(this.user)
            })
            .catch(error => console.log(error))
        },
        hideModal(){
            this.$bvModal.hide('profile-settings')
            this.$store.commit('setShowProfileSettings', false)
        },
        saveChanges() {
            let userId = localStorage.getItem('userId')
            this.validatePassword() 
            this.validateEmail()
            this.validateName()
            if(!this.showPassError  &&!this.emailExist && !this.emailEmpty && !this.nameEmpty && !this.nameChar){
                axios.post(`http://localhost:3030/edit/user/${userId}` , this.form)
                .then(response => {
                    // this.user = response.data
                    console.log(response.data)
                    this.$store.dispatch('getUser')
                    this.hideModal()
                }) .catch(error => console.log(error))
            }
        },
        validatePassword(){
            if(this.password.length <= 7){
                this.showPassError = true
            } else if(this.password.length >= 8){
                this.showPassError = false

                this.form.password = this.password
            }
        },
        validateEmail(){
            if(this.email === "" || this.email === null){
                this.emailEmpty = true
            } else {
                this.emailEmpty = false
                this.form.email = this.email
            }

            // loop through all users excluding current user and compare the email with the other users
            // if found the same show error 
            Array.from(this.users).forEach((user)=> {
                if(this.email === user.email){
                    this.emailExist = true
                    console.log('efdfds')
                } else {
                    this.emailExist = false
                    this.form.email = this.email
                }
            })
        },
        validateName(){
            if(this.name === "" || this.name === null){
                this.nameEmpty = true
            } else {
                this.nameEmpty = false
                this.form.name = this.name
            }

            if(this.name.length <= 3){
                this.nameChar = true
            } else {
                this.nameChar = false
            }
        },
        getAllUsers() {
            let userId = localStorage.getItem('userId')
            axios.get(`http://localhost:3030/users`)
            .then(response => {
                this.users = response.data

                // filter through all users and get all users that is not the current user
                this.users = this.users.filter(item => item._id !== userId)

                console.log(this.users)
            })
            .catch(error => console.log(error))
        }
    }
}
</script>

<style>
.ellipse{
    position: absolute;
    width: 77.11px;
    height: 77.11px;
    left: 3206.78px;
    top: 807.66px;

    background: #848484;
}
</style>
