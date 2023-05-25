import { clamp, numberToSigFigs, numberToSigFigsSI } from "../src";

describe("Number functions", () => {

  describe("clamp", () => {
    it("clamps values", () => {
      const v = 10;
      expect(clamp(v, 0, 100)).toBe(v);
      expect(clamp(-10, 0, 100)).toBe(0);
      expect(clamp(1000, 0, 100)).toBe(100);
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

  });

});
