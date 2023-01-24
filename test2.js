let catPic = document.getElementById("cat-pic");
window.onload = function () {
    init(catPic);
};
const TIME = "250ms"
let direction = "left-to-right"
setInterval(function(){
    let positionLR = parseInt(catPic.style.left) + parseInt(catPic.style.width);
    console.log(positionLR);

    console.log(window.innerWidth)
    if (positionLR >= window.innerWidth) {
        direction = "right-to-left"
    }
    if (positionLR <= parseInt(catPic.style.width)) {
        direction = "left-to-right"
    }
    if (direction === "right-to-left") {
        moveLeft(catPic)
    } else {
        moveRight(catPic)
    }

}, parseInt(TIME))
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
    // image.style.right = "0";
    image.style.top = "0";
    // image.style.bottom = "0";
    image.style.transition = TIME;
    image.style.width = "300px";
    image.style.height = "300px";

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
    console.log(object);
    object.style.left = parseInt(object.style.left) + 10 + "px";
}

