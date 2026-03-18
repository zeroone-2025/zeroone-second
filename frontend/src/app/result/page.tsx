"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouletteStore } from "@/stores/rouletteStore";

export default function ResultPage() {
  const router = useRouter();
  const { selectedDestination, selectedExcuse, reset } = useRouletteStore();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (!selectedDestination) {
      router.push("/");
    }
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [selectedDestination, router]);

  const handleRetry = () => {
    reset();
    router.push("/roulette");
  };

  const handleShare = async () => {
    const shareText = `🎉 오늘의 자체휴강 목적지: ${selectedDestination?.emoji} ${selectedDestination?.name}\n\n"${selectedDestination?.message}"\n\n오늘의 변명: ${selectedExcuse}\n\n#자체휴강 #오늘안간다`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "자체휴강 결과",
          text: shareText,
        });
      } catch (err) {
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("클립보드에 복사되었습니다! 🎉");
  };

  if (!selectedDestination) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-900 to-emerald-900 text-white px-4 relative overflow-hidden">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            >
              {["🎉", "🎊", "✨", "🌟", "💫"][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="text-center mb-8 z-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-pulse">
          🎉 축하합니다! 🎉
        </h1>
        <p className="text-xl text-gray-300">
          오늘의 자체휴강 목적지가 결정되었습니다
        </p>
      </div>

      {/* Result Card */}
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 mb-8 z-10">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="text-8xl mb-4 animate-bounce">
            {selectedDestination.emoji}
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            {selectedDestination.name}
          </h2>
          <p className="text-xl text-yellow-300 italic">
            &ldquo;{selectedDestination.message}&rdquo;
          </p>
        </CardContent>
      </Card>

      {/* Excuse Box */}
      <Card className="w-full max-w-md bg-orange-500/20 backdrop-blur-lg border-orange-400/30 mb-8 z-10">
        <CardContent className="pt-6 pb-6">
          <h3 className="text-lg font-semibold text-orange-300 mb-2">
            📝 오늘의 변명
          </h3>
          <p className="text-xl text-white font-medium">
            &ldquo;{selectedExcuse}&rdquo;
          </p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 z-10">
        <Button
          onClick={handleRetry}
          className="px-8 py-4 text-lg font-bold rounded-full bg-purple-600 hover:bg-purple-700 transition-all hover:scale-105"
        >
          🔄 다시 뽑기
        </Button>
        <Button
          onClick={handleShare}
          className="px-8 py-4 text-lg font-bold rounded-full bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105"
        >
          📤 SNS 공유
        </Button>
      </div>

      <Button
        onClick={() => router.push("/")}
        variant="ghost"
        className="mt-8 text-gray-400 hover:text-white z-10"
      >
        🏠 처음으로 돌아가기
      </Button>
    </div>
  );
}
