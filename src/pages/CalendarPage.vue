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
                    :time-format-options="{ hour: 'numeric', minute: '2-digit' }"
                    :displayPeriodUom="period"
                    class="theme-default cal">
                    <template #header="{ headerProps }">
                        <div class="row justify-content-between">
                            <div class="col row d-flex justify-content-start">
                                <div class="col-1">
                                    <button
                                        style="border:none;"
                                        type="button"
                                        class="previousPeriod"
                                        aria-label="Current Period"
                                        @click.prevent="setShowDate(headerProps.previousPeriod)"
                                    >
                                    <b-icon icon="caret-left-fill" style="color:#7BC17E;margin-top:0.4em;margin-left:0.8em;"></b-icon>
                                    </button>
                                </div>
                                <div class="cv-header button col-1 d-flex justify-content-center" style="color: #7BC17E;cursor:pointer" @click.prevent="setShowDate(headerProps.currentPeriod)">
                                    <!-- <slot name="label">{{headerProps.periodLabel}}</slot>                             -->
                                   <slot name="label">Today</slot>      
                                </div>
                                <div class="col-1">
                                    <button
                                        style="border:none;"
                                        type="button"
                                        class="previousPeriod"
                                        aria-label="Current Period"
                                        @click.prevent="setShowDate(headerProps.nextPeriod)"
                                    >
                                    <b-icon icon="caret-right-fill" style="color:#7BC17E;margin-top:0.4em;margin-left:0.8em;"></b-icon>
                                    </button>
                                </div>
                                <div class="cv-header button col-8" >
                                    <slot name="label">{{headerProps.periodLabel}}</slot>                            
                                   <!-- <slot name="label">Today</slot>       -->
                                </div>
                            </div>
                            <div class="col-2">
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
                                     
       
     
    </div>
</template>

<script>
import { CalendarView} from "vue-simple-calendar"

// require("vue-simple-calendar/static/css/default.css")
// require("vue-simple-calendar/static/css/holidays-us.css")

// CSS FOR CALENDAR
require("@/css/calendar.css")

export default ({
    name: 'Calendar',
    components: {
        CalendarView,
        // CalendarViewHeader,
    },
    data() {
        return{
            showDate: new Date(),
            userId: localStorage.getItem('userId'),
            period: 'month',
            options: [
                {value: 'month', text: 'Month'},
                {value: 'week', text: 'Week' },
            ]

        }
    },
    methods: {
        setShowDate(d) {
            this.showDate = d;
        },
    }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap');

.period_select:focus{
    outline:0px !important; 
    box-shadow: none !important;
}
</style>
