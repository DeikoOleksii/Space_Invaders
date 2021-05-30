const grid = document.querySelector('.grid');
let currentShipPosition = 524;
let width = 30;
let direction = 1;
let invadersId;
let moveRight = true;
let result = document.querySelector('.results');
let scores = document.querySelector('.scores');
let aliensClear = [];
let score = 0;
let level = 1;
let bullets = [];
let game = false, gameOver = false;
let highScores = new Array(10);

highScores.fill(0,0);

const addClass = (position, className) => {
    squares[position].classList.add(className);
}

const removeClass = (position, className) => {
    squares[position].classList.remove(className);
}

for (let i = 0; i < 600; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
}

/* const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]; */

let alienInvaders = [
    10, 11, 12, 13, 14, 15
];

const ship=[
    0,
    29,30,31
]

const squares = Array.from(document.querySelectorAll('.grid div'));

const startGame = (e) => {
    if (e.key) game = true;
}

document.addEventListener('keydown', startGame)

const drawInvaders = () => {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensClear.includes(i)) {
            addClass(alienInvaders[i], 'invader');
        }
    }

}

const clearInvaders = () => {
    alienInvaders.forEach(element => {
        removeClass(element, 'invader');
    });

}

const drawShip = ()=>{
    ship.forEach(element => {
        addClass(element+currentShipPosition,'ship');
    });
}

const clearShip = ()=>{
    ship.forEach(element => {
        removeClass(element+currentShipPosition,'ship');
    });
}

drawInvaders();

drawShip()

const moveShip = (e) => {
    if (game && !gameOver) {
        clearShip()
        switch (e.key) {
            case 'ArrowLeft':
                if ((currentShipPosition-1) % width != 0) currentShipPosition--;
                break;
            case 'ArrowRight':
                if ((currentShipPosition+1) % width < width - 1) currentShipPosition++;
                break;
        }
        drawShip()  
    }
}

document.addEventListener('keydown', moveShip);

const moveInvaders = () => {
    const left = alienInvaders[0] % width === 0
    const right = alienInvaders[alienInvaders.length - 1] % width === width - 1
    clearInvaders();

    /* if (right && moveRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1;
            direction = -1;
            moveRight = false;
        }
    }

    if (left && !moveRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1;
            direction = 1;
            moveRight = true;
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    } */

    if (game) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width;
        }
    }

    drawInvaders();

    
    ship.forEach(element => {
        if (squares[currentShipPosition+element].classList.contains('invader', 'ship')) {
            result.innerHTML = 'game over';
            clearInterval(invadersId);
            gameOver = true;
            restartGame();
        }
    });
    
    

    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] >= squares.length - width) {
            result.innerHTML = 'game over';
            clearInterval(invadersId);
            gameOver = true;
            restartGame();
        }
    }

    if (aliensClear.length == alienInvaders.length) {
        level++
        gameOver=true;
        //result.innerHTML = 'win'
        clearInterval(invadersId)
        console.log(aliensClear)
        nextRound()
    }

}

invadersId = setInterval(moveInvaders, /*1000 - (100 * (level - 1))*/200);

const shoot = (e) => {
    let bulletId;
    let currentBulletPosition = currentShipPosition;
    const bullet = () => {
        if (currentBulletPosition < width) {
            removeClass(currentBulletPosition, 'bullet');
            clearInterval(bulletId);
        }
        if (currentBulletPosition >= width) {
            removeClass(currentBulletPosition, 'bullet');
            currentBulletPosition -= width;
            addClass(currentBulletPosition, 'bullet');
        }

        const clearCollision = () => {
            removeClass(currentBulletPosition, 'collision');
        }

        if (squares[currentBulletPosition].classList.contains('invader')) {
            removeClass(currentBulletPosition, 'bullet');
            removeClass(currentBulletPosition, 'invader');
            addClass(currentBulletPosition, 'collision');

            setTimeout(clearCollision, 300);
            clearInterval(bulletId);

            const alienDead = alienInvaders.indexOf(currentBulletPosition);
            aliensClear.push(alienDead);
            score++;
            result.innerHTML = score;
        }

    }

    switch (e.key) {
        case ' ':
            if (game && !gameOver) {
                bulletId = setInterval(bullet, 50)
                bullets.push(bulletId)
            }
    }


}

document.addEventListener('keyup', shoot)


const clearBullets = () => {
    bullets.forEach(element => {
        clearInterval(element);
    });

    for (let i = 0; i < 600; i++) {
        if (squares[i].classList.contains('bullet')) removeClass(i, 'bullet');

    }

    bullets = [];
}

const nextRound = () => {
    aliensClear = [];
    alienInvaders = [
        10, 11, 12, 13, 14, 15
    ];
    clearBullets();
    drawInvaders();
    game = false;
    gameOver=false;
    invadersId = setInterval(moveInvaders, 1000 - (100 * (level - 1)));
}


const restartGame = ()=>{
    highScores.unshift(score);
    highScores.sort((a,b)=>b-a);
    highScores.pop();
    scores.innerHTML=highScores;
 
    aliensClear = [];
    clearInvaders();
    alienInvaders = [
        10, 11, 12, 13, 14, 15
    ];
    drawInvaders();

    clearBullets();
    
    clearShip();
    currentShipPosition=524;
    drawShip();

    game=false;
    gameOver=false;
    level=1;
    score=0;

    invadersId = setInterval(moveInvaders, 1000 - (100 * (level - 1)));

}