import { Context } from 'egg';
import { Next } from 'koa';
import { TAG_PREFIX } from '../constant/cache';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default _options => async (ctx: Context, next: Next) => {
  const { app } = ctx;
  const { acgType, type } = ctx.request.body;
  if (acgType && type) {
    const cacheKey = `${TAG_PREFIX}${acgType}_${type}`;
    await app.redis.del(cacheKey);
  }
  await next();
};
