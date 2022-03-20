<template>
    <div class="container-fluid" >
        <div class="row">
            <!-- sidebar  -->
            <div class="side__bar" style="height: 100vh;width: 65px !important;">
                <div class="mt-5 links">
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
            </div>
            <div class="col-11 mt-5" style="margin-left: 1.5em">
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
                                <div style="width: 3em;">
                                    <button
                                        style="border:none;"
                                        type="button"
                                        class="previousPeriod"
                                        aria-label="Current Period"
                                        @click.prevent="setShowDate(headerProps.previousPeriod)"
                                    >
                                    <b-icon icon="caret-left-fill" style="color:#7BC17E;margin-top:0.4em;"></b-icon>
                                    </button>
                                </div>
                                <div v-if="period === 'week'" class="cv-header button col-3 d-flex justify-content-center" style="color: #7BC17E;cursor:pointer;padding:0px;">
                                    <slot name="label">{{headerProps.periodLabel}}</slot>                            
                                   <!-- <slot name="label">Today</slot>       -->
                                </div>
                                <div v-else class="cv-header button col-2 d-flex justify-content-center" style="color: #7BC17E;cursor:pointer;padding:0px;">
                                    <slot name="label">{{headerProps.periodLabel}}</slot>                            
                                   <!-- <slot name="label">Today</slot>       -->
                                </div>
                                <div style="width: 3em;">
                                    <button
                                        style="border:none;"
                                        type="button"
                                        class="previousPeriod"
                                        aria-label="Current Period"
                                        @click.prevent="setShowDate(headerProps.nextPeriod)"
                                    >
                                    <b-icon icon="caret-right-fill" style="color:#7BC17E;margin-top:0.4em;"></b-icon>
                                    </button>
                                </div>
                                <div class="cv-header button col-3" style="cursor:pointer;"  @click.prevent="setShowDate(headerProps.currentPeriod)" >
                                    <!-- <slot name="label">{{headerProps.periodLabel}}</slot>                             -->
                                   <slot name="label">Today</slot>      
                                </div>
                            </div>
                            <div class="col-2" sty>
                                <b-form-select class="period_select" v-model="period" :options="options"></b-form-select>
                            </div>
                        </div>
                    </template>
                    <!-- <calendar-view-header
                        slot="header"
                        slot-scope="t"
                        :header-props="t.headerProps"
                        @input="setShowDate" /> -->
                </calendar-view>                
            </div>
                
            </div>

        </div>

        <b-modal id="read-event" hide-backdrop hide-header centered hide-footer  hide-header-close content-class="shadow" >
            <div class="d-flex justify-content-between">
                <div class='col'>
                    <h4 v-if="this.event.title === ''">Untitled</h4>
                    <h4>{{this.event.title}}</h4> 
                </div>
                <div class="col-3 d-flex justify-content-end">
                <b-icon  style="width: 20px;height: 20px; margin-right: 20px;" icon="pencil-square" @click="showEdit(event._id)"></b-icon>       
                <b-icon style="width: 20px;height: 20px;"  @click="showDelete(event._id)" icon="trash-fill"></b-icon>                            
                </div>
            </div>

            <p>{{this.event.description}}</p>
            <p v-if="noEndDate">{{this.eventStartDate}}</p>
            <p v-else>{{this.eventStartDate}} - {{this.eventEndDate}}</p>
            <p>{{this.event.startTime}}</p>
            <p>{{this.event.endTime}}</p>
        </b-modal>

        <b-modal id="delete-event" hide-header centered  hide-footer hide-header-close>
            <p>Are you sure you want to delete this event?</p>
            <div class="float-right">
                <b-button class="cancel__btn" @click="hideDelete">Cancel</b-button>
                <b-button class="addItem__btn" @click="deleteEvent()">Delete</b-button>
            </div>
        </b-modal>

        <b-modal v-if="event.repeat === true" id="delete-repeat-event" hide-header centered  hide-footer hide-header-close>
            <p>Delete Recurring Event</p>
            <p>All</p>
            <p>This Event</p>
            <div class="float-right">
                <b-button class="cancel__btn" @click="hideDelete">Cancel</b-button>
                <b-button class="addItem__btn" @click="deleteEvent()">delete this event</b-button>
                <b-button class="addItem__btn" @click="deleteAllEvent()">delete all event</b-button>

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
        TaskDetails
    },
    data() {
        return{
            dismissSecs: 5,
            dismissCountDown: 0,
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
            list_items: [],
            taskId : '',
            rId : ''

        }
    },
    computed: {
        ...mapState(['listId','showAddModal','date','item_id','showEditModal'])
    },
    mounted() {
        this.$store.dispatch('getAllEvents')
        this.getAllEvents()
    },
    methods: {
        ...mapActions(['getAllEvents']),

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

            // if(originalItem.originalItem.item_id != null){
            //     this.showTaskDetails(originalItem.originalItem.item_id)
            // }
            this.showEvent(this.item.id)
            this.$bvModal.show('read-event')
        this.getLists()

        },
        showEvent(id) {
            axios.get(`http://localhost:3030/calendar/event/${id}`)
            .then(response => {
                console.log('Found Event', response.data)
                this.event = response.data

                const event_start_date = new Date(response.data.startDate)
                this.eventStartDate = event_start_date.toDateString().slice(0,10)

                if(response.data.endDate != null){
                    const event_end_date = new Date(response.data.endDate)
                    this.eventEndDate = event_end_date.toDateString().slice(0,10)
                    this.noEndDate = false
                } else {
                    this.noEndDate = true
                }

                // console.log(this.eventDate)

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
            console.log(this.$route.params.id, this.id)
            if(this.event.repeat === false){
                this.$bvModal.show('delete-event')
            } else if (this.event.repeat === true) {
                this.rId = this.event.recurring_id
                this.$bvModal.show('delete-repeat-event')
            }

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
                    console.log('Lists', response.data) 
                    // this.listForm.list_title = 
                    // this.lists.filter(list => this.listForm.list_title = list.list_title)
                    Array.from(this.lists).forEach((list)=> {
                        this.list_items = list.items
                        this.list_items.filter(item => {
                            if(item._id === this.event.item_id){
                                this.item_list_id = list._id
                            }
                        })
                    })
                            console.log('list id', this.item_list_id)

                }) 
                .catch(error => console.log(error))
        },
        deleteAllEvent(){

            axios.delete(`http://localhost:3030/calendar/delete/many/user/${this.userId}/event/${this.rId}`)
            .then(response => {
                console.log('all recurring event deleted', response)
                this.$store.dispatch('getAllEvents')
                this.$bvModal.hide('delete-repeat-event')
                this.hideDelete()
                this.showAlert()
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
</style>
