import { Service } from 'egg';

export default class InformationService extends Service {
  get Information() {
    return this.ctx.model.Information;
  }

  public async list({ acgType, index, size }) {
    const count = await this.Information.countDocuments({ acgType });
    const list = await this.Information.find({ acgType })
      .sort({ time: -1 })
      .skip((index - 1) * size)
      .limit(size);
    return { count, list };
  }

  public async listLimit(num: number) {
    return await this.Information.find()
      .sort({ time: -1 })
      .limit(num);
  }
}
