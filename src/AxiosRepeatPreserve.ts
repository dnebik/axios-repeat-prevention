import type {
  AxiosAdapter,
  AxiosPromise,
  AxiosRequestConfig,
  Method,
} from 'axios';
import axios from 'axios';

interface AxiosRepeatPreserveOptions {
  methods?: Method[];
}

const defaults: AxiosRepeatPreserveOptions = {
  methods: ['GET'],
};

export default class {
  private store: Record<string, AxiosPromise>;

  private methods: Method[];

  constructor(options: AxiosRepeatPreserveOptions = {}) {
    const resultOptions = { ...defaults, ...options };
    this.store = {};
    this.methods = resultOptions.methods;
  }

  private get upperMethods() {
    return this.methods.map((v) => v.toUpperCase());
  }

  public adapter(
    config: AxiosRequestConfig,
    next: AxiosAdapter = axios.defaults.adapter!,
  ) {
    if (!this.upperMethods.includes(config.method.toUpperCase()))
      return next(config);

    const storeKey = config.url + JSON.stringify(config.params);
    const storeValue = this.store[storeKey];
    if (storeValue) return storeValue;

    const result = Promise.resolve(next(config));
    result.finally(() => {
      delete this.store[storeKey];
    });
    this.store[storeKey] = result;

    return result;
  }
}
