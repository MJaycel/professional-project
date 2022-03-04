// import { fill } from "core-js/core/array";

let sizeWidth = 80; 
let sizeHeight = 80;
let lineWidth = 10;
let radius = sizeWidth / 2;


function setup(){
    createCanvas(200,300);
    background(0);
    
}

function draw(){
    translate(150,150);
    background(0);
    // console.log("what")
    rect(0,0,100,100);
    fill(0,255,0)
}

// translate(150, 80); // change center
// rotate((-1 / 2 + 0 / 180) * Math.PI); // rotate -90 deg

// //progress circle 100%
// beginPath();
// arc(0, 0, sizeWidth, sizeHeight, 0, Math.PI * 2, false);
// strokeStyle = '#efefef';
// lineCap = 'round'; // butt, round or square
// lineWidth = lineWidth
// stroke();