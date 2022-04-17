<template>
    <div>
        <div class="content" style="background:#A4D1A2;height:100vh;padding:0px;" :class="hideDisplay">
            <div class="d-flex justify-content-between" style="font-size:20px;padding-top:20px;">
                <p class="logo__font">FocusHub</p>
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
                <!-- <b-button variant="warning" @click="logout">Logout</b-button>         -->
            </div>

            <div class="onHover_links my-account" >
                <b-icon class='icon-links' icon="person-fill"></b-icon>
                <b-dropdown id="my-account-dropdown" dropup text="My Account" class="m-2">
                <b-dropdown-item @click="openModal">                
                    Profile Settings
                </b-dropdown-item>
                    <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                </b-dropdown>
            </div>
        </div>

        <Profile v-if="this.$store.state.showProfileSettings"/>
    </div>
</template>

<script>

import {mapState} from 'vuex'
import Profile from '@/pages/user/Profile.vue'
export default({
    name:'SideBar',
    props: {
        hideSideBar: Boolean
    },
    components: {
        Profile
    },
    data() {
        return{
            // hideSideBar: false,
            hideDisplay: '',
            userId: localStorage.getItem('userId'),
            // showProfileSettings: false

        }

    },
    computed: {
        ...mapState(['loggedIn','showProfileSettings']),
    },
    methods:{
        logout() {
            this.$store.dispatch('logout')
            this.$router.push({name: 'landing_page'})
        },
        openModal(){
            this.$store.commit('setShowProfileSettings', true)

        }
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

.content{
    display: flex;
    flex-direction: column;
}

.my-account{
    margin-top: auto;
}

#my-account-dropdown__BV_toggle_{
    background-color: transparent !important;
    color: #1D6420 !important;
    border: none !important;
    padding: 0px !important;

    font-family: 'Poppins', sans-serif;
}
#my-account-dropdown__BV_toggle_:focus{
    outline:0px !important; 
    box-shadow: none !important;
}

.profile-link{
    font-family: 'Poppins', sans-serif;
    font-size: 16px !important;
    color: black !important;
    font-weight: 400 !important;
}

.profile-link:hover{
    text-decoration: none !important;
}
</style>
