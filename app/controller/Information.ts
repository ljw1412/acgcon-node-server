import BaseController from './base';
import { INFORMATION_FROM_MAP } from '../constant/mapping';

export default class InformationController extends BaseController {
  public async index() {
    const { service, ctx } = this;
    const { query } = ctx;
    if (query.pageIndex) query.pageIndex = query.pageIndex >> 0;
    if (query.pageSize) query.pageSize = query.pageSize >> 0;
    const rule = {
      acgType: {
        type: 'enum',
        values: ['animation', 'comic', 'game'],
        required: false
      },
      pageIndex: { type: 'number', default: 1 },
      pageSize: { type: 'number', default: 20 },
      state: { type: 'number', required: false }
    };
    ctx.validate(rule, query);
    ctx.body = await service.information.list(query);
  }

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

    if (query.acgType) {
      ctx.body = await service.information.list({
        acgType: query.acgType,
        pageIndex: 1,
        pageSize: query.count
      });
    } else {
      ctx.body = await service.information.listLimit(query.count);
    }
  }

  /**
   * 列出信息来源列表
   */
  public async listAllFrom() {
    const { service, ctx } = this;
    const { query } = ctx;
    const payload: Record<string, any> = {};
    if (query.acgType) payload.acgType = query.acgType;
    const list = await service.information.listFrom(payload);

    ctx.body = list.map(({ _id }) => ({
      value: _id,
      label: INFORMATION_FROM_MAP[_id] || _id
    }));
  }
}
