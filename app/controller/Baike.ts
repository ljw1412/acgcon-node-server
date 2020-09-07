import BaseController from './base';

export default class BaikeController extends BaseController {
  public async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const info = await service.baike.create(payload);
    ctx.body = info;
  }

  public async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    ctx.body = await service.baike.show(id);
  }
}
