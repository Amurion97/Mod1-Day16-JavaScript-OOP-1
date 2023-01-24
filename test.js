class Rectangle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    showInfo(){
        console.log(`Located at (${this.x}, ${this.y}), dimension: ${this.width} x ${this.height}, color ${this.color}`);
        console.log(this)
    }
}
let blueWall = new Rectangle(2, 2, 100, 200, "#1abbcc");
let result = document.getElementById("result");
result.style.backgroundColor = blueWall.color;