import { addClass, removeClass } from './utils.js';
import { state } from './game.js';
import { WIDTH, INTS } from './config.js';

let alienInvaders = [17, 18, 19, 20, 21, 22];
let aliensClear = [];
let invadersId;

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

const moveInvaders = () => {
  if (state.game) {
    clearInvaders();

    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += WIDTH;
    }
    drawInvaders();
  }
};

const restartInvaders = () => {
  aliensClear = [];
  clearInvaders();
  alienInvaders = [17, 18, 19, 20, 21, 22];
  drawInvaders();
};

const restartInvId = () => {
  invadersId = setInterval(
    moveInvaders,
    INTS.INVADER - INTS.D * (state.level - 1)
  );
};

invadersId = setInterval(
  moveInvaders,
  INTS.INVADER - INTS.D * (state.level - 1)
);

export {
  drawInvaders,
  clearInvaders,
  moveInvaders,
  alienInvaders,
  aliensClear,
  invadersId,
  restartInvaders,
  restartInvId,
};
