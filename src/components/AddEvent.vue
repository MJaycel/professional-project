<template>
    <div>
        <b-modal id="add-item" hide-footer hide-header centered hide-header-close @hide="hideModal" >
            <b-tabs pills card>
                <b-tab title="Event" active style="padding:0px;">
                    <div class="d-flex justify-content-start" style="margin-top: 20px;">
                        <!-- TITLE INPUT -->
                        <b-form-input v-model="TITLE" placeholder="Add a title" class="title__input" ></b-form-input>
                        <!-- EVENT CLASSES INPUT -->
                        <b-dropdown id="dropdown-1"  v-b-tooltip.hover title="Select event theme" class="color-dropdown">
                            <template #button-content>
                                <p style="margin: 0px !important;"><i :style="`color:${color};`" class="fa-solid fa-circle"></i></p>
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
                            <b-dropdown-item @click="setNever">Never</b-dropdown-item>
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
                        <!-- BUTTON FOR REPEATING EVENTS - THIS SHOWS THE OPTIONS FOR EDITING ALL EVENTS IN REPEATING SERIES OR JUST SINGLE EVENT -->
                        <b-button class="addItem__btn" @click="saveEvent"> Save</b-button>                

                    </div>
                </b-tab>
                <!-- TASK TAB -->
                <b-tab title="Task" style="padding:0px;">
                    <div class="row mt-3 d-flex justify-content-start">
                        <b-form-input v-model="taskForm.title" placeholder="Add a title" style="margin-left:25px;margin-bottom:16px" class="modal_item_title col-11" ></b-form-input>

                        <div class="col-4">
                            <p class="modal_forms" style="padding-left:12px;padding-top:10px;">Priority</p>
                        </div>
                        <div class="col-8">

                            <div class="col d-flex justify-content-start priority_div" style="padding:0px;">
                                <div>
                                    <b-icon v-if="priority === 'Low Priority'" icon="circle-fill" style="width:12px;height:12px;color:#F3CC00;margin-top:15px;margin-right:2px;margin-bottom:4px;margin-left:5px;"></b-icon>
                                    <b-icon v-if="priority === 'High Priority'" icon="circle-fill" style="width:12px;height:12px;color:#E30000;margin-top:15px;margin-right:2px;margin-bottom:4px;margin-left:5px;"></b-icon>
                                    <b-icon v-if="priority === 'Medium Priority'" icon="circle-fill" style="width:12px;height:12px;color:#FF8B4A;margin-top:15px;margin-right:2px;margin-bottom:4px;margin-left:5px;"></b-icon>

                                </div>
                                <div>
                                    <form class="mt-2" style="border-radius:20px;padding:0px 5px 0px 5px;">
                                        <!-- <label class="input-group-text" for=""><i class="fa-solid fa-circle"></i></label> -->

                                        <select class="priority_select" v-model="priority" data-show-content="true">
                                            <option v-for="(option,idx) in priorities" :key="idx" class="p_options">
                                                {{option.text}}
                                            </option>                        

                                        </select>
                                    </form>  
                                </div>
                            </div>
                
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-4">
                            <p class="modal_forms" style="padding-left:12px;padding-top:10px;">Due Date</p>
                        </div>
                        <div class="col-8 mt-1 ">
                            <b-input-group class="date_picker_div">
                            <b-form-datepicker
                                class="date_picker"
                                id="datepicker-buttons"
                                locale="en"
                                v-model="taskForm.startDate"
                                :date-format-options="{ weekday: 'long', month: 'short', day: 'numeric', year: undefined }"
                                >
                                </b-form-datepicker>                        
                                <template v-slot:append>
                                    <b-button style="background:transparent;border:none;" aria-label="Clear date" @click="taskForm.startDate = null">
                                    <b-icon icon="x" style="color:black"></b-icon>
                                    </b-button>
                                </template>
                            </b-input-group>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-4">
                            <p class="modal_forms" style="padding-left:12px;padding-top:10px;">Add Time</p>
                        </div>
                        <div class="col-8 mt-1 ">
                            <b-form-input style="border-radius: 4px;"  :id="`startTime`" v-model="taskForm.startTime" type="time"></b-form-input>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-4 mt-2">
                            <p class="modal_forms" style="padding-left:12px;padding-top:10px;">Description</p>
                        </div>
                        <div class="col-7 mt-2" style="padding: 0px;">
                            <b-form-textarea v-if="taskForm.description === ''" class="desc__task__input_focus no__outline" v-model="taskForm.description" placeholder="Add a description"></b-form-textarea>
                            <b-form-textarea v-else class="desc__task__input no__outline" v-model="taskForm.description"></b-form-textarea>
                        </div>                
                    </div>

                    <div class="row mt-3 d-flex justify-content-start">

                        <div class="col-4">
                            <p class="modal_forms" style="padding-left:12px;padding-top:10px;">List</p>
                        </div>
                        <div class="col-8">
                            <div class="col d-flex justify-content-start priority_div" style="padding:0px;">
                                <div>
                                    <form class="mt-2" style="border-radius:20px;padding:0px 5px 0px 5px;">
                                        <select class="list_select" v-model="selectedList">
                                            <option v-for="list in lists" :key="list._id" :value="list._id" >
                                                {{list.list_title}}
                                            </option>                          
                                        </select>
                                    </form>  
                                </div>
                            </div>
                
                        </div>
                    </div>
                    <div class="d-flex justify-content-end mt-4">
                        <b-button class="cancel__btn" style="margin-right: 10px;" @click="cancel"> Cancel</b-button>

                        <b-button class="addItem__btn" @click="addTask"> Save</b-button>                
                    </div>   
                </b-tab>
            </b-tabs>
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
            color: '#AA96DA',
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
                classes: "ePurple",
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
            EVENT_CLASS: 'ePurple',
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

            // // TASKS
            /// color classes ////
            orange: 'inProgress',
            green: 'completed',
            blue: 'toDo',
            progress: '',
            progressOptions: [
                {idx:1,value: 'Not Started', text: 'Not Started'},
                {idx:2,value: 'In Progress', text: 'In Progress'},
                {idx:3,value: 'Completed', text: 'Completed'}
            ],
            priority: 'Medium Priority',
            priorities: [
                {idx:1,value: 'High Priority', text: 'High Priority'},
                {idx:2,value: 'Medium Priority', text: 'Medium Priority'},
                {idx:3,value: 'Low Priority', text: 'Low Priority'}           
            ],
            dueDate: '',
            noDate: false,
            event_id: '',

            calForm: {
                startDate: '',
                endDate: '',
                title: '',
                description: '',
                isComplete: false,
                classes : '',
                item_id: '',
                startTime: ''
            },
            itemInCalendar: false,
            taskForm: {
                title: '',
                description: '',
                startDate: '',
                startTime: '',
                priorityLevel: '',
                progress: '',
                isComplete: false,
                inCalendar: false,
                classes: ''
            },
            selectedList: '',
            lists: [],
            lastItemId: '',
            todoLists: [],
        }
    },
    computed: {
        ...mapState(['showAddModal','date'])
        // ...mapState(['showEditModal'])
    },
    mounted() {
        this.$bvModal.show('add-item')
        this.getAllLists()

        const year = this.$store.state.date.getFullYear()
        const month = this.$store.state.date.getMonth() + 1
        const date = this.$store.state.date.getDate()

        
        if(month > 9){
            this.defaultDate = year + '-' + month + '-' + date
            if(date > 9){
                this.defaultDate = year + '-' + month + '-' + date
            }            
        } else {
            this.defaultDate = year + '-0' + month + '-' + date
            if(date < 10){
                this.defaultDate = year + '-0' + month + '-0' + date
            }          
        }
        this.START_DATE = this.defaultDate
        this.END_DATE = this.defaultDate
        this.taskForm.startDate = this.defaultDate
        // this.taskForm.startTime = "8:00"


        this.START_TIME= "08:00"
        this.END_TIME = "09:00"

        this.selected = 'Never'
    },
    methods: {
        ...mapActions(['getAllEvents']),
        //// HIDE MODAL
        hideModal() {
            this.$bvModal.hide('add-item')
            this.$store.commit('setShowAddModal', false)
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
                this.postAdd()
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
                if(this.IS_ALL_DAY){
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
            this.form.classes = this.EVENT_CLASS 
            this.form.repeat = this.IS_REPEAT
            this.form.recurring_id = this.RECURRING_ID
            this.form.recurrence_pattern = this.RECURRENCE_PATTERN
            this.form.isAllDay = this.IS_ALL_DAY

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

            // this.form.occurs_until = this.OCCURS_UNTIL
        },

        postAdd() {
            axios.post(`https://focus-hub.herokuapp.com/calendar/add/event/${this.userId}` , this.form )
                .then(response => {
                    console.log("NEW EVENTS",response.data.events)
                    // "refreshes" the calendar and shows new event that was added
                    this.$store.dispatch('getAllEvents')
                    this.$store.commit('setShowEditModal', false)
                    this.$bvModal.hide('add-item')
                })
                .catch(error => console.log(error))            

        },
        createRepeatingEvent(){
            this.setForm()

            this.postAdd()
        },
        createDaily(){

            this.RECURRING_ID = "e" + Math.random().toString(36).substr(2, 10)

            this.form.occurs_until = this.DAILY_UNTIL

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

                if(this.IS_ALL_DAY){
                    newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate()))
                }else{
                    const userInputEnd = this.END_TIME

                    const hours_end = userInputEnd.slice(0,2)
                    const minutes_end = userInputEnd.slice(3)
                    newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate(),hours_end,minutes_end))
                }
                this.form.endDate = newEndDate

                this.postAdd()
            }
        },
        createWeekly(){

            this.RECURRING_ID = "e" + Math.random().toString(36).substr(2, 10)
            this.form.occurs_until = this.WEEKLY_UNTIL

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

                if(this.IS_ALL_DAY){
                    newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate()))
                }else{
                    const userInputEnd = this.END_TIME

                    const hours_end = userInputEnd.slice(0,2)
                    const minutes_end = userInputEnd.slice(3)
                    newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate(),hours_end,minutes_end))
                }
                this.form.endDate = newEndDate

                this.postAdd()
            }
        },
        createMonthly() {
            /// delete this event and create new with the recurring id

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
                if(this.IS_ALL_DAY){
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

                this.postAdd()
      
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
            const addFourMonths = new Date(this.START_DATE)
            addFourMonths.setMonth(addFourMonths.getMonth() + 4)
    
            this.DAILY_UNTIL = addFourMonths.toISOString().slice(0,10)

            this.$bvModal.show('daily-modal')
            
        },
        setDaily() {
            const a = new Date(this.DAILY_UNTIL)
            const b = new Date(this.START_DATE)

            this.difference = Math.floor((a - b) / (1000 * 60 * 60 * 24))

            this.IS_REPEAT = true
            this.OCCURS_UNTIL = this.DAILY_UNTIL

            this.selected = "Daily"

            console.log(this.difference)

            this.$bvModal.hide('daily-modal')
        },
        // WEEKLY MODAL AND SET DIFFERENCE
        openWeeklyModal(){

            /// get start date and add 4 months as default
            const addFullYear = new Date(this.START_DATE)
            addFullYear.setFullYear(addFullYear.getFullYear() + 1)

            this.WEEKLY_UNTIL = addFullYear.toISOString().slice(0,10)

            this.$bvModal.show('weekly-modal')

            console.log(this.DAILY_UNTIL)
        },
        setWeekly() {
            const a = new Date(this.WEEKLY_UNTIL)
            const b = new Date(this.START_DATE)

            this.difference = Math.floor((a - b) / (7 * 24 * 60 * 60 * 1000))

            this.IS_REPEAT = true
            this.OCCURS_UNTIL = this.WEEKLY_UNTIL

            console.log(this.difference)
            this.selected = "Weekly"

            this.$bvModal.hide('weekly-modal')

        },
        // MONTHLY MODAL
        openMonthlyModal(){
            /// get start date and add 4 months as default
            // const addMonths = new Date(this.START_DATE)
            // addMonths.setMonth(addMonths.getMonth() + 12)

            // this.MONTHLY_UNTIL = addMonths.toISOString().slice(0,10)
            const addFullYear = new Date(this.START_DATE)
            addFullYear.setFullYear(addFullYear.getFullYear() + 1)

            this.MONTHLY_UNTIL = addFullYear.toISOString().slice(0,10)

            this.$bvModal.show('monthly-modal')
        },
        setMonthly() {
            const a = new Date(this.MONTHLY_UNTIL)
            const b = new Date(this.START_DATE)

            this.difference = Math.floor(a.getMonth() - b.getMonth() + (12 * (a.getFullYear() - b.getFullYear())))
            // this.difference = Math.floor((a - b) / (7 * 24 * 60 * 60 * 1000))


            this.IS_REPEAT = true
            this.OCCURS_UNTIL = this.MONTHLY_UNTIL

            console.log(this.difference)
            this.selected = "Monthly"

            this.$bvModal.hide('monthly-modal')
            

        },
        // DELETE EVENT
        deleteEvent(id){
            axios.delete(`https://focus-hub.herokuapp.com/calendar/delete/user/${this.userId}/event/${id}`)
            .then(response => {
                console.log('Deleted', response)
            }) 
            .catch(error => console.log(error))
        },
        ////////// TASKS
        //// get all users lists
        getAllLists(){
            axios.get(`https://focus-hub.herokuapp.com/todo/${this.userId}`)
            .then(response => {
                this.lists = response.data
                this.selectedList = response.data[0]._id
                console.log('Lists', this.lists) 
            }) 
            .catch(error => console.log(error))
        },
        //// add as task first 
        addTask() {
            let userId = localStorage.getItem('userId')

            if(this.taskForm.title === ''){
                this.taskForm.title = 'Untitled'
            }

            this.taskForm.progress = 'Not Started'
            this.taskForm.priorityLevel = this.priority

            axios.post(`https://focus-hub.herokuapp.com/todo/add/user/${userId}/list/${this.selectedList}`, this.taskForm)
            .then(response => {
                console.log('New task added', response.data)

                axios.get(`https://focus-hub.herokuapp.com/todo/${userId}`)
                .then(response => {
                    this.todoLists = response.data
                    console.log('Lists', this.todoLists) 

                    let lastItem;
                    let items;
                    Array.from(this.todoLists).forEach((list)=> {
                        if(list._id === this.selectedList){
                            items = list.items

                            lastItem = items[items.length -1]  
                            
                            this.lastItemId = lastItem._id
                            console.log('THIS IS THE LAST ITEM', this.lastItemId)
                        }    
                    }) 
                    this.addItemtoCal()
                    this.$store.dispatch('getAllEvents')
                    this.$store.commit('setShowAddModal', false)
                    this.$bvModal.hide('add-item')                   
                }) 
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        },
        ///// add the newly added task to calendar -- need this so i can get the task id and put it in item_id
        addItemtoCal() {

            // let userId = localStorage.getItem('userId')
            // this.calForm.startDate = this.taskForm.startDate

            let newStartDate;
            const userInputStart = this.taskForm.startTime
            //setting start time
            const hours_start = userInputStart.slice(0,2)
            const minutes_start = userInputStart.slice(3)

            const date_start = new Date(this.taskForm.startDate)
            newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate(),hours_start,minutes_start))

            this.calForm.startDate = newStartDate.toUTCString()
            this.calForm.endDate = newStartDate.toUTCString()
            this.calForm.startTime = this.taskForm.startTime

            this.calForm.title = this.taskForm.title
            this.calForm.description = this.taskForm.description
            this.calForm.isComplete = this.taskForm.isComplete
            this.calForm.classes = 'item-event item-event-bg'

            this.calForm.item_id = this.lastItemId 

            let userId = localStorage.getItem('userId')
            axios.post(`https://focus-hub.herokuapp.com/calendar/add/event/${userId}` , this.calForm )
            .then(response => {
                console.log("Task added to calendar",response.data)
                this.$store.dispatch('getAllEvents')
                this.$store.commit('setShowAddModal', false)
                this.$bvModal.hide('add-item')

            })
            .catch(error => console.log(error))     
            
        },
        cancel() {
            this.$bvModal.hide('add-item')
            this.$store.commit('setShowAddModal', false)
        },
    },
    // watch:{
    //     items: {
    //         handler() {
    //             this.$store.dispatch('getAllEvents')
    //         }
    //     }
    // }
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
