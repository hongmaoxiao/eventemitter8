import EE from '../EventEmitter';

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

    const fn1 = () => 1;
    const fn2 = () => 2;

    ee.on('foo', fn1);
    expect(ee.listeners('foo')).toEqual([fn1]);

    ee.on('foo', fn2);
    expect(ee.listeners('foo')).toEqual([fn1, fn2]);

    ee.removeAllListeners('foo');
    expect(ee.listeners('foo')).toEqual([]);
  });
});

