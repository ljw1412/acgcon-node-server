import { Service } from 'egg';

export default class User extends Service {
  public async create(payload: Record<string, any>) {
    const { ctx } = this;
    const { result, salt } = ctx.helper.crypto.aesEncrypt(payload.password);
    payload.password = result;
    payload.salt = salt;
    return ctx.model.User.create(payload);
  }

  public async destroy(_id: string) {
    const { ctx } = this;
    const user = await ctx.model.User.findById(_id);
    if (!user) {
      ctx.throw(500, '用户不存在');
    }
    await user.remove();
    return true;
  }

  public async update(_id: string, payload: Record<string, any>) {
    return { _id, payload };
  }

  public async show(_id: string) {
    const { ctx } = this;
    return await ctx.model.User.findOne({ _id }, { password: 0, salt: 0 });
  }

  public async index(payload: Record<string, any>) {
    return payload;
  }
}
