<template>
    <div>
        <!-- ADD ITEM MODAL -->
        <b-modal id="add-item" hide-footer hide-header-close no-close-on-backdrop title="Add Event">
            <b-form-input v-model="form.title" placeholder="Add a title" class="title__input" ></b-form-input>
            <br>
            <b-form-textarea class="desc__input no__outline" placeholder="Add a description"></b-form-textarea>
            <br>
            <div class="d-flex justify-content-end">
                <p>All day</p>
                <b-form-checkbox style="margin-left:10px;margin-right: 8px;" v-model="isAllDay" name="check-button" class="no__outline" size="lg" switch>
                </b-form-checkbox>

                <b-form-select v-model="selected" :options="options" style="width: 130px;font-size:12px;" class="no__outline"></b-form-select>
            </div>

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
            <br>
            <div class="d-flex justify-content-end">
                <b-button class="cancel__btn" @click="cancel"> Cancel</b-button>

                <b-button class="addItem__btn" @click="addItem"> Save</b-button>                
            </div>

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
                {value: "Yearly", text: "Yearly"},
            ],
        }
    },
    mounted() {
        this.$bvModal.show('add-item')
    },
    computed: {
        ...mapState(['showAddModal'])
    },
    methods: {
        ...mapActions(['getAllEvents']),
        addItem() {
            const userInputStart = this.form.startTime
            const userInputEnd = this.form.endTime

            const hours_start = userInputStart.slice(0,2)
            const minutes_start = userInputStart.slice(3)

            const date_start = new Date(this.form.startDate)
            date_start.setHours(hours_start, minutes_start)
            this.form.startDate = date_start

            // console.log(this.form.startDate)

            const hours_end = userInputEnd.slice(0,2)
            const minutes_end = userInputEnd.slice(3)

            const date_end = new Date(this.form.endDate)
            date_end.setHours(hours_end, minutes_end)
            this.form.endDate = date_end

            // console.log(this.form.endDate)

            if(this.selected === 'monthly'){
                for(let i = 0; i < 12; i++){
                    const start = new Date(this.form.startDate)
                    start.setMonth(i)
                    this.form.startDate = start

                    const end = new Date(this.form.endDate)
                    end.setMonth(i)
                    this.form.endDate = end

                    // this.form.startTime = "0000-00-00T" + this.form.startTime + ":00.000Z"
                    axios.post(`http://localhost:3030/calendar/add/event/${this.userId}` , this.form )
                    .then(response => {
                        console.log("NEW EVENTS",response.data.events)
                        // "refreshes" the calendar and shows new event that was added
                        this.$store.dispatch('getAllEvents')
                        this.$store.commit('setShowAddModal', false)
                        this.$bvModal.hide('add-item')
                    })
                }
            }
            
        },
        cancel() {
            this.$bvModal.hide('add-item')
            this.$store.commit('setShowAddModal', false)
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
