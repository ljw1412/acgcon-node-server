import { Controller } from 'egg';

export default class BaikeTagController extends Controller {
  public async index() {
    const { ctx } = this;
    const { acgType, type } = ctx.query;
    console.log(ctx.query);
    const result = await ctx.model.BaikeTag.find({ acgType, type });
    ctx.body = result;
  }

  public async new() {
    const { ctx } = this;
    const { name, acgType, type, group } = ctx.query;
    ctx.body = await ctx.model.BaikeTag.create({ name, acgType, type, group });
  }
}
