import { Service } from 'egg';

export default class Tag extends Service {
  public async createGroup(payload: Record<string, any>) {
    const { ctx } = this;
    return ctx.model.BaikeTag.create(payload);
  }

  public async createTagsByGroupid(groupid, payload: Record<string, any>) {
    console.log(groupid, payload);
  }
}
