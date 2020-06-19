import { Service } from 'egg';

export default class BaikeFilterService extends Service {
  get BaikeFilter() {
    return this.ctx.model.BaikeFilter;
  }

  public async createFilter(payload: Record<string, any>) {
    // 如果未设置 order 默认同类型的order最大值向后一位
    if (!payload.order) {
      const { acgType, type } = payload;
      const [result] = await this.BaikeFilter.aggregate()
        .match({ acgType, type })
        .group({ _id: null, maxOrder: { $max: '$order' } });
      const nextOrder = result ? result.maxOrder + 1 : 1;
      payload.order = nextOrder;
    }
    return this.BaikeFilter.create(payload);
  }

  public async listFilter(payload) {
    const filters = await this.BaikeFilter.find(payload).sort({ order: 1 });
    filters.forEach(filter => {
      filter.tags = filter.tags.sort((a, b) =>
        a.order - b.order > 0 ? 1 : -1
      );
    });
    return filters;
  }

  public async updateOrder(payload: Record<string, any>) {
    const { acgType, type, list } = payload;
    const groupList = await this.listFilter({ acgType, type });
    for (const group of groupList) {
      const index = list.indexOf(group._id.toString());
      group.order = ~index ? index : 999;
      await group.save();
    }
    return this.listFilter({ acgType, type });
  }

  /**
   * 删除标签组
   * deleteFilterById
   */
  public async deleteFilterById(id: string) {
    return this.BaikeFilter.findByIdAndDelete(id);
  }

  /**
   * 根据标签组id查询标签列表
   * @param groupId 标签组id
   */
  public async listTagsByGroupId(groupId: string) {
    const filter = await this.BaikeFilter.findById(groupId);
    return filter
      ? filter.tags.sort((a, b) => (a.order - b.order > 0 ? 1 : -1))
      : [];
  }

  public async createTag(groupId, payload: Record<string, any>) {
    const { ctx } = this;
    const filter = await this.BaikeFilter.findById(groupId);
    if (!filter) {
      ctx.throw(404, 'groupId 无效');
      return;
    }
    if (!payload.order) {
      const nextOrder = Math.max(0, ...filter.tags.map(tag => tag.order)) + 1;
      payload.order = nextOrder;
    }
    await this.BaikeFilter.findById(groupId).update({
      $push: { tags: payload }
    });
    return await this.listTagsByGroupId(groupId);
  }

  /**
   * 删除标签
   * deleteTag
   */
  public async deleteTag(groupId: string, id: string) {
    await this.BaikeFilter.findById(groupId).update({
      $pull: { tags: { _id: id } }
    });
    return await this.listTagsByGroupId(groupId);
  }

  public async updateTagOrder(payload: any) {
    const { groupId, list } = payload;
    const filter = await this.BaikeFilter.findById(groupId);
    const { tags } = filter;
    for (const tag of tags) {
      const index = list.indexOf(tag._id.toString());
      tag.order = ~index ? index : 999;
    }
    await filter.save();
    return await this.listTagsByGroupId(groupId);
  }
}
