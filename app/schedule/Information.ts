import { Subscription } from 'egg';

export default class InformationSchedule extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      immediate: true,
      // cron: '0 */6 * * *', // 6个小时整点
      interval: '120m', // 每60分钟
      type: 'all' // 指定所有的 worker 都需要执行
    };
  }

  async subscribe() {
    const { service } = this.ctx;
    const types = ['dmzj', '3dm', 'gamersky', 'ali213'];
    for (const type of types) {
      await service.crawler.start(type);
    }
  }
}
