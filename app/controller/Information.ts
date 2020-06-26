import BaseController from './base';

export default class InformationController extends BaseController {
  public async index() {
    const { service, ctx } = this;
    const { query } = ctx;
    if (query.index) query.index = query.index >> 0;
    if (query.size) query.size = query.size >> 0;
    const rule = {
      acgType: {
        type: 'enum',
        values: ['animation', 'comic', 'game'],
        required: true
      },
      index: { type: 'number', default: 1 },
      size: { type: 'number', default: 20 }
    };
    ctx.validate(rule, query);
    ctx.body = await service.information.list(query);
  }

  public async show() {}

  /**
   * 获得最新列表
   */
  public async listLastest() {
    const { service, ctx } = this;
    const { query } = ctx;
    if (query.count) query.count = query.count >> 0;
    ctx.validate(
      {
        acgType: {
          type: 'enum',
          values: ['animation', 'comic', 'game'],
          required: false
        },
        count: { type: 'number', max: 100, min: 1 }
      },
      query
    );

    ctx.body = query.acgType
      ? await service.information.list({
          acgType: query.acgType,
          index: 1,
          size: query.count
        })
      : await service.information.listLimit(query.count);
  }
}
