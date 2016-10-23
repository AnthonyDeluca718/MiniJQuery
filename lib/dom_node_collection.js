class DOMNodeCollection {
  constructor(array) {
    this.array = array;
  }

  html(string) {
    if (string === undefined) {
      return this.array[0].innerHTML;
    } else {
      this.array.forEach( (el) => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.array.forEach( (el ) => {
      el.innerHTML = "";
    });
    this.array = [];
  }

  append(arg) {
    if (this.array.length === 0) {
      return -1;
    }
    if (arg instanceof DOMNodeCollection) {
      arg.array.forEach( (child) => {
        this.array.forEach( (el) => {
          el.appendChild(child.cloneNode(true));
        });
      });
      arg.array.forEach( (el) => {
        el.parentNode.removeChild(el);
      });
    } else if (arg instanceof HTMLElement){
      this.array.forEach( (el) => {
        el.appendChild(arg.cloneNode(true));
      });
      arg.parentNode.removeChild(arg);
    } else if (typeof arg === "string"){
      this.array.forEach( (el) => {
        el.innerHTML += arg;
      });
    }
  }

  attr(key, value) {
    if (this.array.length === 0) {
      return -1;
    }
    let first = this.array[0];
    if(value === undefined) {
      return first.getAttribute(key);
    } else {
      first.setAttribute(key, value);
      return;
    }
  }

  addClass(newClass){
    if (this.array.length === 0) {
      return -1;
    }
    this.array.forEach( (el) => {
      el.classList.add(newClass);
    });
  }

  removeClass(oldClass) {
    if (this.array.length === 0) {
      return -1;
    }
    this.array.forEach( (el) => {
      el.classList.remove(oldClass);
    });
  }

  children() {
    let childArr = [];
    for (var i = 0; i < this.array.length; i++) {
      childArr = childArr.concat(Array.from(this.array[i].children));
    }
    return new DOMNodeCollection(childArr);
  }

  parents() {
    let parentArr = [];
    for (var i = 0; i < this.array.length; i++) {
      let parent = this.array[i].parentNode;
      if (!parentArr.includes(parent)) {
        parentArr.push(parent);
      }
    }
    return new DOMNodeCollection(parentArr);
  }

  find(selector) {
    if (this.array.length === 0) return -1;
    let results = [];
    this.array.forEach( (el) => {
      results = results.concat(Array.from(el.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(results);
  }

  remove() {
    this.array.forEach( (el) => {
      el.parentNode.removeChild(el);
    });

    this.array = [];
  }

  on(e, callback) {
    if (this.array.length === 0) {
      return -1;
    }
    this.array.forEach( (el) => {
      el.addEventListener(e, callback);
    });
  }

}
module.exports = DOMNodeCollection;
