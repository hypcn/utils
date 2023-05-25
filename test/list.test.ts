import { collapseDuplicates, deduplicate, findDuplicates, sortByKeyFn } from "../src";

describe("Misc functions", () => {

  describe("deduplicate", () => {

    it("deduplicates a list", async () => {
      expect(deduplicate([1, 2, 2, 3, 3, 3, 4, 4, 4, 4])).toMatchObject([1, 2, 3, 4]);
    });

  });

  describe("sortByKeyFn", () => {

    it("builds a sort function", () => {
      const list = [
        { name: "Adam" },
        { name: "Charlie" },
        { name: "Brian" },
      ];
      list.sort(sortByKeyFn("name"));

      expect(list).toMatchObject([
        { name: "Adam" },
        { name: "Brian" },
        { name: "Charlie" },
      ]);
    });

    it("builds a sort function explicitly ascending", () => {
      const list = [
        { name: "Adam" },
        { name: "Charlie" },
        { name: "Brian" },
      ];
      list.sort(sortByKeyFn("name", "asc"));

      expect(list).toMatchObject([
        { name: "Adam" },
        { name: "Brian" },
        { name: "Charlie" },
      ]);
    });

    it("builds a sort function descending", () => {
      const list = [
        { name: "Adam" },
        { name: "Charlie" },
        { name: "Brian" },
      ];
      list.sort(sortByKeyFn("name", "desc"));

      expect(list).toMatchObject([
        { name: "Charlie" },
        { name: "Brian" },
        { name: "Adam" },
      ]);
    });

  });

  describe("findDuplicates", () => {

    it("finds duplicates", () => {
      expect(findDuplicates([1, 2, 2, 3, 4, 4, 4])).toMatchObject([2, 4]);
      expect(findDuplicates([1, 2, 2, undefined, undefined])).toMatchObject([2, undefined]);
    });

    it("accepts a custom comparison function", () => {
      const list = [
        { name: "Dave" },
        { name: "davE" },
        { name: "Brian" },
      ];
      const comparisonFn = (a: { name: string }, b: { name: string }) => {
        return a.name.toLowerCase() === b.name.toLowerCase();
      };
      expect(findDuplicates(list, comparisonFn)).toMatchObject([{ name: "Dave" }]);
    });

  });

  describe("collapseDuplicates", () => {

    it("collapses duplicates", () => {
      expect(collapseDuplicates([2, 2, 2, 1, 3, 3])).toMatchObject([
        { item: 2, count: 3 },
        { item: 1, count: 1 },
        { item: 3, count: 2 },
      ]);
    });

    it("accepts a custom comparison function", () => {
      const list = [
        { name: "Dave" },
        { name: "davE" },
        { name: "Brian" },
      ];
      const comparisonFn = (a: { name: string }, b: { name: string }) => {
        return a.name.toLowerCase() === b.name.toLowerCase();
      };
      expect(collapseDuplicates(list, comparisonFn)).toMatchObject([
        { item: { name: "Dave" }, count: 2 },
        { item: { name: "Brian" }, count: 1 },
      ]);
    });

  });

});
