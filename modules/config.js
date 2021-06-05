//import { HIGH_SCORES } from "./high_scores";

const GRID = document.querySelector('.grid');
const RESULT = document.querySelector('.results');
const TABLE = document.querySelector('.scores');

const START_SHIP_POSITION = 700;
const START_ALIEN_INVADERS = [17, 18, 19, 20, 21, 22];
const RESTART_ALIEN_INVADERS = [17, 18, 19, 20, 21, 22];
const SQUARES_NUMBER = 800;
const WIDTH = 40;
const INTERVALS = {
  INVADER: 1000,
  D: 100,
  COLLISION: 300,
  BULLET: 50,
  RESTARTING: 10
};

const HIGH_SCORES_LENGTH = 10;
const HIGH_SCORES = new Array(HIGH_SCORES_LENGTH);
HIGH_SCORES.fill(0, 0);

const SHIP = [0, 39, 40, 41];

export {
  GRID,
  RESULT,
  TABLE,
  START_SHIP_POSITION,
  START_ALIEN_INVADERS,
  RESTART_ALIEN_INVADERS,
  SQUARES_NUMBER,
  WIDTH,
  INTERVALS,
  HIGH_SCORES,
  HIGH_SCORES_LENGTH,
  SHIP
};
