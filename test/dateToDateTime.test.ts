import { dateToDateTime, dateToDateTimeUTC } from "../src";

describe("dateToDateTime", () => {

  it("returns a date-time string", () => {
    expect(dateToDateTime(new Date("2023-03-17T11:03:44.444Z"))).toBe("2023-03-17 11:03:44");
  });

  it("can ignore seconds", () => {
    expect(dateToDateTime(new Date("2023-03-17T11:03:44.444Z"), { secs: false })).toBe("2023-03-17 11:03");
  });

  it("returns empty string for undefined date", () => {
    expect(dateToDateTime(undefined!)).toBe("");
  });

});

describe("dateToDateTimeUTC", () => {

  it("returns a date-time string", () => {
    expect(dateToDateTimeUTC(new Date("2023-03-17T11:03:44.444Z"))).toBe("2023-03-17 11:03:44");
  });

  it("can ignore seconds", () => {
    expect(dateToDateTimeUTC(new Date("2023-03-17T11:03:44.444Z"), { secs: false })).toBe("2023-03-17 11:03");
  });

  it("returns empty string for undefined date", () => {
    expect(dateToDateTimeUTC(undefined!)).toBe("");
  });

});