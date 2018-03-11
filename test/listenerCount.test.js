import EE from '../EventEmitter';

describe('EventEmitter listenerCount', () => {
  test('should return 0 when there is no specify type', () => {
    const ee = new EE();

    expect(ee.listenerCount()).toEqual(0);
  });

  test('should return 1 with only one function', () => {
    const ee = new EE();

    const fn = () => 1;

    ee.on('foo', fn);

    expect(ee.listenerCount('foo')).toBe(1);
  });

  test('counts the same as listeners length', () => {
    const ee = new EE();

    const fn1 = () => 1;
    const fn2 = () => 2;
    const fn3 = () => 3;

    ee.on('foo', fn1);
    ee.on('foo', fn2);
    ee.on('foo', fn3);

    expect(ee.listenerCount('foo')).toBe(ee.listeners('foo').length);
  });
});

