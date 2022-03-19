<template>
    <div>
        <b-modal id="task-details-modal" hide-footer centered hide-header-close hide-header @hide="hideModal">
            <!-- <p class="my-4 modal_item_title">{{this.taskForm.item_title}}</p> -->
            <!-- <i class="fa-solid fa-circle"></i> -->
            <div>
                <div class="col-5 float-right" style="margin-bottom:10px;">
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
                <div class="col d-flex justify-content-between" style="padding:0px;margin:0px !important;">
                    <b-form-input v-model="taskForm.title" placeholder="Add a title" class="modal_item_title" ></b-form-input>
                    <b-icon icon="trash" style="margin-top: 14px;margin-right: 15px;cursor: pointer;" @click="showDelete"></b-icon>
                </div>
                
            </div>

            <div class="row mt-3 d-flex justify-content-start">
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
                            <form v-if="priority === 'Low Priority'" class="mt-2" style="border-radius:20px;padding:0px 5px 0px 5px;">
                                  <!-- <label class="input-group-text" for=""><i class="fa-solid fa-circle"></i></label> -->

                                <select class="priority_select" v-model="priority" data-show-content="true">
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


                    <!-- <div style="padding:20px 10px 10px 10px;">
                        <b-icon icon="x" style="width: 20px; height: 20px;" @click="onChange()"></b-icon>
                    </div> -->
                </div>
            </div>

            <div class="row">
                <div class="col-4 mt-2">
                    <p class="modal_forms" style="padding-left:12px;padding-top:10px;">Description</p>
                </div>
                <div class="col-7 mt-2" style="padding: 0px;">
                    <b-form-textarea v-if="taskForm.description === ''" class="desc__task__input_focus no__outline" v-model="taskForm.description" placeholder="Add a description"></b-form-textarea>
                    <b-form-textarea v-else class="desc__task__input no__outline" v-model="taskForm.description"></b-form-textarea>
                </div>                
            </div>


           <div class="d-flex justify-content-end mt-4">
                <b-button class="cancel__btn" style="margin-right: 10px;" @click="hideModal"> Cancel</b-button>

                <b-button class="addItem__btn" @click="save"> Save</b-button>                
            </div>        
        </b-modal>

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
        alert: {type: Function}
    },
    data() {
        return{
            taskForm: {
                title: '',
                description: '',
                startDate: '',
                priorityLevel: '',
                progress: '',
                isComplete: '',
                inCalendar: false,
                classes: ''

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
            itemInCalendar: false
        }
    },
    computed: {
        ...mapState(['showTask'])
    },
    mounted(){
        this.getItem()
        this.$bvModal.show('task-details-modal')

        console.log('id', this.id)
        console.log('WTF', this.$store.state.showTask)
    },
    methods:{
        ...mapActions(['getAllEvents']),
        hideModal(){
            this.$bvModal.hide('task-details-modal')
            this.$store.commit('setShowTask', false)
        },
        // Get Item
        getItem() {
            // let userId = localStorage.getItem('userId')

            axios.get(`http://localhost:3030/todo/user/${this.userId}/list/${this.list_id}/item/${this.id}`)
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

                this.progress = this.taskForm.progress

                this.priority = this.taskForm.priorityLevel
        

                // if(this.taskForm.startDate != null){
                //     const date = new Date(this.taskForm.startDate).toDateString().slice(3)
                //     this.taskForm.startDate = date                   
                // } else {
                //     this.taskForm.startDate = this.item.startDate
                // }


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


            this.taskForm.progress = this.progress
            if(this.taskForm.progress === 'Completed'){
                this.taskForm.isComplete = true
            } else {
                this.taskForm.isComplete = false
            }
            this.taskForm.classes = 'eBlue'

            if(this.taskForm.startDate != null){
                this.taskForm.inCalendar = true
            }

            if(this.taskForm.startDate === null){
                this.deleteEvent()
            }

            axios.post(`http://localhost:3030/todo/edit/user/${userId}/list/${this.list_id}/item/${this.id}`, this.taskForm)
            .then(response => {
                // this.getListData()
                // this.$refs.date_dropdown.hide()
                this.addItemtoCal()
                console.log('item edited', response.data)
                this.$bvModal.hide('task-details-modal')
                this.$store.commit('setShowTask', false)

                this.$store.dispatch('getAllEvents')
                // this.$emit('getListData')
                this.method()


            })
            .catch(error => console.log(error))       
        },
        showDelete() {
            // this.id = id
            // console.log(this.$route.params.id, this.id)
            this.$bvModal.show('delete-item')
        },
        deleteTask() {
            let userId = localStorage.getItem('userId')

            axios.delete(`http://localhost:3030/todo/delete/user/${userId}/list/${this.list_id}/item/${this.id}`)
            .then(response => {
                console.log(response)
                this.$bvModal.hide('task-details-modal')
                this.$store.commit('setShowTask', false)
                this.$bvModal.hide('delete-item')
                this.deleteEvent()
                
                // this.$emit('getListData')
                this.method()   
                this.alert()
            })
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

        addItemtoCal() {
            // this.getItem()
            this.findInEvents()
            // let userId = localStorage.getItem('userId')
            this.calForm.startDate = this.taskForm.startDate
            this.calForm.title = this.taskForm.title
            this.calForm.description = this.taskForm.description
            this.calForm.isComplete = this.taskForm.isComplete
            this.calForm.classes = 'eBlue'

            this.calForm.item_id = this.id


            if(this.itemInCalendar === true){
                axios.post(`http://localhost:3030/calendar/edit/event/${this.event_id}` , this.calForm )
                .then(response => {
                    console.log("Edit item due date",response.data.events)
                })
                .catch(error => {
                    console.log(error)
                })
            } else {
                let userId = localStorage.getItem('userId')
                axios.post(`http://localhost:3030/calendar/add/event/${userId}` , this.calForm )
                .then(response => {
                    console.log("Task added to calendar",response.data)
                })
                .catch(error => console.log(error))     
            }
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
    background-color: #e6e6e6 !important;
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
    margin: 0px 20px 0px 20px;
    width:100%;
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
    width:190%;
    padding-bottom:10px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0);

    background-image: none !important;

    font-family: 'Poppins',sans-serif;
    font-size: 15px !important;
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

    background: #e7e7e7 !important;
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
    background: #e7e7e7 !important;
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
    background: #e7e7e7 !important;

}

.date_picker_div:hover{
    background: #e7e7e7 !important;
    border-radius: 4px !important;
}

#datepicker-buttons{
    padding-left: 5px !important;
}

</style>