const grid = document.querySelector('.grid');
let currentShipPosition = 200;
let width = 15;
let direction = 1;
let invadersId;
let moveRight = true;
let result=document.querySelector('.results');

for (let i = 0; i < 255; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
}

const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];

const squares = Array.from(document.querySelectorAll('.grid div'));

const drawInvaders = () => {
    alienInvaders.forEach(element => {
        squares[element].classList.add('invader')
    });

}

const clearInvaders = () => {
    alienInvaders.forEach(element => {
        squares[element].classList.remove('invader')
    });

}

drawInvaders();

squares[currentShipPosition].classList.add('ship');

const moveShip = (e) => {
    squares[currentShipPosition].classList.remove('ship');
    switch (e.key) {
        case 'ArrowLeft':
            if (currentShipPosition % width != 0) currentShipPosition--;
            break;
        case 'ArrowRight':
            if (currentShipPosition % width < width - 1) currentShipPosition++;
            break;
    }
    squares[currentShipPosition].classList.add('ship');

}

document.addEventListener('keydown', moveShip);

const moveInvaders = () => {
    const left = alienInvaders[0] % width === 0
    const right = alienInvaders[alienInvaders.length - 1] % width === width - 1
    clearInvaders();

    if (right && moveRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width+1;
            direction = -1;
            moveRight=false;
        }
    }

    if(left && !moveRight){
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width-1;
            direction = 1;
            moveRight=true;
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }

    drawInvaders();

    if(squares[currentShipPosition].classList.contains('invader', 'ship')) {
        result.innerHTML='game over';
        clearInterval(invadersId);
    }
}

invadersId = setInterval(moveInvaders, 50);

