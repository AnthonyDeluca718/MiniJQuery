require('../miniJquery/miniJquery.js');

class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $l('li').on("click", ( event => {
      const $square = $l(event.currentTarget);
      this.makeMove($square);
    }));
  }

  makeMove($square) {
    const pos = $square.data("pos");
    const currentPlayer = this.game.currentPlayer;

    try {
      this.game.playMove(pos);
    } catch (e) {
      alert("Invalid move! Try again.");
      return;
    }

    $square.addClass(currentPlayer);

    if (this.game.isOver()) {
      // cleanup click handlers.
      $l(".ttt-square").off("click");
      this.$el.addClass("game-over");

      const winner = this.game.winner();
      const $figcaption = $l("<figcaption>");
      if (winner) {
        this.$el.addClass(`winner-${winner}`);
        $l('h1').html(`You win, ${winner}!`);
      } else {
        $l('h1').html("It's a draw!");
      }
    }
  }

  setupBoard() {

    const $title = $l('<h1>Tic Tac Toe<h1>');
    this.$el.append($title);

    const $ul = $l("<ul>");
    $ul.addClass("group");
    $ul.addClass("ttt-board");

    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      for (let colIdx = 0; colIdx < 3; colIdx++) {
        let $li = $l("<li>");
        $li.addClass("ttt-square");
        $li.addClass(`square${rowIdx}${colIdx}`);
        $li.data("pos", [rowIdx, colIdx] );
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  }
}

module.exports = View;
