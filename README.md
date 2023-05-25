
# Utils

Utility and formatting functions with no dependencies.

![npm (scoped)](https://img.shields.io/npm/v/@hypericon/utils)

```bash
npm i @hypericon/utils
```

# Usage

- [Misc](#misc)
- [Numbers](#numbers)
- [Dates & Times](#dates_times)
- [Durations](#durations)

## Misc

```typescript
import { dereference, wait, isObject, mergeDeep } from "@hypericon/utils";

const o = { an: "object" };
const d = dereference(o);
console.log(d); // { an: "object" }
console.log(o === d); // false
console.log(dereference(undefined)); // undefined

async func() {
  await wait(2000); // waits for 2,000 ms
}

isObject(undefined); // false
isObject("dog"); // false
isObject(null); // false
isObject([1, 2, 3]); // false
isObject({ an: "object" }); // true

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
```

## Numbers

```typescript
import { clamp, numberToSigFigs, numberToSigFigsSI } from "@hypericon/utils";

clamp(-12, 100, 200); // 100

numberToSigFigs(3579); // 3580
numberToSigFigs(3579, 2); // 3600
numberToSigFigs(undefined); // undefined

numberToSigFigsSI(123456); // "123k"
numberToSigFigsSI(12345678); // "12.3M"
numberToSigFigsSI(0.000123, 2); // "120µ"
numberToSigFigsSI(undefined); // undefined
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
import { millisTo24Hour, millisToPrettyDuration } from "@hypericon/utils";

millisTo24Hour(123456789); // "10:18"
millisTo24Hour(-123456789); // "13:42"
millisTo24Hour(12345678912345); // "19:15"

millisToPrettyDuration(12345); // "12 secs, 345 ms"
millisToPrettyDuration(1234567); // "20 mins, 34 secs"
millisToPrettyDuration(123456789); // "1 day, 10 hours"
millisToPrettyDuration(9876543210); // "3 months, 24 days"
millisToPrettyDuration(9876543210, 4); // "3 months, 24 days, 7 hours, 29 mins"
millisToPrettyDuration(123456, 4); // "2 mins, 3 secs, 456 ms"
```
