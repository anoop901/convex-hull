import { remove, set } from "immutable";
import React from "react";
import { Circle, Layer, Line, Rect, Stage } from "react-konva";
import convexHull from "./convexHull";
import Point from "./util/Point";

const width = 500;
const height = 500;
const radius = 10;

function App() {
  const [points, setPoints] = React.useState<Point[]>([
    { x: 100, y: 100 },
    { x: 100, y: 200 },
    { x: 200, y: 200 },
    { x: 200, y: 300 },
  ]);

  function addPoint(point: Point) {
    setPoints([...points, point]);
  }

  function setPoint(index: number, point: Point) {
    setPoints(set(points, index, point));
  }

  function removePoint(index: number) {
    setPoints(remove(points, index));
  }

  const convexHullPoints = convexHull(points);

  return (
    <div>
      <div>
        <p>Double-click to add a point.</p>
        <Stage
          width={width}
          height={height}
          onDblClick={(event) => {
            const pointerPosition = event.target
              .getStage()
              ?.getPointerPosition();
            if (!pointerPosition) {
              return;
            }
            addPoint({ x: pointerPosition.x, y: pointerPosition.y });
          }}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              width={width}
              height={height}
              stroke={"black"}
            ></Rect>
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
              <Circle
                key={index}
                x={x}
                y={y}
                radius={radius * 1.5}
                fill="orange"
              />
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
      </div>

      <h1>Points</h1>
      <div>
        <table>
          <thead>
            <tr>
              <td>x</td>
              <td>y</td>
            </tr>
          </thead>
          <tbody>
            {points.map((point, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="number"
                    value={point.x}
                    min={0}
                    max={width}
                    onChange={(event) => {
                      setPoint(index, {
                        x: event.target.valueAsNumber,
                        y: points[index].y,
                      });
                    }}
                  ></input>
                </td>
                <td>
                  {
                    <input
                      type="number"
                      value={point.y}
                      min={0}
                      max={width}
                      onChange={(event) => {
                        setPoint(index, {
                          x: points[index].x,
                          y: event.target.valueAsNumber,
                        });
                      }}
                    ></input>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button
          onClick={() => {
            setPoints([...points, { x: width / 2, y: height / 2 }]);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default App;
