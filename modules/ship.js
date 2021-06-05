import { addClass, removeClass } from './utils.js';
import { state } from './game.js';
import { WIDTH, START_SHIP_POSITION, SHIP } from './config.js';

const drawShip = () => {
  for (const element of SHIP) {
    addClass(element + state.currentShipPosition, 'ship');
  }
};

const clearShip = () => {
  for (const element of SHIP) {
    removeClass(element + state.currentShipPosition, 'ship');
  }
};

const moveShip = e => {
  if (state.game && !state.gameOver) {
    clearShip();
    if (e.key === 'ArrowLeft') {
      if ((state.currentShipPosition - 1) % WIDTH !== 0) {
        state.currentShipPosition--;
      }
    } else if (e.key === 'ArrowRight') {
      if ((state.currentShipPosition + 1) % WIDTH < WIDTH - 1) {
        state.currentShipPosition++;
      }
    }
    drawShip();
  }
};

const restartShip = () => {
  state.currentShipPosition = START_SHIP_POSITION;
};

export {
  drawShip,
  clearShip,
  moveShip,
  restartShip,
};
