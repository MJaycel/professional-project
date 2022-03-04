let sizeWidth = 300; 
// let sizeHeight = 300;
let lineWidth = 15;
let radius = (sizeWidth - lineWidth) / 2;
// import {mapState, mapActions} from 'vuex'
// import { store } from './store'
// import {mapState} from 'vuex'

let p5;
let percentage;

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
        p5.clear();
        p5.translate(p5.width/2, p5.height/2); // change center
        p5.rotate((-1 / 2 + 0 / 180) * Math.PI); // rotate -90 deg
        
        p5.drawCircle('#efefef', 0, 10);
        p5.drawCircle('#000', percentage, 8);
        if(percentage == 100){
            p5.drawCircle('#1E8074', percentage);
        }
    }

    p5.drawCircle = (color, percent, lineW) =>{
        p5.beginShape();
        p5.arc(0, 0, radius, radius, Math.PI * 2 * percent/100, false);
        p5.strokeWeight(lineW);
        p5.strokeCap = 'round'; // butt, round or square
        p5.lineWidth = lineWidth
        p5.stroke(color);
    }
}


