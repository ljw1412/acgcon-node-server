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
   * @param acgType acg类型
   * @param num 获取的数量
   */
  public async listLimit(acgType: string, num: number) {
    const query = { state: 1, acgType: acgType || { $not: /unknown/ } };
    return await this.Information.find(query)
      .sort({ time: -1 })
      .limit(num);
  }

  public async listOrigin(payload: Record<string, any>) {
    return await this.Information.aggregate()
      .match(payload)
      .group({ _id: '$origin' });
  }
}
