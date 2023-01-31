const TIME = "250ms";
const STEP = 20;
const borderWidth = "2px";
const directions = ["left-to-right", "top-to-bottom", "right-to-left", "bottom-to-top",
    "topLeft-to-bottomRight", "topRight-to-bottomLeft", "bottomRight-to-topLeft", "bottomLeft-to-topRight"];

let catPic = document.getElementById("cat-pic");
let direction;
let key;

window.onload = function () {
    initialize(catPic);
};
setInterval(function () {
    key = Math.floor(Math.random() * 8);
    direction = directions[key];
    let touchingRightSide = parseInt(catPic.style.left) + parseInt(catPic.style.width) + STEP >= window.innerWidth;
    let touchingBottomSide = parseInt(catPic.style.top) + parseInt(catPic.style.height) + STEP >= window.innerHeight;
    let touchingLeftSide = parseInt(catPic.style.left) - STEP <= 0;
    let touchingTopSide = parseInt(catPic.style.top) - STEP <= 0;
    switch (direction) {
        case "left-to-right":
            if (touchingRightSide) {
                catPic.style.left = window.innerWidth - parseInt(catPic.style.width) - parseInt(borderWidth) * 2 + "px";
                direction = "top-to-bottom";
                break;
            }
            moveRight(catPic);
            break;
        case "top-to-bottom":
            if (touchingBottomSide) {
                catPic.style.top = window.innerHeight - parseInt(catPic.style.height) - parseInt(borderWidth) * 2 + "px";
                direction = "right-to-left";
                break;
            }
            moveDown(catPic);
            break;
        case "right-to-left":
            if (touchingLeftSide) {
                catPic.style.left = "0px";
                direction = "bottom-to-top";
                break;
            }
            moveLeft(catPic);
            break;
        case "bottom-to-top":
            if (touchingTopSide) {
                catPic.style.top = "0px";
                direction = "left-to-right";
                break;
            }
            moveUp(catPic);
            break;
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

window.addEventListener("keydown", function (event) {
    switch (event.code) {
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
    for (let i = 0; i < STEP; i++) {
        object.style.left = parseInt(object.style.left) + 1 + "px";
    }
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

