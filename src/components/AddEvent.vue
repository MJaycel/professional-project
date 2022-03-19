<template>
    <div>
        <!-- ADD ITEM MODAL -->
        <b-modal id="add-item" hide-footer centered hide-header-close @hide="cancel" >
            <template #modal-header>
                <h3>Add Event</h3>
                <b-dropdown id="dropdown-1"  v-b-tooltip.hover title="Select event color" class="color-dropdown">
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
                    <!-- <b-dropdown-item @click="(priority = 'Low Priority'),editPriority(data.item._id)" value="Low Priority">Low Priority</b-dropdown-item> -->
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

                <b-button class="addItem__btn" @click="addItem"> Save</b-button>                
            </div>
        </b-modal>

        <!-- <b-modal id="weekly-settings">
            <p>Occurs every week until: </p>
            <b-form-input  style="width: 460px; border-radius: 4px;" v-model="newStartDate" type="date"></b-form-input>
        </b-modal> -->
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
                classes: "ePurple"
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
            // setColorTheme: {
            //     classes: ''
            // }
            colorClass: '',
            color: '#AA96DA'
        }
    },
    mounted() {
        this.$bvModal.show('add-item')
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
        console.log('this is the start date', this.form.startDate)
    },
    computed: {
        ...mapState(['showAddModal','date'])
    },
    methods: {
        ...mapActions(['getAllEvents']),
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

            // this.form.classes= this.colorClass
            axios.post(`http://localhost:3030/calendar/add/event/${this.userId}` , this.form )
            .then(response => {
                console.log("NEW EVENTS",response.data.events)
                // "refreshes" the calendar and shows new event that was added
                this.$store.dispatch('getAllEvents')
                this.$store.commit('setShowAddModal', false)
                this.$bvModal.hide('add-item')
            })
            .catch(error => console.log(error))    
            //////// MONTHLY SETTING
            if(this.selected === 'monthly'){
                for(let i = 0; i < 12; i++){
                    // const start = new Date(this.form.startDate)
                    // start.setMonth(i)
                    // this.form.startDate = start

                    // const end = new Date(this.form.endDate)
                    // end.setMonth(i)
                    // this.form.endDate = end

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
                    this.form.startDate = start_UTC.toUTCString()

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
                    this.form.endDate = end_UTC.toUTCString()

                    axios.post(`http://localhost:3030/calendar/add/event/${this.userId}` , this.form )
                    .then(response => {
                        console.log("NEW EVENTS",response.data.events)
                        // "refreshes" the calendar and shows new event that was added
                        this.$store.dispatch('getAllEvents')
                        this.$store.commit('setShowAddModal', false)
                        this.$bvModal.hide('add-item')
                    })
                    .catch(error => console.log(error))     

                }
            }

            ////// ERRORS
            ////// not adding in date selected
            ////// Time adds automatically for some reason
            ////// Doesnt add 7 days ?
            ////// works perfectly in console but messes up when saved in database
            ////// date changes
            ///////// found the main problem === time changes because of daylight savings time from march to oct
            ////// works fine if time is added 
            ///// Event not adding to the date clicked
            ///// found a solution === turn date to UTC

            if(this.selected === 'weekly'){
                for(let i = 0; i < 7; i++){

                    ////setting start date
                    const start = new Date(this.form.startDate)
                    const userInputStart = this.form.startTime
                    const hours_start = userInputStart.slice(0,2)
                    const minutes_start = userInputStart.slice(3)
                    const year_start = start.getFullYear()
                    const month_start = start.getMonth()
                    const date_start = start.getDate()
                    
                    if(this.isAllDay){
                        var start_UTC = new Date(Date.UTC(year_start,month_start,date_start))
                    } else {
                        start_UTC = new Date(Date.UTC(year_start,month_start,date_start,hours_start,minutes_start))
                    }

                    start_UTC.setUTCDate(start_UTC.getUTCDate())
                    this.form.startDate = start_UTC.toUTCString()

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

                    var end_UTC = new Date(Date.UTC(year_end,month_end,date_end,hour_end,minute_end))

                    end_UTC.setUTCDate(end_UTC.getUTCDate())
                    this.form.endDate = end_UTC.toUTCString()

                    console.log('start date',this.form.startDate )
                    // // console.log('end date',this.form.endDate)

                    axios.post(`http://localhost:3030/calendar/add/event/${this.userId}` , this.form )
                    .then(response => {
                        console.log("NEW EVENTS",response.data.events)
                        // "refreshes" the calendar and shows new event that was added
                        this.$store.dispatch('getAllEvents')
                        this.$store.commit('setShowAddModal', false)
                        this.$bvModal.hide('add-item')
                    })
                    .catch(error => console.log(error))     

                    
                    start_UTC.setUTCDate(start_UTC.getUTCDate() + 7)
                    this.form.startDate = start_UTC.toUTCString()

                    end_UTC.setUTCDate(end_UTC.getUTCDate() + 7)
                    this.form.endDate = end_UTC.toUTCString()
                }
            }

            if(this.selected === 'daily'){
               ////////////// TESTING PURPOSES ///////////////////////////////////
                // for(let i = 0; i < 365; i++){
                //     const start = new Date(this.form.startDate)
                //     start.setDate(start.getDate() + 1)
                //     this.form.startDate = start

                //     const end = new Date(this.form.endDate)
                //     end.setDate(end.getDate() + 1)
                //     this.form.endDate = end

                //     console.log('start date',this.form.startDate)
                //     console.log('end Date',this.form.endDate)

                // }
                ///////Saving in database /////
                for(let i = 0; i < 7; i++){
                    const start = new Date(this.form.startDate)
                    start.setDate(start.getDate() + 1)
                    this.form.startDate = start

                    const end = new Date(this.form.endDate)
                    end.setDate(end.getDate() + 1)
                    this.form.endDate = end

                    axios.post(`http://localhost:3030/calendar/add/event/${this.userId}` , this.form )
                    .then(response => {
                        console.log("NEW EVENTS",response.data.events)
                        // "refreshes" the calendar and shows new event that was added
                        this.$store.dispatch('getAllEvents')
                        this.$store.commit('setShowAddModal', false)
                        this.$bvModal.hide('add-item')
                    })
                    .catch(error => console.log(error))     
    
                    this.form.startDate = start
                    this.form.endDate = end
                }
            }

 

        },
        cancel() {
            this.$bvModal.hide('add-item')
            this.$store.commit('setShowAddModal', false)
        },
        onOptionChanged(){
            if(this.selected === 'weekly'){
                this.$bvModal.show('weekly-settings')                
            }
        },
        // setColorTheme(){
        //     // this.colorClass = 
        // }
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

</style>
