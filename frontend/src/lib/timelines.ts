export interface TimelineItem {
  time: string;
  activity: string;
  emoji: string;
  tip: string;
}

export interface DestinationTimeline {
  name: string;
  timeline: TimelineItem[];
}

// 시작 시간에 따라 타임라인 시간을 조정하는 함수
export function adjustTimeline(
  timeline: TimelineItem[],
  startHour: number
): TimelineItem[] {
  const baseHour = parseInt(timeline[0].time.split(":")[0]);
  const diff = startHour - baseHour;

  return timeline.map((item) => {
    const [hour, minute] = item.time.split(":").map(Number);
    const newHour = (hour + diff) % 24;
    const formattedHour = newHour.toString().padStart(2, "0");
    return {
      ...item,
      time: `${formattedHour}:${minute.toString().padStart(2, "0")}`,
    };
  });
}

export const timelines: Record<string, DestinationTimeline> = {
  카페: {
    name: "카페 힐링 코스",
    timeline: [
      { time: "10:00", activity: "카페 입장", emoji: "☕", tip: "창가 자리 선점하기" },
      { time: "10:15", activity: "아아 주문", emoji: "🧊", tip: "얼죽아는 기본이지" },
      { time: "10:30", activity: "SNS 감성샷", emoji: "📸", tip: "조명 좋은 곳에서" },
      { time: "11:00", activity: "책 읽기 or 넷플릭스", emoji: "📖", tip: "에어팟 필수" },
      { time: "12:00", activity: "브런치 주문", emoji: "🥐", tip: "크로플 강추" },
      { time: "13:00", activity: "디저트 추가", emoji: "🍰", tip: "케이크는 별도 위장" },
      { time: "14:00", activity: "자리 이동 (2차 카페)", emoji: "🚶", tip: "카페 투어 시작" },
      { time: "15:00", activity: "귀가", emoji: "🏠", tip: "카페인 충전 완료" },
    ],
  },
  영화관: {
    name: "영화관 풀코스",
    timeline: [
      { time: "10:00", activity: "영화관 도착", emoji: "🎬", tip: "상영 시간표 확인" },
      { time: "10:15", activity: "티켓 예매", emoji: "🎫", tip: "중간 뒷좌석 추천" },
      { time: "10:30", activity: "팝콘 & 음료 구매", emoji: "🍿", tip: "콤보가 가성비 좋음" },
      { time: "11:00", activity: "1차 영화 관람", emoji: "🎥", tip: "블록버스터 추천" },
      { time: "13:30", activity: "점심 식사", emoji: "🍔", tip: "영화관 내 식당 or 근처 맛집" },
      { time: "14:30", activity: "2차 영화 관람", emoji: "🎞️", tip: "힐링 영화 or 코미디" },
      { time: "17:00", activity: "영화 후기 작성", emoji: "✍️", tip: "SNS에 감상평 남기기" },
      { time: "17:30", activity: "귀가", emoji: "🏠", tip: "영화 2편 완료!" },
    ],
  },
  PC방: {
    name: "PC방 마라톤 코스",
    timeline: [
      { time: "10:00", activity: "PC방 입장", emoji: "🎮", tip: "프리미엄석 추천" },
      { time: "10:15", activity: "자리 세팅", emoji: "⌨️", tip: "키보드, 마우스 감도 조절" },
      { time: "10:30", activity: "게임 시작", emoji: "🕹️", tip: "롤, 배그, 발로란트 택 1" },
      { time: "12:30", activity: "점심 (PC방 음식)", emoji: "🍜", tip: "라면 + 볶음밥 조합" },
      { time: "13:00", activity: "게임 2라운드", emoji: "🎯", tip: "랭크 올리기 도전" },
      { time: "15:00", activity: "간식 타임", emoji: "🍫", tip: "초코바 + 음료" },
      { time: "15:30", activity: "게임 3라운드", emoji: "🏆", tip: "오늘의 목표 달성!" },
      { time: "18:00", activity: "귀가", emoji: "🏠", tip: "눈 좀 쉬어주기" },
    ],
  },
  찜질방: {
    name: "찜질방 풀코스",
    timeline: [
      { time: "10:00", activity: "찜질방 입장", emoji: "🧖", tip: "옷 갈아입고 라커 정리" },
      { time: "10:30", activity: "사우나 & 탕 투어", emoji: "🛁", tip: "온탕 → 냉탕 → 온탕" },
      { time: "11:30", activity: "찜질실 순례", emoji: "🔥", tip: "황토방 → 얼음방 → 소금방" },
      { time: "12:30", activity: "식혜 + 계란", emoji: "🥚", tip: "이게 국룰이지" },
      { time: "13:00", activity: "점심 (식당 이용)", emoji: "🍚", tip: "라면 + 공기밥 추천" },
      { time: "14:00", activity: "수면실에서 낮잠", emoji: "😴", tip: "최소 2시간 확보" },
      { time: "16:00", activity: "마지막 사우나", emoji: "🧴", tip: "개운하게 마무리" },
      { time: "17:00", activity: "귀가", emoji: "🏠", tip: "몸이 가벼워진 기분" },
    ],
  },
  한강: {
    name: "한강 피크닉 코스",
    timeline: [
      { time: "10:00", activity: "한강 도착", emoji: "🌊", tip: "돗자리 명당 선점" },
      { time: "10:30", activity: "자리 세팅", emoji: "🏕️", tip: "텐트 or 돗자리 펴기" },
      { time: "11:00", activity: "배달 음식 주문", emoji: "📱", tip: "치킨 + 피자 조합" },
      { time: "11:30", activity: "한강 뷰 감상", emoji: "🌅", tip: "사진 찍기 좋은 시간" },
      { time: "12:00", activity: "치맥 타임", emoji: "🍗", tip: "한강 치킨은 국룰" },
      { time: "13:30", activity: "자전거 대여", emoji: "🚴", tip: "따릉이 or 대여소" },
      { time: "15:00", activity: "편의점 아이스크림", emoji: "🍦", tip: "더위 식히기" },
      { time: "16:00", activity: "일몰 감상", emoji: "🌇", tip: "노을 맛집 한강" },
      { time: "17:00", activity: "귀가", emoji: "🏠", tip: "완벽한 피크닉 완료" },
    ],
  },
  서점: {
    name: "서점 문화생활 코스",
    timeline: [
      { time: "10:00", activity: "서점 도착", emoji: "📚", tip: "대형서점 추천 (교보, 영풍)" },
      { time: "10:30", activity: "베스트셀러 구경", emoji: "📖", tip: "신간 코너 체크" },
      { time: "11:00", activity: "관심 분야 탐색", emoji: "🔍", tip: "자기계발, 에세이 추천" },
      { time: "12:00", activity: "서점 내 카페", emoji: "☕", tip: "책 보면서 커피 한 잔" },
      { time: "13:00", activity: "점심 식사", emoji: "🍝", tip: "서점 근처 맛집" },
      { time: "14:00", activity: "책 구매 결정", emoji: "💳", tip: "3권 이상이면 혜택" },
      { time: "14:30", activity: "문구 코너 구경", emoji: "✏️", tip: "예쁜 다이어리 구경" },
      { time: "15:30", activity: "귀가", emoji: "🏠", tip: "새 책과 함께!" },
    ],
  },
  공원: {
    name: "공원 힐링 코스",
    timeline: [
      { time: "10:00", activity: "공원 도착", emoji: "🌳", tip: "가까운 공원으로" },
      { time: "10:15", activity: "산책 시작", emoji: "🚶", tip: "이어폰 끼고 음악과 함께" },
      { time: "11:00", activity: "벤치에서 휴식", emoji: "🪑", tip: "햇살 좋은 곳에서" },
      { time: "11:30", activity: "명상 or 독서", emoji: "🧘", tip: "마음의 평화" },
      { time: "12:30", activity: "도시락 or 편의점", emoji: "🍱", tip: "공원에서 먹는 밥이 꿀맛" },
      { time: "13:30", activity: "잔디밭에서 낮잠", emoji: "😴", tip: "돗자리 필수" },
      { time: "15:00", activity: "가벼운 운동", emoji: "🏃", tip: "스트레칭 or 조깅" },
      { time: "16:00", activity: "귀가", emoji: "🏠", tip: "자연 충전 완료" },
    ],
  },
  맛집: {
    name: "맛집 투어 코스",
    timeline: [
      { time: "10:00", activity: "맛집 리서치", emoji: "📱", tip: "네이버 지도 평점 확인" },
      { time: "10:30", activity: "1차 맛집 도착", emoji: "🍜", tip: "브런치 or 아점" },
      { time: "11:30", activity: "맛집 인증샷", emoji: "📸", tip: "SNS 업로드 필수" },
      { time: "12:30", activity: "디저트 카페", emoji: "🍰", tip: "식후 달달하게" },
      { time: "14:00", activity: "소화 산책", emoji: "🚶", tip: "다음 맛집 향해" },
      { time: "15:00", activity: "2차 맛집", emoji: "🍕", tip: "간식 or 늦은 점심" },
      { time: "16:30", activity: "마지막 음료", emoji: "🧋", tip: "타피오카 밀크티 추천" },
      { time: "17:00", activity: "귀가", emoji: "🏠", tip: "맛있는 하루 완료!" },
    ],
  },
};
