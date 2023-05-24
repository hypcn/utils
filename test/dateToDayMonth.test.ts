import { dateToDayMonth, dateToDayMonthUTC } from "../src";

describe("dateToDayMonth", () => {

  it("returns a day-month string", () => {
    expect(dateToDayMonth(new Date("2023-03-17T11:03:44.444Z"))).toBe("17 Mar");
  });

  it("returns empty string for undefined date", () => {
    expect(dateToDayMonth(undefined!)).toBe("");
  });

});

describe("dateToDayMonthUTC", () => {

  it("returns a day-month string", () => {
    expect(dateToDayMonthUTC(new Date("2023-03-17T11:03:44.444Z"))).toBe("17 Mar");
  });

  it("returns empty string for undefined date", () => {
    expect(dateToDayMonthUTC(undefined!)).toBe("");
  });

});