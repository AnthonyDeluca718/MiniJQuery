const DOMNodeCollection = require('./dom_node_collection.js');

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

const View = require('./ttt-view');
const Game = require('./game');

$l( () => {
  const rootEl = $l('.ttt');
  const game = new Game();
  new View(game, rootEl);
});
