import { millisTo24Hour } from "../src";

describe("millisTo24Hour", () => {

  it("converts minutes", () => {
    expect(millisTo24Hour(1234567)).toBe("00:21");
  });

  it("converts minutes rounding up", () => {
    expect(millisTo24Hour(1234567, { roundUp: true })).toBe("00:21");
  });

  it("converts minutes rounding down", () => {
    expect(millisTo24Hour(1234567, { roundUp: false })).toBe("00:20");
  });

  it("converts hours and minutes", () => {
    expect(millisTo24Hour(123456789)).toBe("10:18");
  });

  it("converts hours and minutes rounding up", () => {
    expect(millisTo24Hour(123456789, { roundUp: true })).toBe("10:18");
  });

  it("converts hours and minutes rounding down", () => {
    expect(millisTo24Hour(123456789, { roundUp: false })).toBe("10:17");
  });

  it("handles negative values", () => {
    expect(millisTo24Hour(-123456789)).toBe("13:42");
  });

  it("handles values greater than 24 hours", () => {
    expect(millisTo24Hour(12345678912345)).toBe("19:15");
  });

});
