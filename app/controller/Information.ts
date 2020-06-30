import BaseController from './base';
import { INFORMATION_ORIGIN_MAP, ACGTYPE_MAP } from '../constant/mapping';

export default class InformationController extends BaseController {
  /**
   * 获得资讯列表
   */
  public async index() {
    const { service, ctx } = this;
    const { query } = ctx;
    if (query.pageIndex) query.pageIndex = query.pageIndex >> 0;
    if (query.pageSize) query.pageSize = query.pageSize >> 0;
    if (query.state) query.state = parseInt(query.state);
    const rule = {
      acgType: {
        type: 'enum',
        values: ['animation', 'comic', 'game'],
        required: false
      },
      origin: { type: 'string', required: false },
      pageIndex: { type: 'number', required: false, default: 1 },
      pageSize: { type: 'number', required: false, default: 20 },
      state: { type: 'number', required: false, default: 1 }
    };
    ctx.validate(rule, query);

    const result = await service.information.list(query);
    result.list = result.list.map(item => {
      item.toObject && (item = item.toObject());
      item.acgTypeCN = ACGTYPE_MAP[item.acgType] || item.acgType;
      item.originCN = INFORMATION_ORIGIN_MAP[item.origin] || item.origin;
      return item;
    });
    ctx.body = result;
  }

  /**
   * 列出信息来源列表
   */
  public async listOrigin() {
    const { service, ctx } = this;
    const { query } = ctx;
    const payload: Record<string, any> = {};
    if (query.acgType) payload.acgType = query.acgType;
    const list = await service.information.listOrigin(payload);

    ctx.body = list.map(({ _id }) => ({
      value: _id,
      label: INFORMATION_ORIGIN_MAP[_id] || _id
    }));
  }
}
