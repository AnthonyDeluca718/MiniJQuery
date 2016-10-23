const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = function(selector) {
  let arr;
  if ( selector instanceof HTMLElement){
    arr = [selector];
  } else if (typeof selector === "string" ) {
    arr = Array.from(document.querySelectorAll(selector));
  } else if ( typeof selector === "function" ) {
    document.addEventListener("DOMContentLoaded", selector);
    return null;
  }
  return new DOMNodeCollection(arr);
};


$l( () => {
  $l('li').on("click", (e) => console.log(e.currentTarget));
});

$l.extend = function(target, ...sources) {
  Object.assign(target, ...sources);
  return target;
};

const defaults = {
  success: function() {},
  error: function() {},
  url: window.location.href,
  method: "GET",
  data: {},
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
};

$l.ajax = function(obj = {}) {
  let defCopy = $l.extend({}, defaults);
  let mergedObj = $l.extend(defCopy, obj);

  const xhr = new XMLHttpRequest();
  xhr.open(mergedObj.method, mergedObj.url);
  xhr.onload = function () {
    if(xhr.status === 200) {
      mergedObj.success(xhr.response);
    } else {
      mergedObj.error(xhr.response);
    }
  };
  xhr.send(mergedObj.data);
};
