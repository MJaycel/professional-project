<template>
    <div class="container-fluid">
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
            </div>

            <!-- all to do list -->
            <div class="col-10">
                <b-alert class="m-1"
                    :show="dismissCountDown"
                    dismissible
                    variant="success"
                    @dismissed="dismissCountDown=0"
                    @dismiss-count-down="countDownChanged"
                    >
                    List deleted
                </b-alert>
                <!-- heading for to do lists-->
                <div class="mt-5" style="padding-left: 20px;">
                    <p class="font__style">Your todo lists</p>
                </div>

                <div class="row col-12" style="margin-left: 20px;padding:0px;">
                <!-- to do list card -->

                    <div @contextmenu="handler($event,list._id)" v-for="list in lists" :key="list._id" :class="list.theme" class="card list_card col-2 d-flex justify-content-center"  style="margin-left: 24px;margin-top:16px;" @click="goToList(list._id)">
                        <p class="list__title">{{list.list_title}}</p>
                        <!-- <router-link class="list__title" :to="{name: 'single_todo', params: {id: userId}}">{{list.list_title}}</router-link> -->
                    </div>

                    <ul id="right-click-menu" tabindex="-1" ref="right" v-if="viewMenu" @focus="viewMenu = true" @blur="viewMenu=false" :style="{top:top,left:left}">
                        <li @click="edit = true ">Edit</li>
                        <li @focus="viewMenu = true" @click="showDelete(listId)">Delete</li>
                    </ul>
                                    <!-- add list form -->
                    <b-sidebar v-if="edit" id="sidebar-edit" right visible no-header>
                        <template #default="{hide}">
                            <!-- color themes -->
                            <div class="mt-3">
                                <b-icon icon='x' @click="edit = false && hide" class="float-right" style="width:35px;height: 35px;"></b-icon>
                                <p class="title__input__font" style="margin-left:14px;margin-bottom:0px;">Edit theme</p>                            
                            </div>

                            <div class="row" style="padding:10px;margin-left:17px; width:300px">
                                <div v-for="color in colorClasses" :key="color" class="col" style="padding:10px;">
                                    <div :class="color" class="color_themes" @click="setTheme(color)">
                                        <b-icon v-if="selectedTheme" v-show="color" icon="check"></b-icon>
                                    </div>
                                </div>                            
                            </div>

                            <!-- Title input -->
                            <div style="padding:14px;">
                                <p class="title__input__font">List Title</p>
                                <b-form-input v-model="listForm.list_title" placeholder="add new list" class="list__title__input"></b-form-input>

                                <b-button class="save__list" @click="saveList">Edit List</b-button>
                            </div>                            
                        </template>

                    </b-sidebar>
                    <!-- add to do list card -->
                    <div v-b-hover="handleHover" class="card add_list_card col-2 d-flex justify-content-center" v-b-toggle.sidebar-right style="margin-left: 24px;margin-top:16px;">
                        <b-icon  v-if="isHovered" icon="plus" style="color:#orange;width:70px;height:70px;align-self: center"></b-icon>
                        <b-icon  v-else icon="plus" style="color:#575757;width:50px;height:50px;align-self: center"></b-icon>                            
                    </div>
                </div>
                <!-- add list form -->
                <b-sidebar id="sidebar-right" no-header right>
                    <!-- color themes -->
                    <template #default="{hide}">
                        <div class="mt-3">
                            <b-icon icon='x' class="float-right" style="width:35px;height: 35px;" @click="hide"></b-icon>
                            <p class="title__input__font" style="margin-left:14px;margin-bottom:0px;">Choose a theme</p>                            
                        </div>                    
                        <div class="row" style="padding:10px;margin-left:17px; width:300px">
                            <div v-for="color in colorClasses" :key="color" class="col" style="padding:10px;">
                                <div :class="color" class="color_themes" @click="setTheme(color)">
                                    <b-icon v-if="selectedTheme" v-show="color" icon="check"></b-icon>
                                </div>
                            </div>                            
                        </div>

                    <!-- Title input -->
                    <div style="padding:14px;">
                        <p class="title__input__font">List Title</p>
                        <b-form-input v-model="listForm.list_title" placeholder="add new list" class="list__title__input"></b-form-input>

                        <b-button class="save__list" @click="saveList">Create List</b-button>
                    </div>                        
                    </template>

                </b-sidebar>
                
            </div>
        </div>
        <b-modal id="delete-list" hide-header centered  hide-footer hide-header-close>
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
import {mapState} from 'vuex'
export default({
    name: 'ToDoPage',
    data() {
        return{
            dismissSecs: 5,
            dismissCountDown: 0,
            userId: localStorage.getItem('userId'),
            isHovered: false,
            bgColor: 'orange',
            colorClasses: [
                'orange',
                'blue',
                'red',
                'darkGreen',
                'green',
                'purple',
                'yellow',
                'pink'
            ],
            selectedTheme: false,
            lists: [],

            listForm: {
                list_title: '',
                theme: ''
            },

            viewMenu: false,
            top: '0px',
            left: '0px',
            listId: '',
            edit: false
        }
    },
    mounted(){
        this.getAllLists()
        console.log(window.innerHeight + 20)
    },
    computed:{
        ...mapState(['listId'])
    },
    methods: {
        ////// Dissmissable Alert //////
        countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
        },
        showAlert() {
        this.dismissCountDown = this.dismissSecs
        },
        closeTab() {
            this.viewMenu = false
        },
        setMenu(top,left) {
            // let largestHeight = window.innerHeight  -1;
            // let largestWidth = window.innerWidth - 1 ;

            // if (top > largestHeight) {top = largestHeight}

            // if (left > largestWidth) {left = largestWidth}

            this.top = top + 'px';
            this.left = left + 'px';

            console.log('offset',this.$refs.right.offsetHeight)

        },
        handler(e,id) {
            this.viewMenu = true;
            this.listId = id
            this.$nextTick(function() {
                this.$refs.right.focus();

                this.setMenu(e.y - 90, e.x -90)
            }.bind(this));
            e.preventDefault();

            console.log('this is the listid',this.listId)
        },
        handleHover(hovered) {
            this.isHovered = hovered
        },
        //// get all users lists
        getAllLists(){
            axios.get(`http://localhost:3030/todo/${this.userId}`)
                .then(response => {
                    this.lists = response.data
                    console.log('Lists', response.data) 
                }) 
                .catch(error => console.log(error))
        },
        //testing
        setTheme(color) {
            this.listForm.theme = color
            // this.selectedTheme = true
            this.selectedTheme = !this.selectedTheme
            // console.log('color',this.listForm.theme)
        },        
        /// Add new list
        saveList() {

            if(this.listForm.theme === ''){
                this.listForm.theme = 'green'
            }
            if(this.listForm.list_title === ''){
                this.listForm.list_title = 'Untitled'
            }

            axios.post(`http://localhost:3030/todo/add/list/${this.userId}`, this.listForm)
                .then(response => {
                    this.listForm.list_title = ''
                    this.listForm.theme = ''
                    console.log('added', response.data)
                    this.getAllLists()
                }) 
                .catch(error => console.log(error))
        },

        /// direct page to single list
        goToList(id){
            this.$store.commit('setListId', id)
            this.$router.push({
                name: 'single_todo',
                params: {
                    id: this.userId
                }
            })
        },
        showDelete(id) {
            this.id = id
            console.log(this.$route.params.id, this.id)
            this.$bvModal.show('delete-list')
        },
        deleteList(){
            let userId = localStorage.getItem('userId')

            axios.delete(`http://localhost:3030/todo/delete/user/${userId}/list/${this.id}`)
            .then(response => {
                console.log('Deleted', response)

                this.getAllLists()
                // this.editForm.list_title = ''
                this.hideDelete()
                this.showAlert()
            }) 
            .catch(error => console.log(error))
        },
        hideDelete() {
            this.$bvModal.hide('delete-list')
        },
        editList(){
            console.log('edit list')
            this.edit = true
        }



    }
})
</script>

<style>

.side__bar{
    background: #7BC17E;
    padding: 0px !important;
}

.home__link{
    font-family: 'Poppins', sans-serif;
    font-size: 18px !important;
    color: #1D6420 !important;
}

.links{
    padding: 20px !important;
    /* text-align: center !important; */
}

.links:hover{
    background: #beffc1;
}

.add_list_card{
    height: 140px;
    background: #e2e2e2 !important;
    border: none !important;
}

.list_card{
    border: none !important;
    height: 140px;

}

.list_card:hover{
    cursor: pointer;
}

/* font styles */
.font__style{
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    font-weight: 600;
}

.list__title{
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    align-self: center;
    color: white;
}

.title__input__font{
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 500;
}
/*  COLORSS */
.theme-options{
    padding: 20px;
}

.color_themes{
    border-radius: 4px;
    width: 40px;
    height: 40px;
    border: solid 2px;
}

.orange {
    background-color: #FFC24A !important;
}
/* .orange:hover{
    background-color: #c08819 !important;
} */

.blue {
    background-color: #201E80 !important;
    color: #615DF6 !important;
}

.red{
    background-color: #E36161 !important;
    color: #B53636 !important;
}

.darkGreen{
    background-color: #1E8074 !important;
    color: #00584E !important;
}

.green{
    background-color: #7BC17E !important;
    color: #278A2B !important;
}

.purple{
    background-color: #AA96DA !important;
    color: #3F1F8D !important;
}

.yellow{
    background-color: #E7C71C !important;
        color: #B89B00 !important;
}

.pink{
    background-color: #ECCFCF !important;
    color: #C95555 !important;
}

/* end of colors */

/* input styles */
.list__title__input{
    border-bottom: 1px solid #B5ACC0 !important;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-radius: 0px !important;

    font-family: 'Poppins',sans-serif;
}

.list__title__input:focus{
    border-bottom: 2px solid #B5ACC0 !important;
}

.save__list{
    background-color: #AA96DA !important;
    border-color: #AA96DA !important;
    margin-top: 14px;
    /* width: 100px; */
    border-radius: 4px !important;

    font-family: 'Poppins', sans-serif;
    font-size: 14px !important;
    letter-spacing: 0.03em;

}

#right-click-menu{
    background: #FAFAFA;
    border: none !important;
    border-radius: 4px !important;

    /* box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12); */
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 250px;
    z-index: 999999;
    cursor: pointer;
    font-family: 'Poppins',sans-serif;

}

#right-click-menu li {
    border-bottom: 1px solid #E0E0E0;
    margin: 0;
    padding: 5px 35px;
    cursor: pointer;

}

#right-click-menu li:last-child {
    border-bottom: none;
}

#right-click-menu li:hover {
    background: #1E88E5;
    color: #FAFAFA;
}
</style>
