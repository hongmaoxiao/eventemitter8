import EE from '../EventEmitter';
const fn1 = () => 1;

const fn2 = () => 2;

describe('EventEmitter emit', () => {
  test('shold throw error when event is not a function', () => {

    expect(() => new EE().on('foo', 'hello, world!')).toThrowError('fn must be a function');
    expect(() => new EE().on('foo', 3)).toThrowError('fn must be a function');
    expect(() => new EE().on('foo', true)).toThrowError('fn must be a function');
    expect(() => new EE().on('foo', undefined)).toThrowError('fn must be a function');
    expect(() => new EE().on('foo', null)).toThrowError('fn must be a function');
    expect(() => new EE().on('foo', [1, 2])).toThrowError('fn must be a function');
    expect(() => new EE().on('foo', new Date())).toThrowError('fn must be a function');
    expect(() => new EE().on('foo', {
      'foo': 'bar'
    })).toThrowError('fn must be a function');
  });

  test('on one or more events', () => {
    const ee = new EE();
    const type = 'test';

    ee.on(type, fn1);
    expect(ee._events[type]).toEqual(fn1);

    ee.on(type, fn2);
    expect(ee._events[type]).toEqual([fn1, fn2]);

    ee._events = Object.create(null);
    expect(ee._events[type]).toBeUndefined();
  });
});

