import { dateToTime, dateToTimeUTC } from "../src";

describe("dateToTime", () => {

  it("returns a time string", () => {
    expect(dateToTime(new Date("2023-03-17T11:03:44.444Z"))).toBe("11:03:44");
  });

  it("can ignore seconds", () => {
    expect(dateToTime(new Date("2023-03-17T11:03:44.444Z"), { secs: false })).toBe("11:03");
  });

  it("returns empty string for undefined date", () => {
    expect(dateToTime(undefined!)).toBe("");
  });

});

describe("dateToTimeUTC", () => {

  it("returns a time string", () => {
    expect(dateToTimeUTC(new Date("2023-03-17T11:03:44.444Z"))).toBe("11:03:44");
  });

  it("can ignore seconds", () => {
    expect(dateToTimeUTC(new Date("2023-03-17T11:03:44.444Z"), { secs: false })).toBe("11:03");
  });

  it("returns empty string for undefined date", () => {
    expect(dateToTimeUTC(undefined!)).toBe("");
  });

});