import { dereference } from "../src";

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


