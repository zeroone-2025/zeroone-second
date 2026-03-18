"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const [fakeCount, setFakeCount] = useState(0);

  useEffect(() => {
    setFakeCount(Math.floor(Math.random() * 100000) + 10000);
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      router.push("/roulette");
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-pulse">
          자체휴강 결심 서비스
        </h1>
        <p className="text-lg md:text-xl text-gray-400">
          오늘 하루, 나를 위한 선택
        </p>
      </div>

      <Button
        onClick={handleClick}
        className={`
          relative w-64 h-64 rounded-full text-2xl md:text-3xl font-bold
          bg-red-600 hover:bg-red-700
          shadow-[0_0_60px_rgba(239,68,68,0.5)]
          transition-all duration-300 ease-in-out
          ${isClicked ? "animate-ping scale-110" : "hover:scale-105 animate-bounce"}
        `}
        style={{
          animation: isClicked
            ? "ping 0.5s ease-out forwards"
            : "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite, shake 0.5s ease-in-out infinite"
        }}
      >
        <span className="flex flex-col items-center gap-2">
          <span>오늘 걍 짼다</span>
        </span>
      </Button>

      <div className="mt-16 text-center">
        <p className="text-2xl md:text-3xl font-semibold text-yellow-400 animate-pulse">
          오늘 <span className="text-4xl font-bold">{fakeCount.toLocaleString()}</span>명이
        </p>
        <p className="text-xl md:text-2xl text-yellow-400">
          함께 자체휴강했습니다 같이 자체휴강 할 사람?
        </p>
      </div>

      <footer className="absolute bottom-8 text-center text-gray-500 text-sm px-4">
        <p>자체휴강하고 어디갈까요??</p>
      </footer>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px) rotate(-1deg); }
          75% { transform: translateX(5px) rotate(1deg); }
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
