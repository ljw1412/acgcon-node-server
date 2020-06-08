import { Service } from 'egg';
import { SignOptions } from 'jsonwebtoken';

export default class GenTokenService extends Service {
  get jwt() {
    return this.ctx.app.jwt;
  }

  get secret() {
    return this.ctx.app.config.jwt.secret;
  }

  public async sign(data, option: number | SignOptions) {
    const payload: Record<string, any> = { data };
    if (typeof option === 'number') {
      payload.exp = option;
      option = {};
    }
    return this.jwt.sign(payload, this.secret, option);
  }

  public async verify(token) {
    return this.jwt.verify(token, this.secret);
  }
}
