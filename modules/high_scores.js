import { TABLE } from "./config.js";

const HIGH_SCORES = new Array(10);

HIGH_SCORES.fill(0, 0);

let td;
let tr;

const createNode = (node, parent) => {
  const n = document.createElement(node);
  parent.appendChild(n);
  return n;
};

const createHighScores = () => {
  for (let i = 0; i < HIGH_SCORES.length; i++) {
    tr = createNode("tr", TABLE);
    td = createNode("td", tr);
    td.textContent = i + 1 + ".  " + HIGH_SCORES[i];
    td.classList.add("score" + i);
  }
};

const fillHighScores = () => {
  for (let i = 0; i < HIGH_SCORES.length; i++) {
    td = document.querySelector(".score" + i);
    console.log(td);
    td.textContent = i + 1 + ".  " + HIGH_SCORES[i];
    console.log(td.textContent);
  }
};

export { createHighScores, HIGH_SCORES, fillHighScores };
