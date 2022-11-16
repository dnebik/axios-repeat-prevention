import MockAdapter from 'axios-mock-adapter';
import AxiosRepeatPreserve from '../src';
import axios from 'axios';

const delay = 20;

const instance = axios.create();

const preserveAdapter = new AxiosRepeatPreserve({
  methods: ['GET'],
});
const mockAdapter = new MockAdapter(instance, { delayResponse: delay });

// Make mock response
mockAdapter.onGet('/get').reply(() => {
  return [200, { random: Math.random() }];
});

// sitting adapter
instance.defaults.adapter = (config) =>
  preserveAdapter.adapter(config, mockAdapter.adapter());

// execute requests
const first = instance.get('/get');
const second = instance.get('/get');

// execute after other requests
const third = (async () => {
  await new Promise((resolve) => setTimeout(() => resolve(true), delay + 1));
  return instance.get('/get');
})();

// await all responses
Promise.all([first, second, third]).then(([r1, r2, r3]) => {
  console.log(r1.data);
  console.log(r2.data);
  console.log(r3.data);

  // check object references
  console.log(r1 === r2); // true
  console.log(r2 === r3); // false
});
