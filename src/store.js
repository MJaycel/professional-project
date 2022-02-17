import axios from "axios"
import Vue from "vue"
import Vuex from "vuex"
import Router from "vue-router"
import router from "./router"
// import router from "./router"

Vue.use(Vuex, Router)

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
    },
    getters:{
    },
    mutations: {
        setLoggedInStatus(state, status){
            state.isLoggedIn = status
        },
    },
    actions: {
        login(context, credentials){
            axios.post("http://localhost:3030/login", {
                email: credentials.email,
                password: credentials.password
            }) 
            .then(response => {
                context.commit("setLoggedInStatus", true)

                router.push({name: 'home', params: {
                    id: response.data.user._id
                }})

                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.user._id)
                console.log("Login Succesful", response.data.user)
            })
            .catch(error => {
                console.log(error)
            })
        },
        logout(context) {
            localStorage.removeItem('token')
            localStorage.removeItem('userId')

            context.commit('setLoggedInStatus', false)
        }
    }
})