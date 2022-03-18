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
            <!-- calendar div -->
            <div>
                <calendar-view
                    :show-date="showDate"
                    :items= this.$store.state.items
                    :show-times= true
                    @click-date="clickdate"
                    :time-format-options="{ hour: 'numeric', minute: '2-digit' }"
                    :displayPeriodUom="period"
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
        <AddEvent v-if="showAddModal"/>

     
    </div>
</template>

<script>
import { CalendarView} from "vue-simple-calendar"
import { mapState } from "vuex"
import AddEvent from '@/components/AddEvent.vue'
import {mapActions} from 'vuex'
// import axios from 'axios'

// require("vue-simple-calendar/static/css/default.css")
// require("vue-simple-calendar/static/css/holidays-us.css")

// CSS FOR CALENDAR
require("@/css/calendar.css")

export default ({
    name: 'Calendar',
    components: {
        CalendarView,
        // CalendarViewHeader,
        AddEvent
    },
    data() {
        return{
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
            ]

        }
    },
    computed: {
        ...mapState(['showAddModal','date','item_id','showEditModal'])
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
        // getAllEvents() {
        // //////get all events
        //     let userId = localStorage.getItem('userId')
        //     axios.get(`http://localhost:3030/calendar/${userId}`)
        //         .then(response=> {
        //             console.log('EVENTS', response.data)
        //             this.items = response.data
        //             // context.commit('setCalendarItems', response.data)
        //             // context.commit("SET_EVENTS", response.data)
        //         })
        //         .catch(error => console.log(error))     
        // }

    }
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
