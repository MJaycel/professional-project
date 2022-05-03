<template>
    <div class="container-fluid" >
        <div class="row">
            <!-- sidebar  -->
            <div v-if="hideSideBar" class="col-2" style="padding:0px;">
                <SideBar :hideSideBar='hideSideBar'/>
            </div>
            <div style="font-size:26px;padding-top:10px;margin-left:8px;width:65px;">
                <b-icon @click="hideBar" icon="list" style="cursor: pointer;"></b-icon>
            </div>

            <div :class="col_class">
                <b-alert class="m-1"
                :show="dismissCountDown"
                dismissible
                variant="success"
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged()"
                >
                Event deleted
                </b-alert>
            <!-- calendar div -->
            <div>
                <calendar-view
                    :show-date="showDate"
                    :items= this.$store.state.items
                    :show-times= true
                    @click-date="clickdate"
                    :time-format-options="{ hour: 'numeric', minute: '2-digit' }"
                    :displayPeriodUom="period"
                    @click-item='clickItem'
                    class="theme-default cal">
                    <template #header="{ headerProps }">
                        <div class="row justify-content-between">
                            <div class="col row d-flex justify-content-start">
                                <div style="width:7em">
                                    <button
                                        style="border:none;background:yellow;"
                                        type="button"
                                        class="previousYear"
                                        aria-label="Current Year"
                                        @click.prevent="setShowDate(headerProps.previousYear)"
                                    >
                                    <b-icon icon="chevron-compact-left" style="color:#7BC17E;margin-top:0.4em;"></b-icon>
                                    </button>
                                    <button
                                        style="border:none;background:yellow;"
                                        type="button"
                                        class="previousPeriod"
                                        aria-label="Current Period"
                                        @click.prevent="setShowDate(headerProps.previousPeriod)"
                                    >
                                    <b-icon icon="chevron-compact-left" style="color:#7BC17E;margin-top:0.4em;"></b-icon>
                                    </button>
                                </div>
                                <div v-if="period === 'week'" class="cv-header button col-3 d-flex justify-content-center" style="color: #7BC17E;padding:0px;">
                                    <slot name="label">{{headerProps.periodLabel}}</slot>                            
                                </div>
                                <div v-else class="cv-header button col-2 d-flex justify-content-center" style="color: #7BC17E;cursor:pointer;padding:0px;">
                                    <slot name="label">{{headerProps.periodLabel}}</slot>                            
                                </div>
                                <div style="width: 7em;">
                                    <button
                                        style="border:none;"
                                        type="button"
                                        class="previousPeriod"
                                        aria-label="Current Period"
                                        @click.prevent="setShowDate(headerProps.nextPeriod)"
                                    >
                                    <b-icon icon="chevron-compact-right" style="color:#7BC17E;margin-top:0.4em;"></b-icon>
                                    </button>
                                    <button
                                        style="border:none;"
                                        type="button"
                                        class="previousYear"
                                        aria-label="Current Year"
                                        @click.prevent="setShowDate(headerProps.nextYear)"
                                    >
                                    <b-icon icon="chevron-compact-right" style="color:#7BC17E;margin-top:0.4em;"></b-icon>
                                    </button>
                                </div>
                                <div class="cv-header button col-3" style="cursor:pointer;"  @click.prevent="setShowDate(headerProps.currentPeriod)" >
                                   <slot name="label">Today</slot>      
                                </div>
                            </div>
                            <div class="col-2" sty>
                                <b-form-select class="period_select" v-model="period" :options="options"></b-form-select>
                            </div>
                        </div>
                    </template>
                </calendar-view>                
            </div>
                
            </div>

        </div>

        <b-modal id="read-event" hide-backdrop hide-header centered hide-footer  hide-header-close content-class="shadow" >
            <div class="d-flex justify-content-end">
                <div class="col-3 d-flex justify-content-end">
                <b-icon  style="width: 20px;height: 20px; margin-right: 20px;" icon="pencil-square" @click="showEdit(event._id)"></b-icon>       
                <b-icon style="width: 20px;height: 20px;"  @click="showDelete(event._id)" icon="trash-fill"></b-icon>                            
                </div>
            </div>
            <div class='col event_list_home' :class="event.classes" style="background:transparent !important;border-left:5px;border-style:solid;">
                <p class="event__title" v-if="this.event.title === ''">Untitled</p>
                <p class="event__title">{{this.event.title}}</p> 
            </div>
            <div style="padding-left:16px;">
                <!-- <p class="event__details" v-if="event.isAllDay && noEndDate === true">{{this.eventStartDate}}</p>
                <p class="event__details" v-if="!event.isAllDay">{{this.eventStartDate}}, {{this.event.startTime}}</p>
                <p class="event__details" v-if="!noEndDate">{{this.eventStartDate}}, {{this.event.startTime}} - {{this.eventEndDate}}, {{this.event.endTime}}</p> 
                <p class="event__details" v-if="this.event.repeat === true">{{this.event.recurrence_pattern.charAt(0).toUpperCase() + this.event.recurrence_pattern.slice(1)}},until {{this.occurs_until}}</p>
                <p class="event__details">{{this.event.description}}</p> -->

                <div style="margin-bottom:10px;">
                    <p class="event__details" v-if="event.isAllDay === true">{{this.eventStartDate}}</p>
                    <p class="event__details" v-if="event.isAllDay === false && event.endDate === event.startDate">{{this.eventStartDate}}, {{this.event.startTime}}</p>
                    <p class="event__details" v-if="event.isAllDay === false && event.endDate !== event.startDate">{{this.eventStartDate}}, {{this.event.startTime}} - {{this.eventEndDate}}, {{this.event.endTime}}</p>
                    <p class="event__details" v-if="event.repeat === true && event.recurrence_pattern === 'weekly'">{{this.event.recurrence_pattern.charAt(0).toUpperCase() + this.event.recurrence_pattern.slice(1)}} on {{this.occurs_until.toLocaleString('en-us', {  weekday: 'long' })}}</p>
                    <p class="event__details" v-if="event.recurrence_pattern === 'daily' || event.recurrence_pattern === 'monthly' ">{{this.event.recurrence_pattern.charAt(0).toUpperCase() + this.event.recurrence_pattern.slice(1)}}, until {{this.occurs_until.toDateString()}}</p>
                </div>

                <div>
                   <p class="event__details">{{this.event.description}}</p>
                </div>
            </div>
        </b-modal>

        <b-modal id="delete-event" hide-header centered  hide-footer hide-header-close>
            <p class="font__fam-style">Are you sure you want to delete this event?</p>
            <div class="float-right">
                <b-button class="cancel__btn" @click="$bvModal.hide('delete-event')">Cancel</b-button>
                <b-button class="addItem__btn" @click="deleteEvent()">Delete</b-button>
            </div>
        </b-modal>

        <b-modal v-if="event.repeat === true" id="delete-repeat-event" hide-header centered  hide-footer hide-header-close>
            <p class="heading_font">Delete Recurring Event</p>
            <b-form-group v-slot="{ ariaDescribedby }">
                <b-form-radio class="font__fam-style" v-model="saveOption" :aria-describedby="ariaDescribedby" name="some-radios" value="thisEvent">This Event</b-form-radio>
                <b-form-radio class="font__fam-style" v-model="saveOption" :aria-describedby="ariaDescribedby" name="some-radios" value="allEvent">All Event</b-form-radio>
            </b-form-group>

            <div class="d-flex justify-content-end">
                <p class="font__fam-style hover__link"  style="cursor:pointer;margin-left:10px;" @click="$bvModal.hide('delete-repeat-event')">cancel</p>
                <p class="font__fam-style" @click="setOption" style="cursor:pointer;color: #3A2273;margin-left:10px;">Ok</p>
            </div>


        </b-modal>
        <AddEvent v-if="showAddModal"/>
        <EditEvent v-if="showEditModal" :id='id'/>
        <TaskDetails v-if="this.$store.state.showTask" :id ='id' :list_id ='item_list_id' :alert="showAlert"/>
    </div>
</template>

<script>
import { CalendarView} from "vue-simple-calendar"
import { mapState } from "vuex"
import AddEvent from '@/components/AddEvent.vue'
import EditEvent from '@/components/EditEvent.vue'

import {mapActions} from 'vuex'
import axios from 'axios'
import TaskDetails from '@/components/TaskDetails.vue'
import SideBar from '@/components/SideBar.vue'


// require("vue-simple-calendar/static/css/default.css")
// require("vue-simple-calendar/static/css/holidays-us.css")

// CSS FOR CALENDAR
require("@/css/calendar.css")

export default ({
    name: 'Calendar',
    components: {
        CalendarView,
        // CalendarViewHeader,
        AddEvent,
        EditEvent,
        TaskDetails,
        SideBar
    },
    data() {
        return{
            dismissSecs: 5,
            dismissCountDown: 0,
            hideSideBar: false,
            hideDisplay: '',
            showDate: new Date(),

            userId: localStorage.getItem('userId'),
            period: 'month',
            options: [
                {value: 'month', text: 'Month'},
                {value: 'week', text: 'Week' },
            ],

            //  event data
            clickDate: '',
            items: [],
            offset: [
                'offset0',
                'offset1',
                'offset2',
                'offset3',
                'offset4',
                'offset5',
            ],
            item: {
                id: ''
            },
            event: {},
            noEndDate: false,
            lists: [],
            eventEndDate: '',
            eventStartDate: '',
            item_list_id: '',
            item_ids: [],
            list_items: [],
            taskId : '',
            rId : '',

            /// change col size
            col_class: '',

            occurs_until: '',

            saveOption: ''

        }
    },
    computed: {
        ...mapState(['listId','showAddModal','date','item_id','showEditModal']),
    },
    mounted() {
        this.$store.dispatch('getAllEvents')
    },
    methods: {
        ...mapActions(['getAllEvents']),
        hideBar() {
            this.hideSideBar = !this.hideSideBar

            if(this.hideSideBar){
                this.hideDisplay = 'hide_sideBar'
                this.col_class = 'col-9 mt-5'
            } else if(this.hideSideBar === false) {
                this.hideDisplay = 'display_sideBar'
                this.col_class = 'col-12'
            }
        },
        setOption(){
            if(this.saveOption === "thisEvent"){
                this.deleteEvent()
            } else if(this.saveOption === "allEvent"){
                this.deleteAllEvent()
            }
        },
        setShowDate(d) {
            this.showDate = d;
        },
        clickdate(d) {
            this.$store.commit('setShowAddModal', true)

            this.clickDate = new Date(d)
            this.$store.commit('setDate', this.clickDate)
        },
        clickItem(originalItem){
            this.item.id = originalItem.originalItem._id

            this.showEvent(this.item.id)

            this.$bvModal.show('read-event')

        },
        showEvent(id) {
            let userId = localStorage.getItem('userId')
            axios.get(`http://localhost:3030/calendar/user/${userId}/event/${id}`)
            .then(response => {
                console.log('Found Event', response.data[0].events)
                this.event = response.data[0].events

                const event_start_date = new Date(response.data[0].events.startDate)
                this.occurs_until = new Date(response.data[0].events.occurs_until)
                this.eventStartDate = event_start_date.toDateString().slice(0,10)
                // this.occurs_until = occurs_until_date.toDateString().slice(0,10)
                // this.occurs_until = occurs_until_date.toLocaleString('en-us', {  weekday: 'long' })


                if(response.data[0].events.endDate === response.data[0].events.startDate){
                    this.noEndDate = true
                } else {
                    const event_end_date = new Date(response.data[0].events.endDate)
                    this.eventEndDate = event_end_date.toDateString().slice(0,10)
                    this.noEndDate = false
                }

                this.getLists()

            }) 
            .catch(error => console.log(error))
        },
        showEdit(id) { 

            if(this.event.item_id != null){
                this.showTaskDetails(this.event.item_id)
                this.$bvModal.hide('read-event')

            } else {
                this.$store.commit('setShowEditModal',true)
                this.$bvModal.hide('read-event')
                this.id = id
                console.log(this.id)
            }
        },
        showDelete(id) {
            this.id = id
            // console.log(this.$route.params.id, this.id)
            
            if(this.event.recurring_id === "" || this.event.recurring_id === null){
                this.$bvModal.show('delete-event')

            } else if (this.event.recurring_id !== null) {
                this.rId = this.event.recurring_id
                this.$bvModal.show('delete-repeat-event')

            }
            
            if(this.event.item_id != null || this.event.item_id === ""){
                this.$bvModal.show('delete-event')
                console.log("HELLO")
            }
            // console.log('delete')
        },
        hideDelete() {
            this.$bvModal.hide('delete-event')
        },
        deleteEvent() {
            if(this.event.item_id != null){
                this.deleteTask()
            }
            axios.delete(`http://localhost:3030/calendar/delete/user/${this.userId}/event/${this.id}`)
            .then(response => {
                this.showAlert()
                console.log('Deleted', response)
                
                this.$store.dispatch('getAllEvents')
                this.$bvModal.hide('read-event')
                this.$bvModal.hide('delete-repeat-event')

                this.hideDelete()
            }) 
            .catch(error => console.log(error))
        },
        showTaskDetails(id){
            console.log('details id', id)
            console.log('show Task', this.$store.state.showTask)

            this.id = id
            this.list_id = this.item_list_id
            this.$store.commit('setShowTask', true)
            
        },
        getLists(){
            // let userId = localStorage.getItem('userID')
            //// get all lists then loop through it and find list id with the item id 
            axios.get(`http://localhost:3030/todo/${this.userId}`)
            .then(response => {
                this.lists = response.data
                console.log('LISTSS', this.lists)

                Array.from(this.lists).forEach((list)=> {

                    this.list_items = list.items
                    this.list_items.filter(item => {
                        if(item._id === this.event.item_id){
                            this.item_list_id = list._id
                            console.log('list id', this.item_list_id)
                        }
                    })
                })

            }) 
            .catch(error => console.log(error))


        },
        deleteAllEvent(){

            axios.delete(`http://localhost:3030/calendar/delete/many/user/${this.userId}/event/${this.rId}`)
            .then(response => {
                this.showAlert()
                console.log('all recurring event deleted', response)
                this.$store.dispatch('getAllEvents')
                this.$bvModal.hide('delete-repeat-event')
                this.$bvModal.hide('read-event')

                this.hideDelete()
            })
        },
        deleteTask(){
            Array.from(this.lists).forEach((list)=> {
                this.list_items = list.items
                this.list_items.filter(item => {
                    if(item._id === this.event.item_id){
                        this.item_list_id = list._id
                    }
                })
            })

            let userId = localStorage.getItem('userId')

            axios.delete(`http://localhost:3030/todo/delete/user/${userId}/list/${this.item_list_id}/item/${this.event.item_id}`)
            .then(response => {
                this.showAlert()
                console.log('Deleted', response)
                this.$store.dispatch('getAllEvents')
                this.$bvModal.hide('read-event')
                this.hideDelete()
            })
        },
        ////// Dissmissable Alert //////
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        }
    },
    // watch: {
    //     items : {
    //         handler() {
    //             this.$store.dispatch('getAllEvents')
    //         }
    //     }
    // }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap');

.period_select:focus{
    outline:0px !important; 
    box-shadow: none !important;
}

.event_class{
    background: orange !important;
}

.event_border{
    border-top: none !important;
    border-bottom: none !important;
    border-right: none !important;
    border-left: 5px solid !important;
}
.event__title{
    font-family: 'Poppins',sans-serif;
    font-size: 24px !important;
    margin-bottom: 0px;
}

.event__details{
    font-family: 'Poppins',sans-serif;
    font-size: 16px;
    margin-bottom:0px;
}
</style>
