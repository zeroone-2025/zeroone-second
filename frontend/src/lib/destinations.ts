export interface Destination {
  name: string;
  emoji: string;
  message: string;
}

export const destinations: Destination[] = [
  { name: "카페", emoji: "☕", message: "아아 한 잔의 여유..." },
  { name: "영화관", emoji: "🎬", message: "오늘 개봉작 뭐 있지?" },
  { name: "PC방", emoji: "🎮", message: "운명이 당신을 PC방으로 이끕니다" },
  { name: "찜질방", emoji: "🧖", message: "계란 두 개요" },
  { name: "한강", emoji: "🌊", message: "치맥이 부른다" },
  { name: "서점", emoji: "📚", message: "인생 책을 만날 수도?" },
  { name: "공원", emoji: "🌳", message: "산책하며 인생 생각하기" },
  { name: "맛집", emoji: "🍜", message: "점심부터 든든하게" },
];
