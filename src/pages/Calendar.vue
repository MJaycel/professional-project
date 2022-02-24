<template>
    <div class="container-fluid" style="padding:0px;">
        <div style="padding-top: 50px;background: #F8F2D1;" >
            <h2> Calendar</h2>
            <router-link :to="{name: 'home', params: userId}">Home</router-link>
        </div> 
        <b-alert class="m-1"
          :show="dismissCountDown"
          dismissible
          variant="success"
          @dismissed="dismissCountDown=0"
          @dismiss-count-down="countDownChanged"
        >
          Event deleted
        </b-alert>
        <div class="row no-gutters">
            <div class="col-10" >
                <calendar-view
                    :show-date="showDate"
                    :items= this.$store.state.items
                    :show-times= true
                    :time-format-options="{ hour: 'numeric', minute: '2-digit' }"
                    @click-date="clickdate"
                    @click-item='clickItem'
                    class="theme-default holiday-us-traditional holiday-us-official cal">
                    <calendar-view-header
                        slot="header"
                        slot-scope="t"
                        :header-props="t.headerProps"
                        @input="setShowDate" />
                </calendar-view>                     
            </div>

            <div class="col-2 pt-3">
                <div class="d-flex justify-content-between" style="padding-left:16px;margin-bottom: 16px;">
                    <p class="event__date" v-if="!this.dateClicked">{{this.today}}</p>
                    <p class="event__date">{{this.clickedDate}}</p>       
                    <div v-b-hover="handleHover" style="margin-right:20px;">
                        <b-icon v-if="isHovered" icon="plus-circle-fill" font-scale="2" style="color: #AA96DA" @click="showModal()"></b-icon>
                        <b-icon v-else icon="plus-circle-fill" font-scale="2" style="color: #CCC4DE"></b-icon>                             
                    </div>
                </div>
                <p  v-if="itemsFound.length < 1">you have nothing for today</p>
                <div v-for="item in itemsFound" :key="item._id">
                    <div @click="showEvent(item._id)" class="event__block"  v-b-modal.read-event>
                        <p class="event__title">{{item.title}}</p>
                        <p class="event__time">{{item.startTime}}</p>
                    </div>
                    
                </div>
            </div> 
        </div>

        <b-modal id="read-event" hide-backdrop hide-header centered hide-footer  hide-header-close content-class="shadow" >
            <div class="d-flex justify-content-between">
                <h4>{{this.event.title}}</h4> 
                <div>
                <b-icon  style="width: 20px;height: 20px; margin-right: 20px;" icon="pencil-square" @click="showEdit(event._id)"></b-icon>       
                <b-icon style="width: 20px;height: 20px;"  @click="showDelete(event._id)" icon="trash-fill"></b-icon>                            
                </div>
            </div>

            <p>{{this.event.description}}</p>
            <p v-if="this.eventEndDate === this.eventStartDate">{{this.eventStartDate}}</p>
            <p v-if="this.eventEndDate != this.eventStartDate">{{this.eventStartDate}} - {{this.eventEndDate}}</p>
            <p>{{this.event.startTime}}</p>
            <p>{{this.event.endTime}}</p>
        </b-modal>

        <b-modal id="delete-event" hide-header centered  hide-footer hide-header-close>
            <p>Are you sure you want to delete this event?</p>
            <b-button @click="hideDelete">Cancel</b-button>
            <b-button @click="deleteEvent()">Delete</b-button>
        </b-modal>


        <AddEvent v-if="showAddModal"/>
        <EditEvent v-if="showEditModal" :id='id'/>

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
import EditEvent from '@/components/EditEvent.vue'


export default {
    name: "Calendar",
    components: {
        CalendarView,
        CalendarViewHeader,
        AddEvent,
        EditEvent
    },
    data() {
        return{
            dismissSecs: 5,
            dismissCountDown: 0,
            userId: localStorage.getItem('userId'),
            showDate: new Date(),
            //user events
            dateClicked: false,
            clickedDate: '',
            dateItems: [],

            itemsFound: [],
            noItemsFound: false,
            itemid: '',
            event: {},
            eventStartDate: '',
            eventEndDate: '',

            isHovered: false,
            date: new Date(),
            today: new Date(),

            item: {
                id:""
            }
        }
    },
    computed: {
        ...mapState(['items','showAddModal','date','item_id','showEditModal'])
    },
    mounted() {
        this.$store.dispatch('getAllEvents')
        
        if(this.dateClicked === false){
            // this.today = new Date()
            this.today = this.today.toDateString().slice(0,-4).trim();
            // console.log(this.today);
        }
        this.todaysEvents()
    },
    methods: {

        handleHover(hovered) {
            this.isHovered = hovered
        },

        ...mapActions(['getAllEvents']),

        setShowDate(d) {
            this.showDate = d;
        },
        clickdate(d){
            // this.$store.commit('setShowAddModal', true)
            this.dateClicked = true
            
            this.date = new Date(d)
            this.clickedDate = this.date.toDateString().slice(0,-4).trim();
            // console.log(this.clickedDate);    
            this.$store.commit('setDate', this.date)
            this.getEventsInDate()
        },
        clickItem(originalItem){
            this.item.id = originalItem.originalItem._id
            this.showEvent(this.item.id)
            this.$bvModal.show('read-event')
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

                    this.dateItems.forEach(events => {
                        this.dates = new Date(events.startDate)
                        events.startDate = this.dates.toDateString().slice(0,-4).trim()

                        this.itemsFound = this.dateItems.filter(events => events.startDate === this.clickedDate)
                        // console.log('startDates',events.startDate)
                        if(this.itemsFound.length < 1) {
                            this.noItemsFound = true
                        }
                    });
                    console.log(this.itemsFound)
            })
            .catch(error => console.log(error))    
        },

        showModal() {
            this.$store.commit('setShowAddModal', true)
        },
        todaysEvents() {
            //get all events first
            axios.get(`http://localhost:3030/calendar/${this.$route.params.id}`)
            .then(response=> {
                this.dateItems = response.data
                    this.dateItems.forEach(events => {
                        this.dates = new Date(events.startDate)
                        events.startDate = this.dates.toDateString().slice(0,-4).trim()

                        this.itemsFound = this.dateItems.filter(events => events.startDate === this.today)
                        if(this.itemsFound.length < 1) {
                            this.noItemsFound = true
                        }
                    });
            })
            .catch(error => console.log(error))    
        },
        showEvent(id) {
            axios.get(`http://localhost:3030/calendar/event/${id}`)
            .then(response => {
                console.log('Found Event', response.data)
                this.event = response.data

                const event_start_date = new Date(response.data.startDate)
                this.eventStartDate = event_start_date.toDateString().slice(0,10)

                const event_end_date = new Date(response.data.endDate)
                this.eventEndDate = event_end_date.toDateString().slice(0,10)

                console.log(this.eventDate)

            }) 
            .catch(error => console.log(error))
        },
        showEdit(id) { 
            this.$store.commit('setShowEditModal',true)
            this.$bvModal.hide('read-event')
            this.id = id
            console.log(this.id)
        },

        showDelete(id) {
            this.id = id
            console.log(this.$route.params.id, this.id)
            this.$bvModal.show('delete-event')

            // console.log('delete')
        },
        hideDelete() {
            this.$bvModal.hide('delete-event')
        },
        deleteEvent() {
            axios.delete(`http://localhost:3030/calendar/delete/user/${this.$route.params.id}/event/${this.id}`)
            .then(response => {
                console.log('Deleted', response)

                
                this.$store.dispatch('getAllEvents')
                this.$bvModal.hide('read-event')
                this.hideDelete()
                this.showAlert()
            }) 
            .catch(error => console.log(error))
        },
        ////// Dissmissable Alert //////
        countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
        },
        showAlert() {
        this.dismissCountDown = this.dismissSecs
        },
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap');

.cal{ 
    font-family: 'Poppins', sans-serif;
    color: #2c3e50;
    height: 85vh;
    /* width: 90vw; */
    margin-left: vw;
    /* margin-right: auto;  */
}

.event__title{
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 0px !important;
}

.event__time{
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: #808080;
}

.event__block{
    height: 68px;
    padding-left: 26px;
    padding-top: 10px;
}

.event__block:hover{
    background-color: #F5F2FB;
}

.event__date{
    font-family: 'Poppins', sans-serif;
    font-size: 26px;
    font-weight: 600;
    
}
</style>
