import axios from "axios"
import Vue from "vue"
import Vuex from "vuex"
import Router from "vue-router"
import router from "./router"
import createPersistedState from 'vuex-persistedstate'

// import router from "./router"

Vue.use(Vuex, Router)

export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
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
        firstList: {},

        showAddModal: false,
        showEditModal: false,
        showTask: false,
        date: new Date(),

        listId: '',

        completed: '',
        priority: '',

        background: 'timer-background',
        songClicked: false,

        showProfileSettings: false,

        users: [],

        emailExist: false
    },
    getters:{
        name: state => {
            return state.name
        },

        events: state =>{
            return state.events
        },

        firstList: state => {
            return state.firstList
        },

        // changeBackground: state => {
        //     console.log(state.changeBackground)
        //     return state.background
        // }
    },
    mutations: {
        setBackground(state, background){
            state.background = background
            state.songClicked = true
        },

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

        setPriorityValue(state, priority){
            state.priority = priority
        },

        setShowTask(state, showTask){
            state.showTask = showTask
        },

        ////////// to do lists 
        setListId(state, listId){
            state.listId = listId
        },

        setFirstList(state, list){
            state.firstList = list
        },

        setShowProfileSettings(state, profileSettings){
            state.showProfileSettings = profileSettings
        },

        setUsers(state, users){
            state.users = users
        },

        setEmailExist(state, emailExist){
            state.emailExist = emailExist
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

                const list = response.data.user.todoLists[0]

                context.commit('setFirstList', list)
                console.log('to do', list)

                
                console.log(response)
            })
            .catch(error => {
                if(error){
                    context.commit('setLoginError', true)
                }
                console.log(error)
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
                
                const name = response.data.user.name
                let arr = []
                arr = name.split(" ", 2);
                const firstName = arr[0]

                context.commit("SET_NAME", firstName)
                router.push({name: 'home', params: {
                    id: response.data.user._id
                }})

                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.user._id)
                console.log("Register Succesful", response.data)
            })
            .catch(error => {
                console.log(error.response)
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
        getUser(context){
            let userId = localStorage.getItem('userId')
            axios.get(`http://localhost:3030/user/${userId}`)
            .then(response => {
                console.log('User',response.data)
                const USER_NAME = response.data.name
                let arr = []
                arr = USER_NAME.split(" ", 2);
                const firstName = arr[0]

                context.commit("SET_NAME", firstName)

            })
            .catch(error => console.log(error))
        },
        getAllUsers(context) {
            axios.get(`http://localhost:3030/users`)
            .then(response => {
                context.commit('setUsers', response.data)
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
        
        changeBackground(context, background){
            console.log(background);
            context.commit("setBackground", background)
        }


    }
})