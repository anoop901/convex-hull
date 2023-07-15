import {
  compareByNumber,
  compareByString,
  compareInOrder,
} from "./comparators";

describe("compareByNumber", () => {
  test("basic", () => {
    expect(
      [
        "the",
        "quick",
        "brown",
        "fox",
        "jumps",
        "over",
        "the",
        "lazy",
        "dog",
      ].sort(compareByNumber((x) => x.length))
    ).toEqual([
      "the",
      "fox",
      "the",
      "dog",
      "over",
      "lazy",
      "quick",
      "brown",
      "jumps",
    ]);
  });
});

describe("compareByString", () => {
  test("basic", () => {
    expect(
      [
        "the",
        "quick",
        "brown",
        "fox",
        "jumps",
        "over",
        "the",
        "lazy",
        "dog",
      ].sort(compareByString((x) => x))
    ).toEqual([
      "brown",
      "dog",
      "fox",
      "jumps",
      "lazy",
      "over",
      "quick",
      "the",
      "the",
    ]);
  });
});

describe("compareInOrder", () => {
  test("both comparators less", () => {
    expect(
      compareInOrder(
        compareByNumber<{ a: number; b: number }>(({ a }) => a),
        compareByNumber<{ a: number; b: number }>(({ b }) => b)
      )({ a: 3, b: 4 }, { a: 8, b: 9 })
    ).toBeLessThan(0);
  });
  test("both comparators greater", () => {
    expect(
      compareInOrder(
        compareByNumber<{ a: number; b: number }>(({ a }) => a),
        compareByNumber<{ a: number; b: number }>(({ b }) => b)
      )({ a: 8, b: 9 }, { a: 3, b: 4 })
    ).toBeGreaterThan(0);
  });
  test("first comparator greater, second comparator less", () => {
    expect(
      compareInOrder(
        compareByNumber<{ a: number; b: number }>(({ a }) => a),
        compareByNumber<{ a: number; b: number }>(({ b }) => b)
      )({ a: 4, b: 8 }, { a: 3, b: 9 })
    ).toBeGreaterThan(0);
  });
  test("first comparator equal", () => {
    expect(
      compareInOrder(
        compareByNumber<{ a: number; b: number }>(({ a }) => a),
        compareByNumber<{ a: number; b: number }>(({ b }) => b)
      )({ a: 4, b: 8 }, { a: 4, b: 9 })
    ).toBeLessThan(0);
  });
  test("both comparators equal", () => {
    expect(
      compareInOrder(
        compareByNumber<{ a: number; b: number }>(({ a }) => a),
        compareByNumber<{ a: number; b: number }>(({ b }) => b)
      )({ a: 4, b: 8 }, { a: 4, b: 8 })
    ).toBe(0);
  });
});
