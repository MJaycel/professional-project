import Vue from "vue"
import Router from "vue-router"
// import router from "./router"
import store from "./store"

import LandingPage from "@/pages/LandingPage.vue"
import Login from "@/pages/user/Login.vue"
import Home from "@/pages/Home.vue"
import PageNotFound from "@/pages/PageNotFound.vue"
import Register from "@/pages/user/Register.vue"
import Calendar from "@/pages/CalendarPage.vue"
import oldCal from "@/pages/Calendar.vue"

import MusicPlayer from "@/pages/MusicPlayer.vue"
import Timer from '@/pages/Timer.vue'
import ToDo from '@/pages/ToDo.vue'
import ToDoPage from '@/pages/ToDoPage.vue'
import SingleToDo from '@/pages/SingleToDo.vue'
import Profile from '@/pages/user/Profile.vue'
import Meditation from '@/pages/MeditationPage.vue'







Vue.use(Router)

export default new Router ({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'landing_page',
            component: LandingPage,
            beforeEnter: (to,from,next) => {
                //if there is token, set log in state as true
                if(localStorage.getItem('token')){
                    store.commit('setLoggedInStatus', true);
                    next({name: 'home'})
                } else 
                    next()

                //check if logged in
                // if(store.state.isLoggedIn || to.name === 'LandingPage') {
                //     console.log('token pass', localStorage.getItem('token'));
                //     next(false) 
                //     if(!next(false)){
                //         next({name : 'page_not_found'})
                //     }
                // } else 
                //     next()
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: (to,from,next) => {
                //if there is token, set log in state as true
                if(localStorage.getItem('token')){
                    store.commit('setLoggedInStatus', true);
                }

                //check if logged in
                if(store.state.isLoggedIn) {
                    console.log('token pass', localStorage.getItem('token'));
                    // next({name: 'home', params: {id: store.state.user_id}})
                    next(false)
                } else 
                    next()
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            beforeEnter: (to,from,next) => {
                //if there is token, set log in state as true
                if(localStorage.getItem('token')){
                    store.commit('setLoggedInStatus', true);
                }

                //check if logged in
                if(store.state.isLoggedIn) {
                    console.log('token pass', localStorage.getItem('token'));
                    // next({name: 'home', params: {id: store.state.user_id}})
                    next(false)
                } else 
                    //set errors state back
                    store.state.errors = {};
                    store.state.errorsStatus = false;
                    next()
            }
        },
        { 
            path: "*", 
            name: 'page_not_found',
            component: PageNotFound,
        },
        {
            path: '/home/:id',
            name: 'home',
            component: Home,
            beforeEnter: (to,from,next) => {
                if(!store.state.isLoggedIn){
                    next({name: 'landing_page'})
                } else{
                    next()
                }
            }
        },
        {
            path: '/calendar/:id',
            name: 'calendar',
            component: Calendar,
        },
        {
            path: '/oldCal/:id',
            name: 'oldCal',
            component: oldCal,
        },
        {
            path:'/music/:id',
            name: 'MusicPlayer',
            component: MusicPlayer
        },
        {
            path:'/PomodoroTimer',
            name: 'PomodoroTimer',
            component: Timer
        },
        {
            path:'/Meditation',
            name: 'MeditationPage',
            component: Meditation
        },
        {
            path:'/todo/:id',
            name: 'todo',
            component: ToDo,
            beforeEnter: (to,from,next) => {
                if(!localStorage.getItem('token') && !store.state.isLoggedIn){
                    next({name: 'page_not_found'})
                } else 
                    next()
            }
        },
        {
            path:'/todo/lists/:id',
            name: 'todo_page',
            component: ToDoPage,
            beforeEnter: (to,from,next) => {
                if(!localStorage.getItem('token') && !store.state.isLoggedIn){
                    next({name: 'page_not_found'})
                } else 
                    next()
            }
        },
        {
            path:'/todo/list/:id',
            name: 'single_todo',
            component: SingleToDo,
        },
        {
            path:'/profile/user/:id',
            name: 'profile',
            component: Profile,
        },
    ]
})