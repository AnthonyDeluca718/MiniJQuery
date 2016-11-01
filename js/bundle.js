/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const View = __webpack_require__(1);
	const Game = __webpack_require__(4);
	
	
	$l( () => {
	  const rootEl = $l('.ttt');
	  const game = new Game();
	  new View(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(3);
	
	window.$l = function(selector) {
	  let arr;
	  let regHTML = /^<|>$>/ ;
	
	  if ( typeof selector === "function" ) {
	    document.addEventListener("DOMContentLoaded", selector);
	    return 1; //we don't want to return any collection
	  } else if ( typeof selector === "string" && regHTML.test(selector) ) {
	    var d = document.createElement('div');
	    d.innerHTML = selector;
	    arr = [d.firstChild];
	    d = null;
	  } else if( selector instanceof HTMLElement) {
	    arr = [selector];
	  }else if (typeof selector === "string" ) {
	    arr = Array.from(document.querySelectorAll(selector));
	  } else {
	    return -1;
	  }
	  return new DOMNodeCollection(arr);
	};
	
	$l.extend = function(target, ...sources) {
	  Object.assign(target, ...sources);
	  return target;
	};
	
	function param(object) {
	    var encodedString = '';
	    for (var prop in object) {
	        if (object.hasOwnProperty(prop)) {
	            if (encodedString.length > 0) {
	                encodedString += '&';
	            }
	            encodedString += encodeURI(prop + '=' + object[prop]);
	        }
	    }
	    return encodedString;
	}
	
	    // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	$l.ajax = (options) => {
	  const request = new XMLHttpRequest();
	  const defaults = {
	    method: "GET",
	    url: "",
	    success: () => {},
	    error: () => {},
	    data: {},
	    processData: true,
	    contentType: 'application/json'
	  };
	  options = $l.extend(defaults, options);
	  options.method = options.method.toUpperCase();
	
	  if (options.method === "GET"){
	    options.url += "?" + toQueryString(options.data);
	  }
	
	  request.open(options.method, options.url, true);
	
	  //automatically add csrf tokens
	  const csrfToken = $l('meta[name=csrf-token]').attr('content');
	  if (csrfToken) {
	    request.setRequestHeader('X-CSRF-Token', csrfToken);
	  }
	
	  if (options.contentType) {
	    request.setRequestHeader('Content-Type', options.contentType);
	  }
	
	  request.onload = e => {
	    if (request.status === 200) {
	      options.success(JSON.parse(request.response));
	    } else {
	      options.error(JSON.parse(request.response));
	    }
	  };
	
	  if (options.processData) {
	    request.send(JSON.stringify(options.data));
	  } else {
	    request.send(options.data);
	  }
	};
	
	const toQueryString = function(obj) {
	  let result = "";
	  for(let prop in obj){
	    if (obj.hasOwnProperty(prop)){
	      result += prop + "=" + obj[prop] + "&";
	    }
	  }
	  return result.substring(0, result.length - 1);
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(array) {
	    this.array = array;
	  }
	
	  each(callBack) {
	    if (this.array.length === 0) {
	      return -1;
	    }
	    this.array.forEach(callBack);
	  }
	
	  html(string) {
	    if (string === undefined && this.array.length > 0 ) {
	      return this.array[0].innerHTML;
	    } else if (typeof string === "string"){
	      this.each( (el) => {
	        el.innerHTML = string;
	      });
	    } else {
	      return -1;
	    }
	  }
	
	  empty() {
	    this.each( (el ) => {
	      el.innerHTML = "";
	    });
	    this.array = [];
	  }
	
	  append(arg) {
	    if (arg instanceof DOMNodeCollection) {
	      arg.each( (child) => {
	        this.each( (el) => {
	          el.appendChild(child.cloneNode(true));
	        });
	      });
	    } else if (arg instanceof HTMLElement){
	      this.each( (el) => {
	        el.appendChild(arg.cloneNode(true));
	      });
	      // arg.parentNode.removeChild(arg);
	    } else if (typeof arg === "string"){
	      this.each( (el) => {
	        el.innerHTML += arg;
	      });
	    } else {
	      return -1;
	    }
	  }
	
	  addClass(newClass){
	    this.each( (el) => {
	      el.classList.add(newClass);
	    });
	  }
	
	  removeClass(oldClass) {
	    this.each( (el) => {
	      el.classList.remove(oldClass);
	    });
	  }
	
	  toggleClass(newClass) {
	    this.array.each( (el) => {
	      el.classList.toggle(oldClass);
	    });
	  }
	
	  children() {
	    let childArr = [];
	    this.each( (child) => {
	      childArr = childArr.concat(Array.from(child.children));
	    });
	    return new DOMNodeCollection(childArr);
	  }
	
	  parents() {
	    let parentArr = [];
	    this.each( (el) => {
	      let parent = el.parentNode;
	      if (!parentArr.includes(parent)) {
	        parentArr.push(parent);
	      }
	    });
	
	    return new DOMNodeCollection(parentArr);
	  }
	
	  find(selector) {
	    let results = [];
	    this.array.each( (el) => {
	      results = results.concat(Array.from(el.querySelectorAll(selector)));
	    });
	    return new DOMNodeCollection(results);
	  }
	
	  remove() {
	    this.each( (el) => {
	      el.parentNode.removeChild(el);
	    });
	
	    this.array = [];
	  }
	
	  on(e, callback) {
	    this.each( (el) => {
	      el.addEventListener(e, callback);
	      const k = `miniJQ-${e}`;
	      if (el[k] === undefined) {
	        el[k] = [];
	      }
	      el[k].push(callback);
	    });
	  }
	
	  off(e) {
	    this.each( (el) => {
	      const k = `miniJQ-${e}`;
	      if (el[k] && el[k].length > 0 ) {
	        el[k].forEach(callback => {
	          el.removeEventListener(e, callback);
	        });
	        el[k] = [];
	      }
	    });
	  }
	
	  attr(key, value) {
	    if (value === undefined) {
	      if (this.array.length === 0) {
	        return -1;
	      } else {
	        return this.array[0].getAttribute(key);
	      }
	    } else {
	      this.each( (el) => {
	        el.setAttribute(key, value);
	      });
	    }
	  }
	
	  data(key, value) {
	    if (value === undefined) {
	      if (this.array.length === 0) {
	        return -1;
	      } else {
	        return JSON.parse(this.array[0].getAttribute(key));
	      }
	    } else {
	      this.each( (el) => {
	        el.setAttribute(key, JSON.stringify(value) );
	      });
	    }
	  }
	
	  get(ind) {
	    let el = this.arr[ind];
	    if (el) {
	      return el;
	    } else {
	      return -1;
	    }
	  }
	
	  first() {
	    return this.get(0);
	  }
	}
	
	module.exports = DOMNodeCollection;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(5);
	const MoveError = __webpack_require__(6);
	
	class Game {
	  constructor() {
	    this.board = new Board();
	    this.currentPlayer = Board.marks[0];
	  }
	
	  isOver() {
	    return this.board.isOver();
	  }
	
	  playMove(pos) {
	    this.board.placeMark(pos, this.currentPlayer);
	    this.swapTurn();
	  }
	
	  swapTurn() {
	    if (this.currentPlayer === Board.marks[0]) {
	      this.currentPlayer = Board.marks[1];
	    } else {
	      this.currentPlayer = Board.marks[0];
	    }
	  }
	
	  winner() {
	    return this.board.winner();
	  }
	
	  reset() {
	    this.board = new Board();
	    this.currentPlayer = Board.marks[0];
	  }
	}
	
	module.exports = Game;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MoveError = __webpack_require__(6);
	
	class Board {
	  constructor() {
	    this.grid = Board.makeGrid();
	  }
	
	  isEmptyPos(pos) {
	    if (!Board.isValidPos(pos)) {
	      throw new MoveError('Is not valid position!');
	    }
	
	    return (this.grid[pos[0]][pos[1]] === null);
	  }
	
	  isOver() {
	    if (this.winner() != null) {
	      return true;
	    }
	
	    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
	      for (let colIdx = 0; colIdx < 3; colIdx++) {
	        if (this.isEmptyPos([rowIdx, colIdx])) {
	          return false;
	        }
	      }
	    }
	
	    return true;
	  }
	
	  placeMark(pos, mark) {
	    if (!this.isEmptyPos(pos)) {
	      throw new MoveError('Is not an empty position!');
	    }
	
	    this.grid[pos[0]][pos[1]] = mark;
	  }
	
	  winner() {
	    const posSeqs = [
	      // horizontals
	      [[0, 0], [0, 1], [0, 2]],
	      [[1, 0], [1, 1], [1, 2]],
	      [[2, 0], [2, 1], [2, 2]],
	      // verticals
	      [[0, 0], [1, 0], [2, 0]],
	      [[0, 1], [1, 1], [2, 1]],
	      [[0, 2], [1, 2], [2, 2]],
	      // diagonals
	      [[0, 0], [1, 1], [2, 2]],
	      [[2, 0], [1, 1], [0, 2]]
	    ];
	
	    for (let i = 0; i < posSeqs.length; i++) {
	      const winner = this.winnerHelper(posSeqs[i]);
	      if (winner != null) {
	        return winner;
	      }
	    }
	
	    return null;
	  }
	
	  winnerHelper(posSeq) {
	    for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {
	      const targetMark = Board.marks[markIdx];
	      let winner = true;
	      for (let posIdx = 0; posIdx < 3; posIdx++) {
	        const pos = posSeq[posIdx];
	        const mark = this.grid[pos[0]][pos[1]];
	
	        if (mark != targetMark) {
	          winner = false;
	        }
	      }
	
	      if (winner) {
	        return targetMark;
	      }
	    }
	
	    return null;
	  }
	
	  static isValidPos(pos) {
	    return (0 <= pos[0]) &&
	    (pos[0] < 3) &&
	    (0 <= pos[1]) &&
	    (pos[1] < 3);
	  }
	
	  static makeGrid() {
	    const grid = [];
	
	    for (let i = 0; i < 3; i++) {
	      grid.push([]);
	      for (let j = 0; j < 3; j++) {
	        grid[i].push(null);
	      }
	    }
	
	    return grid;
	  }
	}
	
	Board.marks = ['x', 'o'];
	
	module.exports = Board;


/***/ },
/* 6 */
/***/ function(module, exports) {

	
	const MoveError = function (msg) { this.msg = msg; };
	
	// MoveError really should be a child class of the built in Error object provided
	// by Javascript, but since we haven't covered inheritance yet, we'll just
	// let it be a vanilla Object for now!
	
	module.exports = MoveError;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map