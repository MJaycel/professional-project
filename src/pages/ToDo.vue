<template>

    <div class="container-fluid">
        <router-link :to="{name: 'home', params: {id: userId} }">Home</router-link>

        <div>
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
                            >
                            </b-form-input>
                            
                        </b-input-group>
                        
                    </div>
                    <div v-for="list in lists" :key="list._id" >
                        <div class="list__block" @click="getListItems(list._id)">
                            <p class="to-do__title">{{list.list_title}}</p>
                        </div>
                    </div>

                </div>
                <div class="card col-8">
                    <!-- <p class="to__do" style="padding-top: 16px;">{{toDoTitle}}</p> -->
                    <b-form-input
                        id="input-1"
                        v-model="toDoTitle"
                        type="text"
                        class="todo_title_input"
                        >
                    </b-form-input>
                </div>
                <div class="card col-2" style="background: #F8F2D1;">
                    <p>Task title</p>
                </div>
            </div>
        </div>     
    </div>
</template>

<script>
import axios from 'axios'
import { mapActions} from 'vuex'

export default({
    name: 'todo',
    data() {
        return {
            userId: localStorage.getItem('userId'),
            lists: [],
            form: {
                list_title: ''                
            },
            toDoTitle: ''

        }
    },
    mounted() {
        this.getData()
        this.getListItems()
    },
    methods: {
        ...mapActions(['getAllToDo']),
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
            console.log('got the id', id)

            axios.get(`http://localhost:3030/todo/list/${id}`)
            .then(response => {
                this.toDoTitle = response.data.list_title
                console.log('single list', response.data)
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

}
</style>
