# Axios Repeat Prevention

Prevent requests if the same request was launched, and it was not completed.

## Install

```sh
npm install --save axios-cache-adapter
```

## Usage

Create `axios-repeat-prevention` instance:

```js
const preserveAdapter = new AxiosRepeatPreserve({
  methods: ['GET'],
});
```

Create `axios` instance passing the created adapter:

```js
const api = axios.create({
  adapter: preserveAdapter.adapter
})
```

### With another adapter

Just pass adapter as second argument. As an example using `axios-cache-adapter`:

```js
import { setupCache } from 'axios-cache-adapter';
const cache = setupCache();
const api = axios.create({
  adapter: config => preserveAdapter.adapter(config, cache.adapter)
})
```
