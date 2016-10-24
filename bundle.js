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

	const $l = __webpack_require__(1);
	
	window.$l = $l;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(2);
	
	$l = function(selector) {
	  let arr;
	  if ( selector instanceof HTMLElement){
	    arr = [selector];
	  } else if (typeof selector === "string" ) {
	    arr = Array.from(document.querySelectorAll(selector));
	  } else if ( typeof selector === "function" ) {
	    document.addEventListener("DOMContentLoaded", selector);
	    return 1; //we don't want to return any collection
	  }
	  return new DOMNodeCollection(arr);
	};
	
	$l.extend = function(target, ...sources) {
	  Object.assign(target, ...sources);
	  return target;
	};
	
	$l.ajax = function(obj = {}) {
	  let def = {
	    success: function() {return null},
	    error: function() {return null},
	    url: window.location.href,
	    method: "GET",
	    data: {},
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
	  };
	
	  let mergedObj = $l.extend(def, obj);
	
	  const xhr = new XMLHttpRequest();
	
	  xhr.open(mergedObj.method.toUpperCase(), mergedObj.url, true);
	
	  if (xhr.method === "GET"){
	    xhr.url += "?" + toQueryString(xhr.data);
	  }
	
	  xhr.onload = function (e) {
	    if(xhr.status === 200) {
	      mergedObj.success(xhr.response);
	    } else {
	      mergedObj.error(xhr.response);
	    }
	  };
	
	  xhr.send(JSON.stringify(mergedObj.data));
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
	
	module.exports = $l;


/***/ },
/* 2 */
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
	
	    // if (typeof children === 'object' &&
	    //     !(children instanceof DomNodeCollection)) {
	    //   // ensure argument is coerced into DomNodeCollection
	    //   children = $l(children);
	    // }
	
	
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
	
	  attr(key, value) {
	    if (typeof val === "string") {
	      this.each( el => el.setAttribute(key, val) );
	    } else {
	      return this.nodes[0].getAttribute(key);
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
	      el[k].push(callback);
	    });
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map