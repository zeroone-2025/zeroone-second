"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import RouletteWheel from "@/components/RouletteWheel";
import { useRouletteStore } from "@/stores/rouletteStore";
import { destinations } from "@/lib/destinations";

export default function RoulettePage() {
  const router = useRouter();
  const [isSpinning, setIsSpinning] = useState(false);
  const [finalIndex, setFinalIndex] = useState<number | null>(null);
  const { spin, selectedDestination } = useRouletteStore();

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    spin();

    const randomIndex = Math.floor(Math.random() * destinations.length);
    setFinalIndex(randomIndex);

    setTimeout(() => {
      setIsSpinning(false);
      setTimeout(() => {
        router.push("/result");
      }, 500);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-900 to-purple-900 text-white px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          🎰 운명의 룰렛
        </h1>
        <p className="text-lg text-gray-300">
          당신의 오늘 목적지를 정해드립니다
        </p>
      </div>

      <div className="mb-8">
        <RouletteWheel isSpinning={isSpinning} finalIndex={finalIndex} />
      </div>

      <Button
        onClick={handleSpin}
        disabled={isSpinning}
        className={`
          px-12 py-6 text-xl md:text-2xl font-bold rounded-full
          ${isSpinning
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
          }
          text-black shadow-lg
          transition-all duration-300
          ${!isSpinning && "hover:scale-110 animate-pulse"}
        `}
      >
        {isSpinning ? "돌아가는 중..." : "돌려라! 🎲"}
      </Button>

      {isSpinning && (
        <p className="mt-8 text-xl animate-pulse text-yellow-300">
          두근두근... 어디로 갈까요? 🤔
        </p>
      )}
    </div>
  );
}
