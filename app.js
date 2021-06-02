'use strict';
const grid = document.querySelector('.grid');
const StartShipPosition = 700;
let currentShipPosition = StartShipPosition;
const width = 40;
let invadersId;
const result = document.querySelector('.results');
let aliensClear = [];
let score = 0;
let level = 1;
let bullets = [];
let game = false,
  gameOver = false;
const highScores = new Array(10);
let pause = false;

highScores.fill(0, 0);

let td;
let tr;
const table = document.querySelector('.scores');

const createNode = (node, parent) => {
  const n = document.createElement(node);
  parent.appendChild(n);
  return n;
};

const createHighScores = () => {
  for (let i = 0; i < highScores.length; i++) {
    tr = createNode('tr', table);
    td = createNode('td', tr);
    td.textContent = i + 1 + '.  ' + highScores[i];
    td.classList.add('score' + i);
  }
};

createHighScores();

const fillHighScores = () => {
  for (let i = 0; i < highScores.length; i++) {
    td = document.querySelector('.score' + i);
    console.log(td);
    td.textContent = i + 1 + '.  ' + highScores[i];
    console.log(td.textContent);
  }
};
const squares = Array.from(document.querySelectorAll('.grid div'));

const addClass = (position, className) => {
  squares[position].classList.add(className);
};

const removeClass = (position, className) => {
  squares[position].classList.remove(className);
};

for (let i = 0; i < 800; i++) {
  const square = document.createElement('div');
  grid.appendChild(square);
}

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
  alienInvaders.forEach(element => {
    removeClass(element, 'invader');
  });
};

const drawShip = () => {
  ship.forEach(element => {
    addClass(element + currentShipPosition, 'ship');
  });
};

const clearShip = () => {
  ship.forEach(element => {
    removeClass(element + currentShipPosition, 'ship');
  });
};

drawInvaders();

drawShip();

const moveShip = e => {
  if (game && !gameOver) {
    clearShip();
    switch (e.key) {
    case 'ArrowLeft':
      if ((currentShipPosition - 1) % width !== 0) currentShipPosition--;
      break;
    case 'ArrowRight':
      if ((currentShipPosition + 1) % width < width - 1)
        currentShipPosition++;
      break;
    }
    drawShip();
  }
};

document.addEventListener('keydown', moveShip);

const clearBullets = () => {
  bullets.forEach(element => {
    clearInterval(element);
  });

  for (let i = 0; i < 800; i++) {
    if (squares[i].classList.contains('bullet')) removeClass(i, 'bullet');
  }

  bullets = [];
};

const moveInvaders = () => {
  if (game) {
    clearInvaders();

    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width;
    }

    drawInvaders();

    const restartGame = () => {
      result.innerHTML = 'game over';
      gameOver = true;

      highScores.unshift(score);
      highScores.sort((a, b) => b - a);
      highScores.pop();

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
          currentShipPosition = StartShipPosition;
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

      invadersId = setInterval(moveInvaders, 1000 - 100 * (level - 1));
    };

    ship.forEach(element => {
      if (
        squares[currentShipPosition + element].classList.contains(
          'invader',
          'ship'
        )
      ) {
        restartGame();
      }
    });

    for (let i = 0; i < alienInvaders.length; i++) {
      if (alienInvaders[i] >= squares.length - width) {
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
      invadersId = setInterval(moveInvaders, 1000 - 100 * (level - 1));
    };

    if (aliensClear.length === alienInvaders.length) {
      level++;
      gameOver = true;
      clearInterval(invadersId);
      nextRound();
    }
  }
};

invadersId = setInterval(moveInvaders, /*1000 - (100 * (level - 1))*/ 200);

const shoot = e => {
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
    };

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
  };

  switch (e.key) {
  case ' ':
    if (game && !gameOver) {
      bulletId = setInterval(bullet, 50);
      bullets.push(bulletId);
    }
  }
};

document.addEventListener('keyup', shoot);
