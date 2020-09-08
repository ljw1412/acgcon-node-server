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

  public async update(payload) {
    return await this.Baike.updateOne({ _id: payload._id }, payload);
  }
}
