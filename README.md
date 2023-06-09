
# Utils

Utility and formatting functions with no dependencies, for the browser and the server, with helpful type definitions*.

<small>*there are a couple of exceptions</small>

![npm (scoped)](https://img.shields.io/npm/v/@hypericon/utils)

```bash
npm i @hypericon/utils
```

# Usage

- [Misc](#misc)
- [Numbers](#numbers)
- [Dates & Times](#dates_times)
- [Durations](#durations)
- [Objects](#objects)
- [Lists](#lists)

## Misc

```typescript
import { wait } from "@hypericon/utils";

// A simple function returning a promise that resolves after the given number of milliseconds
async func() {
  await wait(2000); // waits for 2,000 ms
}
```

## Numbers

```typescript
import { clamp, sum, toNumberOrUndefined, numberToSigFigs, numberToSigFigsSI, ratioToPercentage, numberToBytes, randomRange, randomIntRange } from "@hypericon/utils";

// Clamp a value to a given range
clamp(-12, 100, 200); // 100

// Find the sum of some number, ignoring undefined, null, and NaN
sum(1, 2, 3); // 6
sum(undefined, null, NaN, 5); // 5

// Parse a value to a number, or undefined if it would be NaN
toNumberOrUndefined(12); // 12
toNumberOrUndefined("12"); // "12"
toNumberOrUndefined(null); // undefined
toNumberOrUndefined("dog"); // undefined

// Round a value to a number of significant figured (default: 3)
numberToSigFigs(3579); // 3580
numberToSigFigs(3579, 2); // 3600
numberToSigFigs(undefined); // undefined

// Convert a number to a string with a number of significant figures (default 3),
// and an appripriate SI suffix from "femto-" (10^-15) to "Peta-" (10^15)
numberToSigFigsSI(123456); // "123k"
numberToSigFigsSI(12345678); // "12.3M"
numberToSigFigsSI(0.000123, 2); // "120µ"
numberToSigFigsSI(undefined); // "undefined"

// Format a ratio as a percentage string, with an optional number of decimal places
ratioToPercentage(0.12); // "12"
ratioToPercentage(-0.12); // "-12"
ratioToPercentage(1.2); // "120"
ratioToPercentage(0.12345, 2); // "12.34"
ratioToPercentage(0.12, 3); // "12.000"

// Format a number as a number of bytes with appropriate units
numberToBytes(0); // "0 Bytes"
numberToBytes(120); // "120 Bytes"
numberToBytes(120_000); // "117 kB"
numberToBytes(120_000_000); // "114 MB"
numberToBytes(120_000_000_000); // "112 GB"
numberToBytes(120_000, { decimals: 2 }); // "117.19 kB"
numberToBytes(120_000, { tenCubed: true }); // "120 kB"

// Generate a random number in a given range
randomRange(10, 100); // e.g. 42.229661111154805
// Generate a random *integer* in a given range
randomIntRange(10, 100); // e.g. 71
```

## Dates & Times

```typescript

dateToDateStr(new Date("2023-03-17T11:03:44.444Z")); // "2023-03-17"
// see also: dateToDateStrUTC(d: Date)

dateToTime(new Date("2023-03-17T11:03:44.444Z")); // "11:03:44"
dateToTime(new Date("2023-03-17T11:03:44.444Z"), { secs: false }); // "11:03"
// see also: dateToTimeUTC(d: Date, opts?: { secs?: boolean })

dateToDateTime(new Date("2023-03-17T11:03:44.444Z")); // "2023-03-17 11:03:44"
dateToDateTime(new Date("2023-03-17T11:03:44.444Z"), { secs: false }); // "2023-03-17 11:03"
// see also: dateToDateTimeUTC(d: Date, opts?: { secs?: boolean })

dateToDayMonth(new Date("2023-03-17T11:03:44.444Z")); // "17 Mar"
// see also: dateToDayMonthUTC(d: Date)

timestampToDate(1679051024444); // "2023-03-17"
// see also: timestampToDateUTC(timestamp: number)

timestampToTime(1679051024444); // "11:03:44"
timestampToTime(1679051024444, { secs: false }); // "11:03"
// see also: timestampToTimeUTC(timestamp: number, opts?: { secs?: boolean })

timestampToDateTime(1679051024444); // "2023-03-17 11:03:44"
timestampToDateTime(1679051024444, { secs: false }); // "2023-03-17 11:03"
// see also: timestampToDateTimeUTC(timestamp: number, opts?: { secs?: boolean })

```

## Durations

```typescript
import { prettyRelativeTime, millisTo24Hour, millisToMedia, millisToPrettyDuration } from "@hypericon/utils";

// Build a display string specifying the relative time to a given Date from the current time,
// or specify another Date as the offset point of reference
const now = Date.now();
prettyRelativeTime(now - 100); // "just now"
prettyRelativeTime(now - 50_000); // "50 seconds ago"
prettyRelativeTime(now - 5 * 60 * 1000); // "5 minutes ago"
prettyRelativeTime(now - 1 * 60 * 60 * 1000); // "an hour ago"
prettyRelativeTime(now - 1 * 24 * 60 * 60 * 1000); // "yesterday"

prettyRelativeTime(new Date("2020-01-31"), new Date("2020-02-01")); // "yesterday"
prettyRelativeTime(new Date("2020-02-02"), new Date("2020-02-01")); // "tomorrow"
prettyRelativeTime(new Date("2020-01-25"), new Date("2020-02-01")); // "last week"
prettyRelativeTime(new Date("2020-01-02"), new Date("2020-02-01")); // "last month"

// Convert a number of milliseconds to a 24-hour HH:mm string
millisTo24Hour(123456789); // "10:18"
millisTo24Hour(-123456789); // "13:42"
millisTo24Hour(12345678912345); // "19:15"

// Format a number of milliseconds for a media player
millisToMedia(123456) // "02:03"
millisToMedia(3661000) // "1:01:01"
millisToMedia(123456, true) // "02:03.456"
millisToMedia(-123456) // "-02:03"
millisToMedia(-123456, true) // "-02:03.456"

// Format a number of milliseconds as a human-readable string with appropriate units. Includes up to 2 distinct units be default.
millisToPrettyDuration(12345); // "12 secs, 345 ms"
millisToPrettyDuration(1234567); // "20 mins, 34 secs"
millisToPrettyDuration(123456789); // "1 day, 10 hours"
millisToPrettyDuration(9876543210); // "3 months, 24 days"
millisToPrettyDuration(9876543210, 4); // "3 months, 24 days, 7 hours, 29 mins"
millisToPrettyDuration(123456, 4); // "2 mins, 3 secs, 456 ms"
```

## Objects

```typescript
import { dereference, isObject, mergeDeep, compareObjects } from "@hypericon/utils";

// Create a copy of an object without a reference to the original
const o = { an: "object" };
const d = dereference(o);
console.log(d); // { an: "object" }
console.log(o === d); // false
console.log(dereference(undefined)); // undefined

// Determine if a value is defined, and an object, and not an array
isObject(undefined); // false
isObject("dog"); // false
isObject(null); // false
isObject([1, 2, 3]); // false
isObject({ an: "object" }); // true

// Deeply merge two or more objects
mergeDeep({ an: "object" }, undefined); // { an: "object" }
mergeDeep(undefined, { an: "object" }); // { an: "object" }
mergeDeep({ a: 1 }, { b: 2 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
mergeDeep(
  {
    a: {
      b: 123,
      c: 456, // `c` is unchanged
    },
    r: 77,
    list: [1,2,3],
  },
  {
    a: {
      b: 222, // `b` is updated
      d: 444, // `d` is added
    },
    e: 555, // `e` is added
    r: undefined, // `r` is removed
    list: [10, 20, 30], // `list` is replaced
  },
);
// {
//   a: {
//     b: 222,
//     c: 456,
//     d: 444
//   },
//   e: 555,
//   list: [10, 20, 30],
// }

// Compare two objects deeply
compareObjects({ an: "object" }, undefined); // false
compareObjects({ an: "object" }, { an: "object" }); // true
compareObjects({ with: { nested: "keys" } }, { with: { nested: "keys" } }); // true
compareObjects({ with: { nested: "keys" } }, { with: { nested: "ERROR" } }); // false
```

## Lists

```typescript
import { deduplicate, sortByKeyFn, findDuplicates, collapseDuplicates } from "@hypericon/utils";

// Deduplicate a list using strict equality
deduplicate([1, 2, 2, 3, 3, 3]); // [1, 2, 3]

// Build a function to easily sort a list of objects by the value of a specified key
const list = [
  { name: "Adam" },
  { name: "Charlie" },
  { name: "Brian" },
];
list.sort(sortByKeyFn("name"));
// list = [
//   { name: "Adam" }
//   { name: "Brian" }
//   { name: "Charlie" }
// ];

// Find the duplicates in a list
findDuplicates([1, 2, 2, 3, 4, 4, 4]); // [2, 4]

// Optionally supply a custom comparison function
const list = [
  { name: "Dave" },
  { name: "davE" },
  { name: "Brian" },
];
const comparisonFn = (a, b) => a.name.toLowerCase() === b.name.toLowerCase();
findDuplicates(list, comparisonFn); // [{ name: "Dave" }]

// Collapse duplicate items in a list, returning the items in the original order of
// their first occurrence and the number of times they occur in the list
collapseDuplicates([2, 2, 2, 1, 3, 3]);
// [ { item: 2, count: 3 }, { item: 1, count: 1 }, { item: 3, count: 2 } ]]

// Optionally supply a custom comparison function
// (`list` and `comparisonFn` defined above)
expect(collapseDuplicates(list, comparisonFn)).toMatchObject([
  { item: { name: "Dave" }, count: 2 },
  { item: { name: "Brian" }, count: 1 },
]);
```

