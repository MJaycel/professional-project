let sizeWidth = 300; 
let sizeHeight = 300;
let lineWidth = 10;
// let radius = sizeWidth / 2;
// import {mapState, mapActions} from 'vuex'
// import { store } from './store'
// import {mapState} from 'vuex'

let p5;
let percentage;
console.log('waaat',percentage)

export function setPercentage(_percentage){
    percentage = _percentage;
    return true;
}


export function main(_p5){
    p5 = _p5;
    p5.setup = () =>{
        var canvas = p5.createCanvas(480,500);
        canvas.parent("p5Canvas")
        p5.background(255);
    }

    p5.draw = () =>{
        p5.translate(p5.width/2, p5.height/2); // change center
        p5.rotate((-1 / 2 + 0 / 180) * Math.PI); // rotate -90 deg
        
        //progress circle 100%
        p5.beginShape();
        p5.arc(0, 0, sizeWidth/2, sizeHeight/2, Math.PI * 2, false);
        p5.strokeWeight(10);
        p5.lineCap = 'square'; // butt, round or square
        p5.lineWidth = lineWidth
        p5.stroke('#FFC0CB');
        
        // console.log("refresh", percentage)
        // //progress circle 
        var percentage1 = Math.min(Math.max(0, percentage/100 || 1), 1);
        // console.log(percentage)
        p5.beginShape();
        p5.arc(0, 0, sizeWidth/2, sizeHeight/2, Math.PI * 2 * percentage1, false);
        p5.strokeWeight(10);
        p5.lineCap = 'square'; // butt, round or square
        p5.lineWidth = lineWidth
        p5.stroke('#555');

    }
}


