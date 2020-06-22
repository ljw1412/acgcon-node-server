import { Controller } from 'egg';

export default class CacheController extends Controller {
  public async index() {
    const { ctx, service } = this;
    const { query } = ctx;
    if (query.count) query.count = query.count >> 0;
    if (!query.keyword) query.keyword = '*';
    const rule = {
      type: { type: 'string' },
      count: { type: 'number', default: 100 },
      keyword: { type: 'string', default: '*', allowEmpty: true }
    };
    ctx.validate(rule, query);

    ctx.body = await service.cache.list(query);
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
