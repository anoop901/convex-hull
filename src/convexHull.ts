import Point from "./util/Point";
import chain from "./util/chain";
import {
  drop,
  enumerate,
  filter,
  findFirstMatching,
  fold,
  iterate,
  min,
} from "./util/iterables";
import { crossProduct, vectorFromPoints } from "./util/Vector";
import { distanceSq } from "./util/geometry";
import { compareByNumber, compareInOrder } from "./util/comparators";

export default function convexHull(points: Point[]): Point[] {
  const { index: leftmostPointIndex, value: leftmostPoint } = chain(points)
    .then(enumerate)
    .then(
      min(
        compareInOrder(
          compareByNumber(({ value: { x } }) => x),
          compareByNumber(({ value: { y } }) => y)
        )
      )
    )
    .end();

  return chain(
    iterate(
      {
        result: [] as Point[],
        currentPointIndex: leftmostPointIndex,
        currentPoint: leftmostPoint,
      },
      ({ result, currentPointIndex, currentPoint }) => {
        const { bestPointSoFarIndex, bestPointSoFar, collinearPoints } = chain(
          points
        )
          .then(enumerate)
          .then(
            filter(
              ({ index: otherPointIndex }) =>
                otherPointIndex !== currentPointIndex
            )
          )
          .then(
            fold(
              {
                bestPointSoFarIndex: null as number | null,
                bestPointSoFar: null as Point | null,
                collinearPoints: [] as Point[],
              },
              (
                { bestPointSoFarIndex, bestPointSoFar, collinearPoints },
                { index: otherPointIndex, value: otherPoint }
              ) => {
                if (bestPointSoFarIndex === null || bestPointSoFar === null) {
                  return {
                    bestPointSoFarIndex: otherPointIndex,
                    bestPointSoFar: otherPoint,
                    collinearPoints: collinearPoints,
                  };
                }
                const cp = crossProduct(
                  vectorFromPoints(currentPoint, bestPointSoFar),
                  vectorFromPoints(currentPoint, otherPoint)
                );
                if (cp > 0) {
                  return {
                    bestPointSoFarIndex: otherPointIndex,
                    bestPointSoFar: otherPoint,
                    collinearPoints: [],
                  };
                } else if (cp === 0) {
                  if (
                    distanceSq(currentPoint, otherPoint) >
                    distanceSq(currentPoint, bestPointSoFar)
                  ) {
                    return {
                      bestPointSoFarIndex: otherPointIndex,
                      bestPointSoFar: otherPoint,
                      collinearPoints: [...collinearPoints, bestPointSoFar],
                    };
                  } else {
                    return {
                      bestPointSoFarIndex,
                      bestPointSoFar,
                      collinearPoints: [...collinearPoints, otherPoint],
                    };
                  }
                } else {
                  return {
                    bestPointSoFarIndex,
                    bestPointSoFar,
                    collinearPoints,
                  };
                }
              }
            )
          )
          .end();
        if (bestPointSoFarIndex === null || bestPointSoFar === null) {
          throw new Error("unimplemented");
        }
        return {
          currentPointIndex: bestPointSoFarIndex,
          currentPoint: bestPointSoFar,
          result: [...result, currentPoint, ...collinearPoints],
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
