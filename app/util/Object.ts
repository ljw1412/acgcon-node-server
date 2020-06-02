/**
 * 根据 keys 筛选对象
 * @param obj 原对象
 * @param keys 字符串时以空格隔开，也可以直接传字符串数组
 * return ret 过滤后的字符串
 */
export function only(obj: Record<string, any>, keys: string | string[]) {
  obj = obj || {};
  if (typeof keys === 'string') keys = keys.split(/ +/);
  return keys.reduce(function(ret: Record<string, any>, key) {
    if (obj[key] === null) return ret;
    ret[key] = obj[key];
    return ret;
  }, {});
}
