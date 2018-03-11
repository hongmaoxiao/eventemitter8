import EE from '../EventEmitter';

describe('EventEmitter listeners', () => {
  test('should return empty array when there is no specify type', () => {
    const ee = new EE();

    expect(ee.listeners()).toEqual([]);
  });

  test('should return array with function', () => {
    const ee = new EE();

    const fn = () => 1;

    ee.on('foo', fn);

    expect(ee.listeners('foo')).toBeInstanceOf(Array);
    expect(ee.listeners('foo').length).toBe(1);
    expect(ee.listeners('foo')).toEqual([fn]);
  });

  test('the result can not be modified', () => {
    const ee = new EE();

    const fn = () => 1;
    const fn2 = () => 2;

    ee.on('foo', fn);

    expect(ee.listeners('foo')).toEqual([fn]);
    ee.listeners('foo').length = 0;
    expect(ee.listeners('foo')).toEqual([fn]);
  });
});

