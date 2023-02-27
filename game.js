var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");

var canvasWidth = 302;
var canvasHeight = 152;

var cellSize = 10;
var numCellsWidth = Math.floor(canvasWidth / cellSize);
var numCellsHeight = Math.floor(canvasHeight / cellSize);

var snakeX = 10;
var snakeY = 10;

var speedX = 0;
var speedY = 0;

var foodX = Math.floor(Math.random() * numCellsWidth);
var foodY = Math.floor(Math.random() * numCellsHeight);

function drawFood() {
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(foodX * cellSize, foodY * cellSize, cellSize, cellSize);
}

function drawGame() {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Проверка, не находится ли голова змейки на том же месте, где находится еда
  if (snakeX === foodX && snakeY === foodY) {
    // Генерация новых координат для еды
    foodX = Math.floor(Math.random() * numCellsWidth);
    foodY = Math.floor(Math.random() * numCellsHeight);
  }

  drawFood();

  ctx.fillStyle = "#000000";
  ctx.fillRect(snakeX * cellSize, snakeY * cellSize, cellSize, cellSize);

  snakeX += speedX;
  snakeY += speedY;
}

document.addEventListener("keydown", function (event) {
  switch (event.keyCode) {
    case 37: // left arrow
      speedX = -1;
      speedY = 0;
      break;
    case 38: // up arrow
      speedX = 0;
      speedY = -1;
      break;
    case 39: // right arrow
      speedX = 1;
      speedY = 0;
      break;
    case 40: // down arrow
      speedX = 0;
      speedY = 1;
      break;
  }
});

function runGame() {
  drawGame();
  setTimeout(runGame, 50);
}

runGame();
