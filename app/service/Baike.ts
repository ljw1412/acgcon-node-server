import { Service } from 'egg';

export default class BaikeService extends Service {
  get Baike() {
    return this.ctx.model.Baike;
  }

  public async create(payload) {
    return this.Baike.create(payload);
  }

  public async show(id) {
    return this.Baike.findById(id)
      .populate('tags')
      .populate('creator', ['avatar', 'nickname', 'role', 'username']);
  }

  public async list(payload) {
    // TODO: tag 筛选
    const { acgType, subType, pageIndex = 1, pageSize = 24 } = payload;
    const count = await this.Baike.countDocuments({ acgType, subType });
    const list = await this.Baike.find({ acgType, subType })
      .populate('tags')
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize);
    return { list, count };
  }

  public async update(payload) {
    return await this.Baike.updateOne({ _id: payload._id }, payload);
  }
}
