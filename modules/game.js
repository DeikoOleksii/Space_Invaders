import { START_ALIEN_INVADERS, START_SHIP_POSITION } from './config.js';

const state = {
  currentShipPosition: START_SHIP_POSITION,
  alienInvaders: START_ALIEN_INVADERS,
  aliensClear: [],
  invadersId: undefined,
  bullets: [],
  score: 0,
  level: 1,
  game: false,
  gameOver: false,
  pause: false,
};

const startGame = e => {
  if (e.key) state.game = true;
};

export { startGame, state };
