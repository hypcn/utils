
/**
 * Clamp a number with inclusive bounds
 * @param value 
 * @param min 
 * @param max 
 * @returns 
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(Math.min(value, max), min);
}

/**
 * Finds the sum of some numbers, ignoreing `undefined` `null` and `NaN` values
 * @param numbers 
 * @returns 
 */
export function sum(...numbers: (number | undefined | null)[]) {
  let total = 0;
  for (const n of numbers) {
    if (typeof n === "number" && !Number.isNaN(n)) {
      total += n;
    }
  }
  return total;
}

/**
 * Round a number to a given number of significant figures.
 * This avoids the exponent strings from `toPrecision(x)`.
 * If `undefined` is provided as the value, `undefined` is returned.
 * @example 1234, 3 => 1230
 * @example 1234, 6 => 1234
 * @example 5555, 2 => 5600
 * @param num 
 * @param sigFigs 
 * @returns 
 */
export function numberToSigFigs<T extends number | undefined>(num: T, sigFigs: number = 3): T {
  if (typeof num === "undefined") {
    return undefined as T;
  }

  sigFigs = clamp(sigFigs, 1, 21);
  return Number(num.toPrecision(sigFigs)) as T;
}

/**
 * Convert a number to a formatted string with a number of significant figures,
 * and appropriate SI suffix (e.g. k, M, G, m, µ, n, etc.)
 * @param value 
 * @param sigFigs 
 * @returns 
 */
export function numberToSigFigsSI<T extends number | undefined>(value: T, sigFigs: number = 3): string {
  if (value === undefined) {
    return "undefined";
  }

  if (value === 0) {
    return (0).toFixed(Math.max(0, sigFigs - 1));
  }

  const siSuffixes = [
    { value: 1e-15, symbol: 'f' },
    { value: 1e-12, symbol: 'p' },
    { value: 1e-9, symbol: 'n' },
    { value: 1e-6, symbol: 'µ' },
    { value: 1e-3, symbol: 'm' },
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
  ];

  // for (const si of siSuffixes) {
  //   if (Math.abs(value) < si.value * 1e3) {
  //     const scaledValue = value / si.value;
  //     const formattedValue = parseFloat(scaledValue.toPrecision(sigFigs)).toString();
  //     return `${formattedValue}${si.symbol}`;
  //   }
  // }
  for (const si of siSuffixes) {
    if (Math.abs(value) < si.value * 1e3) {
      const scaledValue = value / si.value;
      const formattedValue = scaledValue.toPrecision(sigFigs);
      const fixedDecimalPlaces = Math.max(0, sigFigs - 1 - Math.floor(Math.log10(Math.abs(scaledValue))));
      return `${parseFloat(formattedValue).toFixed(fixedDecimalPlaces)}${si.symbol}`;
    }
  }

  return value.toString();
}

/**
 * Formats numbers from the range 0 -> 1 as a string in the range 0 -> 100 with a number of decimal places
 * @param ratio 
 * @param decimalPlaces The number of decimal places (default = 0)
 * @returns 
 */
export function ratioToPercentage(ratio: number, decimalPlaces = 0): string {
  return (ratio * 100).toFixed(decimalPlaces);
}

/**
 * Format a number of bytes as a string, including units
 * 
 * From https://stackoverflow.com/a/18650828
 * @param bytes 
 * @param opts optionally specify a number of decimal places, and whether to use 1000 instead of 1024
 * @returns 
 */
export function numberToBytes(bytes: number, opts?: { decimals?: number, tenCubed?: boolean }): string {

  if (bytes === 0) return '0 Bytes';
  if (!bytes) return '0 Bytes';

  const k = opts?.tenCubed === true ? 1000 : 1024;
  const dm = Math.max(opts?.decimals ?? 0, 0);
  const sizes = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Get a random number in a given range
 * @param min 
 * @param max 
 * @returns 
 */
export function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Get a random integer in a given range, max and min inclusive
 * @param min 
 * @param max 
 * @returns 
 */
export function randomIntRange(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
