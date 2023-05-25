import { millisTo24Hour, millisToPrettyDuration } from "../src";

describe("Duration functions", () => {

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
