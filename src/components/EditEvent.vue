<template>
    <div>
        <!-- EDIT ITEM MODAL -->
        <!-- <b-modal id="edit-item" hide-footer centered hide-header-close no-close-on-backdrop title="Edit Event">
            <template #modal-header>
                <h3>Edit Event</h3>
                <b-dropdown id="dropdown-1"  v-b-tooltip.hover title="Select event color" class="color-dropdown">
                    <template #button-content>
                        <p v-if="form.classes==='ePurple'" style="margin: 0px !important;"><i style="color:#AA96DA;" class="fa-solid fa-circle"></i></p>
                        <p v-if="form.classes==='eViolet'" style="margin: 0px !important;"><i style="color:#6F6EAD;"  class="fa-solid fa-circle"></i></p>
                        <p v-if="form.classes==='eGreen'" style="margin: 0px !important;"><i style="color:#5EBC62;" class="fa-solid fa-circle"></i></p>
                        <p v-if="form.classes==='eDarkGreen'" style="margin: 0px !important;"><i style="color:#278A2B;" class="fa-solid fa-circle"></i></p>
                        <p v-if="form.classes==='eYellow'" style="margin: 0px !important;"><i style="color:#FFD74A;"  class="fa-solid fa-circle"></i></p>
                        <p v-if="form.classes==='eOrange'" style="margin: 0px !important;"><i style="color:#F99500;"  class="fa-solid fa-circle"></i></p>
                        <p v-if="form.classes==='eBlue'" style="margin: 0px !important;"><i style="color:#259EE2;"  class="fa-solid fa-circle"></i></p>
                        <p v-if="form.classes==='eDarkBlue'" style="margin: 0px !important;"><i style="color:#0F5F8C;"  class="fa-solid fa-circle"></i></p>
                        <p v-if="form.classes==='ePink'" style="margin: 0px !important;"><i style="color:#F0A1A1;"  class="fa-solid fa-circle"></i></p>
                        <p v-if="form.classes==='eRed'" style="margin: 0px !important;"><i style="color:#F11F1F;"  class="fa-solid fa-circle"></i></p>

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
            </template>
            <b-form-input v-model="form.title" placeholder="Add a title" class="title__input" ></b-form-input>
            <br>
            <b-form-textarea class="desc__input no__outline" v-model="form.description" placeholder="Add a description"></b-form-textarea>
            <br>
            <div class="d-flex justiy-content-between">
                <div v-if="!isAllDay" style="margin-top: 10px;">
                    <b-form-input style="width: 320px; border-radius: 4px;" v-model="form.startDate" type="date"></b-form-input>
                    <b-form-input style="width: 320px; margin-top: 16px; border-radius: 4px;" v-model="form.endDate" type="date"></b-form-input>
                </div>

                <div v-else style="margin-top: 10px;">
                    <b-form-input style="width: 460px; border-radius: 4px;" v-model="form.startDate" type="date"></b-form-input>
                    <b-form-input style="width: 460px; margin-top: 16px; border-radius: 4px;" v-model="form.startDate" type="date"></b-form-input>
                </div>

                <div v-if="!isAllDay" style="margin-top: 10px;">
                <b-form-input style="width: 130px; margin-left: 15px; border-radius: 4px;"  :id="`startTime`" v-model="form.startTime" type="time"></b-form-input>
                <b-form-input style="width: 130px; margin-left: 15px; margin-top: 16px; border-radius: 4px;"  :id="`endTime`" v-model="form.endTime" type="time"></b-form-input>                      
                </div>

            </div>
            <div class="d-flex justify-content-start pt-3">
                <p>All day</p>
                <b-form-checkbox style="margin-left:10px;margin-right: 8px;" v-model="isAllDay" name="check-button" class="no__outline" size="lg" switch>
                </b-form-checkbox>

                <b-form-select @change="onOptionChanged" v-model="selected"  :options="options" style="width: 130px;font-size:12px;" class="no__outline"></b-form-select>
            </div>
            <br>
            <div class="d-flex justify-content-end">
                <b-button class="cancel__btn" @click="cancel"> Cancel</b-button>

                <b-button class="addItem__btn" @click="editItem"> Save</b-button>                
            </div>
        </b-modal> -->
        <b-modal id="edit-item" hide-footer hide-header centered hide-header-close @hide="cancel" >
                    <div class="d-flex justify-content-start" style="margin-top: 20px;">
                        <b-form-input v-model="form.title" placeholder="Add a title" class="title__input" ></b-form-input>

                        <b-dropdown id="dropdown-1"  v-b-tooltip.hover title="Select event color" class="color-dropdown">
                    <template #button-content>
                        <p v-if="form.classes==='ePurple'" style="margin: 0px !important;"><i style="color:#AA96DA;" class="fa-solid fa-circle"></i></p>
                        <p v-if="form.classes==='eViolet'" style="margin: 0px !important;"><i style="color:#6F6EAD;"  class="fa-solid fa-circle"></i></p>
                        <p v-if="form.classes==='eGreen'" style="margin: 0px !important;"><i style="color:#5EBC62;" class="fa-solid fa-circle"></i></p>
                        <p v-if="form.classes==='eDarkGreen'" style="margin: 0px !important;"><i style="color:#278A2B;" class="fa-solid fa-circle"></i></p>
                        <p v-if="form.classes==='eYellow'" style="margin: 0px !important;"><i style="color:#FFD74A;"  class="fa-solid fa-circle"></i></p>
                        <p v-if="form.classes==='eOrange'" style="margin: 0px !important;"><i style="color:#F99500;"  class="fa-solid fa-circle"></i></p>
                        <p v-if="form.classes==='eBlue'" style="margin: 0px !important;"><i style="color:#259EE2;"  class="fa-solid fa-circle"></i></p>
                        <p v-if="form.classes==='eDarkBlue'" style="margin: 0px !important;"><i style="color:#0F5F8C;"  class="fa-solid fa-circle"></i></p>
                        <p v-if="form.classes==='ePink'" style="margin: 0px !important;"><i style="color:#F0A1A1;"  class="fa-solid fa-circle"></i></p>
                        <p v-if="form.classes==='eRed'" style="margin: 0px !important;"><i style="color:#F11F1F;"  class="fa-solid fa-circle"></i></p>

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
                        <p>{{this.selected}}</p>
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

                        <b-button class="addItem__btn" @click="showEdit"> Save</b-button>                
                    </div>
        </b-modal>
        <b-modal id="edit-repeat-event" hide-header centered  hide-footer hide-header-close>
            <p>Edit Recurring Event</p>
            <p>All</p>
            <p>This Event</p>
            <div class="float-right">
                <b-button class="cancel__btn" @click="$bvModal.hide('edit-repeat-event')">Cancel</b-button>
                <b-button class="addItem__btn" @click="edit()">Edit this event</b-button>
                <b-button class="addItem__btn" @click="editAllEvent()">Edit all event</b-button>

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
            userId: localStorage.getItem('userId'),
            defaultDate : '',
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
                isAllDay: false
            },
            isAllDay: false,
            selected: null,
            options: [
                {value: null, text: "Doesn't Repeat"},
                {value: "daily", text: "Daily"},
                {value: "weekly", text: "Weekly"},
                {value: "monthly", text: "Monthly"},
            ],
            newStartDate: '',
            start: '',
            end: '',
            color: '',

            showEndsOnDaily: false,
            showEndsOnWeekly: false,
            showEndsOnMonthly: false,
            weekly_until: '',
            daily_until: '',
            monthly_until: '',
            difference: '',
            eId : '',
            recurring_id: '',
            rId: '',

            endsOn: '',
            START_DATE: '',
            END_DATE: ''
            // isAllDay: false

        }
    },
    computed: {
        ...mapState(['showEditModal'])
    },
    mounted() {
        this.$bvModal.show('edit-item')
        console.log('id', this.id)
        this.getData()

    },
    methods: {
        ...mapActions(['getAllEvents']),
        getData(){
            let userId = localStorage.getItem('userId')
            // axios.get(`http://localhost:3030/calendar/event/${this.id}`)
            axios.get(`http://localhost:3030/calendar/user/${userId}/event/${this.id}`)
            .then(response => {
                console.log('Found Event', response.data[0].events)
                // this.event = response.data
                this.form.title = response.data[0].events.title
                this.form.description = response.data[0].events.description
                this.form.startTime = response.data[0].events.startTime
                this.form.endTime = response.data[0].events.endTime
                this.form.classes = response.data[0].events.classes
                this.form.repeat = response.data[0].events.repeat
                this.form.recurring_id = response.data[0].events.recurring_id
                this.form.recurrence_pattern = response.data[0].events.recurrence_pattern
                this.form.isAllDay = response.data[0].events.isAllDay

                this.isAllDay = response.data[0].events.isAllDay

                this.rId = this.form.recurring_id

                this.START_DATE = response.data[0].events.startDate
                this.END_DATE = response.data[0].events.endDate
                this.form.startDate = response.data[0].events.startDate
                this.form.endDate = response.data[0].events.endDate

                this.form.startDate = this.form.startDate.slice(0,10)
                this.form.endDate = this.form.endDate.slice(0,10)

                if(this.form.startTime === null && this.form.endTime === null){
                    this.form.startTime = "08:30"
                    this.form.endTime = "09:30"
                }

                if(response.data[0].events.recurrence_pattern === null){
                    this.selected = null
                } else {
                    this.selected = response.data[0].events.recurrence_pattern
                }


                if(this.form.endDate === null){
                    this.form.endDate = this.START_DATE
                }

                console.log(this.eventDate)

            }) 
            .catch(error => console.log(error))
        },
        showEdit(){
            if(this.form.repeat === true){
                this.$bvModal.show("edit-repeat-event")
            } 
            // else{
            //     this.editItem()
            // }
        },
        editItem() {

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
                this.edit()
            }
            
        },
        edit() {
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
            if(this.form.endDate != null){

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
            }

            this.postEdit()

        },
        addWeekly() {
            this.deleteEvent(this.id)

            this.eId = "e" + Math.random().toString(36).substr(2, 10)
            this.form.recurring_id = this.eId
            this.form.recurrence_pattern = this.selected
            this.form.repeat = true

            this.addItem()

            if(this.endsOn === 'endsOn'){
                for(let i = 0; i < this.difference; i++){
                    const start = new Date(this.form.startDate)
                    start.setDate(start.getDate() + 7)
                    this.form.startDate = start

                    const end = new Date(this.form.endDate)
                    end.setDate(end.getDate() + 7)
                    this.form.endDate = end
                    this.form.repeat = true
                    this.form.recurrence_pattern = "weekly"
                    this.form.recurring_id = this.eId
                    this.form.isAllDay = this.isAllDay

                    this.postAdd()
                }
            } else if(this.endsOn === 'never'){
                for(let i = 0; i < 52; i++){
                    const start = new Date(this.form.startDate)
                    start.setDate(start.getDate() + 7)
                    this.form.startDate = start

                    const end = new Date(this.form.endDate)
                    end.setDate(end.getDate() + 7)
                    this.form.endDate = end
                    this.form.repeat = true
                    this.form.recurrence_pattern = "weekly"
                    this.form.recurring_id = this.eId
                    this.form.isAllDay = this.isAllDay

                    this.postAdd()
                }
            }
        },
        addDaily() {
            this.eId = "e" + Math.random().toString(36).substr(2, 10)
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

            this.form.startDate = newStartDate.toUTCString()

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
            this.form.endDate = newEndDate.toUTCString()
            console.log(this.form.endDate)
            this.form.repeat = true

            this.form.recurring_id = this.eId
            // this.postEdit()
            this.deleteEvent(this.id)
            this.addItem()

            if(this.endsOn === 'endsOn'){
                for(let i = 0; i < this.difference; i++){
                    
                    const start = new Date(this.form.startDate)
                    start.setDate(start.getDate() + 1)
                    this.form.startDate = start

                    const end = new Date(this.form.endDate)
                    end.setDate(end.getDate() + 1)
                    this.form.endDate = end
                    this.form.repeat = true
                    this.form.recurrence_pattern = this.selected
                    this.form.recurring_id = this.eId
                    // this.postEdit()
                    this.addItem()
                    // this.form.recurring_id = this.eId

                    // this.form.startDate = start
                    // this.form.endDate = end

                    console.log(this.form.recurring_id)
                }
            } else if(this.endsOn === 'never'){
                for(let i = 0; i < 365; i++){
                    const start = new Date(this.form.startDate)
                    start.setDate(start.getDate() + 1)
                    this.form.startDate = start

                    const end = new Date(this.form.endDate)
                    end.setDate(end.getDate() + 1)
                    this.form.endDate = end
                    this.form.repeat = true
                    this.form.recurrence_pattern = this.selected
                    this.form.recurring_id = this.eId
                    this.addItem()
                    // this.postEdit()
                    // this.form.recurring_id = this.eId

                    // this.form.startDate = start
                    // this.form.endDate = end

                    console.log(this.form.recurring_id)
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
                this.addItem()
                this.postEdit()

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
            })
            .catch(error => console.log(error))     
        },
        postAdd(){
            axios.post(`http://localhost:3030/calendar/add/event/${this.userId}` , this.form )
            .then(response => {
                console.log("NEW EVENTS",response.data.events)
                // "refreshes" the calendar and shows new event that was added
                this.$store.dispatch('getAllEvents')
                this.$store.commit('setShowEditModal', false)
                this.$bvModal.hide('edit-item')
            })
        },
        addItem(){
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

            this.postAdd()
        },
        editAllEvent(){

            var recurring_events = this.$store.state.items.filter(item => item.recurring_id === this.rId)

            console.log('all recurring events',recurring_events.length)
            let startDatesArray = []; 
            let endDatesArray = []; 


            for(let i = 0; i < recurring_events.length; i++){
                    let start_dates = recurring_events[i].startDate
                    let end_dates = recurring_events[i].endDate

                    startDatesArray.push(start_dates)
                    endDatesArray.push(end_dates)
                    console.log('array', startDatesArray)

                if(this.form.startDate != this.START_DATE){
                    
                    if(this.selected === 'weekly'){
                        var date2 = new Date(this.START_DATE)
                        var date1 = new Date(this.form.startDate)
            
                        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
                        this.difference = Math.floor((date1 - date2) / _MS_PER_DAY) + 1;
                    }
                }

                if(this.form.endDate != this.END_DATE){
                    if(this.selected === 'weekly'){

                        var date3 = new Date(this.END_DATE)
                        var date4 = new Date(this.form.endDate)
            
                        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
                        this.daysDiff = Math.floor((date4 - date3) / _MS_PER_DAY);
    
                        console.log('DIFFFFF', this.daysDiff)
                    }
                }
 
            }

            for(let i = 0; i < startDatesArray.length; i++){
                        // console.log('sad',startDatesArray[i])
                        startDatesArray[i] = new Date(startDatesArray[i]);
                        let newFormStartDate = startDatesArray[i].setDate(startDatesArray[i].getDate() + this.difference)
                        let updatedFormStartDate = new Date(newFormStartDate);
                        this.form.startDate = updatedFormStartDate
                        console.log('new date', updatedFormStartDate)

                        if(this.END_DATE === this.START_DATE){
                            this.form.endDate = updatedFormStartDate
                        } else{
                            endDatesArray[i] = new Date(endDatesArray[i])
                            let newFormEndDate = endDatesArray[i].setDate(endDatesArray[i].getDate() + this.daysDiff)
                            let updatedFormEndDate = new Date(newFormEndDate);
                            this.form.endDate = updatedFormEndDate
                        }

                        var id = recurring_events[i]._id

                        console.log(this.form.startDate)
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
            // axios.post(`http://localhost:3030/calendar/edit/many/event/${this.rId}` , this.form )
            // .then(response => {
            //     console.log("NEW EVENTS",response.data)
            //     // "refreshes" the calendar and shows new event that was added
            //     this.$store.dispatch('getAllEvents')
            //     this.$store.commit('setShowEditModal', false)
            //     this.$bvModal.hide('edit-item')
            // })
            // .catch(error => console.log(error)) 


        },
        cancel() {
            this.$bvModal.hide('edit-item')
            this.$store.commit('setShowEditModal', false)
        },
        onOptionChanged(){
            if(this.selected === 'weekly'){
                this.showEndsOnWeekly = true    
                this.showEndsOnDaily = false
            } else if(this.selected === 'daily'){
                this.showEndsOnDaily = true       
                this.showEndsOnWeekly = false   

            } else if(this.selected === 'monthly'){
                this.showEndsOnMonthly = true
                this.showEndsOnDaily = false  
                this.showEndsOnWeekly = false    
            }
        },
        setUntil(){
            console.log('until', this.weekly_until)
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
    
        deleteEvent(id){
            axios.delete(`http://localhost:3030/calendar/delete/user/${this.userId}/event/${id}`)
            .then(response => {
                console.log('Deleted', response)
            }) 
            .catch(error => console.log(error))
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

</style>
