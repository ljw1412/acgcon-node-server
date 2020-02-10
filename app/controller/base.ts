import { Controller } from 'egg';

export default class BaseController extends Controller {
  public async index() {
    this.ctx.body = 'Hello ACGCON!';
  }

  public async fetchBingBackground() {
    const { ctx } = this;
    try {
      const response = await ctx.service.request.get(
        'https://cn.bing.com/HPImageArchive.aspx',
        { qs: { format: 'js', idx: 0, n: 8, mkt: 'zh-CN' } }
      );
      ctx.body = response;
    } catch (error) {
      ctx.throw(error);
    }
  }
}
