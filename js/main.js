const View = require('../frontend/ttt-view');
const Game = require('../game/game');
require('../lib/miniJquery.js');

$l( () => {
  const rootEl = $l('.ttt');
  const game = new Game();
  new View(game, rootEl);
});
