const BOARD_WIDTH = 450;
const BOARD_HEIGHT = 450;

class Interval {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

function isIntersect(arr, n) {
    // Sort intervals in increasing order of start time
    arr.sort(function (i1, i2) {
        return i1.start - i2.start;
    });

    // In the sorted array, if start time of an interval
    // is less than end of previous interval, then there
    // is an overlap
    for (let i = 1; i < n; i++)
        if (arr[i - 1].end > arr[i].start)
            return true;

    // If we reach here, then no overlap
    return false;
}

class HTMLElements {
    trueWidth;
    trueHeight;
    X;
    Y;

    constructor(htmlID) {
        this.htmlElement = document.getElementById(htmlID);
        this.styles = this.htmlElement.style;
    }

    collapseRect(direction, speed, HTMLElements) {
        switch (direction) {
            case "east":
                if (this.X + this.trueWidth + speed >= HTMLElements.X) {
                    return true;
                }
                break;
        }
    }

    overlapRect(HTMLElement) {
        this.X = parseInt(this.styles.left);
        this.Y = parseInt(this.styles.top);
        HTMLElement.X = parseInt(HTMLElement.styles.left);
        HTMLElement.Y = parseInt(HTMLElement.styles.top);

        let positionsX = [new Interval(this.X, this.X + parseInt(this.trueWidth)),
            new Interval(HTMLElement.X, HTMLElement.X + parseInt(HTMLElement.trueWidth))];
        let n1 = positionsX.length;
        let positionsY = [new Interval(this.Y, this.Y + parseInt(this.trueHeight)),
            new Interval(HTMLElement.Y, HTMLElement.Y + parseInt(HTMLElement.trueHeight))];
        let n2 = positionsY.length;

        return (isIntersect(positionsX, n1) && isIntersect(positionsY, n2));
    }

    checkAllOverlap(HTMLElementArr) {
        for (let i = 0; i < HTMLElementArr.length; i++) {
            if (this.overlapRect(HTMLElementArr[i])) {
                return i;
            }
        }
        return -1;
    }

    setHidden() {
        this.htmlElement.setAttribute("hidden", "");
    }

    removeHidden() {
        this.htmlElement.removeAttribute("hidden");
    }
}

class field extends HTMLElements {
    constructor(htmlID) {
        super(htmlID);
        this.init();
        // this.fieldWidth = parseInt(this.styles.width) - parseInt(this.styles.borderWidth) * 2;
        // this.fieldHeight = parseInt(this.styles.height) - parseInt(this.styles.borderWidth) * 2;
    }

    init() {
        this.styles.width = "450px";
        this.styles.height = "450px";
        this.styles.border = "2px solid black";
        this.styles.position = "relative";
        this.styles.backgroundColor = "#F5F5F5";
        this.styles.margin = "0 auto";
    }

    setGround(level, groundID) {
        let background = document.getElementById(groundID);
        background.setAttribute("src", `images/grounds/ground-${level}.png`);
        background.style.width = parseInt(this.styles.width) + "px";
        background.style.height = parseInt(this.styles.height) + "px";
        background.style.zIndex = "-1";
    }

    removeGround() {
        this.styles.background = "none";
    }
}

class ObjectsInField extends HTMLElements {
    constructor(htmlID, field) {
        super(htmlID);
        this.field = field;
        this.initPosition();
        this.setRandomPosition();
    }

    initPosition() {
        this.styles.position = "absolute";
        this.styles.left = "0";
        this.styles.top = "0";
    }

    init2() {
        this.trueWidth = parseInt(this.styles.width) + parseInt(this.styles.borderWidth) * 2;
        this.trueHeight = parseInt(this.styles.height) + parseInt(this.styles.borderWidth) * 2;
        this.X = parseInt(this.styles.left);
        this.Y = parseInt(this.styles.top);
    }


    setRandomPosition() {
        this.X = Math.floor(Math.random() * (parseInt(this.field.styles.width) - this.trueWidth));
        // console.log(this.trueWidth);
        this.styles.left = this.X + "px";
        this.Y = Math.floor(Math.random() * (parseInt(this.field.styles.height) - this.trueHeight));
        this.styles.top = this.Y + "px";
        // console.log(this.X, this.Y);
        // console.log(this.styles.top, this.field.styles.height)
    }

}

class Car extends ObjectsInField {
    constructor(htmlID, field) {
        super(htmlID, field);
        this.init();
        this.init2();
        this.speed = 1;
        this.speedX = this.speed;
        this.speedY = 0;
        this.resetLocation();
    }

    init() {
        this.styles.width = "55px";
        this.styles.height = "50px";
        this.styles.border = "0";
        this.styles.position = "absolute";
    }

    setWidthHeight(axis) {
        switch (axis) {
            case "horizontal":
                this.styles.width = "55px";
                this.styles.height = "50px";
                break;
            case "vertical":
                this.styles.width = "50px";
                this.styles.height = "55px";
                break;
        }
    }

    resetLocation() {
        this.styles.left = "15px";
        this.styles.top = "15px";
        this.speedX = this.speed;
        this.speedY = 0;
        this.changeImageSrc("east");
    }

    changeImageSrc(direction) {
        this.htmlElement.src = `images/moving-car-${direction}.gif`;
        switch (direction) {
            case "east":
            case "west":
                this.setWidthHeight("horizontal");
                break;
            case "north":
            case "south":
                this.setWidthHeight("vertical");
                break;
        }
    }
}

class Obstacles extends ObjectsInField {
    constructor(htmlID, field) {
        super(htmlID, field);
        this.initObstacle();
        this.init2();
        this.setHidden();
    }

    initObstacle() {
        this.styles.width = "30px";
        this.styles.height = "30px";
        this.styles.border = "0";
        this.styles.left = parseInt(this.field.styles.width) + 1 + "px";
        this.styles.top = parseInt(this.field.styles.height) + 1 + "px";
    }

}

class Walls extends Obstacles {
    constructor(htmlID, field, position) {
        super(htmlID, field);
        this.initWall(position);
        this.removeHidden();
        this.init2();
    }

    initWall(position) {
        switch (position) {
            case "top":
            case "bottom":
                this.styles.width = parseInt(this.field.styles.width) + "px";
                this.styles.height = 2 + "px";
                break;
            case "left":
            case "right":
                this.styles.width = 2 + "px";
                this.styles.height = parseInt(this.field.styles.height) + "px";
                break;
        }
        switch (position) {
            case "top":
                this.styles.left = 0;
                this.styles.top = "-2px";
                break;
            case "bottom":
                this.styles.left = 0;
                this.styles.top = parseInt(this.field.styles.height) + "px";
                break;
            case "left":
                this.styles.left = "-2px";
                this.styles.top = 0;
                break;
            case "right":
                this.styles.left = parseInt(this.field.styles.width) + "px";
                this.styles.top = 0;
                break;
        }
        this.styles.backgroundColor = "#D3D0FC"
    }
}

class Stars extends ObjectsInField {
    constructor(htmlID, field) {
        super(htmlID, field);
        this.initStar();
        this.init2();
    }

    initStar() {
        this.styles.width = "20px";
        this.styles.height = "20px";
        this.styles.border = "0";
    }

}

class ScoreBoard extends HTMLElements {
    constructor(htmlID, score, level) {
        super(htmlID);
        this.score = score;
        this.level = level;
        this.styles.textAlign = "center";
        this.styles.fontFamily = "Lucida Console, Monospace, sans-serif";
        this.styles.fontSize = "25px";
        this.update();
    }

    update() {
        this.htmlElement.innerHTML = `SCORE: ${this.score} - LEVEL: ${this.level}`;
    }


}

class CountDowns extends HTMLElements {
    constructor(htmlID, count) {
        super(htmlID);
        this.styles.textAlign = "center";
        this.styles.fontFamily = "Lucida Console, Monospace, sans-serif";
        this.styles.fontSize = "50px";
        this.styles.position = "absolute";
        this.styles.left = "-50px";
        this.styles.width = "30px";
        this.styles.top = 0;
        this.count = count;
        this.update();
    }

    update() {
        this.htmlElement.innerHTML = `${this.count}`;
    }
}

//Game init
let gameField = new field("field");
gameField.setGround(1, "ground");

let scoreBoard = new ScoreBoard("score-board", 0, 1);

let pinkCar = new Car("pink-car", gameField);

let obstacles = {
    brownCrates: [new Obstacles("brown-crate-1", gameField),
        new Obstacles("brown-crate-2", gameField),
        new Obstacles("brown-crate-3", gameField),
        new Obstacles("brown-crate-4", gameField),
        new Obstacles("brown-crate-5", gameField),
        new Obstacles("brown-crate-6", gameField),
        new Obstacles("brown-crate-7", gameField),
        new Obstacles("brown-crate-8", gameField),
        new Obstacles("brown-crate-9", gameField),
        new Obstacles("brown-crate-10", gameField),
        new Obstacles("brown-crate-11", gameField),
        new Obstacles("brown-crate-12", gameField),
        new Obstacles("brown-crate-13", gameField),
        new Obstacles("brown-crate-14", gameField),
    ],
    walls: [new Walls("wall-1", gameField, "top"),
        new Walls("wall-2", gameField, "right"),
        new Walls("wall-3", gameField, "bottom"),
        new Walls("wall-4", gameField, "left")]
}
resetObstaclesPosition();


let stars = [new Stars("star-1", gameField),
    new Stars("star-2", gameField)];
setAllStarsPosition();

let speedUp = new Stars("speed-up", gameField);
setSpeedUpPosition();

//game loops

document.getElementById("start").addEventListener("click", function () {
    scoreBoard.level = 1;
    scoreBoard.score = 0;
    scoreBoard.update();
    pinkCar.resetLocation();
    resetObstaclesPosition();
    setAllStarsPosition();
    setSpeedUpPosition();
    gameField.setGround(scoreBoard.level, "ground");
    main();
})
function main() {
    let timer = 3000;
    let delay = 50;
    let countdown = new CountDowns("timer", 3);

    let refreshIntervalId = setInterval(function () {
        if (timer > 0) {
            if (timer % 1000 === 0) {
                countdown.removeHidden();
                countdown.count = timer / 1000;
                countdown.update();
            }
            timer -= delay;
        } else {
            countdown.setHidden();

            pinkCar.styles.left = parseInt(pinkCar.styles.left) + pinkCar.speedX * 5 + "px";
            pinkCar.styles.top = parseInt(pinkCar.styles.top) + pinkCar.speedY * 5 + "px";

            if (pinkCar.checkAllOverlap(obstacles.brownCrates) >= 0 || pinkCar.checkAllOverlap(obstacles.walls) >= 0) {
                alert("Game over!");
                clearInterval(refreshIntervalId);
            }

            if (pinkCar.overlapRect(speedUp)) {
                pinkCar.speed++;
                setSpeedUpPosition();
            }

            let starCollected = pinkCar.checkAllOverlap(stars);
            if (starCollected >= 0) {
                scoreBoard.score++;
                scoreBoard.update();
                if (scoreBoard.score === scoreBoard.level*3) {
                    levelUp();
                    timer = 3000;
                }
                setRandomStarPosition(starCollected);
            }
        }
    }, delay);

    window.addEventListener("keydown", function (event) {
        switch (event.code) {
            case "ArrowLeft":
            case "KeyA":
                pinkCar.speedX = -pinkCar.speed;
                pinkCar.speedY = 0;
                pinkCar.changeImageSrc("west");
                break;
            case "ArrowRight":
            case "KeyD":
                pinkCar.speedX = pinkCar.speed;
                pinkCar.speedY = 0;
                pinkCar.changeImageSrc("east");
                break;
            case "ArrowUp":
            case "KeyW":
                pinkCar.speedX = 0;
                pinkCar.speedY = -pinkCar.speed;
                pinkCar.changeImageSrc("north");
                break;
            case "ArrowDown":
            case "KeyS":
                pinkCar.speedX = 0;
                pinkCar.speedY = pinkCar.speed;
                pinkCar.changeImageSrc("south");
                break;
        }
        pinkCar.init2();
    })
}

//all support functions

function resetObstaclesPosition() {
    // for (const obstacleSet in obstacles) {
    //     console.log(obstacles[obstacleSet].length);
    //     for (let i = 0; i < obstacles[obstacleSet].length; i++) {
    //         if (i === obstacles[obstacleSet].length - 1) {
    //             console.log(obstacles[obstacleSet][i].X, obstacles[obstacleSet][i].Y);
    //             obstacles[obstacleSet][i].setRandomPosition();
    //         }
    //         obstacles[obstacleSet][i].setRandomPosition();
    //         let others = [...obstacles[obstacleSet]];
    //         others.splice(i, 1);
    //         while (obstacles[obstacleSet][i].checkAllOverlap(others) >= 0
    //         || obstacles[obstacleSet][i].overlapRect(pinkCar)) {
    //             obstacles[obstacleSet][i].setRandomPosition();
    //         }
    //     }
    // }
    let currentVisible = obstacles.brownCrates.length - 10;
    for (let i = 1; i <= scoreBoard.level; i++) {
        currentVisible += i;
    }
    for (let i = 0; i < currentVisible; i++) {
        obstacles.brownCrates[i].removeHidden();
        obstacles.brownCrates[i].setRandomPosition();
        let others = [...obstacles.brownCrates];
        others.splice(i, 1);
        while (obstacles.brownCrates[i].checkAllOverlap(others) >= 0
        || obstacles.brownCrates[i].overlapRect(pinkCar)) {
            obstacles.brownCrates[i].setRandomPosition();
        }
    }
    // console.log(gameField.htmlElement.innerHTML);
}

function setAllStarsPosition() {
    for (let i = 0; i < stars.length; i++) {
        setRandomStarPosition(i);
    }
}

function setRandomStarPosition(index) {
    stars[index].setRandomPosition();
    let otherStars = [...stars];
    otherStars.splice(index, 1);
    while (stars[index].checkAllOverlap(otherStars) >= 0
    || obstacles.brownCrates[index].overlapRect(pinkCar)
    || stars[index].checkAllOverlap(obstacles.brownCrates) >= 0) {
        stars[index].setRandomPosition();
    }
}

function levelUp() {
    if (scoreBoard.level === 4) {
        alert("Win");
    } else {
        scoreBoard.level++;
        scoreBoard.update();
        pinkCar.resetLocation();
        resetObstaclesPosition();
        setAllStarsPosition();
        setSpeedUpPosition();
        gameField.setGround(scoreBoard.level, "ground");
    }
}

function setSpeedUpPosition() {
    while (speedUp.checkAllOverlap(stars) >= 0
    || speedUp.overlapRect(pinkCar)
    || speedUp.checkAllOverlap(obstacles.brownCrates) >= 0) {
        speedUp.setRandomPosition();
    }
}

// function addCrate() {
//     let currentCrateNumber = obstacles.brownCrates.length;
//     gameField.htmlElement.innerHTML += `<img id="brown-crate-${currentCrateNumber + 1}" src="images/brown-crate-removebg.png" height="497" width="502"/>`;
//     let newCrate = new Obstacles(`brown-crate-${currentCrateNumber + 1}`, gameField);
//     obstacles.brownCrates.push(newCrate);
//     // console.log(gameField.htmlElement.innerHTML);
// }









