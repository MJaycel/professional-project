<template>
    <div class="container-fluid">
        <!-- <div class="row" > -->

            <!-- <div :class="col_class" class="my_container my_center align_center">
                <Meditation/>
            </div> -->
            <b-icon v-b-tooltip.hover title="Home" icon="arrow-left" class="arrow-left" @click="goBack"></b-icon>
            <div :class="col_class" class="my_center align_center">
                <Meditation/>
            </div>
        <!-- </div> -->
    </div>

</template>

<script>
// import axios from 'axios'
import Meditation from '../components/Meditation.vue'

export default ({
    name: 'MeditationPage',
    components:{
        Meditation,
    },
    methods:{
        goBack(){
            let userId = localStorage.getItem('userId')
            this.$router.push({ name: 'home', params: { id: userId} })
        }
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

.arrow-left{
    color: rgb(22, 22, 22);
    width:40px;
    height:40px;
    margin-left:20px;
    margin-top:20px;
    cursor:pointer
}

</style>