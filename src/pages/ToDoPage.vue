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
            </div>

            <!-- all to do list -->
            <div class="col-10">
                <!-- heading for to do lists-->
                <div class="mt-5" style="padding-left: 20px;">
                    <p class="font__style">Your todo lists</p>
                </div>

                <div class="row col-12" style="margin-left: 20px;padding:0px;">
                <!-- to do list card -->

                    <div v-for="list in lists" :key="list._id" :class="list.theme" class="card list_card col-2 d-flex justify-content-center"  style="margin-left: 24px;margin-top:16px;">
                        <p class="list__title">{{list.list_title}}</p>
                    </div>

                    <!-- add to do list card -->
                    <div v-b-hover="handleHover" class="card add_list_card col-2 d-flex justify-content-center" v-b-toggle.sidebar-right style="margin-left: 24px;margin-top:16px;">
                        <b-icon  v-if="isHovered" icon="plus" style="color:#orange;width:70px;height:70px;align-self: center"></b-icon>
                        <b-icon  v-else icon="plus" style="color:#575757;width:50px;height:50px;align-self: center"></b-icon>                            
                    </div>

                </div>
                <!-- add list form -->
                <b-sidebar id="sidebar-right" right>
                    <!-- color themes -->
                    <p class="title__input__font" style="margin-left:14px;margin-bottom:0px;">Choose a theme</p>
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

                </b-sidebar>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default({
    name: 'ToDoPage',
    data() {
        return{
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
            }
        }
    },
    mounted(){
        this.getAllLists()
    },
    methods: {
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
}

.red{
    background-color: #E36161 !important;
}

.darkGreen{
    background-color: #1E8074 !important;
}

.green{
    background-color: #7BC17E !important;
}

.purple{
    background-color: #AA96DA !important;
}

.yellow{
    background-color: #E7C71C !important;
}

.pink{
    background-color: #ECCFCF !important;
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
</style>
