<template>
    <div class="container pt-5">
        <h2>Welcome, You are logged in!</h2>
        <!-- <b-button @click="logout()">Logout</b-button> -->
        <router-link :to="{name: 'profile',params: {id: this.userId} }">Profile</router-link> |
        <router-link :to="{name: 'calendar',params: {id: this.userId} }">Calendar</router-link> |
        <router-link :to="{name: 'todo',params: {id: this.userId} }">To Do</router-link> |
        <router-link :to="{name: 'todo_page',params: {id: this.userId} }">TO DO PAGE</router-link> |

        <router-link :to="{name: 'MusicPlayer'}">MusicPlayer</router-link> | 
        <router-link :to="{name: 'PomodoroTimer'}">Pomodoro Timer</router-link>
        <b-button variant="warning" @click="logout()">Logout</b-button>        
    
        <p>{{quotes.content}}</p>
        <p>{{quotes.author}}</p>
        <p>{{this.$store.getters.name}}</p>
        <p>You have {{printEvent}} events today</p>
        <Clock/>
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
            const date = CURRENT_DATE.getFullYear()+'-0'+(CURRENT_DATE.getMonth()+1)+'-0'+CURRENT_DATE.getDate();

            console.log("todays date is", date)
            var numEvents = this.$store.getters.events
            var numEventLength = numEvents.length

            console.log("This is the number of events", numEvents.length)
            var counter = 0;
            var printEvent = 0;

            while( counter < numEventLength ){
                
                var stringDate = this.$store.getters.events[counter].startDate.toString()
                var result = stringDate.slice(0, 10)

                console.log("THIS IS THE RESULT",result)

                var test = date.toString()
                var anotherTest = test.slice(0, 10)
                
                console.log("THIS IS THE Anothertest",anotherTest)

                if(result == anotherTest){
                    console.log("ITS WORKING");
                    
                    printEvent++
                    console.log("printEvent is",printEvent)
                }

                counter++;
                this.printEvent = printEvent
            }

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

</style>
