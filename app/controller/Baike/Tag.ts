import { Controller } from 'egg';

export default class BaikeTagController extends Controller {
  public async create() {
    const { ctx, service } = this;
    const createRule = {
      groupId: { type: 'string' },
      name: { type: 'string' },
      order: { type: 'number' }
    };
    ctx.validate(createRule);
    const payload = ctx.request.body || {};
    const { groupId } = payload;
    delete payload.groupId;
    ctx.body = await service.baike.filter.createTag(groupId, payload);
  }
}
