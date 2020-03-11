import { Service } from 'egg';
export default class GenTokenService extends Service {
  public async sign(data, exp) {
    const { ctx } = this;
    return ctx.app.jwt.sign({ data, exp }, ctx.app.config.jwt.secret);
  }

  public async verify(token) {
    const { ctx } = this;
    return ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
  }
}
