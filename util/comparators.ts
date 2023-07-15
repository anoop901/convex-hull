export function compareByNumber<T>(fn: (arg: T) => number) {
  return (a: T, b: T): number => fn(a) - fn(b);
}

export function compareByString<T>(fn: (arg: T) => string) {
  return (a: T, b: T): number => (fn(a) === fn(b) ? 0 : fn(a) > fn(b) ? 1 : -1);
}

export function compareInOrder<T>(...comparators: ((a: T, b: T) => number)[]) {
  return (a: T, b: T): number => {
    for (const comparator of comparators) {
      const result = comparator(a, b);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  };
}

export function reverse<T>(comparator: (a: T, b: T) => number) {
  return (a: T, b: T): number => {
    return -comparator(a, b);
  };
}
