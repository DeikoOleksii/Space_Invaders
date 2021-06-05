import { RESULT, INTERVALS, WIDTH, SQUARES_NUMBER } from './config.js';
import { SQUARES, addClass, removeClass } from './utils.js';
import { state } from './game.js';

const clearBullets = () => {
  for (const element of state.bullets) {
    clearInterval(element);
  }

  for (let i = 0; i < SQUARES_NUMBER; i++) {
    if (SQUARES[i].classList.contains('bullet')) removeClass(i, 'bullet');
  }

  state.bullets = [];
};

const shoot = e => {
  let bulletId;
  let currentBulletPosition = state.currentShipPosition;
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

      setTimeout(clearCollision, INTERVALS.COLLISION);
      clearInterval(bulletId);

      const alienDead = state.alienInvaders.indexOf(currentBulletPosition);
      state.aliensClear.push(alienDead);
      state.score++;
      RESULT.innerHTML = state.score;
    }
  };

  if (e.key === ' ') {
    if (state.game && !state.gameOver) {
      bulletId = setInterval(bullet, INTERVALS.BULLET);
      state.bullets.push(bulletId);
    }
  }
};

export { shoot, clearBullets };
