import { Controller } from 'egg';

const baseRule = {
  acgType: {
    type: 'enum',
    values: ['animation', 'comic', 'game'],
    required: true
  },
  type: { type: 'string', required: true }
};

export default class TagGroupController extends Controller {
  public async index() {
    const { ctx, service } = this;
    ctx.validate(baseRule, ctx.query);
    const payload = ctx.query || {};
    ctx.body = await service.tagGroup.list(payload);
  }

  public async create() {
    const { ctx, service } = this;
    const createRule = {
      ...baseRule,
      name: { type: 'string', required: true },
      icon: { type: 'string', required: false, default: '' },
      order: { type: 'number', required: false, default: 0 }
    };
    ctx.validate(createRule);
    const payload = ctx.request.body || {};
    ctx.body = await service.tagGroup.create(payload);
  }

  public async destroy() {
    const { ctx, service } = this;
    ctx.validate({ id: { type: 'string' } }, ctx.params);
    ctx.body = await service.tagGroup.delete(ctx.params.id);
  }

  public async updateOrder() {
    const { ctx, service } = this;
    ctx.validate({
      ...baseRule,
      list: { type: 'array', itemType: 'string' }
    });
    const payload = ctx.request.body || {};
    ctx.body = await service.tagGroup.updateOrder(payload);
  }
}
