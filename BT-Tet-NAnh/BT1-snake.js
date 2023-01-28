const TIME = "500ms";
const STEP = 20;

let catPic = document.getElementById("cat-pic");
window.onload = function () {
    initialize(catPic);
};

setInterval(function(){
    if (parseInt(catPic.style.left) + parseInt(catPic.style.width) >= window.innerWidth) {
        catPic.style.left = parseInt(catPic.style.width)*(-1) + "px";
    }
    moveRight(catPic)
}, parseInt(TIME))

function initialize(image) {
    image.style.position = "absolute";
    image.style.left = "0";
    image.style.top = "0";
    image.style.transition = TIME;
    image.style.width = "200px";
    image.style.height = "200px";
    image.style.borderRadius = "50%";
    image.style.border = "2px solid black";
}

function moveRight(object) {
    object.style.left = parseInt(object.style.left) + STEP + "px";
}

