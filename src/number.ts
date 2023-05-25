
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
