

import { RESULT, WIDTH } from './modules/config.js';
import { SQUARES } from './modules/utils.js';
import { startGame, state } from './modules/game.js';
import {
  drawInvaders,
  alienInvaders,
  aliensClear,
  invadersId,
  restartInvaders,
  restartInvId,
} from './modules/invaders.js';

import {
  drawShip,
  clearShip,
  moveShip,
  ship,
  currentShipPosition,
  restartShip,
} from './modules/ship.js';

import { shoot, clearBullets } from './modules/shooting.js';

import {
  createHighScores,
  HIGH_SCORES,
  fillHighScores,
} from './modules/high_scores.js';

createHighScores();

drawInvaders();

drawShip();

document.addEventListener('keydown', startGame);

document.addEventListener('keydown', moveShip);

const restarting = () => {
  if (state.game) {
    const restartGame = () => {
      RESULT.innerHTML = 'Game over';
      state.gameOver = true;

      HIGH_SCORES.unshift(state.score);
      HIGH_SCORES.sort((a, b) => b - a);
      HIGH_SCORES.pop();

      fillHighScores();
      state.pause = true;

      clearInterval(invadersId);

      const restart = e => {
        if (e.key && state.pause) {
          restartInvaders();
          clearBullets();
          clearShip();
          restartShip();
          drawShip();

          state.game = false;
          state.pause = false;
        }
      };

      document.addEventListener('keydown', restart);

      state.game = false;
      state.gameOver = false;
      state.level = 1;
      state.score = 0;

      restartInvId();
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
      restartInvId();
      restartInvaders();
      clearBullets();
      state.game = false;
      state.gameOver = false;
    };

    if (aliensClear.length === alienInvaders.length) {
      state.level++;
      state.gameOver = true;
      clearInterval(invadersId);
      nextRound();
    }
  }
};

setInterval(restarting, 10);

document.addEventListener('keyup', shoot);
