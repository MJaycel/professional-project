import Vue from "vue"
import Router from "vue-router"
// import router from "./router"
import store from "./store"

import LandingPage from "@/pages/LandingPage.vue"
import Login from "@/pages/user/Login.vue"
import Home from "@/pages/Home.vue"
import PageNotFound from "@/pages/PageNotFound.vue"


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
                }

                //check if logged in
                if(store.state.isLoggedIn || to.name === 'LandingPage') {
                    console.log('token pass', localStorage.getItem('token'));
                    next(false) 
                    if(!next(false)){
                        next({name : 'page_not_found'})
                    }
                } else 
                    next()
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
            path: "*", 
            name: 'page_not_found',
            component: PageNotFound,
            // beforeEnter: (next) => {
            //     if(localStorage.getItem('token')){
            //         store.commit('setLoggedInStatus', true)
            //         // next({name: 'home', params: {id: store.state.user_id}})
            //         next()
            //     }
            // }
        },
        {
            path: '/home/:id',
            name: 'home',
            component: Home
        },

    ]
})