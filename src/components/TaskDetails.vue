<template>
    <div>
        <b-modal size="xl" id="task-details-modal" hide-footer centered hide-header-close @hide="hideModal">
            <template #modal-header>
                <div class="col-3 float-right" style="margin-bottom:10px;">
                    <form v-if="progress === 'In Progress'" :class="orange" class="mt-2" style="border-radius:20px;">
                        <select  class="progress_select orange_border" v-model="progress">
                            <option v-for="(option,idx) in options" :key="idx" class="p_options">

                                {{option.text}}
                            </option>                        
                        </select>
                    </form>

                    <form v-if="progress === 'Completed'" :class="green" class="mt-2" style="border-radius:20px;">
                        <select  class="progress_select green_border" v-model="progress">
                            <option v-for="(option,idx) in options" :key="idx" class="p_options" >
                                {{option.text}}
                            </option>                        
                        </select>
                    </form>

                    <form v-if="progress === 'Not Started'" :class="blue" class="mt-2" style="border-radius:20px;">
                        <select  class="progress_select blue_border" v-model="progress">
                            <option v-for="(option,idx) in options" :key="idx" class="p_options" >
                                {{option.text}}
                            </option>                        
                        </select>
                    </form>
                </div>
                <b-dropdown id="icon-dropdown" no-caret right>
                    <template #button-content>
                        <b-icon icon="three-dots-vertical" style="margin-top:10px;"></b-icon>
                    </template>

                    <div v-if="$route.name != 'calendar'">
                        <b-dropdown-item v-if="archived === false" @click="archiveItem"><b-icon icon="archive" style="margin-right: 15px;width:15px;height:15px;" ></b-icon>Archive</b-dropdown-item>

                        <b-dropdown-item v-if="archived === true" @click="unArchiveItem"><b-icon icon="archive" style="margin-right: 15px;width:15px;height:15px;" ></b-icon>Un Archive</b-dropdown-item>
                    </div>

                    <b-dropdown-item @click="showDelete"><b-icon icon="trash" style="margin-right: 15px;width:16px;height:16px;"></b-icon> Delete</b-dropdown-item>
                </b-dropdown>

            </template>
            <div>
                <div class="col d-flex justify-content-between" style="padding:0px;margin:0px !important;">
                    <b-form-input v-model="taskForm.title" placeholder="Add a title" class="modal_item_title" ></b-form-input>
                </div>
                
            </div>

            <div class="row d-flex justify-content-start">
                <div class="col-6">
                    <div class="row mt-3 d-flex justify-content-start">
                        <div class="col-3">
                            <p class="modal_forms" style="padding-left:12px;padding-top:10px;">Priority</p>
                        </div>
                        <div class="col">
                            <div class="d-flex justify-content-start priority_div" style="padding:0px;">
                                <div>
                                    <b-icon v-if="priority === 'Low Priority'" icon="circle-fill" style="width:12px;height:12px;color:#F3CC00;margin-top:15px;margin-right:2px;margin-bottom:4px;margin-left:5px;"></b-icon>
                                    <b-icon v-if="priority === 'High Priority'" icon="circle-fill" style="width:12px;height:12px;color:#E30000;margin-top:15px;margin-right:2px;margin-bottom:4px;margin-left:5px;"></b-icon>
                                    <b-icon v-if="priority === 'Medium Priority'" icon="circle-fill" style="width:12px;height:12px;color:#FF8B4A;margin-top:15px;margin-right:2px;margin-bottom:4px;margin-left:5px;"></b-icon>
                                </div>
                                <div>
                                    <form v-if="priority === 'Low Priority'" class="mt-2" style="border-radius:20px;padding:0px 5px 0px 5px;">
                                        <select class="priority_select" v-model="priority">
                                            <option v-for="(option,idx) in pOptions" :key="idx" class="p_options">
                                                {{option.text}}
                                            </option>                        

                                        </select>
                                    </form>  

                                    <form v-if="priority === 'Medium Priority'" class="mt-2" style="border-radius:20px;padding:0px 5px 0px 5px;">
                                        <select  class="priority_select" v-model="priority">
                                            <option v-for="(option,idx) in pOptions" :key="idx" class="p_options" >
                                                {{option.text}}
                                            </option>                        
                                        </select>
                                    </form>          

                                    <form v-if="priority === 'High Priority'" class="mt-2" style="border-radius:20px;padding:0px 5px 0px 5px;">
                                        <select  class="priority_select" v-model="priority">
                                            <option v-for="(option,idx) in pOptions" :key="idx" class="p_options">
                                                {{option.text}}
                                            </option>                        
                                        </select>
                                    </form>                               
                                </div>
                            </div>
                
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-3">
                            <p class="modal_forms" style="padding-left:12px;padding-top:10px;">Due Date</p>
                        </div>
                        <div class="col mt-1 ">
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
                        <div class="col-3">
                            <p class="modal_forms" style="padding-left:12px;padding-top:10px;">Add Time</p>
                        </div>
                        <div class="col mt-1 ">
                            <b-form-input style="border-radius: 4px;"  :id="`startTime`" v-model="taskForm.startTime" type="time"></b-form-input>
                        </div>
                    </div>

                    <div class="col-3 mt-2" style="padding-left:13px;">
                        <p class="modal_forms" style="padding-top:10px;">Description</p>
                    </div>
                    <div class="mt-2" style="padding: 0px;">
                        <b-form-textarea v-if="taskForm.description === ''" rows="6" class="desc__task__input_focus no__outline" v-model="taskForm.description" placeholder="Add a description"></b-form-textarea>
                        <b-form-textarea v-else no-auto-shrink rows="6" class="desc__task__input no__outline" v-model="taskForm.description"></b-form-textarea>
                    </div>                
                </div>

                <div class="col">
                    <div class="mt-3">
                        <b-button class="addSubTask_btn" @click="showAddSubTask = !showAddSubTask">Add Subtask </b-button>
                        <div v-if="showAddSubTask" class="d-flex justify-content-between mt-3">
                            <b-form-input  v-model="subTask_title" placeholder="Add a title" class="addSubTask_input" v-on:keyup.enter='addSubTask'></b-form-input>
                            <b-icon @click="addSubTask" icon="plus" style="width:26px;height:26px;margin-top:6px;"></b-icon>
                        </div>
                        <b-list-group class="mt-4">
                            <b-list-group-item v-for="task in subTasks" :key="task._id" class="subTask_list">
                                <div class="d-flex justify-content-between" >
                                    <b-input-group>
                                    <b-icon icon="check-circle" v-if="!task.isComplete" style="margin-right: 10px;margin-top: 8px;width:16px;height:16px;color: green;cursor: pointer;" v-b-tooltip.hover title="Set task as complete" @click="setComplete(task,task._id)"></b-icon>
                                    <b-icon icon="check-circle-fill" v-else style="margin-right: 10px;margin-top: 8px;width:16px;height:16px;color: green;cursor: pointer;" v-b-tooltip.hover title="Set task as complete" @click="setComplete(task,task._id)"></b-icon>
                                        <b-form-input
                                            class="subTask_edit_input"
                                            v-model="task.title"
                                            type="text"
                                            v-on:keyup.enter='editSubTask(task,task._id)'
                                            @blur="editSubTask(task,task._id)"
                                            >
                                        </b-form-input> 
                                    </b-input-group>
                                    <b-icon icon="trash" style="margin-top:12px;margin-right:15px;cursor: pointer;width:16px;height:16px;" @click="deleteSubTask(task._id)"></b-icon>
                                </div>
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </div>
            </div>

           <div class="d-flex justify-content-end mt-4">
                <b-button class="cancel__btn" style="margin-right: 10px;" @click="hideModal"> Cancel</b-button>
                <b-button class="addItem__btn" @click="save"> Save</b-button>                
            </div>        
        </b-modal>

        <!-- Delete Modal -->
        <b-modal id="delete-item" hide-header centered  hide-footer hide-header-close>
            <p>Are you sure you want to delete this Task?</p>
            <div class="d-flex justify-content-end">
                <b-button class="cancel__btn" @click="$bvModal.hide('delete-item')"> Cancel</b-button>
                <b-button class="addItem__btn" @click="deleteTask">Delete</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>

import {mapState,mapActions} from 'vuex'
import axios from 'axios'
export default ({
    name:'TaskDetails',
    props: {
        id: String,
        list_id: String,
        method: { type: Function },
        alert: {type: Function},
    },
    data() {
        return{

            showDesc: false,
            taskForm: {
                title: '',
                description: '',
                startDate: '',
                priorityLevel: '',
                progress: '',
                isComplete: '',
                inCalendar: false,
                classes: '',
                startTime: ''

            },
            userId: localStorage.getItem('userId'),
            /// color classes ////
            orange: 'inProgress',
            green: 'completed',
            blue: 'toDo',
            progress: '',
            options: [
                {idx:1,value: 'Not Started', text: 'Not Started'},
                {idx:2,value: 'In Progress', text: 'In Progress'},
                {idx:3,value: 'Completed', text: 'Completed'}
            ],
            priority: '',
            pOptions: [
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
                item_id: ''
            },
            itemInCalendar: false,

            ////// SUB TASKS DATAS
            subTasks: [
                {showEditSubTask : false}
            ],
            subTaskForm: {
                startDate: '',
                title: '',
                isComplete: false,
                classes : '',
                inCalendar: false
            },
            subTaskId: '',
            showAddSubTask: false,
            showEditSubTask: false,
            editInputID : '',
            subTask_title: '',
            setArchive: {
                archived: false
            },
            archived: false,

            // Original Val
            TASK_START_DATE: '',

            EVENT_ID_EXISTS: false

        }
    },
    computed: {
        ...mapState(['showTask'])
    },
    mounted(){
        console.log('LIST id', this.list_id)
        this.getItem()
        this.$bvModal.show('task-details-modal')
    },
    methods:{
        ...mapActions(['getAllEvents']),
        hideModal(){
            this.$bvModal.hide('task-details-modal')
            this.$store.commit('setShowTask', false)
        },
        // Get Item
        getItem() {

            axios.get(`https://focus-hub.herokuapp.com/todo/user/${this.userId}/list/${this.list_id}/item/${this.id}`)
            .then(response => {
                console.log('ITEMS',response.data[0].todoLists.items)
                this.item = response.data[0].todoLists.items

                this.subTasks = this.item.subTask

                this.archived = this.item.archived

                this.taskForm.title= this.item.title
                this.taskForm.description = this.item.description
                this.taskForm.startDate = this.item.startDate
                this.taskForm.priorityLevel = this.item.priorityLevel
                this.taskForm.progress = this.item.progress
                this.taskForm.inCalendar = this.item.inCalendar
                // this.taskForm.startTime = this.item.startTime


                if(this.item.startDate === null || this.item.startDate === ""){
                    this.taskForm.startTime = null
                } else {
                    this.taskForm.startTime = this.item.startTime
                }
                if(this.taskForm.inCalendar === true){
                    this.itemInCalendar = true
                }

                this.progress = this.taskForm.progress

                this.priority = this.taskForm.priorityLevel

                console.log('form filled', this.taskForm.description)

                
            })
            .catch(error => console.log(error))
        },
        onChange() {
            this.noDate = true
            this.taskForm.startDate = null
        },
        save() {
            let userId = localStorage.getItem('userId')

            this.taskForm.progress = this.progress
            this.taskForm.priorityLevel = this.priority
            this.taskForm.classes = 'item-event item-event-bg'
            this.taskForm.progress = this.progress

            if(this.taskForm.progress === 'Completed'){
                this.taskForm.isComplete = true
            } else {
                this.taskForm.isComplete = false
            }

            if(this.taskForm.startDate !== null){
                this.taskForm.inCalendar = true
            } else if(this.taskForm.startDate === null || this.taskForm.startDate !== this.item.startDate){
                /// Delete task from calendar if the start date is null or if the start date 
                /// is different from the original date
                this.taskForm.inCalendar = false
                this.taskForm.startTime = null
                this.deleteEvent()
            }

            axios.post(`https://focus-hub.herokuapp.com/todo/edit/user/${userId}/list/${this.list_id}/item/${this.id}`, this.taskForm)
            .then(response => {
                this.addItemtoCal()
                console.log('item edited', response.data)
                this.$bvModal.hide('task-details-modal')
                this.$store.commit('setShowTask', false)
                this.$store.dispatch('getAllEvents')
                this.method()
            })
            .catch(error => console.log(error))       
        },
        showDelete() {
            this.$bvModal.show('delete-item')
        },
        deleteTask() {
            let userId = localStorage.getItem('userId')

            axios.delete(`https://focus-hub.herokuapp.com/todo/delete/user/${userId}/list/${this.list_id}/item/${this.id}`)
            .then(response => {
                console.log(response)
                this.$bvModal.hide('task-details-modal')
                this.$store.commit('setShowTask', false)
                this.$bvModal.hide('delete-item')
                this.deleteEvent()
                this.method()   
                this.alert()
            })
        },
        deleteEvent() {
            this.findInEvents()
            
            let userId = localStorage.getItem('userId')
            axios.delete(`https://focus-hub.herokuapp.com/calendar/delete/user/${userId}/event/${this.event_id}`)
            .then(response => {
                console.log('Deleted', response)
            }) 
            .catch(error => console.log(error))
        },

        addItemtoCal() {
            this.findInEvents()
            let newStartDate;

            if(this.taskForm.startTime != null){
                const userInputStart = this.taskForm.startTime
                const hours_start = userInputStart.slice(0,2)
                const minutes_start = userInputStart.slice(3)
    
                let date_start = new Date(this.taskForm.startDate)
                newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate(),hours_start,minutes_start))
    
                this.calForm.startDate = newStartDate.toUTCString()
                this.calForm.startTime = this.taskForm.startTime

                this.calForm.endDate = newStartDate.toUTCString()
            } else {
                const date_start = new Date(this.taskForm.startDate)
                newStartDate = new Date(Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate()))
                this.calForm.startDate = newStartDate.toUTCString()
                this.calForm.endDate = newStartDate.toUTCString()
            }

            if(this.taskForm.startDate === null || this.taskForm.startDate === ""){
                this.calForm.startTime = null
            } 
            this.calForm.title = this.taskForm.title
            this.calForm.description = this.taskForm.description
            this.calForm.isComplete = this.taskForm.isComplete
            this.calForm.classes = 'item-event item-event-bg'

            this.calForm.item_id = this.id


            if(this.itemInCalendar === true){
                axios.post(`https://focus-hub.herokuapp.com/calendar/edit/event/${this.event_id}` , this.calForm )
                .then(response => {
                    console.log("Edit item due date",response.data.events)
                    this.$store.dispatch('getAllEvents')

                })
                .catch(error => {
                    console.log(error)
                })
            } else {
                let userId = localStorage.getItem('userId')
                axios.post(`https://focus-hub.herokuapp.com/calendar/add/event/${userId}` , this.calForm )
                .then(response => {
                    console.log("Task added to calendar",response.data)
                    this.$store.dispatch('getAllEvents')

                })
                .catch(error => console.log(error))     
            }
        },
        findInEvents() {
            this.$store.dispatch('getAllEvents')

            /// looping through each events and find the item that has the id that is being passed 
            // if found set event_id as the event that was found and use that id to edit the startDate on the task/event
            Array.from(this.$store.state.items).forEach((item)=> {
                if(item.item_id === this.id){
                    this.event_id = item._id
                }    
            })

            if(this.event_id !== null){
                this.EVENT_ID_EXISTS = true
            }

            console.log('EVENT ID',this.EVENT_ID_EXISTS)
        },

        /////ADDING SUBTASKS
        addSubTask() {
            let userId = localStorage.getItem('userId')

            this.subTaskForm.title = this.subTask_title

            axios.post(`https://focus-hub.herokuapp.com/todo/add/user/${userId}/list/${this.list_id}/item/${this.id}`, this.subTaskForm) 
            .then(response => {
                console.log("Sub Task Added", response.data)
                this.getItem()
                this.subTask_title = ''
            })   
            .catch(error => console.log(error))
        },
        showEditSub(id){
            this.subTaskId = id

            if(this.subTaskId === id){
                this.showEditSubTask = true
            } else {
                this.showEditSubTask = false
            }
        },
        editSubTask(task,subTaskID){
            let userId = localStorage.getItem('userId')

            this.subTaskForm.title = task.title

            axios.post(`https://focus-hub.herokuapp.com/todo/edit/user/${userId}/list/${this.list_id}/item/${this.id}/subTask/${subTaskID}`, this.subTaskForm) 
            .then(response => {
                console.log("Sub Task Added", response.data)
                this.getItem()
            })   
            .catch(error => console.log(error))
        },
        setComplete(task,id){
            let userId = localStorage.getItem('userId')

            this.subTaskForm.title = task.title
            this.subTaskForm.isComplete = !this.subTaskForm.isComplete

            axios.post(`https://focus-hub.herokuapp.com/todo/edit/user/${userId}/list/${this.list_id}/item/${this.id}/subTask/${id}`, this.subTaskForm) 
            .then(response => {
                console.log("Sub Task Added", response.data)
                // this.subTaskForm.title = ''
                this.getItem()
            })   
            .catch(error => console.log(error))
        },
        deleteSubTask(id){
            let userId = localStorage.getItem('userId')

            axios.delete(`https://focus-hub.herokuapp.com/todo/delete/user/${userId}/list/${this.list_id}/item/${this.id}/subTask/${id}`)
            .then(response => {
                console.log('DELETED' ,response)
                this.getItem()
                this.method()   
                this.alert()
            })
        },
       archiveItem() {
            let userId = localStorage.getItem('userId')

            this.setArchive.archived = true

            axios.post(`https://focus-hub.herokuapp.com/todo/archive/user/${userId}/list/${this.list_id}/item/${this.id}`, this.setArchive)
                .then(response => {
                    console.log('edited', response.data)
                    this.getItem()
                    this.hideModal()
                    this.method()

                }) 
                .catch(error => console.log(error))
        },
        unArchiveItem(){
            let userId = localStorage.getItem('userId')

            this.setArchive.archived = false

            axios.post(`https://focus-hub.herokuapp.com/todo/archive/user/${userId}/list/${this.list_id}/item/${this.id}`, this.setArchive)
                .then(response => {
                    console.log('edited', response.data)
                    this.hideModal()
                    this.method()

                    this.getItem()
                }) 
                .catch(error => console.log(error))
        },
    },
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap');

.modal_item_title{
    font-family: 'Poppins',sans-serif;
    font-size: 20px !important;
    font-weight: 500 !important;
    padding-left:12px !important;
    color:black !important;
    /* margin-top: 16px ; */
    border-bottom: none !important;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-radius: 0px !important;

    background-color: transparent !important;
}

.modal_item_title:hover{
    background-color: #f7f7f7 !important;
    border-radius: 8px !important;
    color:rgb(88, 88, 88) !important;

    cursor: pointer;
}

.modal_item_title:focus{
    background-color: #e6e6e6 !important;
    border-radius: 8px !important;
    color:rgb(88, 88, 88) !important;

    cursor: pointer;
}

.modal_forms{
    font-family: 'Poppins',sans-serif;
    font-size: 16px !important;
    /* padding:16px 10px 10px 10px; */
    margin:0px !important;
    color: black;
}

#dropdown-5__BV_toggle_{
    background-color: transparent !important;
    color:black;
    border:none;
    padding: 0px;
    display: flex;
    justify-content: center;
}

#dropdown-5__BV_toggle_:focus{
    outline:0px !important; 
    box-shadow: none !important;
}

.b_dropdown{
    background: transparent !important;
    padding:10px 10px 10px 16px;
    margin-top:10px;
    width:100%;    
    border-radius: 4px;
    /* font-family: 'Poppins',sans-serif; */
    /* font-size: 16px !important; */
    /* font-weight: 400 !important;   */

}

.b_dropdown:hover{
    background: #e7e7e7 !important;
}

.p_level{
    font-family: 'Poppins',sans-serif;
    font-size: 16px;
    font-weight: 400;
    margin: 0px !important;
    /* padding-top: 10px; */
}

.desc__task__input{
    border-radius: 0px !important;
    border-style: none !important;

    background-color: transparent !important;

    font-family: 'Poppins', sans-serif;
    font-size: 15px !important;
    color: #000000 !important;

    padding:10px 0px 10px 0px !important;
    margin: 0px 20px 0px 20px;
    width:100%;
}
.desc__task__input:hover{
    background-color: #f7f7f7 !important;
    padding:10px 0px 10px 5px !important;
}

.desc__task__input:focus{
    background-color: #f5f5f5 !important;
    font-size: 15px !important;
    color: #535353;
    padding:10px 0px 10px 5px !important;
    margin: 0px 20px 0px 20px;
}

.desc__task__input_focus{
    border-radius: 4px !important;
    border-style: none !important;

    background-color: #f7f7f7 !important;

    font-family: 'Poppins', sans-serif;
    font-size: 15px !important;
    color: #535353;

    padding:10px 0px 10px 5px !important;
    margin-left:12px;
    width:150%;
}


.desc__task__input_focus:hover{
    background-color: #f7f7f7 !important;
    padding:10px 0px 10px 5px !important;

}

.desc__task__input_focus:focus{
    font-size: 15px !important;
    color: #535353;
    padding:10px 0px 10px 5px !important;
}

.no_select_caret{
  background-image: none !important;
}

.no_select_caret:focus{
    outline:0px !important; 
    box-shadow: none !important;
}

.p_options{
    color:black !important;
    font-family: 'Poppins',sans-serif !important;
    font-size: 15px !important;
    font-weight: 400 !important;
    padding: 20px !important;
}

.progress_select{
    outline:0px !important; 
    box-shadow: none !important;
    background: transparent !important;
    padding:4px;

    background-image: none !important;
}

.priority_select{
    outline:0px !important; 
    box-shadow: none !important;
    background: transparent;
    width:300%;
    padding-bottom:10px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0);

    background-image: none !important;

    font-family: 'Poppins',sans-serif;
    font-size: 15px !important;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
}

.modal-header{
    padding: 10px !important;
}
/* .priority_select:hover{
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0);

    background: #e7e7e7 !important;
} */

.progress_select:hover{
    color: white !important;
}

.priority_div{
    outline:0px !important; 
    box-shadow: none !important;
    background: transparent;
    width:100%;
    padding:8px;
    border-radius: 4px;
    /* border: 1px solid rgba(255, 255, 255, 0); */

    background-image: none !important;
}

.priority_div:hover{
    border-radius: 4px;
    /* border: 1px solid white; */

    background: #f7f7f7 !important;
}

.orange_border{
    border: 1px solid ;
    border-color: #FF9900 !important;
    border-radius:20px; 
    text-align:center;
    width:100%;
    font-family: 'Poppins',sans-serif;
    font-size: 15px;
    color: #FF9900 !important;
}

.blue_border{
    border: 1px solid ;
    border-color: #909090 !important;
    border-radius:20px; 
    /* padding:0px 0px 0px 0px; */
    text-align:center;
    width:100%;
    font-family: 'Poppins',sans-serif;
    font-size: 15px;
    color: #909090 !important;
}

.green_border{
    border: 1px solid ;
    border-color: #339637 !important;
    border-radius:20px; 
    text-align:center;
    width:100%;
    font-family: 'Poppins',sans-serif;
    font-size: 15px;
    color: #339637 !important;
}

select.custom-select.no-select-caret {
  background-image: none !important;
}

.date_{
    padding:0px;
}

.date_:hover{
    background: #f7f7f7 !important;
}

.date_picker{
    font-size: 15px !important;
    border: none !important; 
    padding-top: 4px !important;
    padding-bottom: 4px !important;

    font-family: 'Poppins',sans-serif;
    /* margin-top: 10px; */
}

.date_picker:hover{
    background: #f7f7f7 !important;

}

.date_picker_div:hover{
    background: #f7f7f7 !important;
    border-radius: 4px !important;
}

#datepicker-buttons{
    padding-left: 5px !important;
}

.subTask_list{
    padding:0px !important;
    margin-bottom: 0px !important;
    /* border: none !important; */
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: 1px;
}

.subTask_list:hover{
    background-color: #f7f7f7 !important;
}

.subTask_list:focus{
    background-color: #e6e6e6 !important;
}

.subTask_edit_input{
    font-family: 'Poppins', sans-serif;
    font-size: 14px !important;

    padding-left: 10px !important;
    /* border-left: none !important;
    border-right: none !important;
    border-top : none !important;
    border-radius: 0px !important; */
    border: none !important;
    background: transparent !important;
    cursor: pointer;
}

/* .subTask_edit_input:hover{
    background-color: #f7f7f7;
} */

.subTask_edit_input:focus{
    outline:0px !important; 
    box-shadow: none !important;
    border-color: #ced4da !important;

    /* background-color: #e6e6e6 !important; */
}

.addSubTask_btn{
    border-color: #AA96DA !important;
    background-color: transparent !important;
    color: #AA96DA !important;

    font-family: 'Poppins',sans-serif;
    font-size: 14px !important;

}

.addSubTask_btn:focus{
    outline:0px !important; 
    box-shadow: none !important;
}

.addSubTask_input{
    font-family: 'Poppins', sans-serif;
    font-size: 14px !important;
}

</style>