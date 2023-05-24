
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
 * Wait for the specified number of milliseconds
 * @param durationMs 
 * @returns 
 */
export async function wait(durationMs: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, durationMs);
  });
}
