require('../miniJquery/miniJquery.js');

class View {
  constructor(game, $el) {
    this.resetBoard = this.resetBoard.bind(this);
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
    } catch(e) {

    }

    $square.addClass(currentPlayer);

    if (this.game.isOver()) {
      // cleanup click handlers.
      $l(".ttt-square").off("click");
      this.$el.addClass("game-over");

      const winner = this.game.winner();

      if (winner) {
        this.$el.addClass(`winner-${winner}`);
        this.winner = winner;
        $l('h1').html(`Game Over: ${winner.toUpperCase()} wins!`);
      } else {
        $l('h1').html("Tie Game!");
      }
    }
  }

  setupBoard() {

    const $title = $l('<h1>miniJQuery Tic Tac Toe<h1>');
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

    const $reset = $l('<div>Reset Game<div>');
    $reset.addClass('reset');
    this.$el.append($reset);

    $l('.reset').on('click', this.resetBoard);
    const $description = $l('<div></div>');
    $description.html('<a href="https://github.com/AnthonyDeluca718/MiniJQuery">miniJQ Github</a>');
    $description.addClass('description');
    this.$el.append($description);

    const $footer = $l('<footer/>');
    $footer.addClass('footer-content');
    $footer.addClass('group');

    const $sig = $l('<div>Anthony Deluca</div>');
    $sig.addClass('footer-signiture');

    $footer.append($sig);


    const $git=$l('<a/>');
    const $linked=$l('<a/>');
    const $mail=$l('<a/>');

    $git.attr('href', "https://github.com/AnthonyDeluca718");
    $linked.attr('href', "https://www.linkedin.com/in/a-deluca");
    $mail.attr('href',"mailto:mail@adeluca.io");

    $git.html('<i class="devicon-github-plain colored"></i>');
    $linked.html('<i class="fa fa-linkedin" aria-hidden="true"></i>');
    $mail.html('<i class="fa fa-envelope" aria-hidden="true"></i>');

    $footer.append($git);
    $footer.append($linked);
    $footer.append($mail);

    this.$el.append($footer);
  }

  resetBoard() {
    this.game.reset();
    this.$el.children().each((node) => {node.remove()} );
    this.$el.removeClass("game-over");

    if (this.winner) {
      this.$el.removeClass(`winner-${this.winner}`);
    }

    this.setupBoard();
    this.bindEvents();
  }

}
module.exports = View;
