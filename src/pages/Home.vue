<template>
    <div>
        <div class="container-fluid" >
            <div class="row ">
                <div class="side__bar" style="height: 100vh;width: 65px !important;">
                    <div class="mt-5 links">
                        <router-link class="home__link" :to="{name: 'profile', params: {id: this.userId}}">
                            <b-icon icon="person-fill"></b-icon>
                        </router-link>
                    </div>
                    <div class="links">
                        <router-link class="home__link" :to="{name: 'home', params: {id: this.userId}}">
                            <b-icon icon="house-door-fill"></b-icon>
                        </router-link>
                    </div>
                    <div class="links">
                        <router-link class="home__link" :to="{name: 'calendar',params: {id: this.userId} }">
                            <b-icon icon="calendar-date-fill"></b-icon>
                        </router-link>
                    </div>
                    <div class="links">
                        <router-link class="home__link" :to="{name: 'todo_page',params: {id: this.userId} }">
                            <b-icon icon="card-checklist"></b-icon>
                        </router-link>
                    </div>
                    <div class="links">
                        <router-link class="home__link" :to="{name: 'PomodoroTimer'}">
                            <b-icon icon="hourglass-bottom"></b-icon>
                        </router-link>
                    </div>

                    <div class="links">
                        <router-link class="home__link" :to="{name: 'MeditationPage'}">
                            <img src="../assets/meditation-icon.svg" style="width:25px;height:25px;"/>
                        </router-link>
                    </div>
                    <div class="links">
                        <router-link class="home__link" :to="{name: 'MusicPlayer'}">
                            <b-icon icon="headphones"></b-icon>
                        </router-link>
                    </div>

                </div>
                <div class="col-5">
                    <h1>Good day, {{this.$store.getters.name}}</h1>
                    <Clock/>
                    <p>You have {{printEvent}} events due</p>

                </div>

                <div class="col-6">
                    <p>"{{quotes.content}}"</p>
                    <p>-{{quotes.author}}</p>
                </div>
                




            </div>
        </div>
    
        <!-- <b-button @click="logout()">Logout</b-button> -->

        <b-button variant="warning" @click="logout()">Logout</b-button>        
    

    </div>
</template>


<script>
import axios from 'axios'
import Clock from '@/components/clock.vue'
import {mapState} from 'vuex'
export default {
    name: "Home",
    components:{
         Clock
    },
    data() {
        return{
            quotes:[],
            date:'',
            printEvent: '',
            userId: localStorage.getItem('userId')
        }
    },

    mounted(){

        this.getQuotes();
        this.getDate();

        console.log(this.$store.getters.name);
        console.log("events today",this.$store.getters.events);
    },
    computed: {
        ...mapState(['loggedIn'])
    },

    methods: {
        logout() {
            this.$store.dispatch('logout')
            this.$router.push({name: 'landing_page'})
        },
        
        getDate(){
            const CURRENT_DATE = new Date();
            // NOTE = had to manually add a "0" so once it gets to doube digits this will probs break
            // temporary fix btw
            const date = CURRENT_DATE.getFullYear()+'-0'+(CURRENT_DATE.getMonth()+1)+'-'+CURRENT_DATE.getDate();

            console.log("todays date is", date)
            var numEvents = this.$store.getters.events
            var numEventLength = numEvents.length
            this.printEvent = numEventLength
            var shortenLength = numEventLength - 1;

            console.log("This is the number of events", shortenLength)
            var counter = 0;
            var eventPrint = 0

            while( counter < shortenLength ){
                console.log(this.$store.getters.events)
                
                var stringDate = this.$store.getters.events[shortenLength].startDate.toString()
                var result = stringDate.slice(0, 10)

                console.log(result)

                console.log("THIS IS THE RESULT",result)

                var dateToString = date.toString()
                var slicedDate = dateToString.slice(0, 10)
                
                console.log("THIS IS THE SLICED DATE",slicedDate)

                if(result == slicedDate){
                    console.log("ITS WORKING");
                    
                    eventPrint++
                    console.log("printEvent is", eventPrint)
                }

                counter++;
                
            }
            this.printEvent = eventPrint

            // while(numEvents != 0){
            //     var test = 0
            //         if(this.$store.getters.events[test].startDate == this.date){
            //         console.log("works")
            //     }

            //     test++
            //     numEvents--
            // }
            
        },


        getQuotes(){
            axios
            .get(`https://quotable.io/random`)
            .then((response) =>{
                console.log(response)
                this.quotes = response.data
            })
            .catch(error => console.log(error))
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap');

</style>
