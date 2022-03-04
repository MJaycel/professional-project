import axios from "axios"
import Vue from "vue"
import Vuex from "vuex"
import Router from "vue-router"
import router from "./router"
// import router from "./router"

Vue.use(Vuex, Router)

export default new Vuex.Store({
    state: {
        /////user
        isLoggedIn: false,
        loginError: false,
        errors: {}, 
        errorsStatus: false,

        items: [],
        item_id: '',
        name: '',
        events: [],

        lists: [],

        showAddModal: false,
        showEditModal: false,
        date: new Date(),

        listId: '',

        completed: ''
    },
    getters:{
        name: state => {
            return state.name
        },

        events: state =>{
            return state.events
        }
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
        },

        setCalendarItems(state, items){
            state.items = items
        },
        setToDoLists(state, lists){
            state.lists = lists
        },

        setShowAddModal(state, showAddModal){
            state.showAddModal = showAddModal
        },

        setDate(state, date){
            state.date = date
        },
        SET_NAME(state, name){
            state.name = name  
        },
        SET_EVENTS(state, events){
            state.events = events
        },
        SET_ITEM_ID(state, item_id){
            state.item_id = item_id
        },

        setShowEditModal(state, showEditModal){
            state.showEditModal = showEditModal
        },

        setCompleted(state, completed){
            state.completed = completed
        },

        ////////// to do lists 
        setListId(state, listId){
            state.listId = listId
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
                context.commit("SET_NAME", response.data.user.name)
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
        //////get all events
        getAllEvents(context) {
            let userId = localStorage.getItem('userId')
            axios.get(`http://localhost:3030/calendar/${userId}`)
                .then(response=> {
                    // this.items = response.data
                    context.commit('setCalendarItems', response.data)
                    console.log('EVENTS', response.data)
                    context.commit("SET_EVENTS", response.data)
                })
                .catch(error => console.log(error))     
        },

        // getAllToDo(context) {
        //     let userId = localStorage.getItem('userId')
        //     axios.get(`http://localhost:3030/todo/${userId}`)
        //         .then(response => {
        //             context.commit('setToDoLists', response.data)
        //             console.log('Lists', response.data)
        //         }) 

        //         .catch(error => console.log(error))
        // }
    }
})