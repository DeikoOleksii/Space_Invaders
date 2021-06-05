import { TABLE, HIGH_SCORES, HIGH_SCORES_LENGTH } from './config.js';
import { state } from './game.js';

const createNode = (node, parent) => {
  const n = document.createElement(node);
  parent.appendChild(n);
  return n;
};

const createHighScores = () => {
  for (let i = 0; i < HIGH_SCORES_LENGTH; i++) {
    const tr = createNode('tr', TABLE);
    const td = createNode('td', tr);
    td.textContent = i + 1 + '.  ' + HIGH_SCORES[i];
    td.classList.add('score' + i);
  }
};

const refreshHighScores = () => {
  HIGH_SCORES.unshift(state.score);
  HIGH_SCORES.sort((a, b) => b - a);
  HIGH_SCORES.pop();
};

const fillHighScores = () => {
  for (let i = 0; i < HIGH_SCORES_LENGTH; i++) {
    const td = document.querySelector('.score' + i);
    td.textContent = i + 1 + '.  ' + HIGH_SCORES[i];
  }
};

export { createHighScores, fillHighScores, refreshHighScores };
