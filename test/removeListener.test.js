import EE from '../EventEmitter';

const isArray = (obj) => Array.isArray ? Array.isArray(obj) : Object.prototype.toString.call(obj) ===
  '[object Array]';

describe('EventEmitter removeListener', () => {
  test('should return this when no type is provide', () => {
    const ee = new EE();

    expect(ee.removeListener()).toBeInstanceOf(EE);
  });

  test('should throw error when fn is not a function', () => {
    expect(() => new EE().removeListener('foo', 'hello, world!')).toThrowError('fn must be a function');
    expect(() => new EE().removeListener('foo', 3)).toThrowError('fn must be a function');
    expect(() => new EE().removeListener('foo', true)).toThrowError('fn must be a function');
    expect(() => new EE().removeListener('foo', undefined)).toThrowError('fn must be a function');
    expect(() => new EE().removeListener('foo', null)).toThrowError('fn must be a function');
    expect(() => new EE().removeListener('foo', [1, 2])).toThrowError('fn must be a function');
    expect(() => new EE().removeListener('foo', new Date())).toThrowError('fn must be a function');
    expect(() => new EE().removeListener('foo', {
      'foo': 'bar'
    })).toThrowError('fn must be a function');
  });

  test('removeListener when just has only event', () => {
    const ee = new EE();
    const fn = () => 1;

    ee.on('foo', fn);

    ee.removeListener('foo', fn);
    expect(ee._events['foo']).toBeUndefined();
  });

  test('removeListener when left just one event', () => {
    const ee = new EE();

    const fn1 = () => 1;
    const fn2 = () => 2;

    ee.on('foo', fn1);
    ee.on('foo', fn2);

    ee.removeListener('foo', fn1);

    const leftEvent = ee._events['foo'];
    const leftEventType = typeof leftEvent;

    expect(leftEventType).toBe('function');

    expect(leftEvent).toEqual(fn2);
  });

  test('removeListener when more than two events', () => {
    const ee = new EE();

    const fn1 = () => 1;
    const fn2 = () => 2;
    const fn3 = () => 3;
    const fn4 = () => 4;
    const fn5 = () => 5;

    ee.on('foo', fn1);
    ee.on('foo', fn2);
    ee.on('foo', fn3);
    ee.on('foo', fn4);
    ee.on('foo', fn5);

    ee.removeListener('foo', fn3);

    const leftEvent = ee._events['foo'];

    expect(isArray(leftEvent)).toBeTruthy();

    expect(leftEvent.length).toBe(4);

    expect(leftEvent).toEqual([fn1, fn2, fn4, fn5]);
  });
});

