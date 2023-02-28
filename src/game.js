var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = 302;
var canvasHeight = 152;
var cellSize = 10;
var numCellsWidth = Math.floor(canvasWidth / cellSize);
var numCellsHeight = Math.floor(canvasHeight / cellSize);
var snakeX = [10];
var snakeY = [10];
var speedX = 0;
var speedY = 0;
var foodX = Math.floor(Math.random() * numCellsWidth);
var foodY = Math.floor(Math.random() * numCellsHeight);

function drawFood() {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(foodX * cellSize, foodY * cellSize, cellSize, cellSize);
}

function drawSnake() {
    ctx.fillStyle = "#000000";
    for (var i = 0; i < snakeX.length; i++) {
        ctx.fillRect(snakeX[i] * cellSize, snakeY[i] * cellSize, cellSize, cellSize);
    }
}

function drawGame() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    if (snakeX[0] === foodX && snakeY[0] === foodY) {
        snakeX.push(snakeX[snakeX.length - 1]);
        snakeY.push(snakeY[snakeY.length - 1]);
        foodX = Math.floor(Math.random() * numCellsWidth);
        foodY = Math.floor(Math.random() * numCellsHeight);
    }

    drawFood();

    snakeX.unshift(snakeX[0] + speedX);
    snakeY.unshift(snakeY[0] + speedY);
    snakeX.pop();
    snakeY.pop();

    drawSnake();
}

document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 37: // left arrow
            if (speedX !== 1) {
                speedX = -1;
                speedY = 0;
            }
            break;
        case 38: // up arrow
            if (speedY !== 1) {
                speedX = 0;
                speedY = -1;
            }
            break;
        case 39: // right arrow
            if (speedX !== -1) {
                speedX = 1;
                speedY = 0;
            }
            break;
        case 40: // down arrow
            if (speedY !== -1) {
                speedX = 0;
                speedY = 1;
            }
            break;
    }
});

function runGame() {
    drawGame();
    setTimeout(runGame, 50);
}

runGame();
