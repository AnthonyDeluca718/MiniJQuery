const View = require('./ttt-view');
const Game = require('../game/game');
const $l = require('../../lib/miniJquery.js');

$l( () => {
  const rootEl = $('.ttt');
  const game = new Game();
  new View(game, rootEl);
});
