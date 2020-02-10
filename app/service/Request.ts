import { Service } from 'egg';
import * as rp from 'request-promise';

export default class Request extends Service {
  public async get(url: string, options?: rp.Options) {
    options = Object.assign({ method: 'GET' }, options);
    return rp(url, options);
  }

  public async post(url: string, options?: rp.Options) {
    options = Object.assign({ method: 'POST' }, options);
    return rp(url, options);
  }
}
