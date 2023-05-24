
/**
 * Convert a number of milliseconds since midnight to a 24-hour time string.
 * 
 * Millisecond values less than zero or greater than one day are modulo-ed back
 * into a single 24-hour period.
 * 
 * Minutes are rounded to the nearest integer by default, and can be rounded
 * always up or always down with the `roundUp` option.
 * @example 123456789 => "10:18"
 * @example 123456789 => "10:18"
 * @param ms 
 */
export function millisTo24Hour(ms: number, opts?: { roundUp?: boolean }): string {

  ms = ms % 86400000;
  if (ms < 0) ms += 86400000;

  const roundFn = opts?.roundUp === true ? Math.ceil :
    opts?.roundUp === false ? Math.floor :
      Math.round;

  // const secs = ms / 1000;
  const mins = (ms / 60_000) % 60;
  const hrs = (ms / 3_600_000) % 24;

  const hrsStr = Math.floor(hrs).toString().padStart(2, "0");
  const minStr = roundFn(mins).toString().padStart(2, "0");

  return `${hrsStr}:${minStr}`;
}

/**
 * Convert a number of milliseconds to a simple duration string with a configurable number of units.
 * Available units are: ms, secs, mins, hours, months, years
 * @example 12345 -> "12 secs, 345 ms"
 * @example 1234567 -> "20 mins, 34 secs"
 * @example 123456789 -> "1 day, 10 hours"
 * @example 9876543210 -> "3 months, 24 days"
 * @example (9876543210, 4) -> "3 months, 24 days, 7 hours, 29 mins"
 * @example (123456, 4) -> "2 mins, 3 secs, 345 ms"
 * @param ms 
 * @param singleValue whether 
 * @returns 
 */
export function millisToPrettyDuration(ms: number, maxUnits: number = 2): string {

  if (ms === undefined) {
    ms = 0;
  }

  let secs = Math.floor(ms / 1000);
  ms = ms - (secs * 1000);
  let mins = Math.floor(secs / 60);
  secs = secs - (mins * 60);
  let hrs = Math.floor(mins / 60);
  mins = mins - (hrs * 60);
  let days = Math.floor(hrs / 24);
  hrs = hrs - (days * 24);
  let months = Math.floor(days / 30);
  days = days - (months * 30);
  let years = Math.floor(months / 12);
  months = months - (years * 12);

  const durationChunks = [
    `${years} year${years === 1 ? "" : "s"}`,
    `${months} month${months === 1 ? "" : "s"}`,
    `${days} day${days === 1 ? "" : "s"}`,
    `${hrs} hour${hrs === 1 ? "" : "s"}`,
    `${mins} min${mins === 1 ? "" : "s"}`,
    `${secs} sec${secs === 1 ? "" : "s"}`,
    `${ms} ms`,
  ];

  let fromIndex = 0;
  if (years === 0) {
    fromIndex += 1;
    if (months === 0) {
      fromIndex += 1;
      if (days === 0) {
        fromIndex += 1;
        if (hrs === 0) {
          fromIndex += 1;
          if (mins === 0) {
            fromIndex += 1;
            if (secs === 0) {
              fromIndex += 1;
            }
          }
        }
      }
    }
  }

  const toIndex = Math.max(fromIndex + maxUnits, 1);
  return durationChunks.slice(fromIndex, toIndex).join(", ");

}
