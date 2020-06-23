import BaseController from './base';

export default class CrawlerController extends BaseController {
  public async start() {
    const { service, ctx } = this;
    ctx.validate({ type: { type: 'string' } }, ctx.request.body);
    const { type } = ctx.request.body;
    await service.crawler.start(type);
  }
}
