import { Service } from 'egg';

export default class InformationService extends Service {
  get Information() {
    return this.ctx.model.Information;
  }

  /**
   * 分页获取资讯列表
   * @param query 参数
   */
  public async list(query: Record<string, any>) {
    const { pageIndex, pageSize } = query;
    delete query.pageIndex;
    delete query.pageSize;
    const count = await this.Information.countDocuments(query);
    const list = await this.Information.find(query)
      .sort({ time: -1 })
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize);
    return { count, list };
  }

  /**
   * 按时间倒序获得已上线的一定数量的资讯
   * @param num 获取的数量
   */
  public async listLimit(num: number) {
    return await this.Information.find({
      state: 1,
      acgType: { $not: /unknown/ }
    })
      .sort({ time: -1 })
      .limit(num);
  }

  public async listFrom(payload: Record<string, any>) {
    return await this.Information.aggregate()
      .match(payload)
      .group({ _id: '$from' });
  }
}
