import { Service } from 'egg';

export default class TagService extends Service {
  get Tag() {
    return this.ctx.model.Tag;
  }

  get TagGroup() {
    return this.ctx.model.TagGroup;
  }

  /**
   * 根据标签组id查询标签列表
   * @param groupId 标签组id
   */
  public async list(groupId: string) {
    const list = await this.Tag.find({ group: groupId });
    return list ? list.sort((a, b) => (a.order - b.order > 0 ? 1 : -1)) : [];
  }

  /**
   * 增加标签
   * @param groupId 标签组id
   * @param tag 标签数据对象
   * @param tag.name 标签名称
   * @param tag.order 标签排序权重
   */
  public async create(payload) {
    const { app } = this;
    const { groupId } = payload;
    // 计算下一位排序
    const tags = await this.list(groupId);
    if (tags && tags.length) {
      const nextOrder = Math.max(0, ...tags.map(tag => tag.order)) + 1;
      payload.order = nextOrder;
    }
    // 创建标签关联
    payload.group = new app.mongoose.Types.ObjectId(groupId);
    const tag = await this.Tag.create(payload);
    // 更新标签组的关联
    await this.TagGroup.updateOne(
      { _id: groupId },
      { $push: { tags: tag._id } }
    );
    return await this.list(groupId);
  }

  /**
   * 删除标签
   * @param groupId 标签组id
   * @param id  标签id
   */
  public async deleteTag(groupId: string, id: string) {
    await this.Tag.deleteOne({ _id: id });
    await this.TagGroup.updateOne(
      { _id: groupId },
      { $pull: { tags: id } as any }
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
    const tags = await this.list(groupId);
    for (const tag of tags) {
      const index = list.indexOf(tag._id.toString());
      tag.order = ~index ? index : 999;
      await tag.save();
    }
    return await this.list(groupId);
  }
}
