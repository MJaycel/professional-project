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
        loginError: false,
        errors: {}, 
        errorsStatus: false
    },
    getters:{
    },
    mutations: {
        setLoggedInStatus(state, status){
            state.isLoggedIn = status
        },
        setLoginError(state, error){
            state.loginError = error
        },
        setErrors(state, errors){
            state.errors = errors
        },
        setErrorsStatus(state, errorstatus){
            state.errorsStatus = errorstatus
        }
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
                if(error){
                    context.commit('setLoginError', true)
                }
                console.log(error.response.data)
            })
        },
        logout(context) {
            localStorage.removeItem('token')
            localStorage.removeItem('userId')

            context.commit('setLoggedInStatus', false)
        },

        ///////// CREATE
        register(context, credentials){
            axios.post("http://localhost:3030/register", {
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            }) 
            .then(response => {
                context.commit("setLoggedInStatus", true)
                context.commit('setErrorsStatus', false)

                router.push({name: 'home', params: {
                    id: response.data.user._id
                }})

                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.user._id)
                console.log("Register Succesful", response.data)
            })
            .catch(error => {
                if(error){
                    context.commit("setErrors", error.response.data.message.errors)
                    context.commit("setErrorsStatus", true);
                }
            })
        },
    }
})