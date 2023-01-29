const TIME = "50ms";
const STEP = 20;
const borderWidth = "2px";

let catPic = document.getElementById("cat-pic");
window.onload = function () {
    initialize(catPic);
};

console.log(window.innerWidth, window.innerHeight);

let direction = "topLeft-to-bottomRight"
setInterval(function () {
    let touchingRightSide = parseInt(catPic.style.left) + parseInt(catPic.style.width) + STEP >= window.innerWidth;
    let touchingBottomSide = parseInt(catPic.style.top) + parseInt(catPic.style.height) + STEP >= window.innerHeight;
    let touchingLeftSide = parseInt(catPic.style.left) - STEP <= 0;
    let touchingTopSide = parseInt(catPic.style.top) - STEP <= 0;
    switch (direction) {
        case "topLeft-to-bottomRight":
            if (touchingRightSide) {
                sitAtRightSide(catPic);
                moveDown(catPic);
                direction = "topRight-to-bottomLeft";
                break;
            } else if (touchingBottomSide) {
                sitAtBottomSide(catPic);
                moveRight(catPic);
                direction = "bottomLeft-to-topRight";
                break;
            }
            moveRight(catPic);
            moveDown(catPic);
            break;
        case "topRight-to-bottomLeft":
            if (touchingBottomSide) {
                sitAtBottomSide(catPic);
                moveLeft(catPic);
                direction = "bottomRight-to-topLeft";
                break;
            } else if (touchingLeftSide) {
                sitAtLeftSide(catPic);
                moveDown(catPic);
                direction = "topLeft-to-bottomRight";
                break;
            }
            moveLeft(catPic);
            moveDown(catPic);
            break;
        case "bottomRight-to-topLeft":
            if (touchingLeftSide) {
                sitAtLeftSide(catPic);
                moveUp(catPic);
                direction = "bottomLeft-to-topRight";
                break;
            } else if (touchingTopSide) {
                sitAtTopSide(catPic);
                moveLeft(catPic);
                direction = "topRight-to-bottomLeft";
                break;
            }
            moveLeft(catPic);
            moveUp(catPic);
            break;
        case "bottomLeft-to-topRight":
            if (touchingTopSide) {
                sitAtTopSide(catPic);
                moveRight(catPic);
                direction = "topLeft-to-bottomRight";
                break;
            } else if (touchingRightSide) {
                sitAtRightSide(catPic);
                moveUp(catPic);
                direction = "bottomRight-to-topLeft";
                break;
            }
            moveRight(catPic);
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

function sitAtRightSide(object) {
    object.style.left = window.innerWidth - parseInt(object.style.width) - parseInt(object.style.borderWidth) * 2 + "px";
}

function sitAtBottomSide(object) {
    object.style.top = window.innerHeight - parseInt(object.style.height) - parseInt(object.style.borderWidth) * 2 + "px";
}

function sitAtLeftSide(object) {
    object.style.left = "0px";
}

function sitAtTopSide(object) {
    object.style.top = "0px";
}

