<template>

    <div class="container-fluid">
        <router-link :to="{name: 'home', params: {id: userId} }">Home</router-link>

        <div>
            <b-alert class="m-1"
            :show="dismissCountDown"
            dismissible
            variant="success"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
            >
            List deleted
            </b-alert>

            <div class="row" style="height: 90vh;">
                <div class="card col-2 col-sm-2 to__do__lists" style="padding-top: 20px;">
                    <div class="d-flex justify-content-between" style="padding-left: 20px;padding-right:16px;">
                        <p class="to__do">ToDo Lists</p>
                            <!-- <b-icon icon="house-fill" style="width: 20px; height: 20px;"></b-icon> -->

                    </div>
                    <div>
                        <b-input-group  style="margin-bottom: 16px;">
                            <template #append>
                                <b-input-group-text>
                                <b-icon icon="plus" style="width: 20px; height: 20px;" @click="addList"></b-icon>
                                <!-- <strong class="text-danger">!</strong> -->
                                </b-input-group-text>
                            </template>
                            <b-form-input
                            id="input-1"
                            v-model="form.list_title"
                            type="text"
                            class="input__style no__outline"
                            placeholder="Add new list"
                            v-on:keyup.enter='addList'
                            >
                            </b-form-input>
                            
                        </b-input-group>
                        
                    </div>
                    <b-list-group v-for="list in lists" :key="list._id" >
                        <b-list-group-item  class="list__block d-flex justify-content-between" @click="getListItems(list._id)">
                                <p class="to-do__title border-0">{{list.list_title}}</p>
                                    <b-icon style="width: 16px;height: 16px;color: #C5C5C5;" icon="trash" @click="showDelete(list._id)"></b-icon>         
                        </b-list-group-item>
                    </b-list-group>                        
                </div>
                <div class="card col-8 items__block">
                    <!------------------------  Edit list name input ------------------------->
                        <b-input-group class="edit__input_group">
                        <b-form-input
                            v-model="editForm.list_title"
                            type="text"
                            class="todo_title_input"
                            v-on:keyup.enter='EditListName'
                            >
                        </b-form-input>                        
                        </b-input-group>

                        <!-- add new task input -->
                        <b-input-group>
                            <template #append>
                                <b-input-group-text style="height: 40px;margin-top: 16px;border:none;background-color:transparent !important;">
                                <b-icon @click="showItemInput = true" icon="plus" style="width: 20px; height: 20px;"></b-icon>
                                </b-input-group-text>
                            </template>
                            <b-form-input
                                v-model="taskForm.item_title"
                                type="text"
                                class="todo_item_input"
                                v-on:keyup.enter='addTask'
                                placeholder="Add new task"
                                >
                            </b-form-input>                              
                        </b-input-group>


                        <b-list-group v-for="item in items" :key="item._id" >
                            <b-list-group-item  class="item__block d-flex justify-content-start" @click="getItemData(item._id)">
                                <b-icon v-b-tooltip.hover title="Set task as complete" v-if="item.isComplete === false" icon="circle" style="color: green" @click="setComplete(item._id)"></b-icon>
                                <b-icon  v-else icon="check-circle-fill" style="color: green" @click="setCompleteFalse(item._id)"></b-icon>
                            
                                <p v-if="item.isComplete" class="to_do__item" style="text-decoration: line-through;">{{item.item_title}}</p>
                                <p v-else class="to_do__item">{{item.item_title}}</p>
                            </b-list-group-item>
                        </b-list-group>                           
                        <!-- <div>
                            <b-table responsive :items="items" :fields="headings">
                                <template #cell(isComplete)="data">
                                    <b-form-checkbox v-model="itemForm.isComplete"></b-form-checkbox>
                                    <b-icon v-if="data.item.isComplete === false" icon="circle"></b-icon>
                                    <b-icon v-else icon="check-circle-fill"></b-icon>
                                </template>
                            </b-table>
                        </div> -->
  
                </div>
                <div class="card col-2" style="background: #F8F2D1;">
                    <b-list-group>
                        <b-list-group-item  class="item__block d-flex justify-content-start">
                            <b-icon v-b-tooltip.hover title="Set task as complete" v-if="foundItem.isComplete === false" icon="circle" style="color: green" @click="setComplete(foundItem._id)"></b-icon>
                            <b-icon  v-else icon="check-circle-fill" style="color: green" @click="setCompleteFalse(foundItem._id)"></b-icon>
                        
                            <p v-if="foundItem.isComplete" class="to_do__item" style="text-decoration: line-through;">{{foundItem.item_title}}</p>
                            <p v-else class="to_do__item">{{foundItem.item_title}}</p>
                        </b-list-group-item>
                    </b-list-group> 
                    <b-form-textarea class="item__desc no__outline mt-5" v-model="foundItem.item_note" placeholder="Add a description" @focus="showSaveBtn = true" @blur="showSaveBtn = false"></b-form-textarea>
                    <b-button v-if="showSaveBtn">Save</b-button>
                </div>
            </div>
        </div>     
        <b-modal id="delete-event" hide-header centered  hide-footer hide-header-close>
            <p>Are you sure you want to delete this List?</p>
            <div class="d-flex justify-content-end">
                <b-button class="cancel__btn" @click="hideDelete"> Cancel</b-button>

            <b-button class="delete__list_btn" @click="deleteList">Delete</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
import { mapActions} from 'vuex'

export default({
    name: 'todo',
    data() {
        return {
            dismissSecs: 5,
            dismissCountDown: 0,
            userId: localStorage.getItem('userId'),
            lists: [],
            listId: '',
            form: {
                list_title: ''                
            },
            editForm: {
                list_title: '',
            },
            toDoTitle: '',
            taskForm: {
                item_title: '',
            },

            itemForm: {
                isComplete: false
            },
            
            items: [],
            foundItem: {},
            itemId: '',
            headings: [
                {
                    key: 'isComplete',
                    label: ''
                },
                {
                    key: 'item_title',
                    label: ''
                },
                {
                    key: 'priorityLevel',
                    label: ''
                },
                {
                    key: 'progress',
                    label: ''
                }
            ],  
            isComplete: false,

            isHovered: false,
            showItemInput: false,
            showSaveBtn: false
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        ...mapActions(['getAllToDo']),
        handleHover(hovered) {
            this.isHovered = hovered
        },
        ////// Dissmissable Alert //////
        countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
        },
        showAlert() {
        this.dismissCountDown = this.dismissSecs
        },
        getData() {

            let userId = localStorage.getItem('userId')
            axios.get(`http://localhost:3030/todo/${userId}`)
                .then(response => {
                    this.lists = response.data
                    console.log('Lists', response.data) 
                }) 
                .catch(error => console.log(error))
        },

        addList() {
            let userId = localStorage.getItem('userId')

            if(this.form.list_title === ''){
                this.form.list_title = 'Untitled'
            }

            axios.post(`http://localhost:3030/todo/add/list/${userId}`, this.form)
                .then(response => {
                    this.form.list_title = ''
                    console.log('added', response.data)
                    this.getData()
                }) 
                .catch(error => console.log(error))
        },

        getListItems(id) {
            // console.log('id', id)
            this.listId = id
            let userId = localStorage.getItem('userId')

            /////getting from users collection
            axios.get(`http://localhost:3030/todo/user/${userId}/list/${this.listId}`)
            .then(response => {
                console.log(response.data[0])
                this.editForm.list_title = response.data[0].list_title
                this.items = response.data[0].items
            })
            .catch(error => console.log(error))
            
        },

        EditListName(){
            console.log('got the id', this.listId)

            axios.post(`http://localhost:3030/todo/edit/list/${this.listId}`, this.editForm)
                .then(response => {
                    console.log('edited', response.data)
                    this.getData()
                    this.getListItems(response.data._id)
                    // this.toDoTitle = response.data.list_title
                }) 
                .catch(error => console.log(error))
        },
        showDelete(id) {
            this.id = id
            console.log(this.$route.params.id, this.id)
            this.$bvModal.show('delete-event')

            // console.log('delete')
        },
        hideDelete() {
            this.$bvModal.hide('delete-event')
        },
        ////// deletes list
        deleteList() {
            let userId = localStorage.getItem('userId')

            axios.delete(`http://localhost:3030/todo/delete/user/${userId}/list/${this.id}`)
            .then(response => {
                console.log('Deleted', response)

                this.getData()
                this.editForm.list_title = ''
                this.hideDelete()
                this.showAlert()
            }) 
            .catch(error => console.log(error))
        },

        ///////// add task to list
        addTask() {
            // console.log('add', this.listId)
            let userId = localStorage.getItem('userId')

            if(this.taskForm.item_title === ''){
                this.taskForm.item_title = 'Untitled'
            }

            axios.post(`http://localhost:3030/todo/add/user/${userId}/list/${this.listId}`, this.taskForm)
            .then(response => {
                console.log('New task added', response.data)
                this.taskForm.item_title = ''
                this.getData()
                this.getListItems(this.listId)
            })
            .catch(error => console.log(error))
        },

        ////// Sets task as complete
        setComplete(id) {
            let userId = localStorage.getItem('userId')

            this.itemForm.isComplete = true
            console.log('true',this.itemForm.isComplete)

            axios.post(`http://localhost:3030/todo/edit/user/${userId}/list/${this.listId}/item/${id}`, this.itemForm)
            .then(response => {
                console.log('New task added', response.data)
                this.getData()
                this.getListItems(this.listId)
                this.getItemData(this.itemId)

            })
            .catch(error => console.log(error))
        },

        //////// Sets task to false
        setCompleteFalse(id) {
            if(this.itemForm.isComplete){
                this.itemForm.isComplete = false
            }
            let userId = localStorage.getItem('userId')

            console.log('false',this.itemForm.isComplete)

            axios.post(`http://localhost:3030/todo/edit/user/${userId}/list/${this.listId}/item/${id}`, this.itemForm)
            .then(response => {
                console.log('New task added', response.data)
                this.getData()
                this.getListItems(this.listId)
                this.getItemData(this.itemId)

            })
            .catch(error => console.log(error))
        },

        ////// Get tasks infos
        getItemData(id){
            let userId = localStorage.getItem('userId')
            this.itemId = id

            axios.get(`http://localhost:3030/todo/user/${userId}/list/${this.listId}/item/${id}`)
            .then(response => {
                console.log(response.data[0].todoLists.items.item_title)
                this.foundItem = response.data[0].todoLists.items
            })
            .catch(error => console.log(error))
        },

        ///// show save btn
        saveBtn(){
            this.showSaveBtn = true
        }

    },
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap');

.to__do__lists{
    border: solid 1px;
    border-color: black;
    padding-left: 0px !important;
    padding-right: 0px !important;
}

.to__do{
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    font-weight: 500;
}

.list__block{
    height: 50px;
    padding-top: 16px;

    border: none !important;
    
}

.list__block:hover{
    background:#D2EAD3 ;
}

.todo_item_input{
    height: 40px !important;

    margin-top: 16px ;
    border-bottom: none !important;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-radius: 4px !important;

    font-family: 'Poppins', sans-serif;
    font-size: 14px !important;
    font-weight: 500 !important;
    color: black !important;
    background:#D2EAD3 !important;

}

.todo_item_input:focus{
    background:#daebdb !important;
}

.items__block{
    background:#F2F9F3 !important;
}

.item__block{
    height: 50px;
    padding-top: 16px;
    margin-top:11px;

    border: none !important;  
}

.to_do__item{
    font-family: 'Poppins',sans-serif;
    font-size: 14px;
    text-indent: 21px; 
}

.to-do__title{
    font-family: 'Poppins',sans-serif;
    font-size: 14px;
    text-indent: 21px;
}

.input-group-text{
    background-color: white !important;
    /* border: none !important; */
}

.input__style{
    border-right: 0px !important;
}
.input__style:focus{
    outline:0px !important; 
     box-shadow: none !important;
}

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
    background-color: #daebdb !important;

}
.todo_title_input:focus{
    color: rgb(134, 134, 134) !important;
    /* background-color: #daebdb !important; */
}

.card > .list-group{
    border-top: none !important;
    border-bottom: none !important;

}

.delete__list_btn{
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

.edit__input_group{
    background: none !important;
}
</style>
