import { Controller } from 'egg';

export default class BaikeTagController extends Controller {
  public async index() {
    const { ctx } = this;
    const { acgType, type } = ctx.query;

    // const result = await ctx.model.BaikeTag.find({ acgType, type });
    const group = await ctx.model.BaikeTag.find({
      acgType,
      type,
      group: null
    }).sort('-order');

    const gourpValueList = group.map(item => item.value);

    const list = await ctx.model.BaikeTag.find({
      acgType,
      type,
      group: gourpValueList
    }).sort('-order');

    const result = group.map(item => {
      return {
        ...item.toObject(),
        children: list.filter(el => el.group === item.value)
      };
    });

    ctx.body = result;
  }

  public async new() {
    const { ctx } = this;
    ctx.body = await ctx.model.BaikeTag.create(ctx.query);
  }
}
