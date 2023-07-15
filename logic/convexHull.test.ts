import convexHull from "./convexHull";
import Point from "../model/Point";

describe("convexHull", () => {
  test("basic", () => {
    const points: Point[] = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 4 },
      { x: 4, y: 3 },
    ];
    const hullPoints = convexHull(points);
    expect(hullPoints).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 4, y: 3 },
      { x: 2, y: 1 },
    ]);
  });
});
