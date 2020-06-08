import { Controller } from 'egg';

const USER_CREATE_TRANSFER = {
  username: {
    type: 'string',
    required: true,
    allowEmpty: false,
    format: /^[\w-]{6,12}$/
  },
  nickname: {
    type: 'string',
    required: true,
    allowEmpty: false,
    min: 2,
    format: /^[\u2E80-\u9FFF\w,\.。]{2,10}$/
  },
  email: {
    type: 'email',
    required: true,
    allowEmpty: false
  },
  password: {
    type: 'password',
    required: true,
    allowEmpty: false,
    min: 6,
    max: 16
  }
};

export default class UserController extends Controller {
  // 创建用户
  public async create() {
    const { ctx, service } = this;
    ctx.validate(USER_CREATE_TRANSFER);
    const payload = ctx.request.body || {};
    const res = await service.user.create(payload);
    ctx.body = res;
  }

  // 删除单个用户
  public async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    ctx.body = await service.user.destroy(id);
  }

  // 修改用户
  public async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    await service.user.update(id, payload);
    ctx.body = 'success';
  }

  // 获取单个用户
  public async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.user.show(id);
    ctx.body = res;
  }

  // 获取所有用户(分页/模糊)
  public async index() {
    const { ctx, service } = this;
    const payload = ctx.query;
    const res = await service.user.index(payload);
    ctx.body = res;
  }

  // 查询用户名或邮箱是否存在
  public async exists() {
    const { ctx, service } = this;
    const payload = ctx.query;
    const res = await service.user.exists(payload);
    if (!res) {
      ctx.throw(401, '用户不存在');
    }
    ctx.body = res;
  }

  // 用户登录
  public async login() {
    const { ctx, service } = this;
    const { loginName, password } = ctx.request.body || {};
    let user = await service.user.findUserByLoginName(loginName);
    if (!user) return ctx.throw(401, '用户不存在');
    user = await service.user.checkPassword(user, password);
    if (!user) return ctx.throw(401, '密码错误');
    ctx.session = { id: user._id };
    // 调用 rotateCsrfSecret 刷新用户的 CSRF token
    ctx.rotateCsrfSecret();
    ctx.body = user;
  }
}
