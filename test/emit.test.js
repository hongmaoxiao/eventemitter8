import EE from '../EventEmitter';

describe('EventEmitter emit', () => {
  test('should throw error when there are no type to emit', () => {
    expect(() => new EE().emit()).toThrowError('emit must receive at lease one argument');
  });

  test('should throw error when there are no events to emit', () => {
    expect(() => new EE().emit('foo')).toThrowError('emit function must not be null or undefined');
    expect(() => new EE().emit('bar')).toThrowError('emit function must not be null or undefined');
  });

  test('should return true when there are events to emit', (done) => {
    const ee = new EE();

    ee.on('foo', () => process.nextTick(done));

    expect(ee.emit('foo')).toBeTruthy();
  });

  test('emit only one event listener', () => {
    const ee = new EE();
    const res = [];

    ee.on('foo', () => res.push('one'));

    ee.emit('foo');

    expect(res.length).toEqual(1);
    expect(res[0]).toEqual('one');
  });

  test('emit all event listeners', () => {
    const ee = new EE();
    const res = [];

    ee.on('foo', () => res.push('one'));
    ee.on('foo', () => res.push('two'));
    ee.on('foo', () => res.push('three'));

    ee.emit('foo');

    expect(res.length).toEqual(3);
    expect(res.join(',')).toEqual('one,two,three');
  });
});

