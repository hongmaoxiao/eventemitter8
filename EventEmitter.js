const toString = Object.prototype.toString;
const isType = obj => toString.call(obj).slice(8, -1).toLowerCase();
const isArray = obj => Array.isArray(obj) || isType(obj) === 'array';
const isNullOrUndefined = obj => obj === null || obj === undefined;

class EventEmitter {
  constructor() {
    if (this._events === undefined) {
      this._events = Object.create(null);
    }
  }

  addListener(type, fn) {
    if (typeof fn !== 'function') {
      throw new TypeError('fn must be a function');
    }

    const event = this._events[type];
    // only one, let `this._events[type]` to be a function
    if (isNullOrUndefined(event)) {
      this._events[type] = fn;
    } else if (typeof event === 'function') {
      // already has one function, `this._events[type]` must be a function before
      this._events[type] = [event, fn];
    } else if (isArray(event)) {
      // already has more than one function, just push
      this._events[type].push(fn);
    }

    return this;
  }

  on(type, fn) {
    return this.addListener(type, fn);
  }
}


export default EventEmitter;
