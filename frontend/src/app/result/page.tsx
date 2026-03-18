"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouletteStore } from "@/stores/rouletteStore";
import { timelines, adjustTimeline, TimelineItem } from "@/lib/timelines";

export default function ResultPage() {
  const router = useRouter();
  const { selectedDestination, selectedExcuse, reset } = useRouletteStore();
  const [showConfetti, setShowConfetti] = useState(true);
  const [startTime, setStartTime] = useState("10");
  const [showTimeline, setShowTimeline] = useState(false);
  const [adjustedTimeline, setAdjustedTimeline] = useState<TimelineItem[]>([]);

  useEffect(() => {
    if (!selectedDestination) {
      router.push("/");
    }
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [selectedDestination, router]);

  useEffect(() => {
    if (selectedDestination && timelines[selectedDestination.name]) {
      const timeline = timelines[selectedDestination.name].timeline;
      setAdjustedTimeline(adjustTimeline(timeline, parseInt(startTime)));
    }
  }, [selectedDestination, startTime]);

  const handleRetry = () => {
    reset();
    router.push("/roulette");
  };

  const handleShare = async () => {
    let shareText = `🎉 오늘의 자체휴강 목적지: ${selectedDestination?.emoji} ${selectedDestination?.name}\n\n"${selectedDestination?.message}"\n\n오늘의 변명: ${selectedExcuse}`;

    if (showTimeline && adjustedTimeline.length > 0) {
      shareText += `\n\n📅 오늘의 타임라인:\n`;
      adjustedTimeline.forEach((item) => {
        shareText += `${item.time} ${item.emoji} ${item.activity}\n`;
      });
    }

    shareText += `\n#자체휴강 #오늘안간다`;

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

  const timelineData = timelines[selectedDestination.name];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-green-900 to-emerald-900 text-white px-4 py-8 relative overflow-hidden">
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
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 mb-6 z-10">
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
      <Card className="w-full max-w-md bg-orange-500/20 backdrop-blur-lg border-orange-400/30 mb-6 z-10">
        <CardContent className="pt-6 pb-6">
          <h3 className="text-lg font-semibold text-orange-300 mb-2">
            📝 오늘의 변명
          </h3>
          <p className="text-xl text-white font-medium">
            &ldquo;{selectedExcuse}&rdquo;
          </p>
        </CardContent>
      </Card>

      {/* Timeline Section */}
      {timelineData && (
        <Card className="w-full max-w-md bg-blue-500/20 backdrop-blur-lg border-blue-400/30 mb-6 z-10">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-300">
                📅 {timelineData.name}
              </h3>
              <Button
                onClick={() => setShowTimeline(!showTimeline)}
                variant="outline"
                size="sm"
                className="bg-blue-600/50 border-blue-400 text-white hover:bg-blue-600"
              >
                {showTimeline ? "접기" : "펼치기"}
              </Button>
            </div>

            {!showTimeline && (
              <p className="text-gray-300 text-sm">
                시작 시간을 설정하고 나만의 타임라인을 확인하세요!
              </p>
            )}

            {showTimeline && (
              <>
                {/* Time Picker */}
                <div className="flex items-center gap-3 mb-6 p-3 bg-white/10 rounded-lg">
                  <label className="text-white font-medium">시작 시간:</label>
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {Array.from({ length: 15 }, (_, i) => i + 6).map((hour) => (
                      <option key={hour} value={hour} className="bg-gray-800">
                        {hour.toString().padStart(2, "0")}:00
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timeline */}
                <div className="space-y-3">
                  {adjustedTimeline.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="flex-shrink-0 w-16 text-center">
                        <span className="text-lg font-bold text-blue-300">
                          {item.time}
                        </span>
                      </div>
                      <div className="text-3xl">{item.emoji}</div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">{item.activity}</p>
                        <p className="text-sm text-gray-400">💡 {item.tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

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
