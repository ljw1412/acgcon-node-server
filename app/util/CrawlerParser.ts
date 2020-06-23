interface SelectorRule {
  selector: string;
  type?: 'text' | 'attr';
  attr?: string | null;
  format?: string;
}

export function formatSelector(str: Record<string, any> | string) {
  if (typeof str === 'object') return str;
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

export function formatHtmlRule(rule: Record<string, any>) {
  const { next, mapping } = rule;
  if (next) {
    rule.next = formatSelector(next);
  }
  if (mapping) {
    Object.keys(mapping).forEach(key => {
      mapping[key] = formatSelector(mapping[key]);
    });
  }
}
export function formatRule(rules: Record<string, any> | Record<string, any>) {
  if (!Array.isArray(rules)) rules = [rules];
  return rules.map(rule => {
    if (rule.type === 'html') {
      formatHtmlRule(rule);
    }
    return rule;
  });
}

export function getTargetValue(
  $: CheerioSelector,
  el: CheerioElement | null,
  selectorRule: SelectorRule
) {
  const { selector, type, attr, format } = selectorRule;
  const target = el ? $(el).find(selector) : $(selector);
  if (!target) throw new Error('[CrawlerParser] 映射失败');
  let value = '';
  if (type === 'text') value = target.text();
  if (type === 'attr') value = target.attr(attr!) || '';
  if (format) {
    value = format.replace('{value}', value);
  }
  return value;
}

export default { formatSelector, formatRule, formatHtmlRule, getTargetValue };
