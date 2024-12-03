const board = document.getElementById('game-board');
const boardSize = 20;
const snake = [{ x: 10, y: 10 }];
const snakeBody = "CALEO";
let direction = { x: 0, y: 0 };
let food = { x: 5, y: 5 };

function createBoard() {
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        board.appendChild(cell);
    }
}

function draw() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('snake', 'food'); // Remove previous classes
    });

    snake.forEach((segment, index) => {
        const position = segment.y * boardSize + segment.x;
        cells[position].textContent = snakeBody[index % snakeBody.length];
        cells[position].classList.add('snake'); // Add snake class
    });

    const foodPosition = food.y * boardSize + food.x;
    cells[foodPosition].textContent = 'F';
    cells[foodPosition].classList.add('food'); // Add food class
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);
        food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
    } else {
        snake.pop();
        snake.unshift(head);
    }

    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        alert('Game Over');
        snake.length = 1;
        snake[0] = { x: 10, y: 10 };
        direction = { x: 0, y: 0 };
    }
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 200);
}

createBoard();
gameLoop();