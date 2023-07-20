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
    {
      x: 166,
      y: 118,
    },
    {
      x: 143,
      y: 367,
    },
    {
      x: 404,
      y: 274,
    },
    {
      x: 232,
      y: 214,
    },
  ]);

  function addPoint(point: Point) {
    setPoints([...points, point]);
  }

  function setPoint(index: number, point: Point) {
    setPoints(set(points, index, point));
  }

  return (
    <div className="flex flex-col py-5 gap-5">
      <h1 className="text-3xl text-center font-bold">Convex Hull</h1>
      <p className="self-center text-center max-w-xl">
        The{" "}
        <a
          className="font-semibold text-blue-600 hover:underline"
          href="https://en.wikipedia.org/wiki/Convex_hull"
        >
          convex hull
        </a>{" "}
        of a set of points, in simple terms, is the shape that a rubber band
        would make if you stretched it around all the points. This tool lets you
        create and edit a set of points, while it automatically calculates the
        convex hull. You can drag points around, and double-click to add new
        points. Or, edit the coordinates manually.
      </p>
      <div className="flex flex-wrap justify-center items-start gap-10">
        <Canvas
          width={width}
          height={height}
          points={points}
          addPoint={addPoint}
          setPoint={setPoint}
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Points</h1>
          <table className="border-spacing-y-2 border-separate">
            <thead>
              <tr>
                <td></td>
                <td className="font-bold text-center">x</td>
                <td></td>
                <td className="font-bold text-center">y</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {points.map((point, index) => (
                <tr key={index}>
                  <td>(</td>
                  <td>
                    <input
                      className="rounded-md border-transparent hover:border-gray-200 border-2 transition text-right w-16"
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
                  <td>,</td>
                  <td>
                    {
                      <input
                        className="rounded-md border-transparent hover:border-gray-200 border-2 transition text-right w-16"
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
                  <td>)</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="px-3 py-1 rounded-md bg-blue-500 hover:bg-blue-800 transition text-white font-semibold shadow"
            onClick={() => {
              setPoints([...points, { x: width / 2, y: height / 2 }]);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
