const grid = document.querySelector('.grid');
let currentShipPosition = 200;
let width = 15;
let direction = 1;
let invadersId;
let moveRight = true;
let result = document.querySelector('.results');
let aliensClear = [];
let score = 0;
let level = 1;
let bullets=[];

const addClass = (position, className) => {
    squares[position].classList.add(className);
}

const removeClass = (position, className) => {
    squares[position].classList.remove(className);
}

for (let i = 0; i < 225; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
}

/* const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]; */

let alienInvaders = [
    0, 1, 2, 3, 4, 5
];

const squares = Array.from(document.querySelectorAll('.grid div'));

console.log(squares.length);

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

drawInvaders();

addClass(currentShipPosition, 'ship');

const moveShip = (e) => {
    removeClass(currentShipPosition, 'ship');
    switch (e.key) {
        case 'ArrowLeft':
            if (currentShipPosition % width != 0) currentShipPosition--;
            break;
        case 'ArrowRight':
            if (currentShipPosition % width < width - 1) currentShipPosition++;
            break;
    }
    addClass(currentShipPosition, 'ship');

}

document.addEventListener('keydown', moveShip);

const moveInvaders = () => {
    const left = alienInvaders[0] % width === 0
    const right = alienInvaders[alienInvaders.length - 1] % width === width - 1
    clearInvaders();

    console.log(alienInvaders);

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

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += width;
    }


    drawInvaders();

    if (squares[currentShipPosition].classList.contains('invader', 'ship')) {
        result.innerHTML = 'game over';
        clearInterval(invadersId);
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] == squares.length-1) {
            result.innerHTML = 'game over';
            clearInterval(invadersId);
        }
    }

    if (aliensClear.length == alienInvaders.length) {
        level++
        result.innerHTML = 'win'
        clearInterval(invadersId)
        console.log(aliensClear)
        resetGane()
    }

}

const clearBullets = ()=>{
    bullets.forEach(element => {
        clearInterval(element);
    });

    for (let i = 0; i < 225; i++) {
        if(squares[i].classList.contains('bullet')) removeClass(i,'bullet');

    }
}

const resetGane = ()=>{
    aliensClear=[];
    alienInvaders = [
        0, 1, 2, 3, 4, 5
    ];
    clearBullets();
    drawInvaders();  
    invadersId = setInterval(moveInvaders, 1000-(100*(level-1)));
}

invadersId = setInterval(moveInvaders, 1000-(100*(level-1)));

const shoot = (e) => {
    let bulletId;
    let currentBulletPosition = currentShipPosition;
    const bullet = () => {   
        if(currentBulletPosition<width) {
            removeClass(currentBulletPosition,'bullet');
            console.log(bulletId);
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
            bulletId = setInterval(bullet, 100);
            bullets.push(bulletId);
    }

    console.log(bullets);

}



document.addEventListener('keydown', shoot)