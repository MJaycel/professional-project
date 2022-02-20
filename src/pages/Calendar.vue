<template>
    <div>
        <div style="padding-top: 50px;background: #F8F2D1;" >
            <h2> Calendar</h2>
            <router-link :to="{name: 'home', params: userId}">Home</router-link>
        </div> 
        <div class="row">
            <div class="col-10">
                <calendar-view
                    :show-date="showDate"
                    :items= this.$store.state.items
                    :show-times= true
                    :time-format-options="{ hour: 'numeric', minute: '2-digit' }"
                    @click-date="clickdate"
                    class="theme-default holiday-us-traditional holiday-us-official cal">
                    <calendar-view-header
                        slot="header"
                        slot-scope="t"
                        :header-props="t.headerProps"
                        @input="setShowDate" />
                </calendar-view>                     
            </div>

            <div class="col-2 pt-3">
                <p v-if="!this.dateClicked">{{this.today}}</p>
                <h3>{{this.clickedDate}}</h3>

                <div class="pt-3" v-for="item in itemsFound" :key="item._id">
                    <div style="background: yellow">
                        <h6>{{item.title}}</h6>                    
                        <p>{{item.description}}</p> 
                        <p>{{item.startTime}}</p>                        
                    </div>
                </div>
            </div> 
        </div>

        <AddEvent v-if="showAddModal"/>
    </div>
</template>

<script>

import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
// The next two lines are processed by webpack. If you're using the component without webpack compilation,
// you should just create <link> elements for these. Both are optional, you can create your own theme if you prefer.
require("vue-simple-calendar/static/css/default.css")
require("vue-simple-calendar/static/css/holidays-us.css")

import axios from 'axios'
import {mapActions, mapState} from 'vuex' 

import AddEvent from '@/components/AddEvent.vue'
export default {
    name: "Calendar",
    data() {
        return{
            userId: localStorage.getItem('userId'),
            showDate: new Date(),
            //user events
            dateClicked: false,
            clickedDate: '',
            dateItems: [],

            itemsFound: []
        }
    },
    components: {
        CalendarView,
        CalendarViewHeader,
        AddEvent
    },
    computed: {
        ...mapState(['items','showAddModal'])
    },
    mounted() {
        this.$store.dispatch('getAllEvents')
        
        if(this.dateClicked === false){
            this.today = new Date()
            this.today = this.today.toDateString().slice(0,-4).trim();
            console.log(this.today);
        }

    },
    methods: {
        ...mapActions(['getAllEvents']),

        setShowDate(d) {
            this.showDate = d;
        },
        clickdate(d){
            this.$store.commit('setShowAddModal', true)
            this.dateClicked = true
            
            this.date = new Date(d)
            this.clickedDate = this.date.toDateString().slice(0,-4).trim();
            console.log(this.clickedDate);    
            
            this.getEventsInDate()
        },
        ///// get all events 
        getAllEvents() {
            this.$store.dispatch('getAllEvents')
        },
        //////get events in date clicked
        getEventsInDate() {
            //get all events first
            axios.get(`http://localhost:3030/calendar/${this.$route.params.id}`)
            .then(response=> {
                this.dateItems = response.data
                    console.log('this is date items',this.dateItems)
                    console.log('this is the dates ',this.dateItems[0].startDate)

                    this.dateItems.forEach(events => {
                        this.dates = new Date(events.startDate)
                        events.startDate = this.dates.toDateString().slice(0,-4).trim()

                        this.itemsFound = this.dateItems.filter(events => events.startDate === this.clickedDate)
                        console.log('startDates',events.startDate)
                    });
                    console.log(this.itemsFound)
            })
            .catch(error => console.log(error))    
        }
    },

}
</script>

<style>
.cal{ 
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        color: #2c3e50;
        height: 85vh;
        /* width: 90vw; */
        margin-left: vw;
        /* margin-right: auto;  */
    }
</style>
