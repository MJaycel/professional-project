<template>
    <div>
        <!-- ADD ITEM MODAL -->
        <b-modal id="add-item" hide-footer hide-header centered hide-header-close @hide="cancel" >
            <b-tabs pills card>
                <b-tab title="Event" active style="padding:0px;">
                    <div class="d-flex justify-content-start" style="margin-top: 20px;">
                        <b-form-input v-model="form.title" placeholder="Add a title" class="title__input" ></b-form-input>

                        <b-dropdown id="dropdown-1" v-b-tooltip.hover title="Select event color" class="color-dropdown">
                            <template #button-content>
                                <p style="margin: 0px !important;"><i :style="`color:${color};`" class="fa-solid fa-circle"></i></p>
                            </template>
                            <div class="d-flex flex-between" style="width: 40px;">
                                <b-dropdown-item @click="(form.classes='eGreen'),(color = '#5EBC62')" id="color-dropdown-item" value="eGreen"><i class="fa-solid fa-circle" style="color:#5EBC62;"></i></b-dropdown-item>
                                <b-dropdown-item @click="(form.classes='eDarkGreen'),(color = '#278A2B')" id="color-dropdown-item" value="eDarkGreen"><i class="fa-solid fa-circle" style="color:#278A2B;"></i></b-dropdown-item>                        
                            </div>
                            <div class="d-flex flex-between" style="width: 40px;">
                                <b-dropdown-item @click="(form.classes='ePurple'),(color = '#AA96DA')" id="color-dropdown-item" value="ePurple"><i class="fa-solid fa-circle" style="color:#AA96DA;"></i></b-dropdown-item>
                                <b-dropdown-item @click="(form.classes='eViolet'),(color = '#6F6EAD')" id="color-dropdown-item" value="eViolet"><i class="fa-solid fa-circle" style="color:#6F6EAD;"></i></b-dropdown-item>                        
                            </div>
                            <div class="d-flex flex-between" style="width: 40px;">
                                <b-dropdown-item @click="(form.classes='eYellow'),(color = '#FFD74A')" id="color-dropdown-item" value="eYellow"><i class="fa-solid fa-circle" style="color:#FFD74A;"></i></b-dropdown-item>
                                <b-dropdown-item @click="(form.classes='eOrange'),(color = '#F99500')" id="color-dropdown-item" value="eOrange"><i class="fa-solid fa-circle" style="color:#F99500;"></i></b-dropdown-item>                        
                            </div>
                            <div class="d-flex flex-between" style="width: 40px;">
                                <b-dropdown-item @click="(form.classes='eBlue'),(color = '#259EE2')" id="color-dropdown-item" value="eBlue"><i class="fa-solid fa-circle" style="color:#259EE2;"></i></b-dropdown-item>
                                <b-dropdown-item @click="(form.classes='eDarkBlue'),(color = '#0F5F8C')" id="color-dropdown-item" value="eDarkBlue"><i class="fa-solid fa-circle" style="color:#0F5F8C;"></i></b-dropdown-item>                        
                            </div>
                            <div class="d-flex flex-between" style="width: 40px;">
                                <b-dropdown-item @click="(form.classes='ePink'),(color = '#F0A1A1')" id="color-dropdown-item" value="ePink"><i class="fa-solid fa-circle" style="color:#F0A1A1;"></i></b-dropdown-item>
                                <b-dropdown-item @click="(form.classes='eRed'),(color = '#F11F1F')" id="color-dropdown-item" value="eRed"><i class="fa-solid fa-circle" style="color:#F11F1F;"></i></b-dropdown-item>                        
                            </div>
                        </b-dropdown>
                    </div>
                    <!-- <br> -->
                    <div class="d-flex justify-content-end mt-2" style="margin-bottom:10px;">
                        <p class="font__fam" style="margin-bottom:0px;" >All day</p>
                        <b-form-checkbox style="margin-left:10px;margin-right:8px;" v-model="isAllDay" name="check-button" class="no__outline" size="lg" switch>
                        </b-form-checkbox>
                        <p>{{this.isAllDay}}</p>

                        <!-- <b-form-select @change="onOptionChanged" v-model="selected"  :options="options" style="width: 130px;font-size:12px;" class="no__outline"></b-form-select> -->
                    </div>
                    <div class="d-flex justiy-content-between">
                        <div v-if="!isAllDay" style="margin-top: 10px;">
                            <b-form-input style="width: 320px; border-radius: 4px;" v-model="form.startDate" type="date"></b-form-input>
                            <b-form-input style="width: 320px; margin-top: 16px; border-radius: 4px;" v-model="form.endDate" type="date"></b-form-input>
                        </div>

                        <div v-else style="margin-top: 10px;">
                            <b-form-input style="width: 460px; border-radius: 4px;" v-model="form.startDate" type="date"></b-form-input>
                            <b-form-input style="width: 460px; margin-top: 16px; border-radius: 4px;" v-model="form.endDate" type="date"></b-form-input>
                        </div>

                        <div v-if="!isAllDay" style="margin-top: 10px;">
                        <b-form-input style="width: 130px; margin-left: 15px; border-radius: 4px;"  :id="`startTime`" v-model="form.startTime" type="time"></b-form-input>
                        <b-form-input style="width: 130px; margin-left: 15px; margin-top: 16px; border-radius: 4px;"  :id="`endTime`" v-model="form.endTime" type="time"></b-form-input>                      
                        </div>
                    </div>

                    <!-- <br> -->
                    <div class="d-flex justify-content-start pt-3">
                        <b-form-select @change="onOptionChanged" v-model="selected"  :options="options" style="width: 160px;font-size:14px;" class="no__outline"></b-form-select>
                    </div>

                    <div v-if="showEndsOnDaily">
                        <p class="font__fam" style="margin-left:4px;margin-top:10px;margin-bottom:10px;">Ends:</p>
                        <b-form-group v-slot="{ ariaDescribedby }">
                            <b-form-radio v-model="endsOn" :aria-describedby="ariaDescribedby" value="never" class="font__fam" style="margin-left:10px;">Never</b-form-radio>
                            <div class="d-flex justify-content-start">

                                <b-form-radio v-model="endsOn" :aria-describedby="ariaDescribedby" value="endsOn" class="font__fam" style="margin-left:10px;margin-right:20px;margin-top:12px;">On</b-form-radio>
                                <b-form-datepicker
                                    style="width:200px;"
                                    class="date_picker font__fam"
                                    id="daily_until-datepicker"
                                    locale="en"
                                    v-model="daily_until"
                                        :date-format-options="{ weekday: 'short', month: 'short', day: 'numeric', year: undefined }"
                                    >
                                </b-form-datepicker>     
                            </div>
                        </b-form-group>

                        <b-button @click="setUntil">Done</b-button>
                    </div>
                    <div v-if="showEndsOnWeekly">
                        <p class="font__fam" style="margin-left:4px;margin-top:10px;margin-bottom:10px;">Ends:</p>
                        <b-form-group v-slot="{ ariaDescribedby }">
                            <b-form-radio v-model="endsOn" :aria-describedby="ariaDescribedby" value="never" class="font__fam" style="margin-left:10px;">Never</b-form-radio>
                            <div class="d-flex justify-content-start">
                                <b-form-radio v-model="endsOn" :aria-describedby="ariaDescribedby" value="endsOn" class="font__fam" style="margin-left:10px;margin-right:20px;margin-top:12px;">On</b-form-radio>
                                <b-form-datepicker
                                    class="date_picker font__fam"
                                    id="daily_until-datepicker"
                                    locale="en"
                                    v-model="weekly_until"
                                        :date-format-options="{ weekday: 'short', month: 'short', day: 'numeric', year: undefined }"
                                    >
                                </b-form-datepicker>     
                            </div>
                        </b-form-group>
                        <b-button @click="setUntil">Done</b-button>
                    </div>
                    <!-- <div v-if="showEndsOnMonthly">
                        <p class="font__fam" style="margin-left:4px;margin-top:10px;margin-bottom:10px;">Ends:</p>
                        <b-form-group v-slot="{ ariaDescribedby }">
                            <b-form-radio v-model="endsOn" :aria-describedby="ariaDescribedby" value="never" class="font__fam" style="margin-left:10px;">Never</b-form-radio>
                            <div class="d-flex justify-content-start">
                                <b-form-radio v-model="endsOn" :aria-describedby="ariaDescribedby" value="endsOn" class="font__fam" style="margin-left:10px;margin-right:20px;margin-top:12px;">On</b-form-radio>
                                <b-form-datepicker
                                    class="date_picker font__fam"
                                    id="daily_until-datepicker"
                                    locale="en"
                                    v-model="monthly_until"
                                        :date-format-options="{ weekday: 'short', month: 'short', day: 'numeric', year: undefined }"
                                    >
                                </b-form-datepicker>     
                            </div>
                        </b-form-group>
                        <b-button @click="setUntil">Done</b-button>
                    </div> -->
                    <br>
                    <b-form-textarea class="desc__input no__outline" v-model="form.description" placeholder="Add a description"></b-form-textarea>
                    <br>
                    
                    <div class="d-flex justify-content-end">
                        <b-button class="cancel__btn" @click="cancel"> Cancel</b-button>

                        <b-button class="addItem__btn" @click="saveItem"> Save</b-button>                
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

        <b-modal id="weekly-settings" hide-footer>
            <p>Occurs every week until: </p>
            <b-form-input  style="width: 460px; border-radius: 4px;" v-model="weekly_until" type="date"></b-form-input>
            <b-button @click="setUntil">save</b-button>
        </b-modal>

        <b-modal id="daily-settings" hide-footer>
            <p>Occurs daily until: </p>
            <b-form-input  style="width: 460px; border-radius: 4px;" v-model="daily_until" type="date"></b-form-input>
            <b-button @click="setUntil">save</b-button>
        </b-modal>
    </div>
</template>

<script>

import axios from 'axios'
import {mapState, mapActions} from 'vuex'

export default {
    name: "AddEvent",  
    components:{
    },
    data() {
        return{
            userId: localStorage.getItem('userId'),
            defaultDate : '',
            form: {
                title: "",
                description: "",
                startDate: "",
                endDate: "",
                startTime: "",
                endTime: "",
                classes: "ePurple",
                repeat: false,
                recurrence_pattern: "",
                recurring_id: "",
                isAllDay: false,
                occurs_until: ''
            },
            isAllDay: false,
            selected: null,
            options: [
                {value: null, text: "Doesn't Repeat"},
                {value: "daily", text: "Daily"},
                {value: "weekly", text: "Weekly"},
                {value: "monthly", text: "Monthly"},
            ],
            weekly_until: '',
            daily_until: '',
            monthly_until: '',
            difference: '',
            eId : '',
            // setColorTheme: {
            //     classes: ''
            // }
            colorClass: '',
            color: '#AA96DA',

            // TASKS
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
            showEndsOnDaily: false,
            showEndsOnWeekly: false,
            showEndsOnMonthly: false,

            endsOn: ''

        }
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
            if(date < 9){
                this.defaultDate = year + '-0' + month + '-0' + date
            }          
        }
        this.form.startDate = this.defaultDate
        this.form.endDate = this.defaultDate
        this.taskForm.startDate = this.defaultDate

        this.form.startTime = "08:30"
        this.form.endTime = "09:30"
        console.log('this is the start date', this.form.startDate)

    },
    computed: {
        ...mapState(['showAddModal','date'])
    },
    methods: {
        ...mapActions(['getAllEvents']),
        saveItem() {  
            ///// RECURRING WEEKLY
            if(this.selected === 'weekly'){
                this.addWeekly()
            }
            if(this.selected === 'monthly'){
                this.addMonthly()
            } 
            if(this.selected === 'daily'){
                this.addDaily()
            } 
            if(this.selected === null){
                this.addItem()
            }
        },
        addItem() {
            let newStartDate;
            let newEndDate;
            
            const userInputStart = this.form.startTime
            const userInputEnd = this.form.endTime

            //setting start time
            const hours_start = userInputStart.slice(0,2)
            const minutes_start = userInputStart.slice(3)

            const date_start = new Date(this.form.startDate)
            // date_start.setHours(hours_start, minutes_start)
            if(this.isAllDay){
                newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate()))
            }else{
                newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate(),hours_start,minutes_start))
            }

            this.form.startDate = newStartDate

            /// setting end date 
            const hours_end = userInputEnd.slice(0,2)
            const minutes_end = userInputEnd.slice(3)

            const date_end = new Date(this.form.endDate)
            // date_end.setHours(hours_end, minutes_end)
            if(this.isAllDay){
                newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate()))
            } else{
                newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate(),hours_end,minutes_end))
            }
            this.form.endDate = newEndDate
            console.log(this.form.endDate)

            // this.form.recurring_id = null
            if(this.selected === null){
                this.form.recurrence_pattern = null
                this.form.recurring_id = null
            }
            this.form.isAllDay = this.isAllDay

            console.log('allday',this.isAllDay)
            this.postItem()

        },
        postItem() {
            if(this.isAllDay){
                this.form.startTime = null
                this.form.endTime = null
            } 
            axios.post(`http://localhost:3030/calendar/add/event/${this.userId}` , this.form )
            .then(response => {
                console.log("NEW EVENTS",response.data.events)
                // "refreshes" the calendar and shows new event that was added
                this.$store.dispatch('getAllEvents')
                this.$store.commit('setShowAddModal', false)
                this.$bvModal.hide('add-item')
            })
            .catch(error => console.log(error))     
        },
        addDaily(){
            this.eId = "e" + Math.random().toString(36).substr(2, 10)
            this.form.recurring_id = this.eId
            this.form.recurrence_pattern = this.selected
            this.form.repeat = true
            this.addItem()
            if(this.endsOn === 'endsOn'){
                for(let i = 0; i < this.difference; i++){
                    let newStartDate;

                    const date_start = new Date(this.form.startDate)
                    date_start.setDate(date_start.getDate() + 1)
                    if(this.form.isAllDay){
                        newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate()))
                    }else{
                        const userInputStart = this.form.startTime

                        const hours_start = userInputStart.slice(0,2)
                        const minutes_start = userInputStart.slice(3)
                        newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate(),hours_start,minutes_start))
                    }
                    this.form.startDate = newStartDate

                    let newEndDate;

                    const date_end = new Date(this.form.endDate)
                    date_end.setDate(date_end.getDate() + 1)

                    if(this.form.isAllDay){
                        newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate()))
                    }else{
                        const userInputStart = this.form.startTime

                        const hours_end = userInputStart.slice(0,2)
                        const minutes_end = userInputStart.slice(3)
                        newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate(),hours_end,minutes_end))
                    }
                    this.form.endDate = newEndDate

                    this.form.repeat = true
                    this.form.recurrence_pattern = this.selected
                    this.form.recurring_id = this.eId
                    this.form.isAllDay = this.isAllDay
                    this.form.occurs_until = this.daily_until

                    this.postItem()
                }
            } else if(this.endsOn === 'never'){
                for(let i = 0; i < 365; i++){
                    let newStartDate;

                    const date_start = new Date(this.form.startDate)
                    date_start.setDate(date_start.getDate() + 1)
                    if(this.form.isAllDay){
                        newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate()))
                    }else{
                        const userInputStart = this.form.startTime

                        const hours_start = userInputStart.slice(0,2)
                        const minutes_start = userInputStart.slice(3)
                        newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate(),hours_start,minutes_start))
                    }
                    this.form.startDate = newStartDate

                    let newEndDate;

                    const date_end = new Date(this.form.endDate)
                    date_end.setDate(date_end.getDate() + 1)

                    if(this.form.isAllDay){
                        newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate()))
                    }else{
                        const userInputStart = this.form.startTime

                        const hours_end = userInputStart.slice(0,2)
                        const minutes_end = userInputStart.slice(3)
                        newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate(),hours_end,minutes_end))
                    }
                    this.form.endDate = newEndDate

                    this.form.repeat = true
                    this.form.recurrence_pattern = this.selected
                    this.form.recurring_id = this.eId
                    this.form.isAllDay = this.isAllDay

                    this.postItem()

                }
            }
        },
        addWeekly(){
            this.eId = "e" + Math.random().toString(36).substr(2, 10)
            this.form.recurring_id = this.eId
            this.form.recurrence_pattern = this.selected
            this.form.repeat = true
            this.form.occurs_until = this.weekly_until

            this.addItem()

            if(this.endsOn === 'endsOn'){
                for(let i = 0; i < this.difference; i++){
                    // const start = new Date(this.form.startDate)
                    // start.setDate(start.getDate() + 7)
                    // this.form.startDate = start

                    // const end = new Date(this.form.endDate)
                    // end.setDate(end.getDate() + 7)
                    let newStartDate;

                    const date_start = new Date(this.form.startDate)
                    date_start.setDate(date_start.getDate() + 7)
                    if(this.form.isAllDay){
                        newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate(),0,0))
                    }else{
                        const userInputStart = this.form.startTime

                        const hours_start = userInputStart.slice(0,2)
                        const minutes_start = userInputStart.slice(3)
                        newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate(),hours_start,minutes_start))
                    }
                    this.form.startDate = newStartDate.toUTCString()

                    let newEndDate;

                    const date_end = new Date(this.form.endDate)
                    date_end.setDate(date_end.getDate() + 7)

                    if(this.form.isAllDay){
                        newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate()))
                    }else{
                        const userInputStart = this.form.endTime

                        const hours_end = userInputStart.slice(0,2)
                        const minutes_end = userInputStart.slice(3)
                        newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate(),hours_end,minutes_end))
                    }
                    this.form.endDate = newEndDate.toUTCString()
                    // this.form.endDate = end
                    this.form.repeat = true
                    this.form.recurrence_pattern = "weekly"
                    this.form.recurring_id = this.eId
                    this.form.isAllDay = this.isAllDay

                    this.postItem()
                }
            } else if(this.endsOn === 'never'){
                for(let i = 0; i < 52; i++){
                    // const start = new Date(this.form.startDate)
                    // start.setDate(start.getDate() + 7)
                    // this.form.startDate = start

                    // const end = new Date(this.form.endDate)
                    // end.setDate(end.getDate() + 7)
                    // this.form.endDate = end
                    let newStartDate;

                    const date_start = new Date(this.form.startDate)
                    date_start.setDate(date_start.getDate() + 7)
                    if(this.form.isAllDay){
                        newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate()))
                    }else{
                        const userInputStart = this.form.startTime

                        const hours_start = userInputStart.slice(0,2)
                        const minutes_start = userInputStart.slice(3)
                        newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate(),hours_start,minutes_start))
                    }
                    this.form.startDate = newStartDate

                    let newEndDate;

                    const date_end = new Date(this.form.endDate)
                    date_end.setDate(date_end.getDate() + 7)

                    if(this.form.isAllDay){
                        newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate()))
                    }else{
                        const userInputStart = this.form.startTime

                        const hours_end = userInputStart.slice(0,2)
                        const minutes_end = userInputStart.slice(3)
                        newEndDate = new Date(Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate(),hours_end,minutes_end))
                    }
                    this.form.endDate = newEndDate
                    this.form.repeat = true
                    this.form.recurrence_pattern = "weekly"
                    this.form.recurring_id = this.eId
                    this.form.isAllDay = this.isAllDay

                    this.postItem()
                }
            }
        },
        addMonthly() {
            this.eId = "e" + Math.random().toString(36).substr(2, 10)

            let start_UTC;
            let end_UTC;
            this.form.repeat = true

            const diff = this.difference + 1
            console.log('diff', diff)

            for(let i = 0; i < 12; i++){
                ////setting start date
                const start = new Date(this.form.startDate)
                const userInputStart = this.form.startTime
                const hours_start = userInputStart.slice(0,2)
                const minutes_start = userInputStart.slice(3)
                const year_start = start.getFullYear()
                const month_start = start.getMonth()
                const date_start = start.getDate()
                
                if(this.isAllDay){
                    start_UTC = new Date(Date.UTC(year_start,month_start,date_start))
                } else {
                    start_UTC = new Date(Date.UTC(year_start,month_start,date_start,hours_start,minutes_start))
                }

                start_UTC.setUTCMonth(i)
                this.form.startDate = start_UTC

                ///setting end date
                const end = new Date(this.form.endDate)
                const userInputEnd = this.form.endTime
                const hours_end = userInputEnd.slice(0,2)
                const minutes_end = userInputEnd.slice(3)
                const year_end = end.getFullYear()
                const month_end = end.getMonth()
                const date_end = end.getDate()
                const hour_end = hours_end
                const minute_end = minutes_end

                end_UTC = new Date(Date.UTC(year_end,month_end,date_end,hour_end,minute_end))

                end_UTC.setUTCMonth(i)
                this.form.endDate = end_UTC
                this.form.repeat = true
                this.form.recurrence_pattern = this.selected
                this.form.recurring_id = this.eId
                this.form.isAllDay = this.isAllDay

                this.postItem()
            }
        },
        cancel() {
            this.$bvModal.hide('add-item')
            this.$store.commit('setShowAddModal', false)
        },
        onOptionChanged(){
            if(this.selected === 'weekly'){
                // this.$bvModal.show('weekly-settings')    
                this.showEndsOnWeekly = true    
                this.showEndsOnDaily = false
            } else if(this.selected === 'daily'){
                // this.$bvModal.show('daily-settings') 
                this.showEndsOnDaily = true       
                this.showEndsOnWeekly = false   

            } else if(this.selected === 'monthly'){
                this.showEndsOnMonthly = true
                this.showEndsOnDaily = false  
                this.showEndsOnWeekly = false    
            }
        },
        setUntil(){
            console.log('until', this.monthly_until)
            console.log('startDate', this.form.startDate)
            this.getDiff()
            this.showEndsOnWeekly = false    
            this.showEndsOnDaily = false
            this.showEndsOnMonthly = false

        },
        getDiff() {
            const _MS_PER_DAY = 1000 * 60 * 60 * 24;
            if(this.selected === 'weekly'){
                const a = new Date(this.weekly_until)
                const b = new Date(this.form.startDate)
    
                this.difference = Math.floor((a - b) / (7 * 24 * 60 * 60 * 1000))
                console.log(this.difference)
            }

            if(this.selected === 'daily'){
                const a = new Date(this.daily_until)
                const b = new Date(this.form.startDate)
    
                this.difference = Math.floor((a - b) / _MS_PER_DAY)
                console.log(this.difference)            
            }
            if(this.selected === 'monthly'){
                const a = new Date(this.monthly_until)
                const b = new Date(this.form.startDate)

                this.difference = Math.floor(a.getMonth() - b.getMonth() + (12 * (a.getFullYear() - b.getFullYear())))

                console.log('diff',this.difference)
            }

        },


        ////////// TASKS
        //// get all users lists
        getAllLists(){
            axios.get(`http://localhost:3030/todo/${this.userId}`)
            .then(response => {
                this.lists = response.data
                this.selectedList = response.data[0]._id
                console.log('Lists', this.lists) 
            }) 
            .catch(error => console.log(error))
        },
        //// add as task first 
        addTask() {
            // console.log('add', this.listId)
            let userId = localStorage.getItem('userId')

            if(this.taskForm.title === ''){
                this.taskForm.title = 'Untitled'
            }

            this.taskForm.progress = 'Not Started'
            this.taskForm.priorityLevel = this.priority


            axios.post(`http://localhost:3030/todo/add/user/${userId}/list/${this.selectedList}`, this.taskForm)
            .then(response => {
                console.log('New task added', response.data)

                axios.get(`http://localhost:3030/todo/${userId}`)
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
            this.calForm.startTime = this.taskForm.startTime

            this.calForm.title = this.taskForm.title
            this.calForm.description = this.taskForm.description
            this.calForm.isComplete = this.taskForm.isComplete
            this.calForm.classes = 'item-event item-event-bg'

            this.calForm.item_id = this.lastItemId 

            let userId = localStorage.getItem('userId')
            axios.post(`http://localhost:3030/calendar/add/event/${userId}` , this.calForm )
            .then(response => {
                console.log("Task added to calendar",response.data)
                this.$store.dispatch('getAllEvents')
                this.$store.commit('setShowAddModal', false)
                this.$bvModal.hide('add-item')

            })
            .catch(error => console.log(error))     
            
        },
    },
    watch:{
        items: {
            handler() {
                this.$store.dispatch('getAllEvents')
            }
        }
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

#color-dropdown-item{
    padding: 10px !important;
}

.dropdown-menu{
    /* background: orange !important; */
    min-width: 5rem !important;
}

.color-dropdown{
    padding: 10px 10px 10px 10px;
    border-radius: 4px !important;
}

.color-dropdown:hover{
    background: #e7e7e7 !important;
    /* padding: 10px; */
}

.list_select{
    outline:0px !important; 
    box-shadow: none !important;
    background: transparent;
    width:170%;
    padding-bottom:10px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0);

    background-image: none !important;

    font-family: 'Poppins',sans-serif;
    font-size: 15px !important;
}

</style>
