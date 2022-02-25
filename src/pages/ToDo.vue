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
                <div class="card col-8">
                    <!-- <p @click="setEdit" v-if="!edit" class="to__do" style="padding-top: 16px;">{{this.editForm.list_title}}</p> -->
                    
                    <b-form-input
                        v-model="editForm.list_title"
                        type="text"
                        class="todo_title_input"
                        v-on:keyup.enter='EditListName'
                        >
                    </b-form-input>
                </div>
                <div class="card col-2" style="background: #F8F2D1;">
                    <p>Task title</p>
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
                list_title: ''
            },
            toDoTitle: '',

            isHovered: false
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
            console.log('id', id)

            this.listId = id

            axios.get(`http://localhost:3030/todo/list/${this.listId}`)
            .then(response => {
                this.toDoTitle = response.data.list_title
                this.editForm.list_title = response.data.list_title
                console.log('single list', response.data)
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
                    this.toDoTitle = response.data.list_title
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
    background:#F5F2FB ;
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

}

.todo_title_input:hover{
    background-color: #f2edf8 !important;

}
.todo_title_input:focus{
    color: rgb(134, 134, 134) !important;
    background-color: #efe8f8 !important;
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
</style>
