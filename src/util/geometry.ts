import Point from "./Point";
import { crossProduct, vectorFromPoints } from "./Vector";

export function isOrientationClockwise(
  point1: Point,
  point2: Point,
  point3: Point
): boolean {
  return (
    crossProduct(
      vectorFromPoints(point1, point2),
      vectorFromPoints(point2, point3)
    ) > 0
  );
}
