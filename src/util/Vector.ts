import Point from "./Point";

export default interface Vector {
  x: number;
  y: number;
}

export function vectorFromPoints(fromPoint: Point, toPoint: Point) {
  return { x: toPoint.x - fromPoint.x, y: toPoint.y - fromPoint.y };
}

export function crossProduct(vector1: Vector, vector2: Vector): number {
  return vector1.x * vector2.y - vector1.y * vector2.x;
}
