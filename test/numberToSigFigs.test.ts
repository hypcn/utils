import { numberToSigFigs, numberToSigFigsSI } from "../src";

describe("numberToSigFigs", () => {

  it("formats 123456 to 4sf", () => {
    expect(numberToSigFigs(123456, 4)).toBe(123500);
  });

  it("formats 159 to 2sf", () => {
    expect(numberToSigFigs(159, 2)).toBe(160);
  });

  it("formats 1.2345 to 3sf", () => {
    expect(numberToSigFigs(1.2345, 3)).toBe(1.23);
  });

  it("formats 0.00123 to 2sf", () => {
    expect(numberToSigFigs(0.00123, 2)).toBe(0.0012);
  });

  it("formats -123456 to 4sf", () => {
    expect(numberToSigFigs(-123456, 4)).toBe(-123500);
  });

  it("returns undefined", () => {
    expect(numberToSigFigs(undefined)).toBe(undefined);
  });

});

describe("numberToSigFigsSI", () => {

  it("formats 123456 to 4sf", () => {
    expect(numberToSigFigsSI(123456, 4)).toBe("123.5k");
  });

  it("formats 123 to 2sf", () => {
    expect(numberToSigFigsSI(123, 2)).toBe("120");
  });

  it("formats 1.23 to 3sf", () => {
    expect(numberToSigFigsSI(1.23, 3)).toBe("1.23");
  });

  it("formats 0.00123 to 2sf", () => {
    expect(numberToSigFigsSI(0.00123, 2)).toBe("1.2m");
  });

  it("formats 0.000123 to 2sf", () => {
    expect(numberToSigFigsSI(0.000123, 2)).toBe("120µ");
  });

  it("formats 123000000 to 3sf", () => {
    expect(numberToSigFigsSI(123000000, 3)).toBe("123M");
  });

  it("formats -123456 to 4sf", () => {
    expect(numberToSigFigsSI(-123456, 4)).toBe("-123.5k");
  });

  it("formats 9876543210 to 5sf", () => {
    expect(numberToSigFigsSI(9876543210, 5)).toBe("9.8765G");
  });

  it("formats 1e-9 to 2sf", () => {
    expect(numberToSigFigsSI(1e-9, 2)).toBe("1.0n");
  });

  it("formats 1e-12 to 1sf", () => {
    expect(numberToSigFigsSI(1e-12, 1)).toBe("1p");
  });

  it("formats 1e15 to 3sf", () => {
    expect(numberToSigFigsSI(1e15, 3)).toBe("1.00P");
  });

});
