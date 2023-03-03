const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = 302;
const canvasHeight = 152;
const cellSize = 10;
const numCellsWidth = Math.floor(canvasWidth / cellSize);
const numCellsHeight = Math.floor(canvasHeight / cellSize);
let snakeX = [10];
let snakeY = [10];
let speedX = 0;
let speedY = 0;
let foodX = 0;
let foodY = 0;

function init() {
    foodX = Math.floor(Math.random() * numCellsWidth);
    foodY = Math.floor(Math.random() * numCellsHeight);
}

function drawFood() {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(foodX * cellSize, foodY * cellSize, cellSize, cellSize);
}

function drawSnake() {
    ctx.fillStyle = "#000000";
    for (let i = 0; i < snakeX.length; i++) {
        ctx.fillRect(snakeX[i] * cellSize, snakeY[i] * cellSize, cellSize, cellSize);
    }
}

function checkCollision() {
    if (snakeX[0] < 0 || snakeX[0] >= numCellsWidth || snakeY[0] < 0 || snakeY[0] >= numCellsHeight || snakeX.slice(1).includes(snakeX[0]) && snakeY.slice(1).includes(snakeY[0])) {
        snakeX = [10];
        snakeY = [10];
        speedX = 0;
        speedY = 0;
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

    checkCollision();
    drawSnake();
}

document.addEventListener("keydown", (event) => {
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
    setTimeout(runGame, 75);
}

init();
runGame();
