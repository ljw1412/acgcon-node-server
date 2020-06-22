import { Context } from 'egg';
import { Next } from 'koa';
import { USER_PREFIX } from '../constant/cache';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default _options => async (ctx: Context, next: Next) => {
  const { app, session } = ctx;
  if (session.userid) {
    // 取缓存中的用户信息
    const userCache = await app.redis.get(USER_PREFIX + session.userid);
    if (userCache) {
      try {
        const user = JSON.parse(userCache);
        user.__from = 'cache';
        ctx.user = user;
      } catch (error) {
        ctx.logger.error(error);
      }
    }
  }
  await next();
};
