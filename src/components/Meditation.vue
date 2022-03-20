<template>
    <div>
        <div class="my_container my_center">
            <div  v-for="meditation in meditations" :key="meditation._id">
                
                <br>
                    <div >
                        <div class="hero-image">
                            <img class="cover" :src="require(`../assets/lofi-images/${meditation.cover_image}.jpg`)" width="80%" height="250" alt="">
                            <p class="meditation-title hero-text">{{meditation.title}}</p>
                            <audio :src="meditation.html_link" controls/>
                        </div>
                        
                        <br>
                    </div>
                <br>

                

                
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
            meditations:[]
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
        }
    }
})
</script>

<style scoped>

.my_container{
    display: flex;
    flex-direction: row;
}

.max-width{
    width: 250px;
}

.cover{
    object-fit: cover;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

}



.meditation-title{
    position: absolute;
    width: 225px;
    height: 162px;


    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.245em;

}

.hero-image{
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    border-radius: 10px;
    
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