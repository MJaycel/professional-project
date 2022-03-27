<template>
        <!-- <div class="container-fluid" >
            <div class="row ">
                <div class="side__bar" style="height: 100vh;width: 65px !important;">
                    <div class="mt-5 links">
                        <router-link class="home__link" :to="{name: 'profile', params: {id: this.userId}}">
                            <b-icon icon="person-fill"></b-icon>
                        </router-link>
                    </div>
                    <div class="links">
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
                    <div class="links">
                        <router-link class="home__link" :to="{name: 'PomodoroTimer'}">
                            <b-icon icon="hourglass-bottom"></b-icon>
                        </router-link>
                    </div>

                    <div class="links">
                        <router-link class="home__link" :to="{name: 'MeditationPage'}">
                            <img src="../assets/meditation-icon.svg" style="width:25px;height:25px;"/>
                        </router-link>
                    </div>
                    <div class="links">
                        <router-link class="home__link" :to="{name: 'MusicPlayer'}">
                            <b-icon icon="headphones"></b-icon>
                        </router-link>
                    </div>

                </div>
                <div class="col-5">
                    <h1>Good day, {{this.$store.getters.name}}</h1>
                    <Clock/>
                    <p>You have {{printEvent}} events due</p>

                </div>

                <div class="col-6">
                    <p>"{{quotes.content}}"</p>
                    <p>-{{quotes.author}}</p>
                </div>
                




            </div>
        </div> -->
        <!-- <b-button @click="logout()">Logout</b-button> -->
    <div class="container-fluid">
        <div class="row">
            <div v-if="hideSideBar" style="font-size:26px;padding-top:10px;margin-left:8px;width:65px;">
                <b-icon @click="hideBar" icon="list" style="cursor: pointer;" v-b-tooltip.hover title="Expand Sidebar"></b-icon>
            </div>
            <div class="col-2" style="background:#A4D1A2;height:100vh;padding:0px;" :class="hideDisplay">
                <div class="d-flex justify-content-between" style="font-size:20px;margin-top:20px;">
                    <p class="logo__font">Focus</p>
                    <b-icon @click="hideBar" style="color: #1D6420;margin-top:16px;margin-right:10px;font-weight:500;cursor:pointer;" icon="chevron-double-left"></b-icon>
                </div>
                <div>
                    <!-- <div >
                        <router-link class='icon-links' :to="{name: 'profile', params: {id: this.userId}}">
                            <b-icon icon="person-fill"></b-icon>
                        </router-link>
                    </div> -->
                    <div class="onHover_links">
                        <router-link class="home__link" :to="{name: 'home', params: {id: this.userId}}">
                            <b-icon class="icon-links" icon="house-door-fill"></b-icon>
                            Home
                        </router-link>
                    </div>
                    <div class="onHover_links">
                        <router-link class="home__link" :to="{name: 'calendar',params: {id: this.userId} }">
                            <b-icon class='icon-links' icon="calendar-date-fill"></b-icon>
                            My Calendar
                        </router-link>
                    </div>
                    <div class="onHover_links">
                        <router-link class="home__link" :to="{name: 'todo_page',params: {id: this.userId} }">
                            <b-icon class='icon-links' icon="card-checklist"></b-icon>
                            My Tasks
                        </router-link>
                    </div>
                    <div class="onHover_links">
                        <router-link class="home__link" :to="{name: 'PomodoroTimer'}">
                            <b-icon class='icon-links'  icon="hourglass-bottom"></b-icon>
                            Study
                        </router-link>
                    </div>

                    <div class="onHover_links">
                        <router-link class="home__link" :to="{name: 'MeditationPage'}">
                            <img class='icon-links' src="../assets/meditation-icon.svg" style="width:25px;height:25px;"/>
                            Relax
                        </router-link>
                    </div>
                    <b-button variant="warning" @click="logout()">Logout</b-button>        
                </div>
            </div>

            <!-- greeting and clock -->
            <div class="col pt-4" style="margin-left:20px;">
                <div class="greeting">Good {{this.day}}, <p class="userName"> {{this.$store.getters.name}}</p> </div>
                <Clock/>
                <!-- <p>You have {{printEvent}} events due</p> -->

                <div class="row mt-5"> 
                    <div class="col-5 todo_calEvents" style="margin-right:36px;">
                        <div class="d-flex justify-content-between pt-1">
                            <p class="heading_font">{{this.list.list_title}}</p>
                            <b-dropdown id="icon-dropdown" no-caret right>
                                <template #button-content>
                                    <b-icon icon="three-dots-vertical" style="margin-top:10px;"></b-icon>
                                </template>

                                <b-dropdown-item @click="goToAllTasks" class="font__fam"><b-icon icon="eye" style="margin-right: 15px;width:16px;height:16px;"></b-icon> View All My Tasks</b-dropdown-item>
                            </b-dropdown>
                        </div>
                        <!-- add new task input -->
                        <b-input-group class="input__group">
                            <template #append>
                                <b-input-group-text style="height: 40px;border:none;background-color:transparent !important;">
                                <b-icon @click="addTask" icon="plus" style="width: 20px; height: 20px;"></b-icon>
                                </b-input-group-text>
                            </template>
                            <b-form-input
                                v-model="taskTitle"
                                type="text"
                                class="todo_item_input"
                                v-on:keyup.enter='addTask'
                                placeholder="Add new task"
                                >
                            </b-form-input>                              
                        </b-input-group>

                        <b-list-group >
                            <b-list-group-item v-for="task in tasks" :key="task._id" class="subTask_list" style="padding-top:8px !important;padding-left:8px !important;padding-bottom:10px !important;">
                                <div class="d-flex justify-content-between">
                                    <div class="d-flex justify-content-start">
                                        <b-icon icon="check-circle" v-if="!task.isComplete" style="margin-right: 10px;margin-top: 2px;width:16px;height:16px;color: green;cursor: pointer;" v-b-tooltip.hover title="Set task as complete" @click="setComplete(task,task._id)"></b-icon>
                                        <b-icon icon="check-circle-fill" v-else style="margin-right: 10px;margin-top: 2px;width:16px;height:16px;color: green;cursor: pointer;" v-b-tooltip.hover title="Set task as complete" @click="setComplete(task,task._id)"></b-icon>
                                            
                                        <div class="subTask_edit_input" @click="viewDetails(task._id)" >
                                            <p  style="margin-bottom:0px;">{{task.title}}</p>
                                        </div>
                                    </div>

                                    <b-icon icon="trash" style="margin-top:4px;margin-right:15px;cursor: pointer;width:16px;height:16px;" @click="deleteTask(task._id)"></b-icon>
                                </div>
                                <!-- <div class="d-flex justify-content-between">
                                    <b-input-group>
                                    <b-icon icon="check-circle" v-if="!task.isComplete" style="margin-right: 10px;margin-top: 8px;width:16px;height:16px;color: green;cursor: pointer;" v-b-tooltip.hover title="Set task as complete" @click="setComplete(task,task._id)"></b-icon>
                                    <b-icon icon="check-circle-fill" v-else style="margin-right: 10px;margin-top: 8px;width:16px;height:16px;color: green;cursor: pointer;" v-b-tooltip.hover title="Set task as complete" @click="setComplete(task,task._id)"></b-icon>

                                        <b-form-input
                                            class="subTask_edit_input"
                                            v-model="task.title"
                                            type="text"
                                            v-on:keyup.enter='editTask(task,task._id)'
                                            @blur="editTask(task,task._id)"
                                            >
                                        </b-form-input> 
                                    </b-input-group>
                                    <b-icon icon="trash" style="margin-top:12px;margin-right:15px;cursor: pointer;width:16px;height:16px;" @click="deleteTask(task._id)"></b-icon>
                                </div> -->
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                    <div class="col-5 todo_calEvents">
                        <div class="d-flex justify-content-between pt-1">
                            <p class="heading_font">Upcoming Events</p>
                            <b-dropdown id="icon-dropdown" no-caret right>
                                <template #button-content>
                                    <b-icon icon="three-dots-vertical" style="margin-top:10px;"></b-icon>
                                </template>

                                <b-dropdown-item @click="goToCalendar" class="font__fam"><b-icon icon="eye" style="margin-right: 15px;width:16px;height:16px;"></b-icon> View Calendar</b-dropdown-item>
                            </b-dropdown>
                        </div>

                        <div>
                            <p class="heading_font" style="font-weight:400;">Today</p>
                            
                            <b-list-group >
                                <b-list-group-item v-for="event in itemsFound" :key="event._id" :class="event.classes" class="event_list_home" style="background:transparent !important;border-left:3px;border-style:solid;">
                                    <!-- <p>{{event.title}}</p> -->
                                    {{event.title}}
                                    <p style="margin-bottom:0px;">{{event.startTime}}</p>
                                    <p style="margin-bottom:0px;" v-if="event.isAllDay">All Day</p>
                                    <!-- {{event.classes}} -->
                                </b-list-group-item>
                            </b-list-group>
                        </div>
                        <div>
                            <p class="heading_font" style="font-weight:400;">Tomorrow</p>
                            
                            <b-list-group >
                                <b-list-group-item v-for="event in tomorrowEvents" :key="event._id" :class="event.classes" class="event_list_home" style="background:transparent !important;border-left:3px;border-style:solid;">
                                   {{event.title}}
                                    <p style="margin-bottom:0px;">{{event.startTime}}</p>
                                    <p style="margin-bottom:0px;" v-if="event.isAllDay">All Day</p>
                                </b-list-group-item>
                                <b-icon icon="trash" style="margin-top:12px;margin-right:15px;cursor: pointer;width:16px;height:16px;" @click="deleteEvent(task._id)"></b-icon>

                            </b-list-group>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <!-- end of row -->
        <TaskDetails v-if="this.$store.state.showTask" :id ='id' :list_id ='listId'/>


    </div>
</template>


<script>
import axios from 'axios'
import Clock from '@/components/clock.vue'
import {mapState} from 'vuex'
import TaskDetails from '@/components/TaskDetails.vue'

export default {
    name: "Home",
    components:{
         Clock,
         TaskDetails
    },
    data() {
        return{
            quotes:[],
            date:'',
            printEvent: '',
            userId: localStorage.getItem('userId'),

            hideSideBar: false,
            hideDisplay: '',
            day: '',

            ///to do datas
            taskForm: {
                title: '',
                description: '',
                startDate: '',
                priorityLevel: '',
                progress: '',
                inCalendar: false,
                isComplete: false
            },
            taskTitle: '',
            firstItem: {},
            tasks: [],
            listId: '',
            list:{},
            dateItems: [],
            itemsFound: [],
            noItemsFound: false,

            tomorrowEvents: [],
            today: new Date(),
            tomorrow: new Date(),

            showInput: false


        }
    },

    mounted(){
        const CURRENT_DATE = new Date()

        const hours = CURRENT_DATE.getHours()

        if(hours < 12){
            this.day = 'Morning'
        } else if(hours > 12 && hours < 18 ){ 
            this.day = 'Afternoon'
        } else if(hours > 18){
            this.day = 'Evening'
        }

        this.today = this.today.toDateString().slice(0,-4).trim();
        this.tomorrow.setDate(this.tomorrow.getDate() + 1)
        this.tomorrow = this.tomorrow.toDateString().slice(0,-4).trim();
        this.getQuotes();
        // this.getDate();
        this.getAllLists();
        this.todaysEvents();
        this.firstItem = this.$store.state.firstList

        // this.tasks = this.firstItem.items
        console.log(this.$store.getters.name);
        console.log('tomorrow', this.tomorrow)
        // console.log("events today",this.$store.getters.events);
        // console.log('first to do ',this.$store.getters.firstList.items)
    },
    computed: {
        ...mapState(['loggedIn','firstList','showTask'])
    },

    methods: {
        logout() {
            this.$store.dispatch('logout')
            this.$router.push({name: 'landing_page'})
        },
        
        getDate(){
            const CURRENT_DATE = new Date();
            // NOTE = had to manually add a "0" so once it gets to doube digits this will probs break
            // temporary fix btw
            const date = CURRENT_DATE.getFullYear()+'-0'+(CURRENT_DATE.getMonth()+1)+'-'+CURRENT_DATE.getDate();

            console.log("todays date is", date)
            var numEvents = this.$store.getters.events
            var numEventLength = numEvents.length
            this.printEvent = numEventLength
            var shortenLength = numEventLength - 1;

            console.log("This is the number of events", shortenLength)
            var counter = 0;
            var eventPrint = 0

            while( counter < shortenLength ){
                console.log(this.$store.getters.events)
                
                var stringDate = this.$store.getters.events[shortenLength].startDate.toString()
                var result = stringDate.slice(0, 10)

                console.log(result)

                console.log("THIS IS THE RESULT",result)

                var dateToString = date.toString()
                var slicedDate = dateToString.slice(0, 10)
                
                console.log("THIS IS THE SLICED DATE",slicedDate)

                if(result == slicedDate){
                    console.log("ITS WORKING");
                    
                    eventPrint++
                    console.log("printEvent is", eventPrint)
                }

                counter++;
                
            }
            this.printEvent = eventPrint


            // while(numEvents != 0){
            //     var test = 0
            //         if(this.$store.getters.events[test].startDate == this.date){
            //         console.log("works")
            //     }

            //     test++
            //     numEvents--
            // }
            
        },
        getQuotes(){
            axios
            .get(`https://quotable.io/random`)
            .then((response) =>{
                console.log(response)
                this.quotes = response.data
            })
            .catch(error => console.log(error))
        },
        hideBar() {
            this.hideSideBar = !this.hideSideBar

            if(this.hideSideBar){
                this.hideDisplay = 'hide_sideBar'
            } else if(this.hideSideBar === false) {
                this.hideDisplay = 'display_sideBar'
            }
        },
        ///// Add new task
        addTask() {
            // console.log('add', this.listId)
            let userId = localStorage.getItem('userId')

            if(this.taskForm.title === ''){
                this.taskForm.title = 'Untitled'
            }

            this.taskForm.title = this.taskTitle

            this.taskForm.priorityLevel = 'Medium Priority'
            this.taskForm.progress = 'Not Started'
            this.taskForm.isComplete = false

            axios.post(`http://localhost:3030/todo/add/user/${userId}/list/${this.listId}`, this.taskForm)
            .then(response => {
                console.log('New task added', response.data)
                this.taskTitle = ''
                // this.getData()
                this.getAllLists()
            })
            .catch(error => console.log(error))
        },
                // Edit task
        editTask(task,id) {
            this.getItem(id)
            let userId = localStorage.getItem('userId')
            this.taskForm.title = task.title


            axios.post(`http://localhost:3030/todo/edit/user/${userId}/list/${this.listId}/item/${id}`, this.taskForm)
            .then(response => {
                console.log('item edited', response.data)

            })
            .catch(error => console.log(error))
        },
        //// get all users lists
        getAllLists(){
            axios.get(`http://localhost:3030/todo/${this.userId}`)
                .then(response => {
                    this.list = response.data[0]
                    console.log('Lists', response.data[0]) 
                    this.listId = response.data[0]._id
                    this.tasks = response.data[0].items
                }) 
                .catch(error => console.log(error))
        },
        // Get Item
        getItem(id) {
            axios.get(`http://localhost:3030/todo/user/${this.userId}/list/${this.listId}/item/${id}`)
            .then(response => {
                console.log('EDIT',response.data[0].todoLists.items)
                this.item = response.data[0].todoLists.items

                this.taskForm.title= this.item.title
                this.taskForm.description = this.item.description
                this.taskForm.startDate = this.item.startDate
                this.taskForm.priorityLevel = this.item.priorityLevel
                this.taskForm.progress = this.item.progress
                this.taskForm.inCalendar = this.item.inCalendar

                if(this.taskForm.inCalendar === true){
                    this.itemInCalendar = true
                }

                console.log('form filled', this.taskForm)
                console.log('in cal', this.taskForm.inCalendar)

            })
            .catch(error => console.log(error))
        },
        setComplete(task,id){
            let userId = localStorage.getItem('userId')

            this.taskForm.title = task.title
            this.taskForm.description = task.description
            this.taskForm.startDate = task.startDate
            this.taskForm.priorityLevel = task.priorityLevel
            this.taskForm.progress = task.progress
            this.taskForm.inCalendar = task.inCalendar
            this.taskForm.isComplete = !this.taskForm.isComplete

            axios.post(`http://localhost:3030/todo/edit/user/${userId}/list/${this.listId}/item/${id}`, this.taskForm) 
            .then(response => {
                console.log("set complete", response.data)
                // this.subTaskForm.title = ''
                this.getAllLists()
                // this.getItem(id)
            })   
            .catch(error => console.log(error))
        },
        deleteTask(id){
            let userId = localStorage.getItem('userId')

            axios.delete(`http://localhost:3030/todo/delete/user/${userId}/list/${this.listId}/item/${id}`)
            .then(response => {
                console.log('DELETED' ,response)
                // this.getItem()
                this.getAllLists()
                this.deleteEvent()
                // this.$emit('getListData')
                this.method()   
                this.alert()
            })
            // this.$emit('deleteTask')
        },
        goToAllTasks(){
            let userId = localStorage.getItem('userId')

            this.$router.push({name: 'todo_page', params: {
                id: userId
            }})
        },
        viewDetails(id){
            console.log('details id', id)
            console.log('show Task', this.$store.state.showTask)

            this.id = id
            this.list_id = this.listId
            this.$store.commit('setShowTask', true)
        },

        deleteEvent() {
            this.findInEvents()
            let userId = localStorage.getItem('userId')
            axios.delete(`http://localhost:3030/calendar/delete/user/${userId}/event/${this.event_id}`)
            .then(response => {
                console.log('Deleted', response)
                // this.$store.dispatch('getAllEvents')
            }) 
            .catch(error => console.log(error))
        },
        findInEvents() {
            this.$store.dispatch('getAllEvents')

            console.log('EVENTS FROM CAL', this.$store.state.items)
            /// looping through each events and find the item that has the id that is being passed 
            // if found set event_id as the event that was found and use that id to edit the startDate on the task/event
            Array.from(this.$store.state.items).forEach((item)=> {
                if(item.item_id === this.id){
                    this.event_id = item._id
                }    
            })
        },

        ////CALENDAR
        todaysEvents() {
            //get all events first
            axios.get(`http://localhost:3030/calendar/${this.$route.params.id}`)
            .then(response=> {
                this.dateItems = response.data
                    this.dateItems.forEach(events => {
                        this.dates = new Date(events.startDate)
                        events.startDate = this.dates.toDateString().slice(0,-4).trim()

                        this.itemsFound = this.dateItems.filter(events => events.startDate === this.today)
                        if(this.itemsFound.length < 1) {
                            this.noItemsFound = true
                        }

                        this.tomorrowEvents = this.dateItems.filter(events => events.startDate === this.tomorrow)
                    });
                    

                    console.log('items', this.tomorrowEvents)
            })
            .catch(error => console.log(error))   
        },
        // getTomorrowEvents() {
        //     this.tomorrow = new Date()
        //     this.tomorrow.setDate(this.tomorrow.getDate() + 1)
        //     this.tomorrow = this.tomorrow.toDateString().slice(3)

        //     console.log('tomorrow is',this.tomorrow)

        //     let userId = localStorage.getItem('userId')
        //     axios.get(`http://localhost:3030/calendar/${userId}`)
        //     .then(response=> {
        //         this.dateItems = response.data
        //             this.dateItems.forEach(events => {
        //                 const dates = new Date(events.startDate)
        //                 events.startDate = dates.toDateString().slice(0,-4).trim()

        //                 this.tomorrowEvents = this.dateItems.filter(events => events.startDate === this.tomorrow)
        //                 if(this.tomorrowEvents.length < 1) {
        //                     this.noItemsFound = true
        //                 }
        //             });
        //     })
        //     .catch(error => console.log(error))    
        // },
        goToCalendar(){
            let userId = localStorage.getItem('userId')

            this.$router.push({name: 'calendar', params: {
                id: userId
            }})
        },
    },
    watch:{
        tasks: {
            handler(){
                console.log('CHANGEES')
                this.getAllLists()
                this.todaysEvents()
            }
        },    
    } 
    
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Croissant+One&display=swap');

.hide_sideBar{
    display: none;
}

.display_sideBar{
    display: block;
    visibility: visible;
}

.greeting{
   font-family: 'Poppins',sans-serif;
   font-size: 36px !important;
   margin-bottom: 0px !important;
}
.userName{
    font-family: 'Croissant One',cursive;
    font-size:36px !important;
    display: inline-block;
    letter-spacing: -0.08em;
    color: #AA96DA;
}

.todo_calEvents{
    height: 100%;
    border-radius: 12px;
    padding: 10px;

    background: #FFFFFF;
    box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.25);
}

.event_list_home{
    font-family: 'Poppins',sans-serif;
    font-size:14px !important;
    padding: 6px 0px 6px 10px !important;
    border-top: none !important;
    border-right: none !important;
    border-bottom: none !important;
    border-radius: 0px !important; 

    margin-bottom:6px !important;
}
</style>
