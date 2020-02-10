import { Controller } from 'egg';

export default class BaseController extends Controller {
  public async fetchBingBackground() {
    const { ctx } = this;
    ctx.body = 'user';
  }
}
