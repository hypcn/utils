
const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Convert a Date to a date string
 * @example new Date("2023-03-17T11:03:44.444Z") => "2023-03-17"
 * @param d 
 * @returns 
 */
export function dateToDateStr(d: Date): string {
  if (d === undefined) return "";

  return [
    d.getFullYear().toString(),
    (d.getMonth() + 1).toString().padStart(2, "0"),
    d.getDate().toString().padStart(2, "0"),
  ].join("-");
}

/**
 * Convert a Date to a UTC date string
 * @example new Date("2023-03-17T11:03:44.444Z") => "2023-03-17"
 * @param d 
 * @returns 
 */
export function dateToDateStrUTC(d: Date): string {
  if (d === undefined) return "";

  return [
    d.getUTCFullYear().toString(),
    (d.getUTCMonth() + 1).toString().padStart(2, "0"),
    d.getUTCDate().toString().padStart(2, "0"),
  ].join("-");
}

/**
 * Convert a Date to a time string, either including seconds or not
 * @example new Date("2023-03-17T11:03:44.444Z") => "11:03:44"
 * @example new Date("2023-03-17T11:03:44.444Z"), { secs: false } => "11:03"
 * @param d 
 * @param opts 
 * @returns 
 */
export function dateToTime(d: Date, opts?: { secs?: boolean }): string {
  if (d === undefined) return "";

  return [
    d.getHours().toString().padStart(2, "0"),
    d.getMinutes().toString().padStart(2, "0"),
    opts?.secs === false ? undefined : d.getSeconds().toString().padStart(2, "0"),
  ]
    .filter(s => s !== undefined)
    .join(":");
}

/**
 * Convert a Date to a UTC time string, either including seconds or not
 * @example new Date("2023-03-17T11:03:44.444Z") => "11:03:44"
 * @example new Date("2023-03-17T11:03:44.444Z"), { secs: false } => "11:03"
 * @param d 
 * @param opts 
 * @returns 
 */
export function dateToTimeUTC(d: Date, opts?: { secs?: boolean }): string {
  if (d === undefined) return "";

  return [
    d.getUTCHours().toString().padStart(2, "0"),
    d.getUTCMinutes().toString().padStart(2, "0"),
    opts?.secs === false ? undefined : d.getUTCSeconds().toString().padStart(2, "0"),
  ]
    .filter(s => s !== undefined)
    .join(":");
}

/**
 * Convert a Date to a date-time string
 * @example new Date("2023-03-17T11:03:44.444Z") => "2023-03-17 11:03:44"
 * @param d 
 * @returns 
 */
export function dateToDateTime(d: Date, opts?: { secs?: boolean }): string {
  if (d === undefined) return "";

  return dateToDateStr(d) + " " + dateToTime(d, opts);
}

/**
 * Convert a Date to a date-time string
 * @example new Date("2023-03-17T11:03:44.444Z") => "2023-03-17 11:03:44"
 * @param d 
 * @returns 
 */
export function dateToDateTimeUTC(d: Date, opts?: { secs?: boolean }): string {
  if (d === undefined) return "";

  return dateToDateStrUTC(d) + " " + dateToTimeUTC(d, opts);
}

/**
 * Convert a Date to a date and short month string
 * @example new Date("2023-03-17T11:03:44.444Z") => "17 Mar"
 * @param d 
 * @returns 
 */
export function dateToDayMonth(d: Date): string {
  if (d === undefined) return "";

  const day = d.getDate().toString().padStart(2, "0");
  const month = SHORT_MONTHS[d.getMonth()];
  return [
    day,
    month,
  ].join(" ");
}

/**
 * Convert a Date to a UTC date and short month string
 * @example new Date("2023-03-17T11:03:44.444Z") => "17 Mar"
 * @param d 
 * @returns 
 */
export function dateToDayMonthUTC(d: Date): string {
  if (d === undefined) return "";

  const day = d.getUTCDate().toString().padStart(2, "0");
  const month = SHORT_MONTHS[d.getUTCMonth()];
  return [
    day,
    month,
  ].join(" ");
}

/**
 * Convert a milliseconds timestamp to a date string
 * @example 1679051024444 => "2023-03-17"
 * @param timestamp 
 * @returns 
 */
export function timestampToDate(timestamp: number) {
  const d = new Date(timestamp);
  return dateToDateStr(d);
}

/**
 * Convert a milliseconds timestamp to a UTC date string
 * @example 1679051024444 => "2023-03-17"
 * @param timestamp 
 * @returns 
 */
export function timestampToDateUTC(timestamp: number) {
  const d = new Date(timestamp);
  return dateToDateStrUTC(d);
}

/**
 * Convert a milliseconds timestamp to a time string
 * @example 1679051024444 => "11:03:44"
 * @param timestamp 
 * @returns 
 */
export function timestampToTime(timestamp: number, opts?: { secs?: boolean }) {
  const d = new Date(timestamp);
  return dateToTime(d, opts);
}

/**
 * Convert a milliseconds timestamp to a UTC time string
 * @example 1679051024444 => "11:03:44"
 * @param timestamp 
 * @returns 
 */
export function timestampToTimeUTC(timestamp: number, opts?: { secs?: boolean }) {
  const d = new Date(timestamp);
  return dateToTimeUTC(d, opts);
}

/**
 * Convert a milliseconds timestamp to a date-time string
 * @example 1679051024444 => "2023-03-17 11:03:44"
 * @param timestamp 
 * @returns 
 */
export function timestampToDateTime(timestamp: number, opts?: { secs?: boolean }): string {
  return dateToDateTime(new Date(timestamp), opts);
}

/**
 * Convert a milliseconds timestamp to a UTC date-time string
 * @example 1679051024444 => "2023-03-17 11:03:44"
 * @param timestamp 
 * @returns 
 */
export function timestampToDateTimeUTC(timestamp: number, opts?: { secs?: boolean }): string {
  return dateToDateTimeUTC(new Date(timestamp), opts);
}
