const TIME = "250ms";
const STEP = 20;
const borderWidth = "2px";

let catPic = document.getElementById("cat-pic");
window.onload = function () {
    initialize(catPic);
};
let catPicTrueWidth = parseInt(catPic.style.width) + parseInt(borderWidth) * 2;

console.log(window.innerWidth, window.innerHeight);

let direction = "left-to-right"
setInterval(function () {
    switch (direction) {
        case "left-to-right":
            if (parseInt(catPic.style.left) + parseInt(catPic.style.width) + STEP >= window.innerWidth) {
                catPic.style.left = window.innerWidth - catPicTrueWidth + "px";
                direction = "top-to-bottom";
                break;
            }
            moveRight(catPic);
            break;
        case "top-to-bottom":
            if (parseInt(catPic.style.top) + parseInt(catPic.style.height) + STEP >= window.innerHeight) {
                catPic.style.top = window.innerHeight - catPicTrueWidth + "px";
                direction = "right-to-left";
                break;
            }
            moveDown(catPic);
            break;
        case "right-to-left":
            if (parseInt(catPic.style.left) - STEP <= 0) {
                catPic.style.left = "0px";
                direction = "bottom-to-top";
                break;
            }
            moveLeft(catPic);
            break;
        case "bottom-to-top":
            if (parseInt(catPic.style.top) - STEP <= 0) {
                catPic.style.top = "0px";
                direction = "left-to-right";
                break;
            }
            moveUp(catPic);
            break;
    }
}, parseInt(TIME))

function initialize(image) {
    image.style.position = "absolute";
    image.style.left = "0";
    image.style.top = "0";
    image.style.transition = TIME;
    image.style.width = "200px";
    image.style.height = "200px";
    image.style.borderRadius = "50%";
    image.style.border = `${borderWidth} solid black`;
    console.log(image.style.borderWidth);
}

function moveRight(object) {
    object.style.left = parseInt(object.style.left) + STEP + "px";
}

function moveLeft(object) {
    object.style.left = parseInt(object.style.left) - STEP + "px";
}

function moveUp(object) {
    object.style.top = parseInt(object.style.top) - STEP + "px";
}

function moveDown(object) {
    object.style.top = parseInt(object.style.top) + STEP + "px";
}

