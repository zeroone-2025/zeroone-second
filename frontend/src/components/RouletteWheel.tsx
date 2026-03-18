"use client";

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
    "#ef4444", // red
    "#f97316", // orange
    "#eab308", // yellow
    "#22c55e", // green
    "#14b8a6", // teal
    "#3b82f6", // blue
    "#6366f1", // indigo
    "#a855f7", // purple
  ];

  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96">
      {/* Pointer */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[30px] border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-lg" />
      </div>

      {/* Wheel */}
      <div
        className="w-full h-full rounded-full shadow-2xl border-8 border-yellow-400 relative"
        style={{
          background: `conic-gradient(
            ${colors.map((color, i) =>
              `${color} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`
            ).join(", ")}
          )`,
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? "transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
        }}
      >
        {/* Labels */}
        {destinations.map((dest, index) => {
          const angle = index * segmentAngle + segmentAngle / 2;
          const radian = (angle - 90) * (Math.PI / 180);
          const radius = 38; // percentage from center
          const x = 50 + radius * Math.cos(radian);
          const y = 50 + radius * Math.sin(radian);

          return (
            <div
              key={dest.name}
              className="absolute flex flex-col items-center justify-center"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              }}
            >
              <span className="text-xl md:text-2xl drop-shadow-md">{dest.emoji}</span>
              <span
                className="text-[10px] md:text-xs font-bold text-white mt-0.5"
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
              >
                {dest.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Center circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-white rounded-full shadow-lg flex items-center justify-center z-10">
        <span className="text-xl md:text-2xl">🎯</span>
      </div>
    </div>
  );
}
