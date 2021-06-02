'use strict';
const GRID = document.querySelector('.grid');
const RESULT = document.querySelector('.results');
const TABLE = document.querySelector('.scores');

const START_SHIP_POSITION = 700;
const SQUARES_NUMBER = 800;
const WIDTH = 40;
const INTS = {
  INVADER: 1000,
  D: 100,
  COLLISION: 300,
  BULLET: 50
};
const HIGH_SCORES = new Array(10);

let currentShipPosition = START_SHIP_POSITION;
let invadersId;
let aliensClear = [];
let score = 0;
let level = 1;
let bullets = [];
let game = false,
  gameOver = false;
let pause = false;

HIGH_SCORES.fill(0, 0);

let td;
let tr;

const createNode = (node, parent) => {
  const n = document.createElement(node);
  parent.appendChild(n);
  return n;
};

const createHighScores = () => {
  for (let i = 0; i < HIGH_SCORES.length; i++) {
    tr = createNode('tr', TABLE);
    td = createNode('td', tr);
    td.textContent = i + 1 + '.  ' + HIGH_SCORES[i];
    td.classList.add('score' + i);
  }
};

createHighScores();

const fillHighScores = () => {
  for (let i = 0; i < HIGH_SCORES.length; i++) {
    td = document.querySelector('.score' + i);
    console.log(td);
    td.textContent = i + 1 + '.  ' + HIGH_SCORES[i];
    console.log(td.textContent);
  }
};

for (let i = 0; i < SQUARES_NUMBER; i++) {
  const SQUARE = document.createElement('div');
  GRID.appendChild(SQUARE);
}

const SQUARES = Array.from(document.querySelectorAll('.grid div'));

const addClass = (position, className) => {
  SQUARES[position].classList.add(className);
};

const removeClass = (position, className) => {
  SQUARES[position].classList.remove(className);
};

let alienInvaders = [10, 11, 12, 13, 14, 15];

const ship = [0, 39, 40, 41];

const startGame = e => {
  if (e.key) game = true;
  console.log(game);
};

document.addEventListener('keydown', startGame);

const drawInvaders = () => {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!aliensClear.includes(i)) {
      addClass(alienInvaders[i], 'invader');
    }
  }
};

const clearInvaders = () => {
  for (const element of alienInvaders) {
    removeClass(element, 'invader');
  }
};

const drawShip = () => {
  for (const element of ship) {
    addClass(element + currentShipPosition, 'ship');
  }
};

const clearShip = () => {
  for (const element of ship) {
    removeClass(element + currentShipPosition, 'ship');
  }
};

drawInvaders();

drawShip();

const moveShip = e => {
  if (game && !gameOver) {
    clearShip();
    if (e.key === 'ArrowLeft') {
      if ((currentShipPosition - 1) % WIDTH !== 0) currentShipPosition--;
    } else if (e.key === 'ArrowRight') {
      if ((currentShipPosition + 1) % WIDTH < WIDTH - 1)
        currentShipPosition++;
    }
    drawShip();
  }
};

document.addEventListener('keydown', moveShip);

const clearBullets = () => {
  for (const element of bullets) {
    clearInterval(element);
  }

  for (let i = 0; i < SQUARES_NUMBER; i++) {
    if (SQUARES[i].classList.contains('bullet')) removeClass(i, 'bullet');
  }

  bullets = [];
};

const moveInvaders = () => {
  if (game) {
    clearInvaders();

    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += WIDTH;
    }
    drawInvaders();

    const restartGame = () => {
      RESULT.innerHTML = 'game over';
      gameOver = true;

      HIGH_SCORES.unshift(score);
      HIGH_SCORES.sort((a, b) => b - a);
      HIGH_SCORES.pop();

      fillHighScores();
      pause = true;

      clearInterval(invadersId);

      const restart = e => {
        if (e.key && pause) {
          aliensClear = [];
          clearInvaders();
          alienInvaders = [10, 11, 12, 13, 14, 15];

          drawInvaders();

          clearBullets();

          clearShip();
          currentShipPosition = START_SHIP_POSITION;
          drawShip();

          game = false;
          console.log('1');

          pause = false;
        }
      };

      document.addEventListener('keydown', restart);

      game = false;
      gameOver = false;
      level = 1;
      score = 0;

      invadersId = setInterval(
        moveInvaders,
        INTS.INVADER - INTS.D * (level - 1)
      );
    };

    for (const element of ship) {
      if (
        SQUARES[currentShipPosition + element].classList.contains(
          'invader',
          'ship'
        )
      ) {
        restartGame();
      }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
      if (alienInvaders[i] >= SQUARES.length - WIDTH) {
        console.log(alienInvaders[i]);
        restartGame();
      }
    }
    const nextRound = () => {
      aliensClear = [];
      alienInvaders = [10, 11, 12, 13, 14, 15];
      clearBullets();
      drawInvaders();
      game = false;
      gameOver = false;
      invadersId = setInterval(
        moveInvaders,
        INTS.INVADER - INTS.D * (level - 1)
      );
    };

    if (aliensClear.length === alienInvaders.length) {
      level++;
      gameOver = true;
      clearInterval(invadersId);
      nextRound();
    }
  }
};

invadersId = setInterval(
  moveInvaders,
  INTS.INVADER - INTS.D * (level - 1)
);

const shoot = e => {
  let bulletId;
  let currentBulletPosition = currentShipPosition;
  const bullet = () => {
    if (currentBulletPosition < WIDTH) {
      removeClass(currentBulletPosition, 'bullet');
      clearInterval(bulletId);
    }
    if (currentBulletPosition >= WIDTH) {
      removeClass(currentBulletPosition, 'bullet');
      currentBulletPosition -= WIDTH;
      addClass(currentBulletPosition, 'bullet');
    }

    const clearCollision = () => {
      removeClass(currentBulletPosition, 'collision');
    };

    if (SQUARES[currentBulletPosition].classList.contains('invader')) {
      removeClass(currentBulletPosition, 'bullet');
      removeClass(currentBulletPosition, 'invader');
      addClass(currentBulletPosition, 'collision');

      setTimeout(clearCollision, INTS.COLLISION);
      clearInterval(bulletId);

      const alienDead = alienInvaders.indexOf(currentBulletPosition);
      aliensClear.push(alienDead);
      score++;
      RESULT.innerHTML = score;
      console.log(score);
    }
  };

  if (e.key === ' ') {
    if (game && !gameOver) {
      bulletId = setInterval(bullet, INTS.BULLET);
      bullets.push(bulletId);
    }
  }
};

document.addEventListener('keyup', shoot);
