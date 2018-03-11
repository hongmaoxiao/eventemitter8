import EE from '../EventEmitter';

describe('EventEmitter eventNames', () => {
  test('should return empty when there is no listeners', () => {
    const ee = new EE();

    expect(ee.eventNames()).toEqual([]);
  });

  test('should return array with all names of listeners', () => {
    const ee = new EE();

    const fn = () => 1;

    ee.on('foo', fn);
    ee.on('bar', fn);
    ee.on('baz', fn);

    expect(ee.eventNames()).toBeInstanceOf(Array);
    expect(ee.eventNames().length).toBe(3);
    expect(ee.eventNames().join(',')).toBe('foo,bar,baz');
  });
});

