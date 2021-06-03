import { GRID, SQUARES_NUMBER } from './config.js';

for (let i = 0; i < SQUARES_NUMBER; i++) {
  const SQUARE = document.createElement('div');
  GRID.appendChild(SQUARE);
}

const SQUARES = Array.from(document.querySelectorAll('.grid div'));

const addClass = (position, className) => {
  SQUARES[position].classList.add(className);
};

const removeClass = (position, className) => {
  SQUARES[position].classList.remove(className);
};

export { SQUARES, addClass, removeClass };
