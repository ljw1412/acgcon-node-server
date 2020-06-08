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

  // TODO
  public async update(_id: string, payload: Record<string, any>) {
    return { _id, payload };
  }

  public async show(_id: string) {
    if (!_id) return null;
    const { ctx } = this;
    return await ctx.model.User.findOne({ _id }, { password: 0, salt: 0 });
  }

  // TODO
  public async index(payload: Record<string, any>) {
    return payload;
  }

  /**
   * 检查昵称是否存在
   * @param nickname 昵称
   */
  public async nicknameExists(nickname: string) {
    const { ctx } = this;
    return !!(await ctx.model.User.count({ nickname }));
  }

  /**
   * 根据登录名称查找用户
   * @param loginName 登录名称
   */
  public async findUserByLoginName(loginName: string) {
    const { ctx } = this;
    return await ctx.model.User.findOne({
      $or: [{ username: loginName }, { email: loginName }]
    });
  }

  /**
   * 检查用户是否存在
   * @param loginName 登录名
   */
  public async exists({ loginName }) {
    const user = await this.findUserByLoginName(loginName);
    if (!user) return null;
    return { name: loginName, avatar: user.avatar };
  }

  /**
   * 检查用户密码是否正确
   * @param user 用户
   * @param password 输入的密码
   */
  public async checkPassword(user, password) {
    if (!user) return null;
    const { ctx } = this;
    // 用户输入的密码与数据库对应用户的盐进行加密
    const { result: aesPassword } = ctx.helper.crypto.aesEncrypt(
      password,
      user.salt
    );
    if (user.password !== aesPassword) return;
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.salt;
    return userObj;
  }
}
