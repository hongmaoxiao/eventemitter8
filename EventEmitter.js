const toString = Object.prototype.toString;
const isType = obj => toString.call(obj).slice(8, -1).toLowerCase();
const isArray = obj => Array.isArray(obj) || isType(obj) === 'array';
const isNullOrUndefined = obj => obj === null || obj === undefined;

const errorHanler = (value, message) => {
  this.value = value;
  this.message = message;

  this.toString = () => `${this.value}${this.message}`;
};

const _addListener = function(type, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('fn must be a function');
  }

  fn.context = context;
  fn.once = !!once;

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
};

class EventEmitter {
  constructor() {
    if (this._events === undefined) {
      this._events = Object.create(null);
    }
  }

  addListener(type, fn, context) {
    return _addListener.call(this, type, fn, context);
  }

  on(type, fn, context) {
    return this.addListener(type, fn, context);
  }

  once(type, fn, context) {
    return _addListener.call(this, type, fn, context, true);
  }

  emit(type, ...rest) {
    if (isNullOrUndefined(type)) {
      throw new Error('emit must receive at lease one argument');
    }

    const events = this._events[type];
    if (isNullOrUndefined(events)) {
      throw new Error('emit function must not be null or undefined');
    }

    if (typeof events === 'function') {
      events.call(events.context || null, rest);
      if (events.once) {
        // TODO: remove this event
      }
    } else if (isArray(events)) {
      events.map(e => e.call(e.context || null, rest));
    }

    return true;
  }

  removeListener(type, fn) {
    // if type is undefined or null, nothing to do, just return this
    if (isNullOrUndefined(type)) {
      return this;
    }

    if (typeof fn !== 'function') {
      throw new Error('fn must be a function');
    }

    const events = this._events[type];

    if (typeof events === 'function') {
      events === fn && delete this._events[type];
    } else {
      const findIndex = events.findIndex(e => e === fn);

      if (findIndex === -1) return this;

      // match the first one, shift faster than splice
      if (findIndex === 0) {
        events.shift();
      } else {
        events.splice(findIndex, 1);
      }

      // just left one listener, change Array to Function
      if (events.length === 1) {
        this._events[type] = events[0];
      }
    }

    return this;
  }
}


export default EventEmitter;

