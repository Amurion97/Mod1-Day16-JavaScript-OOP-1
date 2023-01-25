let PI = Math.PI;
let width = document.getElementById("myCanvas").width;
let height = document.getElementById("myCanvas").height;
const TIME = "250ms";
class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    createCircle(color){
        let canvas = document.getElementById("myCanvas");
        let context = canvas.getContext("2d");
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2*PI);
        // context.strokeStyle = "green"
        // context.stroke();
        context.fillStyle = color;
        context.fill();
    }
    printCircleName(name, color){
        let canvas = document.getElementById("myCanvas");
        let context = canvas.getContext("2d");
        context.font = "15px Arial";
        context.fillStyle = color;
        context.fillText(name, this.x, this.y);
    }
}
//main
// let newCircle = new Circle(100, 100, 100);
// newCircle.createCircle(randomizeRGBColor());
setInterval(function(){
    let newCircle = new Circle(100, 100, 100);
    newCircle.createCircle(randomizeRGBColor());
    // console.log(100)
}, parseInt(TIME));

let count = 0;
for (let i = 50; i < width; i += 100) {
    for (let j = 50; j < height; j += 100) {
        count ++;
        let newCircle = new Circle(i, j, 50);
        newCircle.createCircle(randomizeRGBColor());
        newCircle.printCircleName(`No. ${count}`,randomizeRGBColor());
    }
}
console.log(count);
function randomize8bitNumber(){
    return (Math.floor(Math.random()*255))
}
function randomizeRGBColor(){
    return `rgb(${randomize8bitNumber()},${randomize8bitNumber()},${randomize8bitNumber()})`;
}
