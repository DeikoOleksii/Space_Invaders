import { addClass, removeClass } from './utils.js';
import { state } from './game.js';
import { WIDTH, START_SHIP_POSITION } from './config.js';

const ship = [0, 39, 40, 41];
let currentShipPosition = START_SHIP_POSITION;

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

const moveShip = e => {
  if (state.game && !state.gameOver) {
    clearShip();
    if (e.key === 'ArrowLeft') {
      if ((currentShipPosition - 1) % WIDTH !== 0) currentShipPosition--;
    } else if (e.key === 'ArrowRight') {
      if ((currentShipPosition + 1) % WIDTH < WIDTH - 1) currentShipPosition++;
    }
    drawShip();
  }
};

const restartShip = () => {
  currentShipPosition = START_SHIP_POSITION;
};

export {
  drawShip,
  clearShip,
  moveShip,
  ship,
  currentShipPosition,
  restartShip,
};
