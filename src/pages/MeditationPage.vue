<template>
    <div id="app">
        <header>
            <router-link :to="{name: 'home', params: userId}">Home</router-link>
            <h1>
                Meditation
            </h1>
        </header>
        <svg class="left-background" />
        <svg class="right-background" />
        <Meditation/>

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
.left-background{
    position: absolute;
    width: 288.5px;
    height: 288.5px;
    left: 0px;
    top: 70vh;

    background: #AED9AF;
    box-shadow: 6px 6px 8px rgba(0, 0, 0, 0.25), inset -72px -12px 43px #F8F2D1;
    border-radius:0% 100% 0% 100% / 100% 100% 0% 0% 
}

.right-background{
    position: absolute;
    width: 364px;
    height: 376px;
    left: 81%;
    top: .99px;

    background: #A4D1A2;
    box-shadow: inset 50px -75px 83px #F8F2D1;
    border-radius: 100% 0% 0% 100% / 0% 100% 0% 100% ;
}

</style>