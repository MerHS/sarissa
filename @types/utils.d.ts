// I used the term 'binaryFind' instead of 'binarySearch' because it's shorter :)

interface Array<T> {
    /**
     * Returns the index of element **less or equal than** `item` from the sorted generic list.
     *
     * @param item - The item to be found for
     * @param comparator - Comparator of the type T. should return (a - b) like value.
     * @returns The index of element less or equal than `item`.
     *          If `item` is smaller than the mimimum of this array, returns -1.
     */
    binaryFindIndex<T>(item: T, comparator: (a: T, b: T) => number): number;

    /**
     * Returns an element **less or equal than** `item` from the sorted generic list.
     *
     * @param item - The item to be found for
     * @param comparator - Comparator of the type T. should return (a - b) like value.
     * @returns The element less or equal than `item`.
     *          If `item` is smaller than the mimimum of this array, returns undefined.
     */
    binaryFind<T>(item:T, comparator: (a: T, b: T) => number): T | undefined;

    /**
     * `binaryFindIndex<T>` for `number[]`.
     *
     * @param item - The item to be found for
     * @returns The index of element less or equal than `item`.
     *          If `item` is smaller than the mimimum of this array, returns -1.
     */
    binaryFindIndexN(item: number): number;

    /**
     * `binaryFind<T>` for `number[]`.
     *
     * @param item - The item to be found for
     * @returns The element less or equal than `item`.
     *          If `item` is smaller than the mimimum of this array, returns undefined.
     */
    binaryFindN(item: number): number | undefined;
}