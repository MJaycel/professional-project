<template>
    <div>
        <div style="background:#A4D1A2;height:100vh;padding:0px;" :class="hideDisplay">
            <div class="d-flex justify-content-between" style="font-size:20px;padding-top:20px;">
                <p class="logo__font">Focus</p>
                <!-- <b-icon @click="hideBar" style="color: #1D6420;margin-top:16px;margin-right:10px;font-weight:500;cursor:pointer;" icon="chevron-double-left"></b-icon> -->
            </div>
            <div>
                <div class="onHover_links">
                    <router-link class="home__link" :to="{name: 'home', params: {id: this.userId}}">
                        <b-icon class="icon-links" icon="house-door-fill"></b-icon>
                        Home
                    </router-link>
                </div>
                <div class="onHover_links">
                    <router-link class="home__link" :to="{name: 'calendar',params: {id: this.userId} }">
                        <b-icon class='icon-links' icon="calendar-date-fill"></b-icon>
                        My Calendar
                    </router-link>
                </div>
                <div class="onHover_links">
                    <router-link class="home__link" :to="{name: 'todo_page',params: {id: this.userId} }">
                        <b-icon class='icon-links' icon="card-checklist"></b-icon>
                        My Tasks
                    </router-link>
                </div>
                <div class="onHover_links">
                    <router-link class="home__link" :to="{name: 'PomodoroTimer'}">
                        <b-icon class='icon-links'  icon="hourglass-bottom"></b-icon>
                        Study
                    </router-link>
                </div>

                <div class="onHover_links">
                    <router-link class="home__link" :to="{name: 'MeditationPage'}">
                        <img class='icon-links' src="../assets/meditation-icon.svg" style="width:25px;height:25px;"/>
                        Relax
                    </router-link>
                </div>
                <b-button variant="warning" @click="logout">Logout</b-button>        
            </div>
        </div>
    </div>
</template>

<script>

import {mapState} from 'vuex'
export default({
    name:'SideBar',
    props: {
        hideSideBar: Boolean
    },
    data() {
        return{
            // hideSideBar: false,
            hideDisplay: '',
            userId: localStorage.getItem('userId'),

        }

    },
    computed: {
        ...mapState(['loggedIn']),
    },
    methods:{
        logout() {
            this.$store.dispatch('logout')
            this.$router.push({name: 'landing_page'})
        },
        
    }
})
</script>

<style>
.hide_sideBar{
    display: none;
}

.display_sideBar{
    display: block;
    visibility: visible;
}
</style>
