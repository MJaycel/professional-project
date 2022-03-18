<template>
    <div>
        <!-- EDIT ITEM MODAL -->
        <b-modal id="edit-item" hide-footer centered hide-header-close no-close-on-backdrop title="Edit Event">
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
        </b-modal>

        <b-modal id="weekly-settings">
            <p>Occurs every week until: </p>
            <b-form-input  style="width: 460px; border-radius: 4px;" v-model="newStartDate" type="date"></b-form-input>
        </b-modal>
    </div>
</template>

<script>

import axios from 'axios'
import {mapState, mapActions} from 'vuex'



export default {
    name: "AddEvent",  
    props: [
        'id'
    ],
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
                endTime: ""
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
            end: ''
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
            axios.get(`http://localhost:3030/calendar/event/${this.id}`)
            .then(response => {
                console.log('Found Event', response.data)
                // this.event = response.data
                this.form.title = response.data.title
                this.form.description = response.data.description
                this.form.startTime = response.data.startTime
                this.form.endTime = response.data.endTime

                const start = new Date(response.data.startDate)
                
                const yearStart = start.getFullYear()
                const monthStart = start.getMonth() + 1
                const dateStart = start.getDate()

                if(monthStart > 9){
                    this.start = yearStart + '-' + monthStart + '-' + dateStart
                    if(dateStart > 9){
                        this.start = yearStart + '-' + monthStart + '-' + dateStart
                    }            
                } else {
                    this.start = yearStart + '-0' + monthStart + '-' + dateStart
                    if(dateStart < 9){
                        this.start = yearStart + '-0' + monthStart + '-0' + dateStart
                    }          
                }

                const end = new Date(response.data.endDate)
                
                const yearEnd = end.getFullYear()
                const monthEnd = end.getMonth() + 1
                const dateEnd = end.getDate()

                if(monthEnd > 9){
                    this.end = yearEnd + '-' + monthEnd + '-' + dateEnd
                    if(dateEnd > 9){
                        this.end = yearEnd + '-' + monthEnd + '-' + dateEnd
                    }            
                } else {
                    this.end = yearEnd + '-0' + monthEnd + '-' + dateEnd
                    if(dateEnd < 9){
                        this.end = yearEnd + '-0' + monthEnd + '-0' + dateEnd
                    }          
                }
                this.form.startDate = this.start
                this.form.endDate = this.end

                // const event_start_date = new Date(response.data.startDate)
                // this.eventStartDate = event_start_date.toDateString().slice(0,10)

                // const event_end_date = new Date(response.data.endDate)
                // this.eventEndDate = event_end_date.toDateString().slice(0,10)


                console.log(this.eventDate)

            }) 
            .catch(error => console.log(error))
        },
        editItem() {

            const userInputStart = this.form.startTime
            const userInputEnd = this.form.endTime

            //setting start time
            const hours_start = userInputStart.slice(0,2)
            const minutes_start = userInputStart.slice(3)

            const date_start = new Date(this.form.startDate)
            date_start.setHours(hours_start, minutes_start)
            this.form.startDate = date_start

            /// setting end date 
            const hours_end = userInputEnd.slice(0,2)
            const minutes_end = userInputEnd.slice(3)

            const date_end = new Date(this.form.endDate)
            date_end.setHours(hours_end, minutes_end)
            this.form.endDate = date_end


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

                    axios.post(`http://localhost:3030/calendar/edit/event/${this.id}` , this.form )
                    .then(response => {
                        console.log("NEW EVENTS",response.data.events)
                        // "refreshes" the calendar and shows new event that was added
                        this.$store.dispatch('getAllEvents')
                        this.$store.commit('setShowEditModal', false)
                        this.$bvModal.hide('edit-item')
                    })
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

                    axios.post(`http://localhost:3030/calendar/edit/event/${this.id}` , this.form )
                    .then(response => {
                        console.log("NEW EVENTS",response.data.events)
                        // "refreshes" the calendar and shows new event that was added
                        this.$store.dispatch('getAllEvents')
                        this.$store.commit('setShowEditModal', false)
                        this.$bvModal.hide('edit-item')
                    })
                    
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
                        this.$store.commit('setShowEditModal', false)
                        this.$bvModal.hide('edit-item')
                    })
                    this.form.startDate = start
                    this.form.endDate = end
                }
            }

            axios.post(`http://localhost:3030/calendar/edit/event/${this.id}` , this.form )
            .then(response => {
                console.log("NEW EVENTS",response.data.events)
                // "refreshes" the calendar and shows new event that was added
                this.$store.dispatch('getAllEvents')
                this.$store.commit('setShowEditModal', false)
                this.$bvModal.hide('edit-item')
            })
            .catch(error => {
                console.log(error)
            })
        },
        cancel() {
            this.$bvModal.hide('edit-item')
            this.$store.commit('setShowEditModal', false)
        },
        onOptionChanged(){
            if(this.selected === 'weekly'){
                this.$bvModal.show('weekly-settings')                
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
