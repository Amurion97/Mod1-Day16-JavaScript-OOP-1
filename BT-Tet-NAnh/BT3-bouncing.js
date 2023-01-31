const TIME = "500ms";
const STEP = 10;
const borderWidth = "2px";

let catPic = document.getElementById("cat-pic");
console.log(window.innerWidth, window.innerHeight);

window.onload = function () {
    initialize(catPic);
    let direction = "topLeft-to-bottomRight";
    let stepX = 10;
    let stepY = 10;
    setInterval(function () {
        let newX = parseInt(catPic.style.left) + stepX;
        let newY = parseInt(catPic.style.top) + stepY;
        let touchingRightSide =  + parseInt(catPic.style.width)  >= window.innerWidth;
        let touchingBottomSide =  + parseInt(catPic.style.height)  >= window.innerHeight;
        let touchingLeftSide = newX < 0;
        let touchingTopSide = newY < 0;
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
                } else {
                    moveRight(catPic);
                    moveDown(catPic);
                    break;
                }
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
                } else {
                    moveLeft(catPic);
                    moveDown(catPic);
                    break;
                }
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
};

function initialize(image) {
    image.style.position = "absolute";
    image.style.left = "0";
    image.style.top = "0";
    // image.style.transition = parseInt(TIME)/STEP + "ms";
    image.style.width = "200px";
    image.style.height = "200px";
    image.style.borderRadius = "50%";
    image.style.border = `${borderWidth} solid black`;
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


// function moveRight(object) {
//     // for (let i = 0; i < STEP; i++) {
//     //     setTimeout(function () {
//     //         object.style.left = parseInt(object.style.left) + 1 + "px";
//     //     }, parseInt(TIME) / STEP);
//     // }
//     let left = parseInt(object.style.left),
//         dx = STEP,
//         dy = 0,
//         i = 1,
//         count = STEP,
//         delay = 20;
//
//     function loop() {
//         if (i >= count) {
//             return;
//         }
//         i += 1;
//         object.style.left = (left + i) + 'px';
//         console.log(object.style.left);
//         // object.style.top = (object.style.top - (dy * i / count)).toFixed(0) + 'px';
//         setTimeout(loop, delay);
//     }
//
//     loop();
// }
//
// function moveLeft(object) {
//     for (let i = 0; i < STEP; i++) {
//         setTimeout(function () {
//             object.style.left = parseInt(object.style.left) - 1 + "px";
//             console.log(object.style.left);
//         }, 20);
//     }
// }

// function moveUp(object) {
//     for (let i = 0; i < STEP; i++) {
//         setTimeout(function () {
//             object.style.top = parseInt(object.style.top) - 1 + "px";
//             console.log(object.style.top)
//         }, 20);
//     }
// }

// function moveDown(object) {
//     // for (let i = 0; i < STEP; i++) {
//     //     setTimeout(function () {
//     //         object.style.top = parseInt(object.style.top) + 1 + "px";
//     //     }, parseInt(TIME) / STEP);
//     // }
//
//
// }

function sitAtRightSide(object) {
    let objectTrueWidth = parseInt(object.style.width) + parseInt(object.style.borderWidth) * 2;
    object.style.left = window.innerWidth - objectTrueWidth + "px";
}

function sitAtBottomSide(object) {
    let objectTrueWidth = parseInt(object.style.width) + parseInt(object.style.borderWidth) * 2;
    object.style.top = window.innerHeight - objectTrueWidth + "px";
}

function sitAtLeftSide(object) {
    object.style.left = "0px";
}

function sitAtTopSide(object) {
    object.style.top = "0px";
}

