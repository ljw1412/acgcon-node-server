import { Service } from 'egg';

export default class InformationService extends Service {
  get Information() {
    return this.ctx.model.Information;
  }

  /**
   * 分页获取资讯列表
   * @param param0 参数
   */
  public async list({ acgType, index, size, state = 1 }) {
    const count = await this.Information.countDocuments({ acgType, state });
    const list = await this.Information.find({ acgType, state })
      .sort({ time: -1 })
      .skip((index - 1) * size)
      .limit(size);
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
}
