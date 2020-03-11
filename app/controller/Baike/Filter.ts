import { Controller } from 'egg';

export default class FilterController extends Controller {
  public async index() {
    const { ctx, service } = this;
    const rule = {
      acgType: {
        type: 'enum',
        values: ['animation', 'comic', 'game'],
        required: true
      },
      type: { type: 'string', required: true }
    };
    ctx.validate(rule, ctx.query);
    const payload = ctx.query || {};
    ctx.body = await service.baike.filter.listFilter(payload);
  }

  public async create() {
    const { ctx, service } = this;
    const createRule = {
      name: { type: 'string', required: true },
      icon: { type: 'string', required: false },
      acgType: {
        type: 'enum',
        values: ['animation', 'comic', 'game'],
        required: true
      },
      type: { type: 'string', required: true },
      order: { type: 'number' }
    };
    ctx.validate(createRule);
    const payload = ctx.request.body || {};
    ctx.body = await service.baike.filter.createFilter(payload);
  }
}
