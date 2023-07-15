import convexHull from "@/logic/convexHull";
import Point from "@/util/Point";
import { Stage, Circle, Layer, Line, Rect } from "react-konva";

const radius = 10;

export default function Canvas({
  width,
  height,
  points,
  addPoint,
  setPoint,
}: {
  width: number;
  height: number;
  points: Point[];
  addPoint: (point: Point) => void;
  setPoint: (index: number, point: Point) => void;
}) {
  const convexHullPoints = convexHull(points);
  return (
    <Stage
      width={width}
      height={height}
      onDblClick={(event) => {
        const pointerPosition = event.target.getStage()?.getPointerPosition();
        if (!pointerPosition) {
          return;
        }
        addPoint({ x: pointerPosition.x, y: pointerPosition.y });
      }}
    >
      <Layer>
        <Rect x={0} y={0} width={width} height={height} stroke={"black"}></Rect>
      </Layer>
      <Layer>
        <Line
          points={convexHullPoints.flatMap(({ x, y }) => [x, y])}
          stroke="orange"
          lineJoin="round"
          lineCap="round"
          hitStrokeWidth={0}
          closed
        />
        {convexHullPoints.map(({ x, y }, index) => (
          <Circle key={index} x={x} y={y} radius={radius * 1.5} fill="orange" />
        ))}
      </Layer>
      <Layer>
        {points.map((point, index) => (
          <Circle
            draggable
            key={index}
            x={point.x}
            y={point.y}
            radius={radius}
            fill="green"
            stroke="darkgreen"
            onDragMove={(event) => {
              setPoint(index, { x: event.target.x(), y: event.target.y() });
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
}
