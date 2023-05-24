import { dateToDateStr, dateToDateStrUTC } from "../src";

describe("dateToDateStr", () => {

  it("returns a date string", () => {
    expect(dateToDateStr(new Date("2023-03-17T11:03:44.444Z"))).toBe("2023-03-17");
  });

  it("returns empty string for undefined date", () => {
    expect(dateToDateStr(undefined!)).toBe("");
  });

});

describe("dateToDateStrUTC", () => {

  it("returns a date string", () => {
    expect(dateToDateStrUTC(new Date("2023-03-17T11:03:44.444Z"))).toBe("2023-03-17");
  });

  it("returns empty string for undefined date", () => {
    expect(dateToDateStrUTC(undefined!)).toBe("");
  });

});