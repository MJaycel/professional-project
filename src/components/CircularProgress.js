
let sizeWidth = 500; 
let lineWidth = 15;
let radius = (sizeWidth - lineWidth) / 2;
let p5;
let percentage;

export function setPercentage(_percentage){
    percentage = _percentage;
    return true;
}

//link showing how to use p5 in vue
//https://medium.com/js-dojo/experiment-with-p5-js-on-vue-7ebc05030d33

export function main(_p5){
    p5 = _p5;
    p5.setup = () =>{
        var canvas = p5.createCanvas(600,500);
        canvas.parent("p5Canvas")
        p5.background(255);
    }

    p5.draw = () =>{
        p5.clear();
        p5.translate(p5.width/2, p5.height/2); // change center
        // p5.rotate((1 / 2 + 0 / 180) * Math.PI); // rotate -90 deg
        
        // if(percentage == 100){
            p5.drawCircle('#000', 360, 16);
        // } else if(percentage == 0){
        //     p5.drawCircle('#efefef', 0, 15);
        // } else {
        //     p5.drawCircle('#efefef', 0, 15);
        //     p5.drawCircle('#000', percentage, 16);
        // }
        p5.drawCircle('#efefef', percentage, 15);
        //text - percentage
        p5.drawText();
        
    }

    p5.drawCircle = (color, percent, lineW) =>{
        p5.beginShape();
        p5.strokeWeight(lineW);
        // p5.arc(0, 0, radius, 0, (Math.PI/180) * 2 * Math.floor(percent/100), false);
        p5.arc( 0, 0, radius, radius, (Math.PI/180) * 270, (Math.PI/180) * (270 + percent) );
        p5.lineCap = 'square';
        p5.lineWidth = lineWidth
        p5.stroke(color);
    }


    p5.drawText = () => {
        p5.beginShape();
        // p5.rotate((1 / 2 + 0 / 180) * Math.PI);        
        p5.strokeWeight(2)
        // p5.fill(0);
        p5.textSize(27);
        p5.text(Math.floor((percentage/360)*100) + '%', -30, 0);
        // console.log(Math.floor(percentage/360)*100)
    }
}


