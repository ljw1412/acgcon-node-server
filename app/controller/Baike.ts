import BaseController from './base';
import { baseRule } from '../constant/validate';

export default class BaikeController extends BaseController {
  public async index() {
    const { ctx, service } = this;
    const payload = ctx.query || {};
    ctx.validate(baseRule, payload);
    payload.pageIndex = Number(payload.pageIndex) || 1;
    payload.pageSize = Number(payload.pageSize) || 24;
    ctx.body = await service.baike.list(payload);
  }

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

  public async update() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    ctx.body = await service.baike.update(payload);
  }
}
