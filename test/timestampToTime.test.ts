import { timestampToTime, timestampToTimeUTC } from "../src";

describe("timestampToTime", () => {

  it("returns a time string", () => {
    expect(timestampToTime(1679051024444)).toBe("11:03:44");
  });

  it("can ignore seconds", () => {
    expect(timestampToTime(1679051024444, { secs: false })).toBe("11:03");
  });

});

describe("timestampToTimeUTC", () => {

  it("returns a time string", () => {
    expect(timestampToTimeUTC(1679051024444)).toBe("11:03:44");
  });

  it("can ignore seconds", () => {
    expect(timestampToTimeUTC(1679051024444, { secs: false })).toBe("11:03");
  });

});
