import chain from "./chain";

export function drop<T>(n: number) {
  return function* (iterable: Iterable<T>): Generator<T> {
    const iter = iterable[Symbol.iterator]();
    for (let i = 0; i < n; i++) {
      iter.next();
    }
    let { value, done } = iter.next();
    while (!done) {
      yield value;
      ({ value, done } = iter.next());
    }
  };
}

export function* zip<T, U>(
  firstIterable: Iterable<T>,
  secondIterable: Iterable<U>
): Generator<{ first: T; second: U }> {
  const firstIterator = firstIterable[Symbol.iterator]();
  const secondIterator = secondIterable[Symbol.iterator]();
  while (true) {
    const { done: firstDone, value: first } = firstIterator.next();
    const { done: secondDone, value: second } = secondIterator.next();
    if (!firstDone && !secondDone) {
      yield { first, second };
    } else {
      break;
    }
  }
}

export function pairs<T>(offset = 1) {
  return (iterable: Iterable<T>): Iterable<{ first: T; second: T }> =>
    chain(zip(iterable, drop<T>(offset)(iterable))).end();
}

export function map<T, U>(fn: (arg: T) => U) {
  return function* (iterable: Iterable<T>): Generator<U> {
    for (const t of iterable) {
      yield fn(t);
    }
  };
}

export function reduce<T>(fn: (a: T, b: T) => T) {
  return (iterable: Iterable<T>): T => {
    const iterator = iterable[Symbol.iterator]();
    const firstIteratorResult = iterator.next();
    if (firstIteratorResult.done) {
      throw new Error("cannot reduce empty iterable");
    }

    let result = firstIteratorResult.value;
    let { value, done } = iterator.next();
    while (!done) {
      result = fn(result, value);
      ({ value, done } = iterator.next());
    }
    return result;
  };
}

export function min<T>(
  comparator: (a: T, b: T) => number
): (iterable: Iterable<T>) => T {
  return reduce<T>((a, b) => (comparator(b, a) < 0 ? b : a));
}

export function minBy<T, U>(fn: (arg: T) => U): (iterable: Iterable<T>) => T {
  return reduce<T>((a, b) => (fn(b) < fn(a) ? b : a));
}

export function maxBy<T, U>(fn: (arg: T) => U): (iterable: Iterable<T>) => T {
  return reduce<T>((a, b) => (fn(b) > fn(a) ? b : a));
}

export function enumerate<T>(
  iterable: Iterable<T>
): Iterable<{ index: number; value: T }> {
  return chain(zip(iterable, allIntegersStartingAt()))
    .then(map(({ first, second }) => ({ index: second, value: first })))
    .end();
}

export function* allIntegersStartingAt(start = 0): Generator<number> {
  for (let n = start; true; n++) {
    yield n;
  }
}

export function findFirstMatching<T>(pred: (arg: T) => boolean) {
  return (iterable: Iterable<T>): T | null => {
    for (const value of iterable) {
      if (pred(value)) {
        return value;
      }
    }
    return null;
  };
}

export function allMatch<T>(pred: (t: T) => boolean) {
  return (iterable: Iterable<T>): boolean => {
    return chain(iterable)
      .then(map(pred))
      .then(fold(true, (a, b) => a && b))
      .end();
  };
}

export function fold<A, T>(initial: A, fn: (acc: A, x: T) => A) {
  return (iterable: Iterable<T>): A => {
    let result = initial;
    for (const t of iterable) {
      result = fn(result, t);
    }
    return result;
  };
}

export function filter<T>(pred: (arg: T) => boolean) {
  return function* (iterable: Iterable<T>): Generator<T> {
    for (const t of iterable) {
      if (pred(t)) {
        yield t;
      }
    }
  };
}

export function* iterate<T>(initial: T, fn: (arg: T) => T): Generator<T> {
  let current = initial;
  while (true) {
    yield current;
    current = fn(current);
  }
}
