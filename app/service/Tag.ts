import { Service } from 'egg';

export default class TagService extends Service {
  get TagGroup() {
    return this.ctx.model.TagGroup;
  }

  /**
   * 增加标签
   * @param groupId 标签组id
   * @param tag 标签数据对象
   * @param tag.name 标签名称
   * @param tag.order 标签排序权重
   */
  public async create(groupId, tag: Record<string, any>) {
    const { ctx } = this;
    const filter = await this.TagGroup.findById(groupId);
    if (!filter) {
      ctx.throw(404, 'groupId 无效');
      return;
    }
    if (!tag.order) {
      const nextOrder = Math.max(0, ...filter.tags.map(tag => tag.order)) + 1;
      tag.order = nextOrder;
    }
    await this.TagGroup.updateOne({ _id: groupId }, { $push: { tags: tag } });
    return await this.list(groupId);
  }

  /**
   * 根据标签组id查询标签列表
   * @param groupId 标签组id
   */
  public async list(groupId: string) {
    const filter = await this.TagGroup.findById(groupId);
    return filter
      ? filter.tags.sort((a, b) => (a.order - b.order > 0 ? 1 : -1))
      : [];
  }

  /**
   * 删除标签
   * @param groupId 标签组id
   * @param id  标签id
   */
  public async deleteTag(groupId: string, id: string) {
    await this.TagGroup.updateOne(
      { _id: groupId },
      { $pull: { tags: { _id: id } } }
    );
    return await this.list(groupId);
  }

  /**
   * 更新标签排序
   * @param payload 负荷
   * @param payload.groupId 标签组id
   * @param payload.list 排序列表
   */
  public async updateOrder(payload: any) {
    const { groupId, list } = payload;
    const filter = await this.TagGroup.findById(groupId);
    const { tags } = filter;
    for (const tag of tags) {
      const index = list.indexOf(tag._id.toString());
      tag.order = ~index ? index : 999;
    }
    await filter.save();
    return await this.list(groupId);
  }
}
