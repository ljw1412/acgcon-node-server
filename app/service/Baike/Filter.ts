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
    return this.BaikeFilter.find(payload).sort({ order: 1 });
  }

  public async updateOrder(payload: Record<string, any>) {
    const { acgType, type } = payload;
    const list = await this.listFilter({ acgType, type });
    // TODO: 如何排序修改，防止多线操作异常。
    console.log(list);
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
  public async listTagByGroupId(groupId: string) {
    const filter = await this.BaikeFilter.findById(groupId);
    return filter ? filter.tags : [];
  }

  /**
   * 删除标签
   * deleteTag
   */
  public async deleteTag(groupId: string, id: string) {
    await this.BaikeFilter.findById(groupId).update({
      $pull: { tags: { _id: id } }
    });
    return await this.listTagByGroupId(groupId);
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
    return await this.listTagByGroupId(groupId);
  }
}
