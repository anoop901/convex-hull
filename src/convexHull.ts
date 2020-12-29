import Point from "./util/Point";
import chain from "./util/chain";
import {
  drop,
  enumerate,
  filter,
  findFirstMatching,
  iterate,
  minBy,
  reduce,
} from "./util/iterables";
import { isOrientationClockwise } from "./util/geometry";

export default function convexHull(points: Point[]): Point[] {
  const { index: leftmostPointIndex, value: leftmostPoint } = chain(points)
    .then(enumerate)
    .then(minBy(({ value: { x } }) => x))
    .end();

  return chain(
    iterate(
      {
        result: [] as Point[],
        currentPointIndex: leftmostPointIndex,
        currentPoint: leftmostPoint,
      },
      ({ result, currentPointIndex, currentPoint }) => {
        const { index: nextPointIndex, value: nextPoint } = chain(points)
          .then(enumerate)
          .then(
            filter(
              ({ index: otherPointIndex }) =>
                otherPointIndex !== currentPointIndex
            )
          )
          .then(
            reduce(
              (
                { index: bestPointSoFarIndex, value: bestPointSoFar },
                { index: otherPointIndex, value: otherPoint }
              ) =>
                isOrientationClockwise(currentPoint, bestPointSoFar, otherPoint)
                  ? { index: bestPointSoFarIndex, value: bestPointSoFar }
                  : { index: otherPointIndex, value: otherPoint }
            )
          )
          .end();
        return {
          currentPointIndex: nextPointIndex,
          currentPoint: nextPoint,
          result: [...result, currentPoint],
        };
      }
    )
  )
    .then(drop(1))
    .then(
      findFirstMatching(
        ({ currentPointIndex }) => currentPointIndex === leftmostPointIndex
      )
    )
    .then((x) => {
      if (x == null) {
        throw new Error("unreachable");
      }
      return x;
    })
    .then(({ result }) => result)
    .end();
}
