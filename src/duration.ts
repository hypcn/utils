
/**
 * Pre-calculated list of units and bounds for prettyRelativeTimestamp()
 */
const relativeTimestampUnits = (() => {

  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;

  const units = [
    { max: 30 * SECOND, divisor: 1, past1: 'just now', pastN: 'just now', future1: 'just now', futureN: 'just now' },
    { max: MINUTE, divisor: SECOND, past1: 'a second ago', pastN: '# seconds ago', future1: 'in a second', futureN: 'in # seconds' },
    { max: HOUR, divisor: MINUTE, past1: 'a minute ago', pastN: '# minutes ago', future1: 'in a minute', futureN: 'in # minutes' },
    { max: DAY, divisor: HOUR, past1: 'an hour ago', pastN: '# hours ago', future1: 'in an hour', futureN: 'in # hours' },
    { max: WEEK, divisor: DAY, past1: 'yesterday', pastN: '# days ago', future1: 'tomorrow', futureN: 'in # days' },
    { max: 4 * WEEK, divisor: WEEK, past1: 'last week', pastN: '# weeks ago', future1: 'in a week', futureN: 'in # weeks' },
    { max: YEAR, divisor: MONTH, past1: 'last month', pastN: '# months ago', future1: 'in a month', futureN: 'in # months' },
    { max: 100 * YEAR, divisor: YEAR, past1: 'last year', pastN: '# years ago', future1: 'in a year', futureN: 'in # years' },
    { max: 1000 * YEAR, divisor: 100 * YEAR, past1: 'last century', pastN: '# centuries ago', future1: 'in a century', futureN: 'in # centuries' },
    { max: Infinity, divisor: 1000 * YEAR, past1: 'last millennium', pastN: '# millennia ago', future1: 'in a millennium', futureN: 'in # millennia' },
  ];
  return units;

})();

/**
 * Human-readable relative time of one Date to another Date, for example: "just now", "3 hours ago", "in 2 days".
 * 
 * If the `relativeTo` Date is omitted, the current time is used.
 * @param timestamp A Date object, timestamp or string parsable with Date.parse()
 * @param relativeTo A Date object, timestamp or string parsable with Date.parse(). If omitted, the current time is used
 * @return {string} Human readable elapsed or remaining time
 * @see https://stackoverflow.com/a/67338038/938822
 */
export function prettyRelativeTime(timestamp: Date | number | string, relativeTo: Date | number | string = new Date()) {

  const relativeToMs = (typeof relativeTo === "object" ? relativeTo : new Date(relativeTo)).valueOf();
  const timestampMs = (typeof timestamp === 'object' ? timestamp : new Date(timestamp)).getTime()
  const delta = relativeToMs - timestampMs;
  const deltaAbs = Math.abs(delta);

  for (const unit of relativeTimestampUnits) {
    if (deltaAbs < unit.max) {
      const isFuture = delta < 0;
      const x = Math.round(Math.abs(delta) / unit.divisor);
      if (x <= 1) return isFuture ? unit.future1 : unit.past1;
      return (isFuture ? unit.futureN : unit.pastN).replace('#', String(x));
    }
  }

};

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
 * Format a number of milliseconds appropriately for a media player, as (H:)MM:SS:(.mmm)
 * 
 * Examples:
 * ```ts
 * (123456) -> "02:03"
 * (3599999) -> "59:59"
 * (3661000) -> "1:01:01"
 * (123456, true) -> "02:03.456"
 * (-123456) -> "-02:03"
 * (-123456, true) -> "-02:03.456"
 * ```
 * @param ms 
 * @param includeMillis 
 * @returns 
 */
export function millisToMedia(ms: number, includeMillis: boolean = false): string {
  if (ms === undefined || ms === null) ms = 0;
  const isNegative = ms < 0;
  ms = Math.abs(ms);

  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const millisRemaining = ms % 1000;

  const hoursStr = hours > 0 ? `${hours.toString()}:` : '';
  const minutesStr = minutes.toString().padStart(2, '0');
  const secondsStr = seconds.toString().padStart(2, '0');
  const millisecondsStr = (includeMillis === true) ? `.${millisRemaining.toString().padStart(3, '0')}` : '';
  const sign = isNegative ? "-" : "";

  return `${sign}${hoursStr}${minutesStr}:${secondsStr}${millisecondsStr}`;
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
