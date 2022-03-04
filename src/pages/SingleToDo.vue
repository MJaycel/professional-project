<template>
    <div class="container-fluid">
        <div class="row" style="height: 100vh;">
            <!-- sidebar  -->
            <div class="side__bar" style="width: 65px !important;">
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

            <!-- tasks lists  -->
            <div class="col-8 tasks_list_block mt-3">
                <div>
                    <!-- list title --> 
                    <div class="title__box">
                        <p>{{this.form.list_title}}</p>
                    </div>
                    <!-- <b-input-group>
                        <b-form-input v-model="form.list_title" type="text" class="todo_title_input">
                        </b-form-input>
                    </b-input-group> -->
                </div>
                <b-list-group v-for="item in items" :key="item._id">
                    <b-list-group-item  class="item__block d-flex justify-content-start">
                        <b-icon v-b-tooltip.hover title="Set task as complete" v-if="item.isComplete === false" icon="circle" style="color: green" @click="setComplete(item._id)"></b-icon>
                        <b-icon  v-else icon="check-circle-fill" style="color: green" @click="setCompleteFalse(item._id)"></b-icon>
                    
                        <p v-if="item.isComplete" class="to_do__item" style="text-decoration: line-through;">{{item.item_title}}</p>
                        <p v-else class="to_do__item">{{item.item_title}}</p>
                    </b-list-group-item>
                </b-list-group> 
            </div>

            <!-- <div class="col-3 mt-3" style="border:2px;background:yellow;padding:16px;">
                <p style="font-size:24px;">{{this.completed}}%</p>
            </div> -->
            <!-- <div class="col-3 mt-3 circle-wrap">
                <canvas id='circle' :dataPercent="completed">
                </canvas>

            </div> -->
            <!-- <canvas /> -->

            <div class="col-3">
                <div id="p5Canvas"> </div>

            </div>
        </div>

    </div>
</template>

<script>

import {mapState} from 'vuex'
import axios from 'axios'
// import CircularProgress from '@/components/CircularProgress.vue'
var CircularProgress = require('@//components/CircularProgress.js')
// import canvasHtml from '@/components/canvasHtml.vue'
// import canvas from '@/components/canvas.html'
const P5 = require('p5');
export default ({
    name: 'SingleToDo',
    components: { 
        // canvasHtml, 
        },
    data() {
        return{
            // canvas,
            userId: localStorage.getItem('userId'),
            items: [],
            // completed: '',
            theme: '',
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
            CompleteStatus:{
                isComplete: false
            }, 
            ////form 
            form: {
                list_title: '',
            },
            percNum: '',
        }
    },
    mounted() {
        this.getListData()
        this.setPercNum();
    },
    computed: {
        ...mapState(['listId', 'completed'])
    },
    methods:{
        setPercNum(){
            var res = CircularProgress.setPercentage(this.percNum);
            if(res){
                new P5(CircularProgress.main);
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

                this.countItems()
            })
            .catch(error => console.log(error))
        },
        /////// count array items
        countItems() {
            let result = this.items.length
            console.log('result', result)

            const totalPercentage = 100
            const num = totalPercentage / result

            const completedItems = this.items.filter(item => 
            item.isComplete === true)

            console.log('completed', completedItems.length)
            this.percNum = completedItems.length * num
            this.$store.commit('setCompleted', this.percNum)
        }, 
        ////// Sets task as complete
        setComplete(id) {
            let userId = localStorage.getItem('userId')

            this.CompleteStatus.isComplete = true
            // console.log('true',this.itemForm.isComplete)

            axios.post(`http://localhost:3030/todo/edit/user/${userId}/list/${this.listId}/item/${id}`, this.CompleteStatus)
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

            if(this.CompleteStatus.isComplete){
                this.CompleteStatus.isComplete = false
            }

            // console.log('false',this.itemForm.isComplete)

            axios.post(`http://localhost:3030/todo/edit/user/${userId}/list/${this.listId}/item/${id}`, this.CompleteStatus)
            .then(response => {
                console.log('New task added', response.data)
                this.getListData()
                // this.getListItems(this.listId)
                // this.getItemData(this.itemId)

            })
            .catch(error => console.log(error))
        },
    },
    watch: {
        percNum: {
            handler(){
                console.log("chaaaange")
                var res = CircularProgress.setPercentage(this.percNum);
                if(res){
                    CircularProgress.main;
                }
            }
            
        }
    }
})
</script>

<style>
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
    background-color: #daebdb !important;
}
.todo_title_input:focus{
    color: rgb(134, 134, 134) !important;
    /* background-color: #daebdb !important; */
}

.title__box{
    font-family: 'Poppins',sans-serif;
    font-size: 24px;
    font-weight: 500;
}
.tasks_list_block{
    margin-left: 16px;
    padding-top: 24px;
    margin-top: 24px;
    margin-bottom: 24px;

    border-radius: 8px;
    box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.25);
}
</style>