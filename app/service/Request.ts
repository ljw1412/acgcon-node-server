import { Service } from 'egg';
import * as rp from 'request-promise';
import { CoreOptions } from 'request';

export default class RequestService extends Service {
  public async get(uri: string, options?: CoreOptions) {
    return rp(Object.assign({ method: 'GET', uri }, options));
  }

  public async post(uri: string, options?: CoreOptions) {
    return rp(Object.assign({ method: 'POST', uri }, options));
  }
}
