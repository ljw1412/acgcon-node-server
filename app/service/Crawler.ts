import { Service } from 'egg';
import { Crawler } from '@ljw1412/web-crawler';
import { formatRule, getTargetValue } from '../util/CrawlerParser';

const path = require('path');

export default class CrawlerService extends Service {
  get Information() {
    return this.ctx.model.Information;
  }

  /**
   * 以url为唯一值进行保存
   * @param item 资讯对象
   */
  public async save(item: any) {
    const isExists = await this.Information.exists({ url: item.url });
    if (isExists) return;
    await this.Information.create(item);
  }

  /**
   * 开始爬取
   * @param type 规则类型
   */
  public async start(type: string) {
    const rulePath = path.join(__dirname, `../constant/crawler/${type}.json`);
    const rules = await import(rulePath);
    console.log('开始爬取', type);

    const crawler = new Crawler({ concurrency: 5 });
    formatRule(rules).forEach(rule => {
      const { limit = Infinity, name, acgType } = rule;
      let index = 1;

      crawler.addPage({ url: rule.url, type: rule.type, tag: acgType });
      crawler.on(`data#${acgType}`, ({ $, page }) => {
        if (!$) return;
        $(rule.item).each((_i, el) => {
          const item: Record<string, any> = { acgType, from: name };
          Object.keys(rule.mapping).forEach(key => {
            try {
              item[key] = getTargetValue($, el, rule.mapping[key]);
            } catch (error) {
              console.error(error.message + `\n ${page.url}`);
            }
          });
          this.save(item);
        });
        if (rule.next && index < limit) {
          index++;
          const url = getTargetValue($, null, rule.next);
          if (url) crawler.addPage({ url, type: 'html', tag: acgType });
        }
      });
    });

    crawler.on('end', () => {
      console.log('end');
    });
    crawler.start();
  }
}
