import EE from '../EventEmitter';

describe('EventEmitter emit', () => {
  test('only emit it once', () => {
    const ee = new EE();
    let count = 0;

    const fn = () => count++;

    ee.once('foo', fn1);

    ee.emit('foo');
    ee.emit('foo');
    ee.emit('foo');
    ee.emit('foo');
    ee.emit('foo');

    expect(ee.listenerCount('foo')).toBe(1);

    expect(count).toBe(1);
  });

  test('only emit once for multiple events', () => {
    const ee = new EE();
    let a = 0;
    let b = 0;
    let c = 0;

    ee.once('foo', () => a++);

    ee.once('foo', () => b++);

    ee.on('foo', () => c++);

    ee.emit('foo');
    ee.emit('foo');
    ee.emit('foo');
    ee.emit('foo');
    ee.emit('foo');

    expect(ee.listenerCount('foo')).toBe(1);

    expect(a).toBe(1);
    expect(b).toBe(1);
    expect(c).toBe(5);
  });
});

