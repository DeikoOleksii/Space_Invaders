const state = {
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
