import MockAdapter from 'axios-mock-adapter';
import AxiosRepeatPreserve from '../src';
import axios from 'axios';

const delay = 20;

const instance = axios.create();

const preserveAdapter = new AxiosRepeatPreserve({
  methods: ['POST'],
});
const mockAdapter = new MockAdapter(instance, { delayResponse: delay });

// Make mock response
mockAdapter.onPost('/post').reply(() => {
  return [200, { random: Math.random() }];
});

// sitting adapter
instance.defaults.adapter = (config) =>
  preserveAdapter.adapter(config, mockAdapter.adapter());

// execute requests
const first = instance.post('/post');
const second = instance.post('/post');
const third = instance.post('/post', { foo: 'foo' });
const fourth = instance.post('/post', { foo: 'foo' });

// await all responses
Promise.all([first, second, third, fourth]).then(([r1, r2, r3, r4]) => {
  console.log(r1.data);
  console.log(r2.data);
  console.log(r3.data);
  console.log(r4.data);

  // check object references
  console.log(r1 === r2); // true
  console.log(r2 === r3); // false
  console.log(r3 === r4); // true
});
