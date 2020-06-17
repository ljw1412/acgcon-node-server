import { Service } from 'egg';

export default class BaikeFilterService extends Service {
  public async createFilter(payload: Record<string, any>) {
    const { ctx } = this;
    // 如果未设置 order 默认同类型的order最大值向后一位
    if (!payload.order) {
      const { acgType, type } = payload;
      const [result] = await ctx.model.BaikeFilter.aggregate()
        .match({ acgType, type })
        .group({ _id: null, maxOrder: { $max: '$order' } });
      const nextOrder = result ? result.maxOrder + 1 : 1;
      payload.order = nextOrder;
    }
    return ctx.model.BaikeFilter.create(payload);
  }

  /**
   * deleteFilterById
   */
  public deleteFilterById(id: string) {
    const { ctx } = this;
    return ctx.model.BaikeFilter.findByIdAndDelete(id);
  }

  public async createTag(groupId, payload: Record<string, any>) {
    const { ctx } = this;
    const BaikeFilter = ctx.model.BaikeFilter;
    const filter = await BaikeFilter.findById(groupId);
    if (!filter) {
      ctx.throw(404, 'groupId 无效');
      return;
    }
    if (!payload.order) {
      const nextOrder = Math.max(0, ...filter.tags.map(tag => tag.order)) + 1;
      payload.order = nextOrder;
    }
    filter.tags.push(payload);
    return await filter.save();
  }

  public async listFilter(payload) {
    const { ctx } = this;
    return ctx.model.BaikeFilter.find(payload).sort({ order: 1 });
  }
}
