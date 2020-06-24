/**
 * 根据 keys 筛选对象
 * @param obj 原对象
 * @param keys 字符串时以空格隔开，也可以直接传字符串数组
 * return ret 过滤后的对象
 */
export function only(obj: Record<string, any>, keys: string | string[]) {
  obj = obj || {};
  if (typeof keys === 'string') keys = keys.split(/ +/);
  return keys.reduce(function(ret: Record<string, any>, key) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) return ret;
    ret[key] = obj[key];
    return ret;
  }, {});
}

/**
 * 根据 keys 排除对象属性
 * @param obj 原对象
 * @param keys 字符串时以空格隔开，也可以直接传字符串数组
 * return ret 过滤后的对象
 */
export function exclude(obj: Record<string, any>, keys: string | string[]) {
  obj = obj || {};
  if (typeof keys === 'string') keys = keys.split(/ +/);
  return Object.keys(obj).reduce(function(ret: Record<string, any>, key) {
    if (keys.includes(key)) return ret;
    ret[key] = obj[key];
    return ret;
  }, {});
}
