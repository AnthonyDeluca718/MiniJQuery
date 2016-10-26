const View = require('./ttt-view');
const Game = require('./game');


$l( () => {
  const rootEl = $l('.ttt');
  const game = new Game();
  new View(game, rootEl);
});
