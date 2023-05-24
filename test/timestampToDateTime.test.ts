import { timestampToDateTime, timestampToDateTimeUTC } from "../src";

describe("timestampToDateTime", () => {

  it("returns a time string", () => {
    expect(timestampToDateTime(1679051024444)).toBe("2023-03-17 11:03:44");
  });

  it("can ignore seconds", () => {
    expect(timestampToDateTime(1679051024444, { secs: false })).toBe("2023-03-17 11:03");
  });

});

describe("timestampToDateTimeUTC", () => {

  it("returns a time string", () => {
    expect(timestampToDateTimeUTC(1679051024444)).toBe("2023-03-17 11:03:44");
  });

  it("can ignore seconds", () => {
    expect(timestampToDateTimeUTC(1679051024444, { secs: false })).toBe("2023-03-17 11:03");
  });

});
