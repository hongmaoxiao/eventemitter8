import EE from '../EventEmitter';
const fn1 = () => {
  console.log('test1');
};

const fn2 = () => {
  console.log('test2');
};

test('on function', () => {
  const ee = new EE();
  const type = 'test';

  ee.on(type, fn1);
  expect(ee._events[type]).toEqual(fn1);

  ee.on(type, fn2);
  expect(ee._events[type]).toEqual([fn1, fn2]);

  ee._events = Object.create(null);
  expect(ee._events[type]).toBeUndefined();
});

