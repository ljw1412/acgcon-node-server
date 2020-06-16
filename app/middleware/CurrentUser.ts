import { Context } from 'egg';
import { Next } from 'koa';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default _options => async (ctx: Context, next: Next) => {
  if (ctx.session.userid) {
    console.log(ctx.originalUrl, ctx.session.userid);
    ctx.user = await ctx.service.user.show(ctx.session.userid);
  }
  await next();
};
