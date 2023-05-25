import { clamp, numberToBytes, numberToSigFigs, numberToSigFigsSI, randomIntRange, randomRange, ratioToPercentage, sum } from "../src";

describe("Number functions", () => {

  describe("clamp", () => {
    it("clamps values", () => {
      const v = 10;
      expect(clamp(v, 0, 100)).toBe(v);
      expect(clamp(-10, 0, 100)).toBe(0);
      expect(clamp(1000, 0, 100)).toBe(100);
    });
  });

  describe("sum", () => {
    it("find the sum of values", () => {
      expect(sum(1, 2, 3)).toBe(6);
      expect(sum()).toBe(0);
    });
    it("handles incorrect parameters", () => {
      expect(sum(undefined, null, NaN, 5)).toBe(5);
    });
  });

  describe("numberToSigFigs", () => {

    it("formats numbers to the given number of sig figs", () => {
      expect(numberToSigFigs(123456, 4)).toBe(123500);
      expect(numberToSigFigs(159, 2)).toBe(160);
      expect(numberToSigFigs(1.2345, 3)).toBe(1.23);
      expect(numberToSigFigs(0.00123, 2)).toBe(0.0012);
      expect(numberToSigFigs(-123456, 4)).toBe(-123500);
    });

    it("returns undefined", () => {
      expect(numberToSigFigs(undefined)).toBe(undefined);
    });

  });

  describe("numberToSigFigsSI", () => {

    it("formats number as a string with the correct sig figs and SI suffix", () => {
      expect(numberToSigFigsSI(123456, 4)).toBe("123.5k");
      expect(numberToSigFigsSI(123, 2)).toBe("120");
      expect(numberToSigFigsSI(1.23, 3)).toBe("1.23");
      expect(numberToSigFigsSI(0.00123, 2)).toBe("1.2m");
      expect(numberToSigFigsSI(0.000123, 2)).toBe("120µ");
      expect(numberToSigFigsSI(123000000, 3)).toBe("123M");
      expect(numberToSigFigsSI(-123456, 4)).toBe("-123.5k");
      expect(numberToSigFigsSI(9876543210, 5)).toBe("9.8765G");
      expect(numberToSigFigsSI(1e-9, 2)).toBe("1.0n");
      expect(numberToSigFigsSI(1e-12, 1)).toBe("1p");
      expect(numberToSigFigsSI(1e15, 3)).toBe("1.00P");
    });

    it("returns undefined for undefined input", () => {
      expect(numberToSigFigsSI(undefined)).toBe("undefined");
    });

    it("ignores values larger than 1e15", () => {
      expect(numberToSigFigsSI(1e30)).toBe(1e30.toString());
    });

  });

  describe("ratioToPercentage", () => {

    it("converts ratios to percentages", () => {
      expect(ratioToPercentage(0.12)).toBe("12");
      expect(ratioToPercentage(-0.12)).toBe("-12");
      expect(ratioToPercentage(1.2)).toBe("120");
      expect(ratioToPercentage(0)).toBe("0");
      expect(ratioToPercentage(1)).toBe("100");
      expect(ratioToPercentage(0.1234)).toBe("12");
    });

    it("formats decimal places", () => {
      expect(ratioToPercentage(0.12, 2)).toBe("12.00");
      expect(ratioToPercentage(0, 2)).toBe("0.00");
      expect(ratioToPercentage(1, 3)).toBe("100.000");
      expect(ratioToPercentage(0.55555, 2)).toBe("55.55"); // uses toFixed
    });

  });

  describe("numberToBytes", () => {

    it("formats a number as bytes", () => {
      expect(numberToBytes(0)).toBe("0 Bytes");
      expect(numberToBytes(120)).toBe("120 Bytes");
      expect(numberToBytes(120_000)).toBe("117 kB");
      expect(numberToBytes(120_000_000)).toBe("114 MB");
      expect(numberToBytes(120_000_000_000)).toBe("112 GB");
      expect(numberToBytes(120_000_000_000_000)).toBe("109 TB");
      expect(numberToBytes(120_000_000_000_000_000)).toBe("107 PB");
      expect(numberToBytes(120_000_000_000_000_000_000)).toBe("104 EB");
      expect(numberToBytes(120_000_000_000_000_000_000_000)).toBe("102 ZB");
      expect(numberToBytes(120_000_000_000_000_000_000_000_000)).toBe("99 YB");
    });

    it("handles invalid input", () => {
      expect(numberToBytes(undefined!)).toBe("0 Bytes");
      expect(numberToBytes(null!)).toBe("0 Bytes");
    });

    it("formats decimal places", () => {
      expect(numberToBytes(120_000, { decimals: 1 })).toBe("117.2 kB");
      expect(numberToBytes(120_000, { decimals: 2 })).toBe("117.19 kB");
      expect(numberToBytes(120_000, { decimals: 3 })).toBe("117.188 kB");
      expect(numberToBytes(120_000, { decimals: 4 })).toBe("117.1875 kB");
      expect(numberToBytes(121_000, { decimals: 5 })).toBe("118.16406 kB");
    });

    it("can use 10^3 instead of 2^10", () => {
      expect(numberToBytes(120_000, { tenCubed: true })).toBe("120 kB");
      expect(numberToBytes(120_000_000, { tenCubed: true })).toBe("120 MB");
      expect(numberToBytes(120_000_000_000, { tenCubed: true })).toBe("120 GB");
    });

  });

  describe("randomRange", () => {

    it("generates a number", () => {
      const min = 10;
      const max = 100;
      const n = randomRange(min, max);
      expect(n).toBeGreaterThanOrEqual(min);
      expect(n).toBeLessThanOrEqual(max);
    });

  });

  describe("randomIntRange", () => {

    it("generates an integer", () => {
      const min = 10;
      const max = 100;
      const n = randomIntRange(min, max);
      expect(n).toBeGreaterThanOrEqual(min);
      expect(n).toBeLessThanOrEqual(max);
      expect(Math.round(n)).toBe(n);
    });

  });

});
