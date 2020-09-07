import { Service } from 'egg';

export default class BaikeService extends Service {
  get Baike() {
    return this.ctx.model.Baike;
  }

  public async create(payload) {
    return this.Baike.create(payload);
  }

  public async show(id) {
    console.log(id);
    return this.Baike.findById(id)
      .populate('tags')
      .populate('creator', ['avatar', 'nickname', 'role', 'username']);
  }
}
