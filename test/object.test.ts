import { compareObjects, dereference, isObject, mergeDeep } from "../src";

describe("Object functions", () => {

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
        b: [1, 2, 3],
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

  describe("compareObjects", () => {

    it("handles null and undefined parameters", () => {
      expect(compareObjects(undefined, undefined)).toBe(true);
      expect(compareObjects(null, null)).toBe(true);

      expect(compareObjects({ an: "object" }, undefined)).toBe(false);
      expect(compareObjects({ an: "object" }, null)).toBe(false);
      expect(compareObjects(undefined, { an: "object" })).toBe(false);
      expect(compareObjects(null, { an: "object" })).toBe(false);
    });

    it("compares flat objects", () => {
      expect(compareObjects({ an: "object" }, { an: "object" })).toBe(true);
      expect(compareObjects({ an: "object" }, { an: "object", b: "b" })).toBe(false);

      expect(compareObjects({ key: "object" }, { key: 12345 })).toBe(false);
      expect(compareObjects({ key: 1234 }, { key: NaN })).toBe(false);

    });

    it("compares nested objects", () => {

      expect(compareObjects(
        { key: { num: 12 } },
        { key: { num: 12 } },
      )).toBe(true);

      expect(compareObjects(
        { key: { num: 12 }, key2: 34 },
        { key2: 34, key: { num: 12 } },
      )).toBe(true);

      expect(compareObjects(
        { key: { nest: { nest2: 12 } } },
        { key: { nest: { nest2: 12 } } },
      )).toBe(true);

      expect(compareObjects(
        { key: { nest: { nest2: 12 } } },
        { key: { nest: { no: 12345 } } },
      )).toBe(false);

    });

    it("compares array values", () => {

      expect(compareObjects(
        { key: [1, 2, 3] },
        { key: [1, 2, 3] },
      )).toBe(true);

      expect(compareObjects(
        { key: [1, 2, 3] },
        { key: [1, 2, 3, 4] },
      )).toBe(false);

      expect(compareObjects(
        { key: [1, 2, 3] },
        { key: [3, 2, 1] },
      )).toBe(false);

      expect(compareObjects(
        { key: [1, 2, 3] },
        { key: { "1": 1, "2": 2, "3": 3, } },
      )).toBe(false);

      expect(compareObjects(
        { key: [{ in: "array" }] },
        { key: [{ in: "array" }] },
      )).toBe(true);

    });

  });

});
