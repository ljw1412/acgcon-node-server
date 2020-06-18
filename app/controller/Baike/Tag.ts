import { Controller } from 'egg';

export default class BaikeTagController extends Controller {
  public async create() {
    const { ctx, service } = this;
    const createRule = {
      groupId: { type: 'string' },
      name: { type: 'string' },
      order: { type: 'number', required: false, default: 0 }
    };
    ctx.validate(createRule);
    const payload = ctx.request.body || {};
    const { groupId } = payload;
    delete payload.groupId;
    ctx.body = await service.baike.filter.createTag(groupId, payload);
  }

  public async destroy() {
    const { ctx, service } = this;
    ctx.validate({ id: { type: 'string' } }, ctx.params);
    ctx.validate({ groupId: { type: 'string' } }, ctx.request.body);
    const { id } = ctx.params;
    const { groupId } = ctx.request.body || {};
    ctx.body = await service.baike.filter.deleteTag(groupId, id);
  }
}
