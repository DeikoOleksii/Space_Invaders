import { INTERVALS, RESULT, WIDTH, SHIP } from './modules/config.js';
import { SQUARES } from './modules/utils.js';
import { startGame, state } from './modules/game.js';
import {
  drawInvaders,
  restartInvaders,
  restartInvId,
} from './modules/invaders.js';

import {
  drawShip,
  clearShip,
  moveShip,
  restartShip,
} from './modules/ship.js';

import { shoot, clearBullets } from './modules/shooting.js';

import {
  createHighScores,
  fillHighScores,
  refreshHighScores
} from './modules/high_scores.js';

createHighScores();

drawInvaders();

drawShip();

document.addEventListener('keydown', startGame);

document.addEventListener('keydown', moveShip);

const restartGame = () => {
  RESULT.innerHTML = 'Game over';
  state.gameOver = true;

  refreshHighScores();
  fillHighScores();

  state.pause = true;

  clearInterval(state.invadersId);

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

const nextRound = () => {
  restartInvId();
  restartInvaders();
  clearBullets();
  state.game = false;
  state.gameOver = false;
};

const restarting = () => {
  if (state.game) {
    for (const element of SHIP) {
      if (
        SQUARES[state.currentShipPosition + element].classList.contains(
          'invader',
          'ship'
        )
      ) {
        restartGame();
      }
    }

    for (const element of state.alienInvaders) {
      if (element >= SQUARES.length - WIDTH) {
        restartGame();
      }
    }

    if (state.aliensClear.length === state.alienInvaders.length) {
      state.level++;
      state.gameOver = true;
      clearInterval(state.invadersId);
      nextRound();
    }
  }
};

setInterval(restarting, INTERVALS.RESTARTING);

document.addEventListener('keyup', shoot);
