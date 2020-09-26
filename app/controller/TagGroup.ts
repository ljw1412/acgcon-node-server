import BaseController from './base';
import { TAG_PREFIX } from '../constant/cache';
import { baseRule } from '../constant/validate';

export default class TagGroupController extends BaseController {
  public async index() {
    const { ctx, service } = this;
    ctx.validate(baseRule, ctx.query);
    const payload = ctx.query || {};
    const { acgType, subType } = payload;
    const cacheKey = `${TAG_PREFIX}${acgType}_${subType}`;
    const cache = await this.redis.get(cacheKey);
    if (cache) {
      ctx.res.setHeader('acg-data-from', 'cache');
      ctx.body = cache;
      return;
    }
    const result = (await service.tagGroup.list(payload)) || [];
    this.redis.set(cacheKey, JSON.stringify(result));
    ctx.body = result;
  }

  public async create() {
    const { ctx, service } = this;
    const createRule = {
      ...baseRule,
      name: { type: 'string', required: true },
      icon: { type: 'string', required: false, default: '' },
      order: { type: 'number', required: false, default: 0 }
    };
    ctx.validate(createRule);
    const payload = ctx.request.body || {};
    ctx.body = await service.tagGroup.create(payload);
  }

  public async destroy() {
    const { ctx, service } = this;
    ctx.validate({ id: { type: 'string' } }, ctx.params);
    ctx.body = await service.tagGroup.delete(ctx.params.id);
  }

  public async rename() {
    const { ctx, service } = this;
    ctx.validate({
      ...baseRule,
      groupId: { type: 'string' },
      name: { type: 'string' }
    });
    const payload = ctx.request.body || {};
    ctx.body = await service.tagGroup.rename(payload);
  }

  public async updateMultiple() {
    const { ctx, service } = this;
    ctx.validate({
      ...baseRule,
      groupId: { type: 'string' },
      state: { type: 'boolean' }
    });
    const payload = ctx.request.body || {};
    ctx.body = await service.tagGroup.updateMultiple(payload);
  }

  public async updateOrder() {
    const { ctx, service } = this;
    ctx.validate({
      ...baseRule,
      list: { type: 'array', itemType: 'string' }
    });
    const payload = ctx.request.body || {};
    ctx.body = await service.tagGroup.updateOrder(payload);
  }

  // 重置缓存，依靠中间件TagCache实现。
  public async resetCache() {
    const { ctx } = this;
    ctx.validate(baseRule);
    ctx.body = { success: true };
  }
}
