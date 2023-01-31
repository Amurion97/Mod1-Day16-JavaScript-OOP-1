const TIME = "500ms";
const STEP = 5000;
let direction = "left-to-right"
let catPic = document.getElementById("cat-pic");
window.onload = function () {
    init(catPic);
    // setInterval(function(){
    // let positionLR = parseInt(catPic.style.left) + parseInt(catPic.style.width);
    // console.log(positionLR);

    let newX = parseInt(catPic.style.left) - 199;
    let newY = parseFloat(catPic.style.top) - 3;
    console.log(newX, newY);

    transition(catPic,newX,newY);

    // console.log(window.innerWidth)
    // if (positionLR >= window.innerWidth) {
    //     direction = "right-to-left"
    // }
    // if (positionLR <= parseInt(catPic.style.width)) {
    //     direction = "left-to-right"
    // }
    // if (direction === "right-to-left") {
    //     moveLeft(catPic)
    // } else {
    //     moveRight(catPic)
    // }

    // }, parseInt(TIME))
};
console.log(catPic.style.left)


document.addEventListener("click",function (event) {
    let target = event.target;
    switch (target.id){
        case "left":
            moveLeft(catPic);
            break;
        case "right":
            moveRight(catPic);
            break;
        case 'up':
            moveUp(catPic);
            break;
        case "down":
            moveDown(catPic);
            break;
    }
})
window.addEventListener("keydown",function (event) {
    console.log(event)
    console.log(event.keyCode);
    switch (event.code){
        case "ArrowLeft":
        case "KeyA":
            moveLeft(catPic);
            break;
        case "ArrowRight":
        case "KeyD":
            moveRight(catPic);
            break;
        case "ArrowUp":
        case "KeyW":
            moveUp(catPic);
            break;
        case "ArrowDown":
        case "KeyS":
            moveDown(catPic);
            break;
    }
})
function init(image) {
    image.style.position = "relative";
    image.style.left = "0";
    console.log(image.style.left);
    // image.style.right = "0";
    image.style.top = "0";
    // image.style.bottom = "0";
    // image.style.transition = TIME;
    image.style.width = "300px";
    image.style.height = "300px";

}

function transition(object, x, y, transitionTime) {
    if (isNaN(x) || isNaN(y)){
        return;
    }
    let left = parseInt(object.style.left),
        top = parseInt(object.style.top),
        dx = left - x,
        dy = top - y,
        i = 1,
        count = (Math.abs(dx) > Math.abs(dy))? Math.abs(dx) : Math.abs(dy),
        stepX = (dx/count).toFixed(5),
        stepY = (dy/count).toFixed(5),
        delay = parseInt((transitionTime !== undefined) ? (transitionTime / count).toFixed(0) : (500 / count).toFixed(0));

    function loop() {
        if (i > count) {
            return;
        }
        i += 1;
        console.log(object.style.left);
        object.style.left = (left - i*stepX) + 'px';
        console.log(object.style.top);
        object.style.top = (top - i*stepY) + 'px';
        setTimeout(loop, delay);
    }

    loop();
}

function moveUp(object){
    console.log(object);
    object.style.top = parseInt(object.style.top) - 10 + "px";
}
function moveDown(object){
    console.log(object);
    object.style.top = parseInt(object.style.top) + 10 + "px";
    // alert(+object.style.top + 10 + "px")
}
function moveLeft(object){
    console.log(object);
    object.style.left = parseInt(object.style.left) - 10 + "px";
}
function moveRight(object){
    // console.log(object);
    console.log(object.style.left);
    object.style.left = parseFloat(object.style.left) + 10 + "px";
    console.log(object.style.left);
}

for (let i = 0; i < 100; i++) {

}

