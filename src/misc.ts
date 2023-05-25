
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
