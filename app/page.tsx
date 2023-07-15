"use client";
import Point from "@/model/Point";
import dynamic from "next/dynamic";
import { useState } from "react";
import { set } from "immutable";
import React from "react";

const Canvas = dynamic(() => import("@/components/Canvas"), {
  ssr: false,
});

const width = 500;
const height = 500;

export default function Home() {
  const [points, setPoints] = useState<Point[]>([
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

  return (
    <div>
      <div>
        <p>Double-click to add a point.</p>
        <Canvas
          width={width}
          height={height}
          points={points}
          addPoint={addPoint}
          setPoint={setPoint}
        />
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
