
/**
 * Create a copy of an object which does not share a reference with the original
 * @param obj 
 * @returns 
 */
export function dereference<T extends any>(obj: T): undefined extends T ? undefined : T {
  if (obj === undefined) return undefined as any;
  if (obj === null) return null as any;
  return JSON.parse(JSON.stringify(obj));
}

/**
   * Determines if the parameter is defined, and an object, and not an array.
   * @param toTest
   * @returns {boolean}
   */
export function isObject(toTest: any): boolean {
  return Boolean(toTest && typeof toTest === 'object' && !Array.isArray(toTest));
}

/**
 * Deep merge two objects.
 * 
 * The target object is modified and returned.
 * 
 * Omitted keys are unchanged, keys with the value `undefined` are removed.
 * 
 * Arrays are replaced, not merged.
 * 
 * @param target
 * @param ...sources
 */
export function mergeDeep(target: any, ...sources: any[]): any {

  if (!sources.length) return target;

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  // If the target is not defined, "merge" the source onto it be replacing it
  if (!target && source) {
    target = source;
  }

  return mergeDeep(target, ...sources);
}
