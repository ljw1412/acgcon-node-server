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
    group.tags = [{ name: '全部', order: 0, isAll: true }];
    return this.TagGroup.create(group);
  }

  /**
   * 展示标签组列表
   * @param payload 负荷
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
   * 标签组名称重命名
   * @param payload 负荷
   * @param payload.groupId 标签组id
   * @param payload.name 新名称
   */
  public async rename(payload: any) {
    const { groupId, name } = payload;
    return this.TagGroup.updateOne({ _id: groupId }, { $set: { name } });
  }

  /**
   * 更新标签组的多选状态
   * @param payload 负荷
   * @param payload.groupId 标签组id
   * @param payload.state 标签组多选状态
   */
  public async updateMultiple(payload: any) {
    const { groupId, state } = payload;
    return this.TagGroup.updateOne(
      { _id: groupId },
      { $set: { multiple: state } }
    );
  }

  /**
   * 更新标签组排序
   * @param payload 负荷
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
