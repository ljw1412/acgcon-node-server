import { Service } from 'egg';

export default class BaikeFilterService extends Service {
  public async createFilter(payload: Record<string, any>) {
    const { ctx } = this;
    return ctx.model.BaikeFilter.create(payload);
  }

  public async createTag(groupId, payload: Record<string, any>) {
    const { ctx } = this;
    const BaikeFilter = ctx.model.BaikeFilter;
    const filter = await BaikeFilter.findById(groupId);
    if (!filter) {
      ctx.throw(404, 'groupId 无效');
    }
    filter.tags.push(payload);
    return await filter.save();
  }
}
