import { timestampToDate, timestampToDateUTC } from "../src";

describe("timestampToDate", () => {

  it("returns a date string", () => {
    expect(timestampToDate(1679051024444)).toBe("2023-03-17");
  });

});

describe("timestampToDateUTC", () => {

  it("returns a date string", () => {
    expect(timestampToDateUTC(1679051024444)).toBe("2023-03-17");
  });

});
