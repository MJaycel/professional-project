
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
//https://medium.com/js-dojo/experiment-with-p5-js-on-vue-7ebc05030d33 **


export function main(_p5){
    p5 = _p5;
    p5.setup = () =>{
        var canvas = p5.createCanvas(600,500);
        canvas.parent("p5Canvas")
        p5.background(255);
    }

    p5.draw = () =>{
        // p5.clear();
        p5.background(255);
        p5.translate(p5.width/2, p5.height/2); // change center
        p5.drawCircle('#efefef', 360);
        p5.drawCircle('#000', percentage);
        
        // let startPercentage = 0;
        // var arcInterval = setInterval(function() {
        //     startPercentage += 1;
        //     // p5.clear();
        //     p5.drawCircle('#000', startPercentage);
        //     if(startPercentage >= percentage) clearInterval(arcInterval);
        // }, 1000);
        
        //text - percentage
        p5.drawText();
    }

    // p5.drawCircle = () => {
    //     let startPercentage = 0;

    //     // let fps = 1000/200;
    //     var arcInterval = setInterval(function() {
    //         startPercentage += 2;
    //         // p5.clear();
    //         // p5.beginShape();
    //         // p5.strokeWeight(15);
    //         // // p5.stroke('#df00');
    //         // p5.strokeStyle = '#b1b1b1';
    //         // p5.noFill();
    //         // //arc(x, y, width, height, start, stop);
    //         // p5.arc(0, 0, radius, radius, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360), false );
    //         // p5.lineWidth = lineWidth;

    //         p5.beginShape();
    //         p5.strokeWeight(15);
    //         p5.stroke('#efefef');
    //         // p5.strokeStyle = '#efefef';
    //         p5.noFill();
    //         //arc(x, y, width, height, start, stop);
    //         p5.arc(0, 0, radius, radius, (Math.PI/180) * 270, (Math.PI/180) * (270 + startPercentage), false );
    //         p5.lineWidth = lineWidth;

    //         if(startPercentage >= percentage) clearInterval(arcInterval);

        
    //     }, 10);
    // }

    p5.drawCircle = (color, percent) => {
        p5.beginShape();
        p5.strokeWeight(15);
        p5.stroke(color);
        p5.noFill();
        //arc(x, y, width, height, start, stop);
        p5.arc(0, 0, radius, radius, (Math.PI/180) * 270, (Math.PI/180) * (270 + percent), false );
        p5.lineWidth = lineWidth;
    }


    p5.drawText = () => {
        p5.beginShape();
        p5.strokeWeight(2)
        p5.textSize(27);
        p5.fill(0);

        /* 
           Change degrees percentage to 100%
           e.g 120 degrees (2 tasks done) 
           Math.floor -- round up 
           120/360 * 100 = 33% -- FORMULA 
        */

        //text(word, x, y);
        p5.text(Math.floor((percentage/360)*100) + '%', -30, 0);
    }
}


