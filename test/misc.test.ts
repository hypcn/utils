import { dereference, wait } from "../src";

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

});
