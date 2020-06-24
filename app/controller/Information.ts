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
}
