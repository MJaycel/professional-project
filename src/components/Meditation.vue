<template>
    <div>
        <div class=" background_white">
            <div class="my_container my_center">
                <img src="../assets/meditation.svg" />

            </div>
            <div class="my_container my_center" >
                
                <div v-for="meditation in meditations" :key="meditation._id">
                    <br>
                        <div class="">
                            
                            <div class="hero-image" @click=" test = (`${meditation.html_link}`)">
                                <img  class="cover medi_image" :src="require(`../assets/lofi-images/${meditation.cover_image}.jpg`)"  alt="">
                                <p class="meditation-title hero-text">{{meditation.title}}</p>
                                <!-- <audio :src="test" controls/> -->
                            </div>
                            
                            <br>
                        </div>
                    <br>
                </div>
            </div>
            <div class="my_container my_center">
                <audio class="audio_width " :src="test" controls/>

            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'

export default ({
    name: "Meditation",
    data(){
        return{
            meditations:[],
            test: "https://professional-project-storage.s3.eu-west-1.amazonaws.com/bedtime-meditation-for-sleep.mp3"
        }
    },
    mounted(){
        this.getMeditationAudio()
    },

    methods:{

        getMeditationAudio(){
            axios
            .get(`http://localhost:3030/meditation`)
            .then(response => {
                console.log("Meditation is here: ", response.data)
                this.meditations = response.data
            })
            .catch(error => {
                console.log(error)
            })
        },

        testFunction(){
            this.test = this.meditations.html_link
        }
    }
})
</script>

<style scoped>


.background_white{
    background-color: white;
    padding: 50px 40px 50px 40px;
    margin-left: 100px;
    margin-right: 100px;
    border-radius: 25px;
    height: 650px;
}

.medi_image{
    width: 225px;
    height: 162px;
    border-radius: 15px
}

.my_container{
    display: flex;
    flex-direction: row;
    column-gap: 20px;
}

.max-width{
    width: 250px;
}

.cover{
    object-fit: cover;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.audio_width{
    width: 800px;
}

.hero-image{
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    border-radius: 10px;
    background-image: url();
}

.hero-text{
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
}

.my_center{
    justify-content: center;
}

</style>