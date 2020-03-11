import { Controller } from 'egg';

export default class FilterController extends Controller {
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
