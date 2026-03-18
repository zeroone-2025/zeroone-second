"use client";

import { useState } from "react";
import { destinations } from "@/lib/destinations";

interface RouletteWheelProps {
  isSpinning: boolean;
  finalIndex: number | null;
}

export default function RouletteWheel({ isSpinning, finalIndex }: RouletteWheelProps) {
  const segmentAngle = 360 / destinations.length;

  const rotation = isSpinning
    ? finalIndex !== null
      ? 360 * 5 + (360 - finalIndex * segmentAngle - segmentAngle / 2)
      : 0
    : finalIndex !== null
    ? 360 - finalIndex * segmentAngle - segmentAngle / 2
    : 0;

  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-teal-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
  ];

  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96">
      {/* Pointer */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[30px] border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-lg" />
      </div>

      {/* Wheel */}
      <div
        className="w-full h-full rounded-full overflow-hidden shadow-2xl border-8 border-yellow-400"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? "transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
        }}
      >
        {destinations.map((dest, index) => {
          const angle = index * segmentAngle;
          return (
            <div
              key={dest.name}
              className={`absolute w-full h-full ${colors[index]}`}
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.tan((segmentAngle * Math.PI) / 180)}% 0%, 50% 50%)`,
                transform: `rotate(${angle}deg)`,
                transformOrigin: "50% 50%",
              }}
            >
              <div
                className="absolute text-white font-bold text-sm md:text-base"
                style={{
                  top: "15%",
                  left: "50%",
                  transform: `translateX(-50%) rotate(${segmentAngle / 2}deg)`,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                }}
              >
                <div className="text-2xl md:text-3xl">{dest.emoji}</div>
                <div className="mt-1">{dest.name}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
        <span className="text-2xl md:text-3xl">🎯</span>
      </div>
    </div>
  );
}
