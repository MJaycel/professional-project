<template>
    <div class="container-fluid d-flex" style="padding:0px;" :class="theme">
        <!-- sidebar  -->
        <div style="width: 65px !important;padding:0px;background: white;" class="side__bar">
            <div class="mt-5"  style="padding: 20px;">
                <router-link :class="theme" style="font-size: 18px;background-color: transparent !important;" :to="{name: 'home', params: {id: this.userId}}">
                    <b-icon icon="house-door-fill" ></b-icon>
                </router-link>
            </div>
            <div style="padding: 20px;">
                <router-link :class="theme" style="font-size: 18px;background-color: transparent !important;" :to="{name: 'calendar',params: {id: this.userId} }">
                    <b-icon icon="calendar-date-fill" ></b-icon>
                </router-link>
            </div>
            <div style="padding: 20px;">
                <router-link :class="theme" style="font-size: 18px;background-color: transparent !important;" :to="{name: 'todo_page',params: {id: this.userId} }">
                    <b-icon icon="card-checklist"></b-icon>
                </router-link>
            </div>
        </div>

        <div class="col-7" style="color:black !important;margin-left: 5px;" :class="theme">
            <!-- delete alert -->
            <b-alert class="m-1"
            :show="dismissCountDown"
            dismissible
            variant="success"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
            >
            Item deleted
            </b-alert>
            <!-- tasks lists  -->
            <div class="tasks_list_block mt-3">
                <!-- list title --> 
                <div class="title__box">
                    <!-- <p>{{this.form.list_title}}</p> -->
                        <b-input-group class="edit__input_group">
                            <b-form-input
                                v-model="form.list_title"
                                type="text"
                                class="todo_title_input"
                                v-on:keyup.enter='EditListName'
                                >
                            </b-form-input>                        
                        </b-input-group>
                </div>

                <!-- add new task input -->
                <b-input-group class="input__group">
                    <template #append>
                        <b-input-group-text style="height: 40px;border:none;background-color:transparent !important;">
                        <b-icon @click="addTask" icon="plus" style="width: 20px; height: 20px;"></b-icon>
                        </b-input-group-text>
                    </template>
                    <b-form-input
                        v-model="taskForm.title"
                        type="text"
                        class="todo_item_input"
                        v-on:keyup.enter='addTask'
                        placeholder="Add new task"
                        >
                    </b-form-input>                              
                </b-input-group>

                <div>
                    <b-table responsive :items="items" :fields="headings" style="overflow: inherit">
                    <template #cell(title)="data" >
                        <div @click="viewDetails(data.item._id)" @contextmenu="handler($event,data.item._id)"  id="task">
                            <p v-if="data.item.isComplete" style="font-family:'Poppins', 'sans-serif';font-size:14px;margin:0px;padding-top:10px;text-decoration: line-through;">{{data.item.title}}</p>
                            <p v-else style="font-family:'Poppins', 'sans-serif';font-size:14px;margin:0px;padding-top:10px;">{{data.item.title}}</p>                            
                        </div>
                    </template>
                    <ul id="right-click-menu" tabindex="-1" ref="left" v-if="viewMenu" @blur="viewMenu=false" :style="{top:top,left:left}">
                        <!-- <li @click="editList">Edit</li> -->
                        <!-- <li @focus="viewMenu = true" @click="showDelete(listId)">Delete</li> -->
                        <li >Edit</li> 
                    </ul>
                    <template #cell(progress)="data">
                        <b-dropdown id="dropdown-2" no-caret block>
                            <template #button-content>
                                <div v-if="data.item.progress==='In Progress'"  :class="orange" style="border: 1px solid;border-radius:20px; padding:0px 26px 16px 26px;height:30px;">
                                    <p style="padding-top:2px;font-size:14px;">{{data.item.progress}}</p>
                                </div>
                                <div v-if="data.item.progress==='Not Started'" :class="blue" style="border: 1px solid;border-radius:20px; padding:0px 26px 16px 26px;height:30px;">
                                    <p style="padding-top:2px;font-size:14px;">{{data.item.progress}}</p>
                                </div>
                                <div v-if="data.item.progress==='Completed'"  :class="green" style="border: 1px solid;border-radius:20px; padding:0px 26px 16px 26px;height:30px;">
                                    <p style="padding-top:2px;font-size:14px;">{{data.item.progress}}</p>
                                </div>
                            </template>        
                            <b-dropdown-item class="dropdown_" @click="(progress = 'Not Started'),editProgress(data.item._id)" value="Not Started">Not Started</b-dropdown-item>
                            <b-dropdown-item class="dropdown_" @click="(progress = 'In Progress'),editProgress(data.item._id)" value="In Progress">In Progress</b-dropdown-item>                    
                            <b-dropdown-item class="dropdown_" @click="(progress = 'Completed'),editProgress(data.item._id)" value="Completed">Completed</b-dropdown-item>
                        </b-dropdown>
                    </template>

                    <template #cell(priorityLevel)="data">
                        <b-dropdown id="dropdown-1" no-caret>
                            <template #button-content class="button_priority">
                                <p v-if="data.item.priorityLevel === 'Low Priority'" class="priority__level" id="priority" >
                                    <b-icon icon="circle-fill" style="width:12px;height:12px;color:#F3CC00;margin-right:10px;margin-bottom:4px;"></b-icon>
                                    {{data.item.priorityLevel}}
                                </p>        
                                <p v-if="data.item.priorityLevel === 'High Priority'" class="priority__level" >
                                    <b-icon icon="circle-fill" style="width:12px;height:12px;color:#E30000;margin-right:10px;margin-bottom:4px;"></b-icon>
                                    {{data.item.priorityLevel}}
                                </p>     
                                <p v-if="data.item.priorityLevel === 'Medium Priority'" class="priority__level" >
                                    <b-icon icon="circle-fill" style="width:12px;height:12px;color:#FF8B4A;margin-right:10px;margin-bottom:4px;"></b-icon>
                                    {{data.item.priorityLevel}}
                                </p> 
                            </template>
                            <b-dropdown-item @click="(priority = 'High Priority'),editPriority(data.item._id)" value="High Priority">High Priority</b-dropdown-item>
                            <b-dropdown-item @click="(priority = 'Medium Priority'),editPriority(data.item._id)" value="Medium Priority">Medium Priority</b-dropdown-item>
                            <b-dropdown-item @click="(priority = 'Low Priority'),editPriority(data.item._id)" value="Low Priority">Low Priority</b-dropdown-item>
                        </b-dropdown>
                    </template>
                    
                    <template #cell(startDate)="data">
                        <b-dropdown id="dropdown-3" no-caret ref="date_dropdown">
                            <template #button-content>
                                <div>                          
                                    <p style="padding-top:8px;margin-bottom:0px;font-size:14px;">{{data.item.startDate}}</p>
                                    <p v-if="data.item.startDate === null" style="margin-bottom:0px;color:#858585;font-size:14px;">Add a Due Date</p>
                                </div>            
                            </template>
                            <div>
                                <b-calendar :hide-header='true' v-model="addDueDate.startDate"></b-calendar>
                                <div class="d-flex justify-content-end"> 
                                    <b-button style="width:100px ; margin:10px;font-size:14px;" @click="dueDate(data.item._id)">Save</b-button>    
                                </div>
                            </div>
                        </b-dropdown>

                    </template>
                    </b-table>
                </div>

            </div>



        </div>
                <!-- progress tracker -->
        <div class="col-4 details mt-3" style="background: white;border-radius: 20px;padding: 20px;margin-bottom:10px;height: 100%;padding-left:30px;color:black">
            <div class="d-flex justify-content-between">
                <div>
                    <p class="progress_tracker">Progress Tracker</p>
                    <div style="margin-top:30px;">
                        <p class="progress__tracker__titles" style="font-weight:600">
                            <b-icon icon="circle-fill" style="width:12px;height:12px;color:#C4C4C4;margin-right:10px;"></b-icon>
                            Total : {{this.total}}
                        </p>
                        <p class="progress__tracker__titles">
                            <b-icon icon="circle-fill" style="width:12px;height:12px;color:#FA7045;margin-right:10px;"></b-icon>
                            In Progress : {{this.total_in_progress.length}}
                        </p>
                        <p class="progress__tracker__titles">
                            <b-icon icon="circle-fill" style="width:12px;height:12px;color:#339637;margin-right:10px;"></b-icon>
                            Completed: {{this.completedItems.length}}
                        </p>                                  
                    </div>
                </div>
            </div>
            <div class="mt-5" style="margin-left:10px;" id="p5Canvas"></div>
        </div>
        <TaskDetails v-if="this.$store.state.showTask" :id ='id' :list_id ='listId' :method="getListData" :alert="showAlert"/>
    </div>
</template>

<script>

import {mapState} from 'vuex'
import axios from 'axios'
import TaskDetails from '@/components/TaskDetails.vue'
// var CircularProgress = require('@/components/CircularProgress.js')
var donutChart = require('@/components/donutChart.js')
const P5 = require('p5');
export default ({
    name: 'SingleToDo',
    components: { 
        // canvasHtml, 
        TaskDetails
        },
    data() {
        return{
            dismissSecs: 5,
            dismissCountDown: 0,
            // canvas,
            hideHeader: false,
            showTask: false,
            userId: localStorage.getItem('userId'),
            items: [],
            item: {},
            total: '',
            total_in_progress: '',
            completedItems: '',
            // completed: '',
            theme: '',
            CompleteStatus:{
                isComplete: false,
                progress: ''
            },
            percNum: '', 
            progressNum: '',
            noStartedNum: '',            
            //// FORM //////
            form: {
                list_title: '',
            },
            taskForm: {
                title: '',
                description: '',
                startDate: '',
                priorityLevel: '',
                progress: '',
                inCalendar: false
            },
            setPriority: {
                priorityLevel: ''
            },
            setProgress: {
                progress: '',
                isComplete: false
            },
            addDueDate:{
                startDate: '',
                inCalendar: false
            },
            calForm: {
                startDate: '',
                endDate: '',
                title: '',
                description: '',
                isComplete: ''
            },
            viewMenu: false,
            top: '0px',
            left: '0px',
            /// color classes ////
            orange: 'inProgress',
            green: 'completed',
            blue: 'toDo',
            colorClass: '',


            ///// TABLE //////
            headings: [
                // {
                //     key: 'isComplete',
                //     label: ''
                // },
                {
                    key: 'title',
                    label: 'Task',
                    tdClass: 'title_table'
                },
                {
                    key: 'startDate',
                    label: 'Due Date',
                    tdClass: 'date_table',
                    sortable: true
                },
                {
                    key: 'priorityLevel',
                    label: 'Priority',
                    tdClass: 'priority_table',
                    sortable: true

                },
                {
                    key: 'progress',
                    label: 'Status',
                    tdClass: 'progress_table',
                    sortable: true

                }
            ],  

            priority: '',
            progress: ''
        }
    },
    mounted() {
        this.getListData()
        this.setPercNum();

        /// When the page is reloaded while the modal is open the modal stays open (showTask is still true)
        /// To keep modal close after reloading ive set showTask as false
        this.$store.commit('setShowTask',false)
    },
    computed: {
        ...mapState(['listId', 'completed','priorityValue','showTask'])
    },
    methods:{
        closeTab() {
            this.viewMenu = false
        },
        setMenu(top,left) {
            this.top = top + 'px';
            this.left = left + 'px';

            // console.log('offset',this.$refs.right.offsetHeight)

        },
        handler(e) {
            this.viewMenu = true;
            // this.listId = id
            this.$nextTick(function() {
                this.$refs.left.focus();

                this.setMenu(e.y - 90, e.x -90)
            }.bind(this));
            e.preventDefault();

            console.log('this is the listid',this.listId)
        },
        ////// Dissmissable Alert //////
        countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
        },
        showAlert() {
        this.dismissCountDown = this.dismissSecs
        },
        //set percentage number
        setPercNum(){
            var res = donutChart.setPercentage(this.percNum,this.progressNum,this.noStartedNum);
            if(res){
                // create p5 instance -- components/CircularProgress.js
                new P5(donutChart.main);
            }  
        },

        ///////////// GET LIST DATA 
        getListData(){
            /////getting from users collection
            axios.get(`http://localhost:3030/todo/user/${this.userId}/list/${this.listId}`)
            .then(response => {
                console.log(response.data[0])
                // this.editForm.list_title = response.data[0].list_title
                this.form.list_title = response.data[0].list_title
                this.theme = response.data[0].theme
                this.items = response.data[0].items

                /// looping through each items and setting date format as Month, D, Yr
                Array.from(this.items).forEach((item)=> {
                    if(item.startDate != null){
                        const item_date = new Date(item.startDate).toDateString().slice(3)
                        item.startDate = item_date                       
                    }
                    if(item.priorityLevel  === 'High Priority'){
                        item.colorClass = 'pred'
                    }
                    if(item.priorityLevel === 'Medium Priority'){
                        this.colorClass = 'porange'
                    }
                    if(item.priorityLevel === 'Low Priority'){
                        this.colorClass = 'pyellow'
                    }


                    console.log('dATE', item.startDate)
                })

                this.total = this.items.length

                this.total_in_progress = this.items.filter(item => item.progress === 'In Progress')
                this.countItems()
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

                // this.calForm.title= this.item.title
                // this.calForm.description = this.item.description
                // this.calForm.startDate = this.item.startDate
                // this.calForm.isComplete = this.item.isComplete
                // this.taskForm.progress = this.item.progress

                console.log('form filled', this.taskForm)
            })
            .catch(error => console.log(error))
        },
        /////// count array items
        countItems() {
            let result = this.items.length
            console.log('result', result)
            
            //circle progress - degrees
            const totalPercentage = 360
            const num = totalPercentage / result

            this.completedItems = this.items.filter(item => 
            item.isComplete === true)

            this.notStarted = this.items.filter(item => {
                item.progress === 'Not Started'            
            })

            console.log('completed', this.completedItems.length)
            this.percNum = this.completedItems.length * num

            this.progressNum = this.total_in_progress.length * num

            this.noStartedNum = this.notStarted.length * num

            this.$store.commit('setCompleted', this.percNum)
            console.log('deg', this.progressNum, this.percNum)
        }, 
        ////// Sets task as complete
        setComplete(id) {
            let userId = localStorage.getItem('userId')

            this.getItem(id)

            this.taskForm.isComplete = true
            this.taskForm.progress = 'Completed'
            // console.log('true',this.itemForm.isComplete)

            axios.post(`http://localhost:3030/todo/edit/user/${userId}/list/${this.listId}/item/${id}`, this.taskForm)
            .then(response => {
                console.log('New task added', response.data)
                this.getListData()
                // this.getListItems(this.listId)
                // this.getItemData(this.itemId)

            })
            .catch(error => console.log(error))
        },

        //////// Sets task to false
        setCompleteFalse(id) {
            // if(this.itemForm.isComplete){
            //     this.itemForm.isComplete = false
            // }
            let userId = localStorage.getItem('userId')

            if(this.taskForm.isComplete){
                this.taskForm.isComplete = false
                this.taskForm.progress = 'Not Started'
            }

            // console.log('false',this.itemForm.isComplete)

            axios.post(`http://localhost:3030/todo/edit/user/${userId}/list/${this.listId}/item/${id}`, this.taskForm)
            .then(response => {
                console.log('New task added', response.data)
                this.getListData()
                // this.getListItems(this.listId)
                // this.getItemData(this.itemId)

            })
            .catch(error => console.log(error))
        },

        ///// Add new task
        addTask() {
            // console.log('add', this.listId)
            let userId = localStorage.getItem('userId')

            if(this.taskForm.title === ''){
                this.taskForm.title = 'Untitled'
            }

            this.taskForm.priorityLevel = 'Medium Priority'
            this.taskForm.progress = 'Not Started'

            axios.post(`http://localhost:3030/todo/add/user/${userId}/list/${this.listId}`, this.taskForm)
            .then(response => {
                console.log('New task added', response.data)
                this.taskForm.title = ''
                // this.getData()
                this.getListData()
            })
            .catch(error => console.log(error))
        },

        // Edit task
        editTask(id) {
            this.getItem(id)
            let userId = localStorage.getItem('userId')

            axios.post(`http://localhost:3030/todo/edit/user/${userId}/list/${this.listId}/item/${id}`, this.taskForm)
            .then(response => {
                console.log('item edited', response.data)

            })
            .catch(error => console.log(error))
        },
        getValue(evt){
            if (evt && evt.target && evt.target.hasAttribute('value')) {
                this.priority = evt.target.getAttribute('value')
                // this.$store.commit('setPriorityValue', this.priority)
                console.log('this is the value',this.priority)

            }        
        },
        editPriority(id){
            //  if (evt && evt.target && evt.target.hasAttribute('value')) {
            //     // console.log('this is the value',evt.target.getAttribute('value'))
            //     this.priorityValue = evt.target.getAttribute('value')
            //     console.log('this is the value',this.priorityValue)
            // }  
            // console.log('this is the value',this.priority)
            let userId = localStorage.getItem('userId')

            this.setPriority.priorityLevel = this.priority
            axios.post(`http://localhost:3030/todo/edit/user/${userId}/list/${this.listId}/item/${id}`, this.setPriority)
            .then(response => {
                this.getListData()
                console.log('item edited', response.data)

            })
            .catch(error => console.log(error))
            // console.log('p', this.taskForm.priorityLevel)

            // console.log('id',id)
        },
        editProgress(id){
            let userId = localStorage.getItem('userId')

            this.setProgress.progress = this.progress
            if(this.setProgress.progress === 'Completed'){
                this.setProgress.isComplete = true
            } else {
                this.setProgress.isComplete = false
            }
            axios.post(`http://localhost:3030/todo/edit/user/${userId}/list/${this.listId}/item/${id}`, this.setProgress)
            .then(response => {
                this.getListData()
                console.log('item edited', response.data)
            })
            .catch(error => console.log(error))
        },
        dueDate(id) {
            console.log('due date',this.addDueDate.startDate)
            let userId = localStorage.getItem('userId')

            this.getItem(id)
            this.addDueDate.inCalendar = true

            

            axios.post(`http://localhost:3030/todo/edit/user/${userId}/list/${this.listId}/item/${id}`, this.addDueDate)
            .then(response => {
                this.getListData()
                this.addItemtoCal()
                this.$refs.date_dropdown.hide()
                console.log('item edited', response.data)

            })
            .catch(error => console.log(error))
        },
        viewDetails(id){
            console.log('details id', id)
            console.log('show Task', this.$store.state.showTask)

            this.id = id
            this.list_id = this.listId
            // this.showTask = true
            this.$store.commit('setShowTask', true)
        },
        EditListName() {
            // console.log('got the id', this.listId)

            axios.post(`http://localhost:3030/todo/edit/list/${this.listId}`, this.form)
                .then(response => {
                    console.log('edited', response.data)
                    // this.getData()
                    this.getListData()
                    // this.getListItems(response.data._id)
                    // this.toDoTitle = response.data.list_title
                }) 
                .catch(error => console.log(error))
        },
        addItemtoCal() {
            // getItem()
            let userId = localStorage.getItem('userId')
            this.calForm.startDate = this.addDueDate.startDate
            this.calForm.title = this.taskForm.title
            this.calForm.description = this.taskForm.description
            this.calForm.isComplete = this.taskForm.isComplete
            axios.post(`http://localhost:3030/calendar/add/event/${userId}` , this.calForm )
            .then(response => {
                console.log("NEW EVENTS",response.data.events)
                // "refreshes" the calendar and shows new event that was added
                // this.$store.dispatch('getAllEvents')
                // this.$store.commit('setShowAddModal', false)
                // this.$bvModal.hide('add-item')
                // this.getListData()
            })
            .catch(error => console.log(error))     
        }

    },
    watch: {
        percNum: {
            handler(){
                console.log("chaaaange")
                var res = donutChart.setPercentage(this.percNum,this.progressNum,this.noStartedNum);
                if(res){
                    donutChart.main;
                    // console.log(this.$store.state.completed)
                }
            }
        },
        noStartedNum: {
            handler(){
                console.log("chaaaange")
                var res = donutChart.setPercentage(this.percNum,this.progressNum,this.noStartedNum);
                if(res){
                    donutChart.main;
                    // console.log(this.$store.state.completed)
                }
            }
        },
        progressNum: {
            handler(){
                console.log("chaaaange")
                var res = donutChart.setPercentage(this.percNum,this.progressNum,this.noStartedNum);
                if(res){
                    donutChart.main;
                    // console.log(this.$store.state.completed)
                }
            }
        },    
    }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap');

.container{
    flex-grow: 1;
}

.side__bar{
    /* height: 100vh !important; */
height: 100vh ;
position: sticky;
top: 0px;
}
/* input styles */
.todo_title_input{
    margin-top: 16px ;
    border-bottom: 1px solid #B5ACC0 !important;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-radius: 0px !important;

    font-family: 'Poppins', sans-serif;
    font-size: 24px !important;
    font-weight: 500 !important;
    color: black !important;


    background-color: transparent !important;

}
.todo_title_input:hover{
    background-color: #f1f1f1 !important;
    border-radius: 4px !important;
}
.todo_title_input:focus{
    color: rgb(134, 134, 134) !important;
    /* background-color: #daebdb !important; */
}

.title__box{
    font-family: 'Poppins',sans-serif;
    font-size: 24px;
    font-weight: 500;
    /* padding-left: 21px; */
}
.tasks_list_block{
    margin-left: 16px;
    padding: 24px 24px 18px 16px;
    margin-top: 24px;
    margin-bottom: 24px;

    border-radius: 20px;
    /* box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.25); */

    background-color: white;
}

.details{
    margin-left:14px;
    display: flex;
    justify-content: start;
}

.todo_item_input{
    height: 40px !important;
    border-bottom: none !important;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-radius: 4px !important;

    font-family: 'Poppins', sans-serif;
    font-size: 14px !important;
    font-weight: 500 !important;
    color: black !important;
    background:#E7E7E7 !important;
}


.todo_item_input:focus{
    background:#f1f1f1 !important;
}
.input__group{
    padding: 6px 0px 20px 0px;
}

.progress_tracker{
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 500;
}

.progress__tracker__titles{
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 400;

    margin-top:30px;
}

.priority__level{
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    margin-bottom: 0px !important;
    text-align:start;
    padding-top:6px;
}

.to_do__item{
    font-family: 'Poppins',sans-serif;
    font-size: 14px;
    font-weight:400;
}


/* Color classes for progress level */
.inProgress{
    border-color: #FA7045 !important;
    color: #FA7045 !important;
}

.inProgress:hover{
    border-color: #FA7045;
    color: white !important;
    background: #FA7045;
}
/* .inProgress:focus{
    border-color: #FF9900;
    color: white;
    background: #FF9900;
} */

.completed{
    border-color: #339637;
    color: #339637;
}

.completed:hover{
    border-color: #339637;
    color: white;
    background: #339637;
}

.toDo{
    border-color: #909090;
    color: #909090;
}

.toDo:hover{
    border-color: #909090;
    color: white;
    background: #909090;
}

.noProgress{
    border-color: transparent;
    color: transparent;
}

.pred{
    color: #E30000;
}

.porange{
    color: #FF8B4A
}

.pyellow{
    color: #F3CC00
}
/*  */

/* TABLE STYLINGS */
.title_table{
    max-width: 300px;
    /* padding-left:0px !important; */
    cursor: pointer;
}

.progress_table{
    width: 160px;
    font-family: 'Poppins',sans-serif;
    font-size: 14px;

    /* width:10%; */
}

/* .progress_table:hover{
    background-color: #f5f5f5;
} */

.date_table{
    width:200px;
    font-family: 'Poppins',sans-serif;
    font-size: 14px;
}

/* .date_table:hover{
    background-color: #f5f5f5;
} */

.priority_table{
    width:200px;
    max-width: 300px;
}
/* 
.priority_table:hover{
    background-color: #f5f5f5;
} */

.tr{
    padding:20px;
}

#dropdown-1__BV_toggle_{
    background-color: transparent !important;
    color:black;
    border:none;
    padding: 0px;
    display: flex;
    justify-content: start;
}

#dropdown-1__BV_toggle_:focus{
    outline:0px !important; 
    box-shadow: none !important;
}

#dropdown-2__BV_toggle_{
    background-color: transparent !important;
    color:black;
    border:none;
    padding: 0px;
    display: flex;
    justify-content: start;
}

#dropdown-2__BV_toggle_:focus{
    outline:0px !important; 
    box-shadow: none !important;
}

#dropdown-3__BV_toggle_{
    background-color: transparent !important;
    color:black;
    border:none;
    padding: 0px;
    display: flex;
    justify-content: start;
}

#dropdown-3__BV_toggle_:focus{
    outline:0px !important; 
    box-shadow: none !important;
}

.dropdown_{
    font-size:14px;
    /* overflow-y: hidden; */
    display: block;
    /* position:relative;
    z-index: 9999; */
}

</style>