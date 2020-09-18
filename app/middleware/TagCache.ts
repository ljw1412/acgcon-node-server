import { Context } from 'egg';
import { Next } from 'koa';
import { TAG_PREFIX } from '../constant/cache';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default _options => async (ctx: Context, next: Next) => {
  const { app } = ctx;
  const { acgType, subType } = ctx.request.body;
  if (acgType && subType) {
    const cacheKey = `${TAG_PREFIX}${acgType}_${subType}`;
    await app.redis.del(cacheKey);
  }
  await next();
};
