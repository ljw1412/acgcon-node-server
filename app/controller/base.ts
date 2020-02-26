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
      const images = JSON.parse(response).images;
      images.forEach(item => {
        item.url = `//cn.bing.com${item.url}`;
      });
      ctx.body = images;
    } catch (error) {
      ctx.throw(500);
    }
  }

  public async getBaseConfig() {
    const { ctx, app } = this;
    ctx.body = {
      banner: {
        bg: `${app.config.cdnDomain}/acgcon/bg-base.jpg`
      }
    };
  }
}
