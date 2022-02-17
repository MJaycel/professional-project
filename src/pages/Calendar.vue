<template>
    <div id="cal">
        <div style="margin-top: 50px">
            <h2> Calendar</h2>
            <router-link :to="{name: 'home', params: userId}">Home</router-link>
        </div> 

        <calendar-view
            :show-date="showDate"
            :items= items
            class="theme-default holiday-us-traditional holiday-us-official col-10">
            <calendar-view-header
                slot="header"
                slot-scope="t"
                :header-props="t.headerProps"
                @input="setShowDate" />
        </calendar-view>            
    </div>
</template>

<script>

import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
// The next two lines are processed by webpack. If you're using the component without webpack compilation,
// you should just create <link> elements for these. Both are optional, you can create your own theme if you prefer.
require("vue-simple-calendar/static/css/default.css")
require("vue-simple-calendar/static/css/holidays-us.css")

import axios from 'axios'

export default {
    name: "Home",
    data() {
        return{
            userId: localStorage.userId,
            showDate: new Date(),
            
            //user events
            items: []
        }
    },
    components: {
        CalendarView,
        CalendarViewHeader,
    },
    mounted() {
        this.getAllEvents()
    },
    methods: {

        setShowDate(d) {
            this.showDate = d;
        },
        //////get all events
        getAllEvents() {
            axios.get(`http://localhost:3030/calendar/${this.$route.params.id}`)
                .then(response=> {
                    this.items = response.data
                    console.log('EVENTS', response.data)
                })
                .catch(error => console.log(error))     
        }
    },

}
</script>

<style>
    #cal {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        color: #2c3e50;
        height: 85vh;
        width: 90vw;
        margin-left: 1.5vw;
        /* margin-right: auto;  */
    }
</style>
