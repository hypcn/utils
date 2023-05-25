import { dereference, isObject, mergeDeep, wait } from "../src";

describe("Misc functions", () => {

  describe("dereference", () => {

    it("dereferences objects", () => {
      const o = { an: "object" };
      const d = dereference(o);
      expect(o).not.toBe(d);
    });

    it("returns objects with the same keys", () => {
      const o = { key: "value" };
      const d = dereference(o);
      expect(o.key).toBe(d.key);
    });

    it("dereferences undefined as undefined", () => {
      expect(dereference(undefined)).toBe(undefined);
    });

    it("dereferences null as null", () => {
      expect(dereference(null)).toBe(null);
    });

  });

  describe("wait", () => {

    it("waits for the correct duration", async () => {
      let tooEarly = true;
      const duration = 500;

      setTimeout(() => {
        tooEarly = false;
      }, duration - 50);
      const tooLateTimeout = setTimeout(() => {
        throw "too late";
      }, duration + 50);

      await wait(duration);

      clearTimeout(tooLateTimeout);
      if (tooEarly) throw "too early";
      return;
    });

  });

  describe("isObject", () => {

    it("correctly identifies objects", () => {
      expect(isObject(undefined)).toBe(false);
      expect(isObject("dog")).toBe(false);
      expect(isObject(123)).toBe(false);
      expect(isObject(null)).toBe(false);
      expect(isObject([1, 2, 3])).toBe(false);
      expect(isObject({ an: "object" })).toBe(true);
    });

  });

  describe("mergeDeep", () => {

    it("correctly merges objects", () => {
      
      const target = {
        a: 1,
        b: [1,2,3],
        c: {
          d: {
            e: 1234,
          },
          f: {
            g: 2345,
          },
          h: 345,
        },
      };
      const targetCopy = dereference(target);

      const source = {
        a: 6,
        b: [6, 7, 8],
        c: {
          d: {
            e: 678,
            e2: 876,
          },
          // f <- no reference
          h: undefined,
        },
        dd: {
          ddd: 123,
        }
      };
      const sourceCopy = dereference(source);

      const result = mergeDeep(target, source);
      expect(result).toMatchObject({
        a: 6,
        b: [6, 7, 8], // array replaced
        c: {
          d: {
            e: 678,
            e2: 876,
          },
          f: {
            g: 2345,
          },
          // h <- removed
        },
        dd: {
          ddd: 123,
        },
      });

      expect(target).toMatchObject(result); // target object is changed
      expect(source).toMatchObject(sourceCopy); // source is not

    });

    it("handles undefined parameters", () => {
      expect(mergeDeep(undefined, undefined)).toBe(undefined);
      expect(mergeDeep({ an: "object" })).toMatchObject({ an: "object" });
      expect(mergeDeep({ an: "object" }, undefined)).toMatchObject({ an: "object" });
      expect(mergeDeep(undefined, { an: "object" })).toMatchObject({ an: "object" });
    });

    it("merges multiple sources", () => {
      expect(mergeDeep({ a: 1 }, { b: 2 }, { c: 3 })).toMatchObject({ a: 1, b: 2, c: 3 });
    });

  });

});
