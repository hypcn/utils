
/**
 * Simple typed deduplication of a list using a Set
 * @param list 
 */
export function deduplicate<T>(list: T[]): T[] {
  return [...new Set(list)];
}

/**
 * Build a sort function that naiively sorts by the given key on each object (using < and >)
 * @param key 
 * @param direction 
 * @returns 
 */
export function sortByKeyFn<K extends keyof T, T = any>(key: K, direction: "asc" | "desc" = "asc"): (a: T, b: T) => number {
  if (direction === "asc") {
    return (a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  } else {
    return (a, b) => {
      if (a[key] < b[key]) return 1;
      if (a[key] > b[key]) return -1;
      return 0;
    };
  }
}

/**
 * Find the duplicate items in a given list
 * 
 * E.g. [1, 2, 2, 3, 3, 3] => [2, 3]
 * @param list The list to consider
 * @param compareFn An optional function to compare the list items, if omitted uses strict equality
 * @returns A deduplicated list of duplicate items
 */
export function findDuplicates<T>(list: T[], compareFn?: (a: T, b: T) => boolean): T[] {

  const dupes: T[] = [];
  const concreteCompareFn: (a: T, b: T) => boolean = compareFn ?? ((a: T, b: T) => a === b);

  for (let i = 0; i < list.length; i++) {
    const elem1 = list[i];
    for (let j = i + 1; j < list.length; j++) {
      const elem2 = list[j];

      // If elements are equal, and are not already in the dupes list, add one to the dupes list
      if (concreteCompareFn(elem1, elem2)) {
        if (!dupes.some(d => concreteCompareFn(d, elem1))) {
          dupes.push(elem1);
        }
      }

    }
  }

  return dupes;
}

/**
 * Collapse a given list of elements into a deduplicated list of tuples of
 * - the list item
 * - the count of the item in the list
 * 
 * The de-duplicated items are returned in the same order as their first ocurrences in the original list
 * 
 * E.g.: `[2, 2, 2, 1, 3, 3] => [{ item: 2, count: 3 }, { item: 1, count: 1 }, { item: 3, count: 2 }]`
 * @param list 
 * @param compareFn An optional function to compare elements, otherwise absolute equality is used
 * @returns 
 */
export function collapseDuplicates<T>(list: T[], compareFn?: (a: T, b: T) => boolean): { item: T, count: number }[] {

  const collapsed: { item: T, count: number }[] = [];
  const compare: (a: T, b: T) => boolean = compareFn ?? ((a: T, b: T) => a === b);

  for (let i = 0; i < list.length; i++) {
    const elem = list[i];

    const existing = collapsed.find(c => compare(c.item, elem));

    if (existing) {
      existing.count++;
    } else {
      collapsed.push({ item: elem, count: 1 });
    }
  }

  return collapsed;
}