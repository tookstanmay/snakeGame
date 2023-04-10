// Game constants and variables
let inputDir = {
    x: 0,
    y: 0
};
let score = 0, highScore = 0;
let highScoreElement = document.querySelector("#highScore");
let board = document.getElementById("board");
const foodSound = new Audio("./sounds/food.mp3");
const moveSound = new Audio("./sounds/move.mp3");
const gameOverSound = new Audio("./sounds/gameover.mp3");
const musicSound = new Audio("./sounds/music.mp3");

let snakeArr = [
    {
        x: 13,
        y: 15
    },
];
let food = {
    x: Math.round(2 + (26 - 2) * Math.random()),
    y: Math.round(2 + (26 - 2) * Math.random())
};

let lastPaintTime = 0;
let speed = 8;

// Game functions
function main(ctime){
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime)/ 1000 < (1/ speed)){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function gameEngine(){
    // 1. updating snake array & food
    if (isCollide(snakeArr) === true){
        gameOverSound.play();
        inputDir = {
            x: 0,
            y: 0
        };
        $("#mainHeading").text("Game Over, hit arrow to play again.");
        snakeArr = [
            {
                x: 13,
                y: 15
            },
        ];
        score = 0;
    }

    // consuming the food and upgrading the variables: food and snakeLength
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        });
        food = {
            x: Math.round(2 + (26 - 1) * Math.random()),
            y: Math.round(2 + (26 - 1) * Math.random())
        }
        score += 1;
        $("#mainHeading").text("level " + score);
        if (score % 2 == 0){
            speed += 0.5;
        }
    }

    // moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i + 1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // 2. rendering the snake and food
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0){
            snakeElement.classList.add("head");
        }
        else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

function isCollide(snakeArr){
    for (let i = 1; i < snakeArr.length; i++){
        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y){
            musicSound.pause();
            speed = 8;
            highScore = score;
            $("#highScore").text("High Score " + highScore);
            return true;
        }
    }
    if (snakeArr[0].x >= 28 || snakeArr[0].x <= 0 || snakeArr[0].y >= 28 || snakeArr[0].y <= 0){
        musicSound.pause();
        speed = 8;
        highScore = score;
        $("#highScore").text("High Score " + highScore);
        return true;
    }
    return false;
}

// starter logic
window.requestAnimationFrame(main);

window.addEventListener("keydown", (event)=>{

    musicSound.play();
    $("#mainHeading").text("level " + score);
    inputDir = {
        x: 0,
        y: 0
    };
    moveSound.play();

    switch(event.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
})

document.querySelectorAll(".arrows").forEach(value=>{
    value.addEventListener("click", ()=>{
        let idText = value.getAttribute("id");
        keyPresses(idText);
    });
});

function keyPresses(idText){
    musicSound.play();
    $("#mainHeading").text("level " + score);
    inputDir = {
        x: 0,
        y: 0
    };
    moveSound.play();

    switch(idText){
        case "arrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "arrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "arrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "arrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
}