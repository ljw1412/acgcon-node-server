import { Service } from 'egg';

export default class TagGroupService extends Service {
  get TagGroup() {
    return this.ctx.model.TagGroup;
  }

  /**
   * 新增标签组
   * @param group 表情组
   */
  public async create(group: Record<string, any>) {
    // 如果未设置 order 默认同类型的order最大值向后一位
    if (!group.order) {
      const { acgType, type } = group;
      const [result] = await this.TagGroup.aggregate()
        .match({ acgType, type })
        .group({ _id: null, maxOrder: { $max: '$order' } });
      const nextOrder = result ? result.maxOrder + 1 : 1;
      group.order = nextOrder;
    }
    return this.TagGroup.create(group);
  }

  /**
   * 展示标签组列表
   * @param payload
   */
  public async list(payload) {
    const filters = await this.TagGroup.find(payload).sort({ order: 1 });
    filters.forEach(filter => {
      filter.tags = filter.tags.sort((a, b) =>
        a.order - b.order > 0 ? 1 : -1
      );
    });
    return filters;
  }

  /**
   * 删除标签组
   */
  public async delete(id: string) {
    return this.TagGroup.findByIdAndDelete(id);
  }

  /**
   * 更新标签组排序
   * @param payload.acgType acg类型
   * @param payload.type 二级类型
   * @param payload.list 排序列表
   */
  public async updateOrder(payload: Record<string, any>) {
    const { acgType, type, list } = payload;
    const groupList = await this.list({ acgType, type });
    for (const group of groupList) {
      const index = list.indexOf(group._id.toString());
      group.order = ~index ? index : 999;
      await group.save();
    }
    return this.list({ acgType, type });
  }
}
