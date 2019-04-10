Array.prototype.binaryFindIndex = function binaryFindIndex<T>(
  item: T, comparator: (a: T, b: T) => number,
): number {
  let start = 0;
  let end = this.length;
  let index = Math.floor((start + end) / 2);

  while (start < end) {
    const comparedValue = comparator(this[index], item);

    if (comparedValue > 0) {
      end = index;
    } else if (comparedValue < 0) {
      start = index + 1;
    } else {
      break;
    }

    index = Math.floor((start + end) / 2);
  }

  index -= 1;

  return index >= this.length ? -1 : index;
};

Array.prototype.binaryFind = function binaryFind<T>(
  item: T, comparator: (a: T, b: T) => number,
): T | undefined {
  const index = this.binaryFindIndex(item, comparator);

  return index < 0 ? undefined : this[index];
};

Array.prototype.binaryFindIndexN = function binaryFindIndexN(
  item: number,
): number {
  return this.binaryFindIndex(item, (a: number, b: number) => a - b);
};

Array.prototype.binaryFindN = function binaryFindN(
  item: number,
): number | undefined {
  return this.binaryFind(item, (a: number, b: number) => a - b);
};
