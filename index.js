Object.defineProperty(Object.prototype, 'not', {
  get() {
    if (
      this instanceof Boolean ||
      this instanceof Number
    ) return !+this;
    else if (this instanceof String) return !this.toString();
    else if (this instanceof Array) return this.map(element => element.not);
    else if (this instanceof Object) {
      return new Proxy(this, {
        get(target, prop) {
          if (typeof target[prop] === 'function') return target[prop].bind(target).not;
          else if (prop === 'not') return target;
          return target[prop].not;
        },
        set() {
          return false;
        },
        has(target, prop) {
          return (prop in target).not;
        },
        deleteProperty() {
          return false;
        },
        apply(target, thisArg, args) {
          return target.apply(thisArg, args).not;
        },
        construct(Target, args) {
          return new Target(...args).not;
        },
      });
    }
    return !this;
  },
});
