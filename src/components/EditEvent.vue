<template>
    <div>
        <b-modal id="edit-item" hide-footer hide-header centered hide-header-close @hide="hideModal" >
            <div class="d-flex justify-content-start" style="margin-top: 20px;">
                <!-- TITLE INPUT -->
                <b-form-input v-model="TITLE" placeholder="Add a title" class="title__input" ></b-form-input>
                 <!-- EVENT CLASSES INPUT -->
                <b-dropdown id="dropdown-1"  v-b-tooltip.hover title="Select event color" class="color-dropdown">
                    <template #button-content>
                        <p v-if="EVENT_CLASS==='ePurple'" style="margin: 0px !important;"><i style="color:#AA96DA;" class="fa-solid fa-circle"></i></p>
                        <p v-if="EVENT_CLASS==='eViolet'" style="margin: 0px !important;"><i style="color:#6F6EAD;"  class="fa-solid fa-circle"></i></p>
                        <p v-if="EVENT_CLASS==='eGreen'" style="margin: 0px !important;"><i style="color:#5EBC62;" class="fa-solid fa-circle"></i></p>
                        <p v-if="EVENT_CLASS==='eDarkGreen'" style="margin: 0px !important;"><i style="color:#278A2B;" class="fa-solid fa-circle"></i></p>
                        <p v-if="EVENT_CLASS==='eYellow'" style="margin: 0px !important;"><i style="color:#FFD74A;"  class="fa-solid fa-circle"></i></p>
                        <p v-if="EVENT_CLASS==='eOrange'" style="margin: 0px !important;"><i style="color:#F99500;"  class="fa-solid fa-circle"></i></p>
                        <p v-if="EVENT_CLASS==='eBlue'" style="margin: 0px !important;"><i style="color:#259EE2;"  class="fa-solid fa-circle"></i></p>
                        <p v-if="EVENT_CLASS==='eDarkBlue'" style="margin: 0px !important;"><i style="color:#0F5F8C;"  class="fa-solid fa-circle"></i></p>
                        <p v-if="EVENT_CLASS==='ePink'" style="margin: 0px !important;"><i style="color:#F0A1A1;"  class="fa-solid fa-circle"></i></p>
                        <p v-if="EVENT_CLASS==='eRed'" style="margin: 0px !important;"><i style="color:#F11F1F;"  class="fa-solid fa-circle"></i></p>

                    </template>
                    <div class="d-flex flex-between" style="width: 40px;">
                        <b-dropdown-item @click="(EVENT_CLASS='eGreen'),(color = '#5EBC62')" id="color-dropdown-item" value="eGreen"><i class="fa-solid fa-circle" style="color:#5EBC62;"></i></b-dropdown-item>
                        <b-dropdown-item @click="(EVENT_CLASS='eDarkGreen'),(color = '#278A2B')" id="color-dropdown-item" value="eDarkGreen"><i class="fa-solid fa-circle" style="color:#278A2B;"></i></b-dropdown-item>                        
                    </div>
                    <div class="d-flex flex-between" style="width: 40px;">
                        <b-dropdown-item @click="(EVENT_CLASS='ePurple'),(color = '#AA96DA')" id="color-dropdown-item" value="ePurple"><i class="fa-solid fa-circle" style="color:#AA96DA;"></i></b-dropdown-item>
                        <b-dropdown-item @click="(EVENT_CLASS='eViolet'),(color = '#6F6EAD')" id="color-dropdown-item" value="eViolet"><i class="fa-solid fa-circle" style="color:#6F6EAD;"></i></b-dropdown-item>                        
                    </div>
                    <div class="d-flex flex-between" style="width: 40px;">
                        <b-dropdown-item @click="(EVENT_CLASS='eYellow'),(color = '#FFD74A')" id="color-dropdown-item" value="eYellow"><i class="fa-solid fa-circle" style="color:#FFD74A;"></i></b-dropdown-item>
                        <b-dropdown-item @click="(EVENT_CLASS='eOrange'),(color = '#F99500')" id="color-dropdown-item" value="eOrange"><i class="fa-solid fa-circle" style="color:#F99500;"></i></b-dropdown-item>                        
                    </div>
                    <div class="d-flex flex-between" style="width: 40px;">
                        <b-dropdown-item @click="(EVENT_CLASS='eBlue'),(color = '#259EE2')" id="color-dropdown-item" value="eBlue"><i class="fa-solid fa-circle" style="color:#259EE2;"></i></b-dropdown-item>
                        <b-dropdown-item @click="(EVENT_CLASS='eDarkBlue'),(color = '#0F5F8C')" id="color-dropdown-item" value="eDarkBlue"><i class="fa-solid fa-circle" style="color:#0F5F8C;"></i></b-dropdown-item>                        
                    </div>
                    <div class="d-flex flex-between" style="width: 40px;">
                        <b-dropdown-item @click="(EVENT_CLASS='ePink'),(color = '#F0A1A1')" id="color-dropdown-item" value="ePink"><i class="fa-solid fa-circle" style="color:#F0A1A1;"></i></b-dropdown-item>
                        <b-dropdown-item @click="(EVENT_CLASS='eRed'),(color = '#F11F1F')" id="color-dropdown-item" value="eRed"><i class="fa-solid fa-circle" style="color:#F11F1F;"></i></b-dropdown-item>                        
                    </div>
                </b-dropdown>
            </div>
            <!-- IS ALL DAY SWITCH FORM -->
            <div class="d-flex justify-content-end mt-3" style="margin-bottom:10px;">
                <p class="font__fam" style="margin-bottom:0px;" >All day</p>
                <b-form-checkbox style="margin-left:10px;margin-right:8px;" v-model="IS_ALL_DAY" name="check-button" class="no__outline" size="lg" switch></b-form-checkbox>
            </div>
            <!-- START AND END DATE INPUTS -->
            <div class="d-flex justiy-content-between">
                <!-- IN IS_ALL_DAY IS FALSE -->
                <div v-if="IS_ALL_DAY === false" style="margin-top: 10px;">
                    <b-form-input style="width: 320px; border-radius: 4px;" v-model="START_DATE" type="date"></b-form-input>
                    <b-form-input style="width: 320px; margin-top: 16px; border-radius: 4px;" v-model="END_DATE" type="date"></b-form-input>
                </div>
                <!-- IF IS_ALL_DAY IS TRUE -->
                <div v-else style="margin-top: 10px;">
                    <b-form-input style="width: 460px; border-radius: 4px;" v-model="START_DATE" type="date"></b-form-input>
                    <b-form-input style="width: 460px; margin-top: 16px; border-radius: 4px;" v-model="END_DATE" type="date"></b-form-input>
                </div>

                <!-- IF IS_ALL_DAY IS FALSE SHOW TIME INPUTS -->
                <div v-if="IS_ALL_DAY === false" style="margin-top: 10px;">
                <b-form-input style="width: 130px; margin-left: 15px; border-radius: 4px;"  :id="`startTime`" v-model="START_TIME" type="time"></b-form-input>
                <b-form-input style="width: 130px; margin-left: 15px; margin-top: 16px; border-radius: 4px;"  :id="`endTime`" v-model="END_TIME" type="time"></b-form-input>                      
                </div>
            </div>
            <!-- REPEAT OPTIONS DROPDOWN -->
            <div class="d-flex justify-content-start mt-1">
                <p class="repeat__dropdown__texts" style="margin-bottom: 0px;margin-top:14px;">Repeat: </p>
                <b-dropdown id="repeat-options__dropdown" class="repeat__dropdown__texts mt-2" :text="selected">
                    <b-dropdown-item v-if="EVENT_DATA.repeat" disabled>Never</b-dropdown-item>
                    <b-dropdown-item v-else @click="setNever">Never</b-dropdown-item>
                    <b-dropdown-item @click="openDailyModal">Daily</b-dropdown-item>
                    <b-dropdown-item @click="openWeeklyModal">Weekly</b-dropdown-item>
                    <b-dropdown-item @click="openMonthlyModal">Monthly</b-dropdown-item>
                </b-dropdown>

            </div>
            <!-- DESCRIPTION FORM TEXT AREA -->
            <b-form-textarea class="desc__input no__outline mt-3" v-model="DESC" placeholder="Add a description"></b-form-textarea>
            <br>
            <!-- CANCEL AND SAVE BTNS -->
            <div class="d-flex justify-content-end">
                <b-button class="cancel__btn" @click="hideModal"> Cancel</b-button>
                <!-- SAVE BUTTON FOR AN EVENT THAT IS NOT A REPEATING EVENT -->
                <b-button v-if="this.EVENT_DATA.repeat === false" class="addItem__btn" @click="saveEvent"> Save</b-button>

                <!-- BUTTON FOR REPEATING EVENTS - THIS SHOWS THE OPTIONS FOR EDITING ALL EVENTS IN REPEATING SERIES OR JUST SINGLE EVENT -->
                <b-button v-else class="addItem__btn" @click="$bvModal.show('edit-repeat-event')"> Save</b-button>                

            </div>
        </b-modal>

        <!-- SET DAILY MODAL -->
        <b-modal id="daily-modal" hide-header centered hide-footer>
            <p class="repeat__heading">Repeat: Daily</p>
            <div>
                <p class="font__fam-style" style="margin:0px;">Start:</p> <b-form-input style="border-radius: 4px;" v-model="START_DATE" type="date"></b-form-input>
            </div>
            <div style="margin-top:15px;">
                <p class="font__fam-style" style="margin:0px;">Occurs Until:</p> <b-form-input style="border-radius: 4px;" v-model="DAILY_UNTIL" type="date"></b-form-input>
            </div>

            <div class="d-flex justify-content-end mt-3">
                <b-button class="cancel__btn" @click="$bvModal.hide('daily-modal')">Cancel</b-button>
                <b-button class="addItem__btn" @click="setDaily">Save</b-button>
            </div>
        </b-modal>

        <!-- SET WEEKLY MODAL -->
        <b-modal id="weekly-modal" hide-header hide-footer centered>
            <p class="repeat__heading">Repeat: Weekly</p>
            <div>
                <p class="font__fam-style" style="margin-bottom:6px;">Start:</p> <b-form-input style="border-radius: 4px;" v-model="START_DATE" type="date"></b-form-input>
            </div>
            <div style="margin-top:15px">
                <p class="font__fam-style" style="margin-bottom:6px;">Occurs Until:</p> <b-form-input style="border-radius: 4px;" v-model="WEEKLY_UNTIL" type="date"></b-form-input>
            </div>

            <div class="d-flex justify-content-end mt-3">
                <b-button class="cancel__btn" @click="$bvModal.hide('weekly-modal')">Cancel</b-button>
                <b-button class="addItem__btn" @click="setWeekly">Save</b-button>
            </div>        
        </b-modal>

        <!-- SET MONTHLY MODAL -->
        <b-modal id="monthly-modal" hide-header hide-footer centered>
            <p class="repeat__heading">Repeat: Monthly</p>
            <div>
                <p class="font__fam-style" style="margin-bottom:6px;">Start:</p> <b-form-input style="border-radius: 4px;" v-model="START_DATE" type="date"></b-form-input>
            </div>
            <div style="margin-top:15px;">
                <p class="font__fam-style" style="margin-bottom:6px;">Occurs Until:</p> <b-form-input style="border-radius: 4px;" v-model="MONTHLY_UNTIL" type="date"></b-form-input>
            </div>

            <div class="d-flex justify-content-end mt-3">
                <b-button class="cancel__btn" @click="$bvModal.hide('monthly-modal')">Cancel</b-button>
                <b-button class="addItem__btn" @click="setMonthly">Save</b-button>
            </div>         
        </b-modal>

        <!-- SAVE OPTIONS MODAL FOR REPEATING EVENTS -->
        <b-modal id="edit-repeat-event" hide-header centered  hide-footer hide-header-close>
            <p class="heading_font">Edit Recurring Event</p>

            <b-form-group v-slot="{ ariaDescribedby }">
                <b-form-radio class="font__fam-style" v-model="saveOption" :aria-describedby="ariaDescribedby" name="some-radios" value="thisEvent">This Event</b-form-radio>
                <b-form-radio class="font__fam-style" v-model="saveOption" :aria-describedby="ariaDescribedby" name="some-radios" value="allEvent">All Event</b-form-radio>
            </b-form-group>

            <div class="d-flex justify-content-end">
                <p class="font__fam-style hover__link"  style="cursor:pointer;margin-left:10px;" @click="$bvModal.hide('edit-repeat-event')">cancel</p>
                <p class="font__fam-style" @click="setOption" style="cursor:pointer;color: #3A2273;margin-left:10px;">Ok</p>
            </div>
            <!-- <div class="mt-3">Selected: <strong>{{ selected }}</strong></div> -->

        </b-modal>

        <!-- MODAL WARNING WHEN SINGLE EVENT IS EDITED IN RECURRING -->
        <b-modal id="warning-modal" hide-header centered  hide-footer hide-header-close>
            <p class="font__fam-style">If you have changed specific events in the series, your changes will be canceled and the events will match the series again</p>
            <div class="float-right">
                <b-button class="cancel__btn" @click="$bvModal.hide('warning-modal')">Cancel</b-button>
                <b-button class="addItem__btn" @click="editAllEvent">Save</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>

import axios from 'axios'
import {mapState, mapActions} from 'vuex'

export default {
    name: "AddEvent",  
    props: {
        id: String
        
    },
    components:{
    },
    data() {
        return{
            /// GETTING USER ID FROM LOCAL STORAGE
            userId: localStorage.getItem('userId'),
            EVENT_DATA: {},
            RECURRING_EVENTS: [],
            //// FORM
            form: {
                title: "",
                description: "",
                startDate: "",
                endDate: "",
                startTime: "",
                endTime: "",
                classes: "",
                repeat: false,
                recurring_id: "",
                recurrence_pattern: '',
                isAllDay: false,
                occurs_until: ''
            },
            //// V-MODELS FOR FORM
            TITLE: '',
            DESC: '',
            START_DATE: '',
            END_DATE: '',
            START_TIME: '',
            END_TIME: '',
            EVENT_CLASS: '',
            IS_REPEAT: false,
            RECURRING_ID: '',
            RECURRENCE_PATTERN: '',
            IS_ALL_DAY: false,
            OCCURS_UNTIL: '',
            
            //// DEFAULT VALUES
            DEFAULT_START_TIME: '08:00',
            DEFAULT_END_TIME: '09:00',

            /// DROPDOWN OPTIONS
            selected: '',

            // END DATE SELECTION FOR REPEAT EVENT
            DAILY_UNTIL: '',
            WEEKLY_UNTIL: '',
            MONTHLY_UNTIL: '',
            difference: '',

            /// ALL EVENTS IN DATE ARRAY
            EVENTS_IN_DATE: [],
            EVENTS_IN_DATE_IDS: '',

            // Radio
            saveOption: ''


        }
    },
    computed: {
        ...mapState(['showEditModal'])
    },
    mounted() {
        this.getData()
        this.$bvModal.show('edit-item')
    },
    methods: {
        ...mapActions(['getAllEvents']),
        //// HIDE MODAL
        hideModal() {
            this.$bvModal.hide('edit-item')
            this.$store.commit('setShowEditModal', false)
        },
        /// GET EVENT DATA AND FILLS IN THE FORM
        getData(){
            axios.get(`http://localhost:3030/calendar/user/${this.userId}/event/${this.id}`)
            .then(response => {
                console.log('Found Event', response.data[0].events)
                    this.EVENT_DATA = response.data[0].events
                    this.TITLE = response.data[0].events.title
                    this.DESC = response.data[0].events.description
                    this.START_DATE = response.data[0].events.startDate
                    this.END_DATE = response.data[0].events.endDate
                    this.START_TIME = response.data[0].events.startTime
                    this.END_TIME = response.data[0].events.endTime
                    this.EVENT_CLASS = response.data[0].events.classes
                    this.IS_REPEAT = response.data[0].events.repeat
                    this.RECURRING_ID = response.data[0].events.recurring_id
                    this.RECURRENCE_PATTERN = response.data[0].events.recurrence_pattern
                    this.IS_ALL_DAY = response.data[0].events.isAllDay
                    this.OCCURS_UNTIL = response.data[0].events.occurs_until

                    this.START_DATE = this.START_DATE.slice(0,10)
                    this.END_DATE = this.END_DATE.slice(0,10)

                    /// set first letter of string to uppercase
                    if(this.RECURRENCE_PATTERN === null || this.RECURRENCE_PATTERN === ""){
                        this.selected = "Never"
                    } else{
                        this.selected = this.RECURRENCE_PATTERN.charAt(0).toUpperCase() + this.RECURRENCE_PATTERN.slice(1)
                    }
                    console.log('title',this.OCCURS_UNTIL)
            }) 
            .catch(error => console.log(error))
        },
        // SAVE EVENT 
        saveEvent(){
            if(this.selected === "Daily"){
                this.createDaily()
            }
            if(this.selected === "Weekly"){
                this.createWeekly()
            }
            if(this.selected === "Monthly"){
                this.createMonthly()
            }
            if(this.selected === "Never"){
                this.setForm()
                this.postEdit()
            }
            // this.postEdit()
        },
        // SAVE OPTIONS FOR REPEATING EVENTS
        // saveOptions(){
        //     console.log('Show save options')
        //     this.$bvModal.show('edit-repeat-event')

        // },
        setOption(){
            if(this.saveOption === "thisEvent"){
                this.editThisEvent()
            } else if(this.saveOption === "allEvent"){
                this.$bvModal.show('warning-modal')
            }
        },
        setForm(){
            let newStartDate;
            let newEndDate;
            
            const date_start = new Date(this.START_DATE)
            // date_start.setHours(hours_start, minutes_start)
            if(this.IS_ALL_DAY){
                newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate()))
            }else{
                const userInputStart = this.START_TIME

                //setting start time
                const hours_start = userInputStart.slice(0,2)
                const minutes_start = userInputStart.slice(3)
                newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate(),hours_start,minutes_start))
            }

            this.form.startDate = newStartDate

            /// setting end date 
            if(this.END_DATE !== this.START_DATE){
                
                const date_end = new Date(this.END_DATE)
                // date_end.setHours(hours_end, minutes_end)
                if(this.IS_ALL_DAY || this.END_TIME === null || this.END_TIME === ""){                                    
                    newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate()))
                } else{
                    const userInputEnd = this.END_TIME

                    const hours_end = userInputEnd.slice(0,2)
                    const minutes_end = userInputEnd.slice(3)
        
                    newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate(),hours_end,minutes_end))
                }
                this.form.endDate = newEndDate
                console.log(this.form.endDate)
            } else {
                this.form.endDate = newStartDate
            }

            this.RECURRENCE_PATTERN = this.selected.charAt(0).toLowerCase() + this.selected.slice(1)

            this.form.title = this.TITLE
            this.form.description = this.DESC
            // this.form.startTime = this.START_TIME
            // this.form.endTime = this.END_TIME
            this.form.classes = this.EVENT_CLASS
            this.form.repeat = this.IS_REPEAT
            this.form.recurring_id = this.RECURRING_ID
            this.form.recurrence_pattern = this.RECURRENCE_PATTERN
            this.form.isAllDay = this.IS_ALL_DAY
            this.form.occurs_until = this.OCCURS_UNTIL

            if(this.IS_ALL_DAY){
                this.form.endTime = null
                this.form.startTime = null
            } else {
                this.form.startTime = this.START_TIME  

                if(this.END_TIME === "" || this.END_TIME === null){
                    this.form.endTime = this.START_TIME
                } else {
                    this.form.endTime = this.END_TIME
                }
            }

        },

        postEdit() {
            axios.post(`http://localhost:3030/calendar/edit/event/${this.id}` , this.form )
            .then(response => {
                console.log("NEW EVENTS",response.data)
                // "refreshes" the calendar and shows new event that was added
                this.$store.dispatch('getAllEvents')
                this.$store.commit('setShowEditModal', false)
                this.$bvModal.hide('edit-item')

                console.log('form',this.form)
            })
            .catch(error => console.log(error))     

        },
        createRepeatingEvent(){
            this.setForm()

            axios.post(`http://localhost:3030/calendar/add/event/${this.userId}` , this.form )
            .then(response => {
                console.log("NEW EVENTS",response.data.events)
                // "refreshes" the calendar and shows new event that was added
                this.$store.dispatch('getAllEvents')
                this.$store.commit('setShowEditModal', false)
                this.$bvModal.hide('edit-item')
            })
        },
        createDaily(){
            /// delete this event and create new with the recurring id
            this.deleteEvent(this.id)

            this.RECURRING_ID = "e" + Math.random().toString(36).substr(2, 10)

            this.createRepeatingEvent()
            
            for(let i = 0; i < this.difference; i++){
                let newStartDate;

                const date_start = new Date(this.form.startDate)
                date_start.setDate(date_start.getDate() + 1)
                if(this.IS_ALL_DAY){
                    newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate()))
                }else{
                    const userInputStart = this.START_TIME

                    const hours_start = userInputStart.slice(0,2)
                    const minutes_start = userInputStart.slice(3)
                    newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate(),hours_start,minutes_start))
                }
                this.form.startDate = newStartDate

                let newEndDate;

                const date_end = new Date(this.form.endDate)
                date_end.setDate(date_end.getDate() + 1)

                if(this.IS_ALL_DAY || this.END_TIME === null || this.END_TIME === ""){                        
                    newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate()))
                }else{
                    const userInputEnd = this.END_TIME

                    const hours_end = userInputEnd.slice(0,2)
                    const minutes_end = userInputEnd.slice(3)
                    newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate(),hours_end,minutes_end))
                }
                this.form.endDate = newEndDate

                axios.post(`http://localhost:3030/calendar/add/event/${this.userId}` , this.form )
                .then(response => {
                    console.log("NEW EVENTS",response.data.events)
                    // "refreshes" the calendar and shows new event that was added
                    this.$store.dispatch('getAllEvents')
                    this.$store.commit('setShowEditModal', false)
                    this.$bvModal.hide('edit-item')
                })
                console.log(this.form.recurring_id)
            }
        },
        createWeekly(){
            /// delete this event and create new with the recurring id
            this.deleteEvent(this.id)

            this.RECURRING_ID = "e" + Math.random().toString(36).substr(2, 10)

            this.createRepeatingEvent()
            
            for(let i = 0; i < this.difference; i++){
                
                let newStartDate;

                const date_start = new Date(this.form.startDate)
                date_start.setDate(date_start.getDate() + 7)
                if(this.IS_ALL_DAY){
                    newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate()))
                }else{
                    const userInputStart = this.START_TIME

                    const hours_start = userInputStart.slice(0,2)
                    const minutes_start = userInputStart.slice(3)
                    newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate(),hours_start,minutes_start))
                }
                this.form.startDate = newStartDate

                let newEndDate;

                const date_end = new Date(this.form.endDate)
                date_end.setDate(date_end.getDate() + 7)

                if(this.IS_ALL_DAY || this.END_TIME === null || this.END_TIME === ""){                        
                    newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate()))
                }else{
                    const userInputEnd = this.END_TIME

                    const hours_end = userInputEnd.slice(0,2)
                    const minutes_end = userInputEnd.slice(3)
                    newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate(),hours_end,minutes_end))
                }
                this.form.endDate = newEndDate

                axios.post(`http://localhost:3030/calendar/add/event/${this.userId}` , this.form )
                .then(response => {
                    console.log("NEW EVENTS",response.data.events)
                    // "refreshes" the calendar and shows new event that was added
                    this.$store.dispatch('getAllEvents')
                    this.$store.commit('setShowEditModal', false)
                    this.$bvModal.hide('edit-item')
                })
                console.log(this.form.recurring_id)
            }
        },
        createMonthly() {
            /// delete this event and create new with the recurring id
            this.deleteEvent(this.id)

            this.RECURRING_ID = "e" + Math.random().toString(36).substr(2, 10)

            // this.createRepeatingEvent()
            for(let i = 0; i < this.difference + 1; i++){
                ////setting start date
                let newStartDate;

                const date_start = new Date(this.START_DATE)
                if(this.IS_ALL_DAY){
                    newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate()))
                }else{
                    const userInputStart = this.START_TIME

                    const hours_start = userInputStart.slice(0,2)
                    const minutes_start = userInputStart.slice(3)
                    newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate(),hours_start,minutes_start))
                }
                newStartDate.setUTCMonth(newStartDate.getUTCMonth() + i)
                this.form.startDate = newStartDate

                let newEndDate;

                const date_end = new Date(this.END_DATE)
                if(this.IS_ALL_DAY || this.END_TIME === null || this.END_TIME === ""){                        
                    newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate()))
                }else{
                    const userInputEnd = this.END_TIME

                    const hours_end = userInputEnd.slice(0,2)
                    const minutes_end = userInputEnd.slice(3)
                    newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate(),hours_end,minutes_end))
                }
                newEndDate.setUTCMonth(newEndDate.getUTCMonth() + i)
                this.form.endDate = newEndDate

                this.RECURRENCE_PATTERN = this.selected.charAt(0).toLowerCase() + this.selected.slice(1)

                this.form.title = this.TITLE
                this.form.description = this.DESC
                this.form.classes = this.EVENT_CLASS
                this.form.repeat = this.IS_REPEAT
                this.form.recurring_id = this.RECURRING_ID
                this.form.recurrence_pattern = this.RECURRENCE_PATTERN
                this.form.isAllDay = this.IS_ALL_DAY
                this.form.occurs_until = this.OCCURS_UNTIL

                if(this.IS_ALL_DAY){
                    this.form.endTime = null
                    this.form.startTime = null
                } else {
                    this.form.startTime = this.START_TIME  

                    if(this.END_TIME === "" || this.END_TIME === null){
                        this.form.endTime = this.START_TIME
                    } else {
                        this.form.endTime = this.END_TIME
                    }
                }

                axios.post(`http://localhost:3030/calendar/add/event/${this.userId}` , this.form )
                .then(response => {
                    console.log("NEW EVENTS",response.data.events)
                    // "refreshes" the calendar and shows new event that was added
                    this.$store.dispatch('getAllEvents')
                    this.$store.commit('setShowEditModal', false)
                    this.$bvModal.hide('edit-item')
                })
                console.log(this.form.recurring_id)            
            }
        },

        /// EDIT ONE EVENT IN RECURRING SERIES
        editThisEvent(){
            if(this.EVENT_DATA.recurrence_pattern !== 'weekly' && this.selected === "Weekly"){
                this.createWeekly()
            } else if(this.EVENT_DATA.recurrence_pattern !== 'daily' && this.selected === "Daily"){
                this.createDaily()
            } else if(this.EVENT_DATA.recurrence_pattern !== 'monthly' && this.selected === "Monthly") {
                this.createMonthly()
             }else {
                this.setForm()
                this.postEdit()
            }
        },
        editAllEvent(){
            // filter events and get all events that has the same recurring ID
            this.RECURRING_EVENTS= this.$store.state.items.filter(item => item.recurring_id === this.RECURRING_ID)

            let startDatesArray = []; 
            let endDatesArray = []; 
            let EVENT_START_DATE;
            let EVENT_END_DATE;
            let all_start_dates; 
            let all_end_dates;
            let diffInDays;
            let diffInEndDates;

            EVENT_START_DATE = this.EVENT_DATA.startDate.slice(0,10)
            EVENT_END_DATE = this.EVENT_DATA.endDate.slice(0,10)

            // loop through all events and submit form
            for(let i = 0; i < this.RECURRING_EVENTS.length; i++){

                /// get all start dates and end dates of all recurring events with same rId
                /// then push into the startDatesArray and endDatesArray
                all_start_dates = this.RECURRING_EVENTS[i].startDate
                all_end_dates = this.RECURRING_EVENTS[i].endDate

                startDatesArray.push(all_start_dates)
                endDatesArray.push(all_end_dates)

                /// Compare START_DATE && END_DATE (date input) with the events original dates
                /// if different get the difference between two dates
                if(this.START_DATE != EVENT_START_DATE){
                    var date1 = new Date(this.START_DATE)
                    var date2 = new Date(EVENT_START_DATE)
        
                    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
                    diffInDays = Math.floor((date1 - date2) / _MS_PER_DAY);
                } else {
                    diffInDays = 0;
                }

                if(this.END_DATE != EVENT_END_DATE){
                    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
                    var date3 = new Date(this.END_DATE)
                    var date4 = new Date(EVENT_END_DATE)
        
                    diffInEndDates = Math.floor((date3 - date4) / _MS_PER_DAY);
                } else {
                    diffInEndDates = 0;
                }
            }

            // If event original recurrence pattern is not weekly and user changes recurrence to weekly
            // All original recurrence series are deleted and weekly events are created
            if(this.EVENT_DATA.recurrence_pattern !== "weekly" && this.selected === "Weekly"){
                let rId;
                rId = this.EVENT_DATA.recurring_id

                axios.delete(`http://localhost:3030/calendar/delete/many/user/${this.userId}/event/${rId}`)
                .then(response => {
                    console.log('all recurring event deleted', response)
                })
                .catch(error => console.log(error))

                this.createWeekly()
            } 
            // else if data was originally weekly and selected recurrence pattern is still weekly
            // if start date or end date is changed the existing weekly series is edited
            else if(this.EVENT_DATA.recurrence_pattern === "weekly" && this.selected === "Weekly"){
                for(let i = 0; i < startDatesArray.length; i++){
                    startDatesArray[i] = new Date(startDatesArray[i]);
                    let newFormStartDate = startDatesArray[i].setDate(startDatesArray[i].getDate() + diffInDays)
    
                    const date_start = new Date(newFormStartDate)
                    if(this.IS_ALL_DAY){
                        var updatedFormStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate()))
                    } else {
                        const userInputStart = this.START_TIME
    
                        //setting start time
                        const hours_start = userInputStart.slice(0,2)
                        const minutes_start = userInputStart.slice(3)
                        updatedFormStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate(),hours_start,minutes_start)) 
    
                    }
                    this.form.startDate = updatedFormStartDate
    
                    let newFormEndDate;
                    endDatesArray[i] = new Date(endDatesArray[i]);
                    newFormEndDate = endDatesArray[i].setDate(endDatesArray[i].getDate() + diffInEndDates)
    
                    const date_end = new Date(newFormEndDate)
                    if(this.IS_ALL_DAY || this.END_TIME === null || this.END_TIME === ""){                        
                        var updatedFormEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate()))
                    } else {
                        const userInputEnd = this.END_TIME
    
                        //setting start time
                        const hours_end = userInputEnd.slice(0,2)
                        const minute_end = userInputEnd.slice(3)
                        updatedFormEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate(),hours_end,minute_end)) 
                    }
    
                    if(this.END_DATE === this.START_DATE){
                        this.form.endDate = this.form.startDate
                    } else {
                        this.form.endDate = updatedFormEndDate
                    }
    
                    this.form.title = this.TITLE
                    this.form.description = this.DESC
                    this.form.classes = this.EVENT_CLASS
                    this.form.repeat = this.IS_REPEAT
                    this.form.recurring_id = this.RECURRING_ID
                    this.form.recurrence_pattern = this.RECURRENCE_PATTERN
                    this.form.isAllDay = this.IS_ALL_DAY
                    this.form.occurs_until = this.OCCURS_UNTIL

                    if(this.IS_ALL_DAY){
                        this.form.endTime = null
                        this.form.startTime = null
                    } else {
                        this.form.startTime = this.START_TIME  

                        if(this.END_TIME === "" || this.END_TIME === null){
                            this.form.endTime = this.START_TIME
                        } else {
                            this.form.endTime = this.END_TIME
                        }
                    }

                    var id = this.RECURRING_EVENTS[i]._id
    
                    axios.post(`http://localhost:3030/calendar/edit/event/${id}` , this.form )
                    .then(response => {
                        console.log("NEW EVENTS",response.data)
                        // "refreshes" the calendar and shows new event that was added
                        this.$store.dispatch('getAllEvents')
                        this.$store.commit('setShowEditModal', false)
                        this.$bvModal.hide('edit-item')
                    })
                    .catch(error => console.log(error))
                }     
            }

            if(this.EVENT_DATA.recurrence_pattern !== "daily" && this.selected === "Daily"){
                /// if changing from weekly/monthly to daily , all weekly recurring event with the same Reccuring id will be deleted and new the 
                /// new daily recurring event is created 
                let rId;

                rId = this.EVENT_DATA.recurring_id

                console.log("RID", rId)

                axios.delete(`http://localhost:3030/calendar/delete/many/user/${this.userId}/event/${rId}`)
                .then(response => {
                    console.log('all recurring event deleted', response)
                }) 
                .catch (error => { console.log(error)})
                this.createDaily()
            } 
            else if(this.EVENT_DATA.recurrence_pattern === "daily" && this.selected === "Daily"){
                // if start date is changed get the original start and the new start date and get difference in date
                if(this.START_DATE != EVENT_START_DATE){

                    if(diffInDays > 1){
                        let dateArray = [];
                        let currentDate = new Date(EVENT_START_DATE);

                        // Get dates between og startdate and new start date
                        while (currentDate <= new Date(this.START_DATE)) {
                            dateArray.push(new Date(currentDate));
                            // Use UTC date to prevent problems with time zones and DST
                            currentDate.setUTCDate(currentDate.getUTCDate() + 1);
                        }

                        // Push all events that has the start dare that is the dateArray
                        // All this events will be deleted
                        let EVENTS_IN_DATE = []
                        for(let j = 0; j < dateArray.length-1; j++){
                            
                            let eventsArray = this.RECURRING_EVENTS.filter(item => item.startDate.slice(0,10) === dateArray[j].toISOString().slice(0,10))
                            EVENTS_IN_DATE.push(eventsArray[0])

                            axios.delete(`http://localhost:3030/calendar/delete/user/${this.userId}/event/${EVENTS_IN_DATE[j]._id}`)
                            .then(response => {
                                console.log('Deleted', response)
                                this.$store.dispatch('getAllEvents')
                                this.$bvModal.hide('warning-modal')
                                this.$bvModal.hide('edit-repeat-event')
                                this.$bvModal.hide('edit-item')
                            }) 
                            .catch(error => console.log(error))
                        }

                    }else {
                    this.deleteEvent(this.EVENT_DATA._id)
                    }
                } else if(this.START_DATE === EVENT_START_DATE) {
                    for(let i = 0; i < this.RECURRING_EVENTS.length; i++){
                        const date_start = new Date(startDatesArray[i])
                        if(this.IS_ALL_DAY){
                            updatedFormStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate()))
                        } else {
                            const userInputStart = this.START_TIME
        
                            //setting start time
                            const hours_start = userInputStart.slice(0,2)
                            const minutes_start = userInputStart.slice(3)
                            updatedFormStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate(),hours_start,minutes_start)) 
        
                        }
                        this.form.startDate = updatedFormStartDate
        
                        let newFormEndDate;
                        endDatesArray[i] = new Date(endDatesArray[i]);
                        newFormEndDate = endDatesArray[i].setDate(endDatesArray[i].getDate() + diffInEndDates)
                        const date_end = new Date(newFormEndDate)
                        if(this.IS_ALL_DAY || this.END_TIME === null || this.END_TIME === ""){                        
                            updatedFormEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate()))
                        } else {
                            const userInputEnd = this.END_TIME
        
                            //setting start time
                            const hours_end = userInputEnd.slice(0,2)
                            const minute_end = userInputEnd.slice(3)
                            updatedFormEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate(),hours_end,minute_end)) 
                        }
        
                        if(this.END_DATE === this.START_DATE){
                            this.form.endDate = this.form.startDate
                        } else {
                            this.form.endDate = updatedFormEndDate
                        }
        
                        if(this.IS_ALL_DAY){
                            this.form.endTime = null
                            this.form.startTime = null
                        } else {
                            this.form.startTime = this.START_TIME  

                            if(this.END_TIME === "" || this.END_TIME === null){
                                this.form.endTime = this.START_TIME
                            } else {
                                this.form.endTime = this.END_TIME
                            }
                        }

                        this.form.title = this.TITLE
                        this.form.description = this.DESC
                        this.form.classes = this.EVENT_CLASS
                        this.form.repeat = this.IS_REPEAT
                        this.form.recurring_id = this.RECURRING_ID
                        this.form.recurrence_pattern = this.RECURRENCE_PATTERN
                        this.form.isAllDay = this.IS_ALL_DAY

                        if(this.DAILY_UNTIL !== this.EVENT_DATA.occurs_until){
                            console.log('occurs until not the same')
                            let dateArray = [];

                            if(this.DAILY_UNTIL <= this.EVENT_DATA.occurs_until){
                                let currentDate = new Date(this.DAILY_UNTIL);
                                currentDate.setDate(currentDate.getDate() + 1)
                                let oldOccursUntil = new Date(this.OCCURS_UNTIL)
                                oldOccursUntil.setDate(oldOccursUntil.getDate() + 1)

                                // Get dates between og startdate and new start date
                                while (currentDate <= oldOccursUntil) {
                                    dateArray.push(new Date(currentDate));
                                    // Use UTC date to prevent problems with time zones and DST
                                    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
                                }
                                // Push all events that has the start dare that is the dateArray
                                // All this events will be deleted
                                let EVENTS_IN_DATE = []

                                for(let j = 0; j < dateArray.length-1; j++){
                                    
                                    let eventsArray = this.RECURRING_EVENTS.filter(item => item.startDate.slice(0,10) === dateArray[j].toISOString().slice(0,10))
                                    EVENTS_IN_DATE.push(eventsArray[0])

                                    console.log('current Date', EVENTS_IN_DATE)

                                    axios.delete(`http://localhost:3030/calendar/delete/user/${this.userId}/event/${EVENTS_IN_DATE[j]._id}`)
                                    .then(response => {
                                        console.log('Deleted', response)
                                    }) 
                                    .catch(error => console.log(error))
                                }
                            } 
                        } 
                        this.form.occurs_until = this.OCCURS_UNTIL

                        axios.post(`http://localhost:3030/calendar/edit/event/${this.RECURRING_EVENTS[i]._id}` , this.form )
                        .then(response => {
                            console.log("NEW EVENTS",response.data)
                            // "refreshes" the calendar and shows new event that was added
                            this.$store.dispatch('getAllEvents')
                            this.$store.commit('setShowEditModal', false)
                            this.$bvModal.hide('edit-item')
    
                            console.log('form',this.form)
                        })
                        .catch(error => console.log(error))     
                    }
                }
            }

            if(this.EVENT_DATA.recurrence_pattern !== "monthly" && this.selected === "Monthly"){
                /// if changing from weekly/monthly to daily , all weekly recurring event with the same Reccuring id will be deleted and new the 
                /// new daily recurring event is created 
                let rId;

                rId = this.EVENT_DATA.recurring_id

                console.log("RID", rId)

                axios.delete(`http://localhost:3030/calendar/delete/many/user/${this.userId}/event/${rId}`)
                .then(response => {
                    console.log('all recurring event deleted', response)
                })
                .catch(error => console.log(error))

                this.createMonthly()
            } else if(this.EVENT_DATA.recurrence_pattern === "monthly" && this.selected === "Monthly"){
                // if start date is changed get the original start and the new start date and get difference in date
                if(this.START_DATE != EVENT_START_DATE){
                    for(let i = 0; i < startDatesArray.length; i++){
                        startDatesArray[i] = new Date(startDatesArray[i]);
                        let newFormStartDate = startDatesArray[i].setDate(startDatesArray[i].getDate() + diffInDays)
        
                        const date_start = new Date(newFormStartDate)
                        if(this.IS_ALL_DAY){
                            updatedFormStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate()))
                        } else {
                            const userInputStart = this.START_TIME
        
                            //setting start time
                            const hours_start = userInputStart.slice(0,2)
                            const minutes_start = userInputStart.slice(3)
                            updatedFormStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate(),hours_start,minutes_start)) 
        
                        }
                        this.form.startDate = updatedFormStartDate
        
                        let newFormEndDate;
                        endDatesArray[i] = new Date(endDatesArray[i]);
                        newFormEndDate = endDatesArray[i].setDate(endDatesArray[i].getDate() + diffInEndDates)
        
                        const date_end = new Date(newFormEndDate)
                        if(this.IS_ALL_DAY || this.END_TIME === null || this.END_TIME === ""){                        
                            updatedFormEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate()))
                        } else {
                            const userInputEnd = this.END_TIME
        
                            //setting start time
                            const hours_end = userInputEnd.slice(0,2)
                            const minute_end = userInputEnd.slice(3)
                            updatedFormEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate(),hours_end,minute_end)) 
                        }
        
                        if(this.END_DATE === this.START_DATE){
                            this.form.endDate = this.form.startDate
                        } else {
                            this.form.endDate = updatedFormEndDate
                        }
        
                        this.form.title = this.TITLE
                        this.form.description = this.DESC
                        this.form.classes = this.EVENT_CLASS
                        this.form.repeat = this.IS_REPEAT
                        this.form.recurring_id = this.RECURRING_ID
                        this.form.recurrence_pattern = this.RECURRENCE_PATTERN
                        this.form.isAllDay = this.IS_ALL_DAY
                        this.form.occurs_until = this.OCCURS_UNTIL

                        if(this.IS_ALL_DAY){
                            this.form.endTime = null
                            this.form.startTime = null
                        } else {
                            this.form.startTime = this.START_TIME  

                            if(this.END_TIME === "" || this.END_TIME === null){
                                this.form.endTime = this.START_TIME
                            } else {
                                this.form.endTime = this.END_TIME
                            }
                        }
                        console.log(this.form.startDate)
                        axios.post(`http://localhost:3030/calendar/edit/event/${this.RECURRING_EVENTS[i]._id}` , this.form )
                        .then(response => {
                            console.log("NEW EVENTS",response.data)
                            // "refreshes" the calendar and shows new event that was added
                            this.$store.dispatch('getAllEvents')
                            this.$store.commit('setShowEditModal', false)
                            this.$bvModal.hide('edit-item')
                        })
                        .catch(error => console.log(error))
                    }
                } else if(this.START_DATE === EVENT_START_DATE) {
                    for(let i = 0; i < this.RECURRING_EVENTS.length; i++){
                        const date_start = new Date(startDatesArray[i])
                        if(this.IS_ALL_DAY){
                            updatedFormStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate()))
                        } else {
                            const userInputStart = this.START_TIME
        
                            //setting start time
                            const hours_start = userInputStart.slice(0,2)
                            const minutes_start = userInputStart.slice(3)
                            updatedFormStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate(),hours_start,minutes_start)) 
        
                        }
                        this.form.startDate = updatedFormStartDate
        
                        let newFormEndDate;
                        endDatesArray[i] = new Date(endDatesArray[i]);
                        newFormEndDate = endDatesArray[i].setDate(endDatesArray[i].getDate() + diffInEndDates)
                        const date_end = new Date(newFormEndDate)
                        if(this.IS_ALL_DAY || this.END_TIME === null || this.END_TIME === ""){                        
                            updatedFormEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate()))
                        } else {
                            const userInputEnd = this.END_TIME
        
                            //setting start time
                            const hours_end = userInputEnd.slice(0,2)
                            const minute_end = userInputEnd.slice(3)
                            updatedFormEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate(),hours_end,minute_end)) 
                        }
        
                        if(this.END_DATE === this.START_DATE){
                            this.form.endDate = this.form.startDate
                        } else {
                            this.form.endDate = updatedFormEndDate
                        }
        
                        if(this.IS_ALL_DAY){
                            this.form.endTime = null
                            this.form.startTime = null
                        } else {
                            this.form.startTime = this.START_TIME  

                            if(this.END_TIME === "" || this.END_TIME === null){
                                this.form.endTime = this.START_TIME
                            } else {
                                this.form.endTime = this.END_TIME
                            }
                        }

                        this.form.title = this.TITLE
                        this.form.description = this.DESC
                        this.form.classes = this.EVENT_CLASS
                        this.form.repeat = this.IS_REPEAT
                        this.form.recurring_id = this.RECURRING_ID
                        this.form.recurrence_pattern = this.RECURRENCE_PATTERN
                        this.form.isAllDay = this.IS_ALL_DAY
                        this.form.occurs_until = this.OCCURS_UNTIL

                        axios.post(`http://localhost:3030/calendar/edit/event/${this.RECURRING_EVENTS[i]._id}` , this.form )
                        .then(response => {
                            console.log("NEW EVENTS",response.data)
                            // "refreshes" the calendar and shows new event that was added
                            this.$store.dispatch('getAllEvents')
                            this.$store.commit('setShowEditModal', false)
                            this.$bvModal.hide('edit-item')
    
                            console.log('form',this.form)
                        })
                        .catch(error => console.log(error))     
                    }
                }
            }
        },
        // SET REPEAT OPTIONS
        setNever(){
            this.selected = "Never"
            this.IS_REPEAT = false
        },
        // DAILY MODAL AND SET DIFFERENCE
        openDailyModal(){

            /// get start date and add 4 months as default
            if(this.OCCURS_UNTIL === null || this.OCCURS_UNTIL === "" || this.EVENT_DATA.recurrence_pattern !== 'daily'){
                const addFourMonths = new Date(this.START_DATE)
                addFourMonths.setMonth(addFourMonths.getMonth() + 4)
    
                this.DAILY_UNTIL = addFourMonths.toISOString().slice(0,10)
            } else {
                this.DAILY_UNTIL = this.OCCURS_UNTIL.slice(0,10)
            }

            this.$bvModal.show('daily-modal')
            
        },
        setDaily() {
            const a = new Date(this.DAILY_UNTIL)
            const b = new Date(this.START_DATE)

            this.difference = Math.floor((a - b) / (1000 * 60 * 60 * 24))

            this.IS_REPEAT = true
            this.OCCURS_UNTIL = this.DAILY_UNTIL

            this.selected = "Daily"

            this.$bvModal.hide('daily-modal')
        },
        // WEEKLY MODAL AND SET DIFFERENCE
        openWeeklyModal(){

            // get start date and add 4 months as default
            if(this.OCCURS_UNTIL === null || this.OCCURS_UNTIL === "" || this.EVENT_DATA.recurrence_pattern !== 'weekly'){
                const addFullYear = new Date(this.START_DATE)
                addFullYear.setFullYear(addFullYear.getFullYear() + 1)

                this.WEEKLY_UNTIL = addFullYear.toISOString().slice(0,10)
            } else if (this.EVENT_DATA.recurrence_pattern === 'weekly'){
                this.WEEKLY_UNTIL = this.OCCURS_UNTIL.slice(0,10)
            } 

            this.$bvModal.show('weekly-modal')

        },
        setWeekly() {
            const a = new Date(this.WEEKLY_UNTIL)
            const b = new Date(this.START_DATE)

            this.difference = Math.floor((a - b) / (7 * 24 * 60 * 60 * 1000))

            this.IS_REPEAT = true
            this.OCCURS_UNTIL = this.WEEKLY_UNTIL

            this.selected = "Weekly"

            this.$bvModal.hide('weekly-modal')

        },
        // MONTHLY MODAL
        openMonthlyModal(){
            /// get start date and add 4 months as default
            if(this.OCCURS_UNTIL === null || this.OCCURS_UNTIL === "" || this.EVENT_DATA.recurrence_pattern !== 'monthly'){
                const addFullYear = new Date(this.START_DATE)
                addFullYear.setFullYear(addFullYear.getFullYear() + 1)

                this.MONTHLY_UNTIL = addFullYear.toISOString().slice(0,10)
            } else{
                this.MONTHLY_UNTIL = this.OCCURS_UNTIL.slice(0,10)
            }
            this.$bvModal.show('monthly-modal')

        },
        setMonthly() {
            const a = new Date(this.MONTHLY_UNTIL)
            const b = new Date(this.START_DATE)

            this.difference = Math.floor(a.getMonth() - b.getMonth() + (12 * (a.getFullYear() - b.getFullYear())))

            this.IS_REPEAT = true
            this.OCCURS_UNTIL = this.MONTHLY_UNTIL

            console.log(this.difference)
            this.selected = "Monthly"

            this.$bvModal.hide('monthly-modal')
            

        },
        // DELETE EVENT
        deleteEvent(id){
            axios.delete(`http://localhost:3030/calendar/delete/user/${this.userId}/event/${id}`)
            .then(response => {
                console.log('Deleted', response)
            }) 
            .catch(error => console.log(error))
        },
    }
}
</script>

<style>
.title__input{
    border-bottom: 1px solid #B5ACC0 !important;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-radius: 0px !important;

}

.desc__input{
    border-radius: 4px !important;
    border-style: none !important;

    background-color: #F2EFF9 !important;
}

.custom-control-input:checked~.custom-control-label::before {
    color: #fff;
    border-color: #401DA4 !important;
    background-color: #401DA4 !important;
}

.modal-content {
    border-radius: 18px !important;
    border: none !important;

}

input:focus{ 
     outline:0px !important; 
     box-shadow: none !important;
}

.no__outline:focus{
    outline:0px !important; 
     box-shadow: none !important;
}

.addItem__btn{
    background-color: #AA96DA !important;
    border-color: #AA96DA !important;

    width: 100px;
    border-radius: 4px !important;
}

.cancel__btn{
    background-color: white !important;
    border-color: white !important;

    color: black  !important;
}

.cancel__btn:hover{
    text-decoration: underline !important;
}

#repeat-options__dropdown__BV_toggle_{
    color: black !important;
    background-color: transparent !important;
    border-bottom: 1px solid #ced4da;
    border-top: none !important;
    border-right: none !important;
    border-left: none !important;
    border-radius: 0px !important;
}

#repeat-options__dropdown__BV_toggle_:focus{
   outline:0px !important; 
    box-shadow: none !important;
}

.repeat__dropdown__texts{
    font-family: 'Poppins',sans-serif;
    font-size: 16px;
}


</style>
