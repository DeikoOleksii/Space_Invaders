import { RESULT, INTS, WIDTH, SQUARES_NUMBER } from './config.js';
import { SQUARES, addClass, removeClass } from './utils.js';
import { state } from './game.js';
import { currentShipPosition } from './ship.js';
import { alienInvaders, aliensClear } from './invaders.js';

let bullets = [];

const clearBullets = () => {
  for (const element of bullets) {
    clearInterval(element);
  }

  for (let i = 0; i < SQUARES_NUMBER; i++) {
    if (SQUARES[i].classList.contains('bullet')) removeClass(i, 'bullet');
  }

  bullets = [];
};

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
      state.score++;
      RESULT.innerHTML = state.score;
    }
  };

  if (e.key === ' ') {
    if (state.game && !state.gameOver) {
      bulletId = setInterval(bullet, INTS.BULLET);
      bullets.push(bulletId);
    }
  }
};

export { shoot, clearBullets };
