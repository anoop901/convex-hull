import Point from "../model/Point";
import { crossProduct, magnitudeSq, vectorFromPoints } from "../model/Vector";

export function distanceSq(point1: Point, point2: Point): number {
  return magnitudeSq(vectorFromPoints(point1, point2));
}

export function arePointsCollinear(
  point1: Point,
  point2: Point,
  point3: Point
): boolean {
  return (
    crossProduct(
      vectorFromPoints(point1, point2),
      vectorFromPoints(point2, point3)
    ) === 0
  );
}

// assumes a left-handed coordinate system, e.g. the canvas
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
