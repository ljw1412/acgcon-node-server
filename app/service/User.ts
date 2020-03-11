import { Service } from 'egg';

export default class UserService extends Service {
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

  // 根据登录名称查找用户
  public async findUserByLoginName(loginName: string) {
    const { ctx } = this;
    return await ctx.model.User.findOne({
      $or: [{ username: loginName }, { email: loginName }]
    });
  }

  // 登录
  public async login(payload) {
    const { ctx, service } = this;
    const user = await this.findUserByLoginName(payload.loginName);
    if (!user) {
      ctx.throw(401, '用户名或密码错误');
    }
    // 用户输入的密码与数据库对应用户的盐进行加密
    const { result: aesPassword } = ctx.helper.crypto.aesEncrypt(
      payload.password,
      user.salt
    );

    if (user.password !== aesPassword) {
      ctx.throw(401, '用户名或密码错误');
    }
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.salt;

    Object.assign(userObj, {
      token: await service.genToken.sign(
        userObj,
        +new Date() / 1000 + 60 * 60 * 24 * 7
      )
    });
    return userObj;
  }
}
