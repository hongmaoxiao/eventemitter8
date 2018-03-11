import EE from '../EventEmitter';

describe('EventEmitter removeAllListeners', () => {
  test('remove all events for specify type', () => {
    const ee = new EE();

    const fn1 = () => 1;
    const fn2 = () => 2;
    const fn3 = () => 3;
    const fn4 = () => 4;

    ee.on('foo', fn1);
    ee.on('foo', fn2);
    ee.on('bar', fn3);
    ee.on('baz', fn4);

    expect(ee.removeAllListeners('foo')).toBeInstanceOf(EE);
    expect(ee.listeners('foo').length).toBe(0);
    expect(ee.listeners('bar').length).toBe(1);
    expect(ee.listeners('baz').length).toBe(1);

    expect(ee.emit('foo')).toBe(false);
    expect(ee.emit('bar')).toBe(true);
    expect(ee.emit('baz')).toBe(true);
  });

  test('remove all listeners when not specify type', () => {
    const ee = new EE();

    const fn1 = () => 1;
    const fn2 = () => 2;
    const fn3 = () => 3;
    const fn4 = () => 4;

    ee.on('foo', fn1);
    ee.on('foo', fn2);
    ee.on('bar', fn3);
    ee.on('baz', fn4);

    expect(ee.removeAllListeners()).toBeInstanceOf(EE);
    expect(ee.listeners('foo').length).toBe(0);
    expect(ee.listeners('bar').length).toBe(0);
    expect(ee.listeners('baz').length).toBe(0);

    expect(ee.emit('foo')).toBe(false);
    expect(ee.emit('bar')).toBe(false);
    expect(ee.emit('baz')).toBe(false);
  });
});

