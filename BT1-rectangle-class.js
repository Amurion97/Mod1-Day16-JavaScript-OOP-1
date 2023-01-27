class Rectangle {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = (x !== undefined) ? x : 0;
        this.y = (y !== undefined) ? y : 0;
    }

    calculateArea() {
        return this.height * this.width;
    }

    calculatePerimeter() {
        return 2 * (this.height + this.width)
    }

    drawOnCanvas(x, y, color) {
        let canvas = document.getElementById("myCanvas");
        let context = canvas.getContext("2d");
        let rectangleColor = (color !== undefined) ? color : randomizeRGBColor();
        this.x = (x !== undefined) ? x : this.x;
        let positionX = this.x;
        this.y = (y !== undefined) ? y : this.y;
        let positionY = this.y;
        console.log(rectangleColor);
        context.beginPath();
        // context.strokeStyle = "green"
        // context.stroke();
        context.fillStyle = rectangleColor;
        context.fillRect(positionX, positionY, this.width, this.height);
    }

    printInfo(resultID) {
        let result = document.getElementById(resultID);
        result.innerHTML = `<p>The rectangle has an area of ${this.calculateArea()}px and a perimeter of ${this.calculatePerimeter()}px</p>`
    }

    setWidth(width) {
        this.width = parseInt(width);
    }

    setHeight(height) {
        this.height = parseInt(height);
    }

    setX(x) {
        // console.log(isNaN(parseInt(x)));
        if (isNaN(parseInt(x)) === false) {
            this.x = parseInt(x);
        }
    }

    setY(y) {
        if (isNaN(parseInt(y)) === false) {
            this.y = parseInt(y);
        }
    }

    clear() {
        let canvas = document.getElementById("myCanvas");
        let context = canvas.getContext("2d");
        context.clearRect(this.x, this.y, this.width, this.height);
    }
}

let newRectangle = new Rectangle(200, 150);
newRectangle.printInfo("notification");
newRectangle.drawOnCanvas(100, 200);
console.log(isNaN(parseInt("100")));

document.getElementById("set").addEventListener("click", function () {
    newRectangle.clear();
    let newWidth = document.getElementById("width").value;
    console.log(newWidth)
    newRectangle.setWidth(newWidth);
    newRectangle.setHeight(document.getElementById("height").value);
    newRectangle.setX(document.getElementById("x").value);
    newRectangle.setY(document.getElementById("y").value);
    newRectangle.printInfo("notification");
    newRectangle.drawOnCanvas();
})

function randomize8bitNumber() {
    return (Math.floor(Math.random() * 255));
}

function randomizeRGBColor() {
    return `rgb(${randomize8bitNumber()},${randomize8bitNumber()},${randomize8bitNumber()})`;
}
