import { millisToPrettyDuration } from "../src";

describe("millisToPrettyDuration", () => {

  it("converts seconds", () => {
    expect(millisToPrettyDuration(12345)).toBe("12 secs, 345 ms");
  });

  it("converts minutes", () => {
    expect(millisToPrettyDuration(1234567)).toBe("20 mins, 34 secs");
  });

  it("converts days", () => {
    expect(millisToPrettyDuration(123456789)).toBe("1 day, 10 hours");
  });

  it("converts months", () => {
    expect(millisToPrettyDuration(9876543210)).toBe("3 months, 24 days");
  });

  it("displays 4 different units", () => {
    expect(millisToPrettyDuration(9876543210, 4)).toBe("3 months, 24 days, 7 hours, 29 mins");
  });

  it("omits unnecessary units", () => {
    expect(millisToPrettyDuration(123456, 4)).toBe("2 mins, 3 secs, 456 ms");
  });

});
