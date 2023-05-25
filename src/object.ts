
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

/**
 * Recursively compare the values of all keys in two objects.
 * Object values are recurively compared, primitives are compared using strict equality.
 * @param o1 The first object to compare
 * @param o2 The second object to compare
 * @returns true if all properties match, else false
 */
  export function compareObjects<T>(o1: T, o2: T): boolean {

  const DEBUG = false;

  // If both are undefined or both null, they match, if only one is, they do not
  if (o1 === undefined && o2 === undefined) {
    /* istanbul ignore next */ 
    DEBUG && console.log("compare objects match (both undefined)");
    return true;
  }
  if (o1 === null && o2 === null) {
    /* istanbul ignore next */ 
    DEBUG && console.log("compare objects match (both null)");
    return true;
  }
  if (o1 === undefined || o2 === undefined || o1 === null || o2 === null) {
    /* istanbul ignore next */ 
    DEBUG && console.log("compare objects mismatch (at least one is null or undefined))", o1, o2);
    return false;
  }

  const keys1 = Object.keys(o1);
  const keys2 = Object.keys(o2);
  if (keys1.length !== keys2.length) {
    /* istanbul ignore next */ 
    DEBUG && console.log("compare objects mismatch (different number of keys)", keys1, keys2);
    return false;
  }

  for (const key of keys1) {
    const val1 = o1[key as keyof typeof o1];
    const val2 = o2[key as keyof typeof o2];

    if (typeof val1 === "object") {
      const nestedCompare: boolean = compareObjects(val1, val2);
      if (!nestedCompare) {
        /* istanbul ignore next */ 
        DEBUG && console.log(`compare objects mismatch (object mismatch on key: ${key})`, val1, val2);
        return false;
      }
    } else {
      if (val1 !== val2) {
        /* istanbul ignore next */ 
        DEBUG && console.log(`compare objects mismatch (primitive mismatch on key: ${key})`, val1, val2);
        return false;
      }
    }
  }

  /* istanbul ignore next */ 
  DEBUG && console.log("compare objects match", o1, o2);
  return true;
}
