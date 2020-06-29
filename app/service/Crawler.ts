import { Service, Context } from 'egg';
import { Crawler, Page } from '@ljw1412/web-crawler';
import {
  Rule,
  FormatedRule,
  formatRule,
  getTargetValue,
  updateParams,
  formatHtmlRule
} from '../util/CrawlerParser';

const path = require('path');
const cheerio = require('cheerio');

export default class CrawlerService extends Service {
  private crawler = new Crawler({ concurrency: 5 });

  constructor(ctx: Context) {
    super(ctx);
    this.crawler.start();
    this.crawler.on('end', () => {
      console.log('***********爬取结束***********');
    });
  }

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
   * 解析HTML并且将解析后的结果保存到数据库
   * @param $ 文档选择器
   * @param rule 规则
   * @param page 爬取的页面信息
   */
  private parseHtmlAndSave($: CheerioSelector, rule: FormatedRule, page: Page) {
    const { item, acgType, name, review, mapping } = rule;
    $(item).each((_i, el) => {
      const item: object = { acgType, from: name, state: review ? 0 : 1 };
      Object.keys(mapping).forEach(key => {
        try {
          item[key] = getTargetValue($, el, mapping[key]);
        } catch (error) {
          const { marker, url } = page;
          console.error(error.message + `\n[page: ${marker.page}]\n`, url);
        }
      });
      this.save(item);
    });
  }

  /**
   * 动漫星空爬虫
   * @param originRule 原始规则
   * @param crawler 爬虫实例
   */
  private async gamersky(originRule: Rule, crawler: Crawler) {
    const rule = formatHtmlRule(originRule);
    const { url, limit = 100, name, type, acgType, params } = rule;
    const tag = `${name}_${acgType}`;
    for (let i = 1; i <= limit; i++) {
      const query = JSON.parse(JSON.stringify(params));
      updateParams(query, '{page}', i);
      updateParams(query, '{timestamp}', +new Date());
      query.jsondata = JSON.stringify(query.jsondata);
      crawler.addPage({ url, type, tag, query, marker: { page: i } });
    }
    crawler.on(`data#${tag}`, ({ buffer, page }) => {
      if (buffer) {
        let raw = buffer.toString();
        raw = raw.substr(raw.indexOf('{'), raw.lastIndexOf('}'));
        const json = JSON.parse(raw);
        const $ = cheerio.load(json.body);
        this.parseHtmlAndSave($, rule, page);
      }
    });
  }

  /**
   * 加载HTML页面类型爬虫
   * @param rule 规则
   * @param crawler 爬虫实例
   */
  private async loadHtmlCrawler(rule: FormatedRule, crawler: Crawler) {
    const { url, limit = Infinity, name, acgType } = rule;
    let index = 1;
    const tag = `${name}_${acgType}`;
    crawler.addPage({ url, type: 'html', tag, marker: { page: index } });
    crawler.on(`data#${tag}`, ({ $, page }) => {
      if (!$) return;
      this.parseHtmlAndSave($, rule, page);
      if (rule.next && index < limit) {
        index++;
        const url = getTargetValue($, null, rule.next);
        if (url) crawler.addPage({ url, type: 'html', tag: page.tag });
      }
    });
  }

  /**
   * 开始爬取
   * @param type 规则类型
   */
  public async start(type: string) {
    const { ctx } = this;
    let rules = null;
    try {
      const rulePath = path.join(__dirname, `../constant/crawler/${type}.json`);
      rules = await import(rulePath);
    } catch (error) {
      console.error(error);
    }
    if (!rules) {
      ctx.throw(404, '"type" is not fount!');
      return;
    }
    // console.log('===========开始爬取===========', type);

    formatRule(rules).forEach(rule => {
      if (type === 'gamersky') {
        this.gamersky(rule, this.crawler);
        return;
      }
      if (rule.type === 'html') {
        this.loadHtmlCrawler(rule, this.crawler);
      }
    });
    ctx.body = { success: true, message: `<${type}>爬虫启动成功!` };
  }
}
