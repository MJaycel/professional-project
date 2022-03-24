<template>
    <div class="container-fluid ">
        <div class="background row" >
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
                <div class="links">
                    <router-link class="home__link" :to="{name: 'todo_page',params: {id: this.userId} }">
                        <b-icon icon="card-checklist"></b-icon>
                    </router-link>
                </div>
            </div>

            <div class="col-11 my_container my_center align_center">
                <Meditation/>
            </div>

        </div>
    </div>

</template>

<script>
// import axios from 'axios'
import Meditation from '@/components/Meditation.vue'

export default ({
    components:{
        Meditation
    }
})
</script>

<style scoped>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.my_center{
    justify-content: center;
}

.align_center{
    align-items: center;
}

.my_container{
    display:flex;
}

.background{
    background-color: #D2EAD3; 
}

</style>