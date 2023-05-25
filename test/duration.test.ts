import { millisTo24Hour, millisToPrettyDuration, prettyRelativeTime } from "../src";

describe("Duration functions", () => {

  describe("prettyRelativeTime", () => {

    it("handles 'just now'", () => {
      const now = Date.now();
      expect(prettyRelativeTime(now - 100)).toBe("just now");
      expect(prettyRelativeTime(now - 10_000)).toBe("just now");
      expect(prettyRelativeTime(now + 100)).toBe("just now");
      expect(prettyRelativeTime(now + 10_000)).toBe("just now");
    });

    it("handles seconds", () => {
      const now = Date.now();
      expect(prettyRelativeTime(now - 50_000)).toBe("50 seconds ago");
      expect(prettyRelativeTime(now + 50_000)).toBe("in 50 seconds");
    });

    it("handles minutes", () => {
      const now = Date.now();
      expect(prettyRelativeTime(now - 1 * 61 * 1000)).toBe("a minute ago");
      expect(prettyRelativeTime(now + 1 * 61 * 1000)).toBe("in a minute");
      expect(prettyRelativeTime(now - 5 * 61 * 1000)).toBe("5 minutes ago");
      expect(prettyRelativeTime(now + 5 * 61 * 1000)).toBe("in 5 minutes");
    });

    it("handles hours", () => {
      const now = Date.now();
      expect(prettyRelativeTime(now - 1 * 61 * 60 * 1000)).toBe("an hour ago");
      expect(prettyRelativeTime(now + 1 * 61 * 60 * 1000)).toBe("in an hour");
      expect(prettyRelativeTime(now - 5 * 61 * 60 * 1000)).toBe("5 hours ago");
      expect(prettyRelativeTime(now + 5 * 61 * 60 * 1000)).toBe("in 5 hours");
    });

    it("handles days", () => {
      const now = Date.now();
      expect(prettyRelativeTime(now - 1 * 24.1 * 60 * 60 * 1000)).toBe("yesterday");
      expect(prettyRelativeTime(now + 1 * 24.1 * 60 * 60 * 1000)).toBe("tomorrow");
      expect(prettyRelativeTime(now - 5 * 24.1 * 60 * 60 * 1000)).toBe("5 days ago");
      expect(prettyRelativeTime(now + 5 * 24.1 * 60 * 60 * 1000)).toBe("in 5 days");
    });

    it("handles weeks", () => {
      const now = Date.now();
      expect(prettyRelativeTime(now - 1 * 7.1 * 24 * 60 * 60 * 1000)).toBe("last week");
      expect(prettyRelativeTime(now + 1 * 7.1 * 24 * 60 * 60 * 1000)).toBe("in a week");
      expect(prettyRelativeTime(now - 3 * 7.1 * 24 * 60 * 60 * 1000)).toBe("3 weeks ago");
      expect(prettyRelativeTime(now + 3 * 7.1 * 24 * 60 * 60 * 1000)).toBe("in 3 weeks");
    });

    it("handles months", () => {
      const now = Date.now();
      expect(prettyRelativeTime(now - 1 * 31 * 24 * 60 * 60 * 1000)).toBe("last month");
      expect(prettyRelativeTime(now + 1 * 31 * 24 * 60 * 60 * 1000)).toBe("in a month");
      expect(prettyRelativeTime(now - 5 * 31 * 24 * 60 * 60 * 1000)).toBe("5 months ago");
      expect(prettyRelativeTime(now + 5 * 31 * 24 * 60 * 60 * 1000)).toBe("in 5 months");
    });

    it("handles years", () => {
      const now = Date.now();
      expect(prettyRelativeTime(now - 1 * 366 * 24 * 60 * 60 * 1000)).toBe("last year");
      expect(prettyRelativeTime(now + 1 * 366 * 24 * 60 * 60 * 1000)).toBe("in a year");
      expect(prettyRelativeTime(now - 5 * 366 * 24 * 60 * 60 * 1000)).toBe("5 years ago");
      expect(prettyRelativeTime(now + 5 * 366 * 24 * 60 * 60 * 1000)).toBe("in 5 years");
    });

    it("handles centuries", () => {
      const now = Date.now();
      expect(prettyRelativeTime(now - 1 * 101 * 365 * 24 * 60 * 60 * 1000)).toBe("last century");
      expect(prettyRelativeTime(now + 1 * 101 * 365 * 24 * 60 * 60 * 1000)).toBe("in a century");
      expect(prettyRelativeTime(now - 5 * 101 * 365 * 24 * 60 * 60 * 1000)).toBe("5 centuries ago");
      expect(prettyRelativeTime(now + 5 * 101 * 365 * 24 * 60 * 60 * 1000)).toBe("in 5 centuries");
    });

    it("handles millenia", () => {
      const now = Date.now();
      expect(prettyRelativeTime(now - 1 * 1001 * 365 * 24 * 60 * 60 * 1000)).toBe("last millennium");
      expect(prettyRelativeTime(now + 1 * 1001 * 365 * 24 * 60 * 60 * 1000)).toBe("in a millennium");
      expect(prettyRelativeTime(now - 5 * 1001 * 365 * 24 * 60 * 60 * 1000)).toBe("5 millennia ago");
      expect(prettyRelativeTime(now + 5 * 1001 * 365 * 24 * 60 * 60 * 1000)).toBe("in 5 millennia");
    });

    it("handles different date types", () => {
      const fiveDaysAgo = Date.now() - (5 * 24 * 60 * 60 * 1000);
      expect(prettyRelativeTime(fiveDaysAgo)).toBe("5 days ago");
      expect(prettyRelativeTime(new Date(fiveDaysAgo))).toBe("5 days ago");
      expect(prettyRelativeTime(new Date(fiveDaysAgo).toISOString())).toBe("5 days ago");
    });

    it("can use the relativeTo argument", () => {
      expect(prettyRelativeTime(new Date("2020-01-31"), new Date("2020-02-01"))).toBe("yesterday");
      expect(prettyRelativeTime(new Date("2020-02-02"), new Date("2020-02-01"))).toBe("tomorrow");
      expect(prettyRelativeTime(new Date("2020-01-25"), new Date("2020-02-01"))).toBe("last week");
      expect(prettyRelativeTime(new Date("2020-01-02"), new Date("2020-02-01"))).toBe("last month");
      expect(prettyRelativeTime(0, 10_000)).toBe("just now");
    });

  });

  describe("millisTo24Hour", () => {

    it("converts minutes", () => {
      expect(millisTo24Hour(1234567)).toBe("00:21");
      expect(millisTo24Hour(1234567, { roundUp: true })).toBe("00:21");
      expect(millisTo24Hour(1234567, { roundUp: false })).toBe("00:20");
    });

    it("converts hours and minutes", () => {
      expect(millisTo24Hour(123456789)).toBe("10:18");
      expect(millisTo24Hour(123456789, { roundUp: true })).toBe("10:18");
      expect(millisTo24Hour(123456789, { roundUp: false })).toBe("10:17");
    });

    it("handles negative values", () => {
      expect(millisTo24Hour(-123456789)).toBe("13:42");
    });

    it("handles values greater than 24 hours", () => {
      expect(millisTo24Hour(12345678912345)).toBe("19:15");
    });

  });

  describe("millisToPrettyDuration", () => {

    it("converts millisecond durations to pretty strings", () => {
      expect(millisToPrettyDuration(12_345)).toBe("12 secs, 345 ms");
      expect(millisToPrettyDuration(1_234_567)).toBe("20 mins, 34 secs");
      expect(millisToPrettyDuration(123_456_789)).toBe("1 day, 10 hours");
      expect(millisToPrettyDuration(9_876_543_210)).toBe("3 months, 24 days");
      expect(millisToPrettyDuration(98_765_432_101)).toBe("3 years, 2 months");
      expect(millisToPrettyDuration(3_660_000)).toBe("1 hour, 1 min");
      expect(millisToPrettyDuration(1_001)).toBe("1 sec, 1 ms");
      expect(millisToPrettyDuration(31_104_000_000 + 2_592_000_000)).toBe("1 year, 1 month"); // 1 year + 1 month
    });

    it("handles the specified number of different units correctly", () => {
      expect(millisToPrettyDuration(9_876_543_210, 4)).toBe("3 months, 24 days, 7 hours, 29 mins");
      expect(millisToPrettyDuration(123_456, 4)).toBe("2 mins, 3 secs, 456 ms");
    });

    it("handles undefined milliseconds parameter", () => {
      expect(millisToPrettyDuration(undefined!)).toBe("0 ms");
    });

  });

});
