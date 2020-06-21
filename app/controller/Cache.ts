import { Controller } from 'egg';

export default class CacheController extends Controller {
  public async index() {
    const { ctx, service } = this;
    if (ctx.query.count) {
      ctx.query.count = ctx.query.count >> 0;
    }
    const rule = {
      type: { type: 'string' },
      count: { type: 'number', default: 100 }
    };
    ctx.validate(rule, ctx.query);
    ctx.body = await service.cache.list(ctx.query);
  }

  public async show() {
    const { ctx, service } = this;
    ctx.validate({ id: { type: 'string' } }, ctx.params);
    const { id: key } = ctx.params;
    ctx.body = await service.cache.findByKey(key);
  }

  public async destroy() {
    const { ctx, service } = this;
    ctx.validate({ id: { type: 'string' } }, ctx.params);
    const { id: key } = ctx.params;
    ctx.body = await service.cache.deleteByKey(key);
  }
}
