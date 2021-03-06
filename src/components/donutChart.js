let sizeWidth = 500; 
let lineWidth = 15;
let radius = (sizeWidth - lineWidth) / 2;
let p5;
let percentage;
let inProgress;
let notStarted;
const colors = ['#7BC17E', '#FA7045','#D4D4D4'];

export function setPercentage(_percentage, _inProgress,_notStarted){
    percentage = _percentage;
    inProgress = _inProgress;
    notStarted = _notStarted;
    return true;
}

let angles;
//link showing how to use p5 in vue
//https://medium.com/js-dojo/experiment-with-p5-js-on-vue-7ebc05030d33 **


export function main(_p5){
    p5 = _p5;
    p5.setup = () =>{
        var canvas = p5.createCanvas(360,280);
        canvas.parent("p5Canvas")
        p5.background(255);
    }

    p5.draw = () =>{
        angles = [percentage,inProgress,notStarted]
        p5.clear();
        p5.background(255);
        p5.translate(p5.width/2, p5.height/2); // change center
        p5.strokeCap(p5.SQUARE);
        p5.circle('#efefef',360)
        p5.drawCircle(angles);
    }

    ///////////////////////////////////////// 
    p5.drawCircle = (data) => {
        p5.beginShape();
        p5.strokeWeight(25);
        p5.noFill();
        let lastAngle = 0;

        for(let i = 0; i < data.length; i++){

            p5.stroke(colors[i])
            p5.arc(0, 0, radius, radius, lastAngle,lastAngle + p5.radians(data[i]) 
            );
            lastAngle += p5.radians(data[i])
        }
        p5.lineWidth = lineWidth;
    }

    p5.circle = (color, data) => {
        p5.beginShape();
        p5.strokeWeight(25);
        p5.stroke(color);
        p5.noFill();
        p5.arc(0, 0, radius, radius, (Math.PI/180) * 270, (Math.PI/180) * (270 + data), false );
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


