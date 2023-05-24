import { clamp } from "../src";

describe("clamp", () => {

  it("returns a value in the range", () => {
    const v = 10;
    expect(clamp(v, 0, 100)).toBe(v);
  });

  it("clamps a value smaller than the min", () => {
    expect(clamp(-10, 0, 100)).toBe(0);
  });

  it("clamps a value larger than the max", () => {
    expect(clamp(1000, 0, 100)).toBe(100);
  });

});
