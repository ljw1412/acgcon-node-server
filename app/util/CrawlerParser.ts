import { exclude } from '../util/Object';
import { flattenDeep } from '../util/Array';

interface SelectorRuleConfig {
  selector: string;
  type?: 'text' | 'attr';
  attr?: string | null;
  format?: string;
}

type SelectorRule = string | SelectorRuleConfig;

type AcgType = 'animation' | 'comic' | 'game';

interface BaseRule {
  name: string;
  type: 'html' | 'json';
  origin?: string;
  next: SelectorRule;
  limit: number;
  item: string;
  review?: boolean;
  mapping: Record<string, SelectorRule>;
  [key: string]: any;
}

export interface MultiSiteRule extends BaseRule {
  website: { url: string; acgType: AcgType }[];
}

export interface SimpleSiteRule extends BaseRule {
  url: string;
  acgType: AcgType;
}

export interface FormatedRule extends BaseRule {
  next: SelectorRuleConfig;
  mapping: Record<string, SelectorRuleConfig>;
}

export type Rule = MultiSiteRule | SimpleSiteRule;

/**
 * 自定义选择器字符串解析
 * @param str 自定义选择器字符串或对象
 */
export function formatSelector(str: SelectorRule) {
  if (typeof str === 'object') {
    if (!str.type) str.type = 'text';
    return str;
  }
  const result: SelectorRule = {
    selector: str,
    type: 'text',
    attr: null
  };

  if (str.includes('|')) {
    const [selector, attributeName] = str.split('|');
    result.selector = selector;
    result.type = 'attr';
    result.attr = attributeName;
  }
  return result;
}

/**
 * 格式化HTML解析规则
 * @param rule 规则
 */
export function formatHtmlRule(rule: Rule): FormatedRule {
  const { next, mapping, website } = rule;
  if (next) {
    rule.next = formatSelector(next);
  }
  if (mapping) {
    Object.keys(mapping).forEach(key => {
      mapping[key] = formatSelector(mapping[key]);
    });
  }
  // 如果包含website说明有多个页面共用一套规则
  if (website) {
    return website.map(item => Object.assign(exclude(rule, 'website'), item));
  }
  return rule as FormatedRule;
}

/**
 * 格式化Api解析规则
 * @param rule 规则
 */
export function formatApiRule(rule: Rule) {
  return rule;
}

/**
 * 格式化规则
 * @param rules 规则
 */
export function formatRule(rules: Rule | Rule[]) {
  if (!Array.isArray(rules)) rules = [rules];
  const formatedRules = rules.map(rule => {
    if (rule.type === 'html') {
      return formatHtmlRule(rule);
    } else if (rule.api === 'api') {
      return formatApiRule(rule);
    }
    return rule;
  });
  return flattenDeep(formatedRules);
}

/**
 * 获取指定选择器规则的结果
 * @param $ CheerioSelector
 * @param el CheerioElement
 * @param config 选择器规则
 */
export function getTargetValue(
  $: CheerioSelector,
  el: CheerioElement | null,
  config: SelectorRuleConfig
) {
  const { selector, type, attr, format } = config;
  const target = el ? $(el).find(selector) : $(selector);
  if (!target) throw new Error('[CrawlerParser] 映射失败');
  let value = '';
  if (type === 'text') value = target.text();
  if (type === 'attr') value = target.attr(attr!) || '';
  if (format) {
    value = format.replace('{value}', value);
    value = value.replace('{year}', new Date().getFullYear() + '');
  }
  return value;
}

export function updateParams(params, keyword, value) {
  if (typeof params === 'string') {
    params = params.replace(keyword, value);
  } else if (typeof params === 'object') {
    Object.keys(params).forEach(key => {
      if (typeof params[key] === 'object') {
        updateParams(params[key], keyword, value);
        return;
      }
      if (params[key] === keyword) {
        params[key] = value;
      }
    });
  }
  return params;
}
