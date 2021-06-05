import { addClass, removeClass } from './utils.js';
import { state } from './game.js';
import { WIDTH, INTERVALS, RESTART_ALIEN_INVADERS } from './config.js';

const drawInvaders = () => {
  for (let i = 0; i < state.alienInvaders.length; i++) {
    if (!state.aliensClear.includes(i)) {
      addClass(state.alienInvaders[i], 'invader');
    }
  }
};

const clearInvaders = () => {
  for (const element of state.alienInvaders) {
    removeClass(element, 'invader');
  }
};

const moveInvaders = () => {
  if (state.game) {
    clearInvaders();

    for (let i = 0; i < state.alienInvaders.length; i++) {
      state.alienInvaders[i] += WIDTH;
    }
    drawInvaders();
  }
};

const restartInvaders = () => {
  state.aliensClear = [];
  clearInvaders();
  for (let i = 0; i < state.alienInvaders.length; i++) {
    state.alienInvaders[i] = RESTART_ALIEN_INVADERS[i];
  }
  drawInvaders();
};

const restartInvId = () => {
  state.invadersId = setInterval(
    moveInvaders,
    INTERVALS.INVADER - INTERVALS.D * (state.level - 1)
  );
};

state.invadersId = setInterval(
  moveInvaders,
  INTERVALS.INVADER - INTERVALS.D * (state.level - 1)
);

export {
  drawInvaders,
  clearInvaders,
  moveInvaders,
  restartInvaders,
  restartInvId,
};
