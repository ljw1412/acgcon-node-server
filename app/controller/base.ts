import { Controller } from 'egg';

export default class BaseController extends Controller {
  get redis() {
    return this.app.redis;
  }
}
