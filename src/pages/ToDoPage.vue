<template>
    <div class="container-fluid">
        <div class="row">
            <div v-if="hideSideBar" class="col-2" style="padding:0px;">
                <SideBar :hideSideBar='hideSideBar'/>
            </div>
            <div style="font-size:26px;padding-top:10px;margin-left:8px;width:65px;">
                <b-icon @click="hideBar" icon="list" style="cursor: pointer;"></b-icon>
            </div>

            <!-- all to do list -->
            <div class="col-9">
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
                    <!-- add to do list card -->
                    <div v-b-hover="handleHover" class="card add_list_card col-2 d-flex justify-content-center" @click="showEdit= false; showAdd = !showAdd" style="margin-left: 24px;margin-top:16px;">
                        <b-icon  v-if="isHovered" icon="plus" style="color:#orange;width:70px;height:70px;align-self: center;cursor: pointer;"></b-icon>
                        <b-icon  v-else icon="plus" style="color:#575757;width:50px;height:50px;align-self: center;cursor: pointer;"></b-icon>                            
                    </div>

                    <!-- to do list card -->
                    <div @contextmenu="handler($event,list._id)" v-for="list in unArchivedLists" :key="list._id" :class="list.theme" class="card list_card col-2 d-flex justify-content-center"  style="margin-left: 24px;margin-top:16px;" @click="goToList(list._id)">
                        <p class="list__title">{{list.list_title}}</p>
                    </div>
                    <!-- Right click Menu -->
                    <ul id="right-click-menu" tabindex="-1" ref="right" v-if="viewMenu" @focus="viewMenu = true" @blur="viewMenu=false" :style="{top:top,left:left}">
                        <li @click="edit">Edit</li>
                        <li @focus="viewMenu = true" @click="showDelete(listId)">Delete</li>
                        <li @focus="viewMenu = true" @click="archiveList(listId)">Archive</li>
                    </ul>

                    <!-- Edit list form -->
                    <b-sidebar v-if="showEdit" id="sidebar-edit" right visible no-header>
                        <template #default="{hide}">
                            <!-- color themes -->
                            <div class="mt-3">
                                <b-icon icon='x' @click="showEdit = false && hide" class="float-right" style="width:35px;height: 35px;"></b-icon>
                                <p class="title__input__font" style="margin-left:14px;margin-bottom:0px;">Edit theme</p>                            
                            </div>

                            <div class="row" style="padding:10px;margin-left:17px; width:300px">
                                <div v-for="color in colorClasses" :key="color" class="col" style="padding:10px;">
                                    <div v-if="color === 'blue'" :class="color" class="color_themes" @click="setTheme(color)">
                                        <b-icon v-if="listForm.theme === 'blue'" v-show="color" icon="check"></b-icon>
                                    </div>
                                    <div v-if="color === 'orange'" :class="color" class="color_themes" @click="setTheme(color)">
                                        <b-icon v-if="listForm.theme === 'orange'" v-show="color" icon="check"></b-icon>
                                    </div>
                                    <div v-if="color === 'darkGreen'" :class="color" class="color_themes" @click="setTheme(color)">
                                        <b-icon v-if="listForm.theme === 'darkGreen'" v-show="color" icon="check"></b-icon>
                                    </div>
                                    <div v-if="color === 'red'" :class="color" class="color_themes" @click="setTheme(color)">
                                        <b-icon v-if="listForm.theme === 'red'" v-show="color" icon="check"></b-icon>
                                    </div>
                                    <div v-if="color === 'green'" :class="color" class="color_themes" @click="setTheme(color)">
                                        <b-icon v-if="listForm.theme === 'green'" v-show="color" icon="check"></b-icon>
                                    </div>
                                    <div v-if="color === 'yellow'" :class="color" class="color_themes" @click="setTheme(color)">
                                        <b-icon v-if="listForm.theme === 'yellow'" v-show="color" icon="check"></b-icon>
                                    </div>
                                    <div v-if="color === 'purple'" :class="color" class="color_themes" @click="setTheme(color)">
                                        <b-icon v-if="listForm.theme === 'purple'" v-show="color" icon="check"></b-icon>
                                    </div>
                                    <div v-if="color === 'pink'" :class="color" class="color_themes" @click="setTheme(color)">
                                        <b-icon v-if="listForm.theme === 'pink'" v-show="color" icon="check"></b-icon>
                                    </div>
                                </div>                            
                            </div>

                            <!-- Title input -->
                            <div style="padding:14px;">
                                <p class="title__input__font">List Title</p>
                                <b-form-input v-model="listForm.list_title" placeholder="add new list" class="list__title__input"></b-form-input>

                                <b-button class="save__list" @click="editList">Edit List</b-button>
                            </div>                            
                        </template>

                    </b-sidebar>

                </div>
                <!-- add list form -->
                <b-sidebar v-if="showAdd" id="sidebar-right" no-header visible right>
                    <!-- color themes -->
                    <template #default="{hide}">
                        <div class="mt-3">
                            <b-icon icon='x' class="float-right" style="width:35px;height: 35px;"  @click="showAdd = false && hide"></b-icon>
                            <p class="title__input__font" style="margin-left:14px;margin-bottom:0px;">Choose a theme</p>                            
                        </div>                    
                        <div class="row" style="padding:10px;margin-left:17px; width:300px">
                            <div v-for="color in colorClasses" :key="color" class="col" style="padding:10px;">
                                <div v-if="color === 'blue'" :class="color" class="color_themes" @click="setTheme(color)">
                                    <b-icon v-if="listForm.theme === 'blue'" v-show="color" icon="check"></b-icon>
                                </div>
                                <div v-if="color === 'orange'" :class="color" class="color_themes" @click="setTheme(color)">
                                    <b-icon v-if="listForm.theme === 'orange'" v-show="color" icon="check"></b-icon>
                                </div>
                                <div v-if="color === 'darkGreen'" :class="color" class="color_themes" @click="setTheme(color)">
                                    <b-icon v-if="listForm.theme === 'darkGreen'" v-show="color" icon="check"></b-icon>
                                </div>
                                <div v-if="color === 'red'" :class="color" class="color_themes" @click="setTheme(color)">
                                    <b-icon v-if="listForm.theme === 'red'" v-show="color" icon="check"></b-icon>
                                </div>
                                <div v-if="color === 'green'" :class="color" class="color_themes" @click="setTheme(color)">
                                    <b-icon v-if="listForm.theme === 'green'" v-show="color" icon="check"></b-icon>
                                </div>
                                <div v-if="color === 'yellow'" :class="color" class="color_themes" @click="setTheme(color)">
                                    <b-icon v-if="listForm.theme === 'yellow'" v-show="color" icon="check"></b-icon>
                                </div>
                                <div v-if="color === 'purple'" :class="color" class="color_themes" @click="setTheme(color)">
                                    <b-icon v-if="listForm.theme === 'purple'" v-show="color" icon="check"></b-icon>
                                </div>
                                <div v-if="color === 'pink'" :class="color" class="color_themes" @click="setTheme(color)">
                                    <b-icon v-if="listForm.theme === 'pink'" v-show="color" icon="check"></b-icon>
                                </div>
                            </div>                            
                        </div>

                    <!-- Title input -->
                    <div style="padding:14px;">
                        <p class="title__input__font">List Title</p>
                        <b-form-input v-model="LIST_TITLE" placeholder="List title" class="list__title__input"></b-form-input>

                        <b-button class="save__list" @click="saveList">Create List</b-button>
                    </div>                        
                    </template>

                </b-sidebar>
                                                                                                                                                                            

                <!-- Archived lists -->
                <div class="mt-5" style="padding-left: 20px;">
                    <span v-if="display" @click="displayArchive" class="font__style" style="cursor:pointer">Hide all archived lists</span>
                    <span v-else @click="displayArchive" class="font__style" style="cursor:pointer">View all archived lists</span>

                </div>
                <div v-if="display" class="row col-12" style="margin-left: 20px;padding:0px;">
                    <p v-if="archivedLists.length <= 0" class="heading_font">No archived List</p>

                    <div @contextmenu="archived($event,list._id)" v-for="list in archivedLists" 
                    :key="list._id" :class="list.theme" 
                    class="card list_card col-2 d-flex justify-content-center"  
                    style="margin-left: 24px;margin-top:16px;" 
                    @click="goToList(list._id)">
                        <p class="list__title">{{list.list_title}}</p>
                    </div>
                    <!-- Right click Menu -->
                    <ul id="right-click-menu" tabindex="-1" ref="archived" v-if="viewArchivedMenu" @focus="viewArchivedMenu = true" @blur="viewArchivedMenu=false" :style="{top:top,left:left}">
                        <li @click="editList">Edit</li>
                        <li @focus="viewArchivedMenu = true" @click="showDelete(listId)">Delete</li>
                        <li @focus="viewArchivedMenu = true" @click="unArchiveList(listId)">Un Archive</li>
                    </ul>
                </div>
            
                
            </div>
        </div>
        <b-modal id="delete-list" hide-header centered  hide-footer hide-header-close>
            <p class="heading_font">Confirmation</p>
            <p class="font__fam-style">
                Are you sure you want to permanently delete this List? 
            </p>
            <div class="d-flex justify-content-end">
                <b-button class="cancel__btn" @click="hideDelete"> Cancel</b-button>

                <b-button class="addItem__btn" @click="deleteList">Delete</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import SideBar from '@/components/SideBar.vue'

export default({
    name: 'ToDoPage',
    components: {
        SideBar
    },
    data() {
        return{
            hideSideBar: false,
            hideDisplay: '',
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
            colorSelected: false,
            selectedTheme: false,
            lists: [],
            archivedLists: [],
            unArchivedLists: [],

            listForm: {
                list_title: '',
                theme: 'green'
            },


            LIST_TITLE: '',

            viewMenu: false,
            top: '0px',
            left: '0px',
            listId: '',
            showEdit: false,

            setArchive: {
                archived: false
            },
            display: '',
            viewArchivedMenu: false,

            showAdd: false,

            listItems: [],
            event_id: ''
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
        hideBar() {
            this.hideSideBar = !this.hideSideBar

            if(this.hideSideBar){
                this.hideDisplay = 'hide_sideBar'
            } else if(this.hideSideBar === false) {
                this.hideDisplay = 'display_sideBar'
            }
        },
        displayArchive(){
            this.display = !this.display
        },
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
            this.top = top + 'px';
            this.left = left + 'px';
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
        archived(e,id){
            this.viewArchivedMenu = true;
            this.listId = id
            this.$nextTick(function() {
                this.$refs.archived.focus();

                this.setMenu(e.y - 500, e.x -90)
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
                    this.archivedLists = this.lists.filter(list => list.archived === true)
                    this.unArchivedLists = this.lists.filter(list => list.archived === false)
                }) 
                .catch(error => console.log(error))


        },
        //testing
        setTheme(color) {
            this.listForm.theme = color
            this.selectedTheme = !this.selectedTheme
        },        
        /// Add new list
        saveList() {
            if(this.LIST_TITLE === ''){
                this.LIST_TITLE = 'Untitled'
            }
            this.listForm.list_title = this.LIST_TITLE

            axios.post(`http://localhost:3030/todo/add/list/${this.userId}`, this.listForm)
            .then(response => {
                this.getAllLists()
                this.LIST_TITLE = ''
                this.showAdd = false
                
                console.log('added', response.data)
            }) 
            .catch(error => console.log(error))
        },

        /// direct page to single list
        goToList(id){
            this.$store.commit('setListId', id)
            this.$router.push({
                name: 'single_todo',
                params: {
                    id: id
                }
            })
        },
        showDelete(id) {
            this.id = id
            this.$bvModal.show('delete-list')
        },
        deleteList(){
            let userId = localStorage.getItem('userId')

            axios.delete(`http://localhost:3030/todo/delete/user/${userId}/list/${this.id}`)
            .then(response => {
                console.log('Deleted', response)
                this.getAllLists()
                this.checkItems()
                this.hideDelete()
                this.showAlert()

            }) 
            .catch(error => console.log(error))
        },
        hideDelete() {
            this.$bvModal.hide('delete-list')
        },
        edit(){
            console.log('edit list')
            this.getListData()
            this.showEdit = true
            this.showAdd = false
        },
        getListData(){
            /////getting from users collection
            axios.get(`http://localhost:3030/todo/user/${this.userId}/list/${this.listId}`)
            .then(response => {
                console.log('List data',response.data[0])
                this.listForm.list_title = response.data[0].list_title
                this.listForm.theme = response.data[0].theme
            })
            .catch(error => console.log(error))
        },
        editList() {
            axios.post(`http://localhost:3030/todo/edit/list/${this.listId}`, this.listForm)
                .then(response => {
                    console.log('edited', response.data)
                    this.showEdit = false
                    this.getAllLists()
                }) 
                .catch(error => console.log(error))
        },
        archiveList(id) {

            this.setArchive.archived = true

            axios.post(`http://localhost:3030/todo/archive/list/${id}`, this.setArchive)
                .then(response => {
                    console.log('edited', response.data)
                    this.getAllLists()
                }) 
                .catch(error => console.log(error))
        },
        unArchiveList(id) {

            this.setArchive.archived = false

            axios.post(`http://localhost:3030/todo/archive/list/${id}`, this.setArchive)
                .then(response => {
                    console.log('edited', response.data)
                    this.getAllLists()
                }) 
                .catch(error => console.log(error))
        },
        checkItems(){

            // loop through items
            for(let i = 0; i < this.lists.length; i++){
                this.listItems = this.lists[i].items

                for(let j = 0; j < this.listItems.length; j++){
                    /// get each items id and use the ids to find items in calendar
                    // then delete events if list is deleted
                    this.findInEvents(this.listItems[j]._id)

                    this.deleteEvent()
                    console.log('items length', this.listItems[j]._id)
                }
            }
        },
        findInEvents(id) {
            this.$store.dispatch('getAllEvents')

            console.log('EVENTS FROM CAL', this.$store.state.items)
            /// looping through each events and find the item that has the id that is being passed 
            // if found set event_id as the event that was found
            Array.from(this.$store.state.items).forEach((item)=> {
                if(item.item_id === id){
                    this.event_id = item._id
                }    
            })
        },
        deleteEvent() {
            let userId = localStorage.getItem('userId')
            axios.delete(`http://localhost:3030/calendar/delete/user/${userId}/event/${this.event_id}`)
            .then(response => {
                console.log('Deleted', response)
            }) 
            .catch(error => console.log(error))
        }
    },
    watch:{
        unArchivedLists: {
            handler(){
                this.getAllLists()
            }
        },    
    }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap');




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
    color: #DC9100 !important;

}

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
    background-color: #FFDF6C !important;
    color: #FFC700 !important;
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
