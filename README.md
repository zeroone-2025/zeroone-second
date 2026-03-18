# 자체휴강 결심 서비스

> 오늘 하루, 나를 위한 선택

수업 대신 나만의 하루를 즐기고 싶을 때, 목적지를 대신 정해주는 룰렛 서비스입니다.

## 서비스 소개

**자체휴강 결심 서비스**는 3단계로 구성됩니다:

1. **메인 페이지** — "오늘 안 간다" 버튼을 누르면 결심 확정
2. **룰렛 페이지** — 8가지 목적지 중 하나를 랜덤으로 선정
3. **결과 페이지** — 목적지, 오늘의 변명, 시간대별 타임라인 제공

### 목적지 8곳

| 목적지 | 한줄 요약 |
|--------|-----------|
| ☕ 카페 | 아아 한 잔의 여유 |
| 🎬 영화관 | 오늘 개봉작 뭐 있지? |
| 🎮 PC방 | 운명이 당신을 PC방으로 이끕니다 |
| 🧖 찜질방 | 계란 두 개요 |
| 🌊 한강 | 치맥이 부른다 |
| 📚 서점 | 인생 책을 만날 수도? |
| 🌳 공원 | 산책하며 인생 생각하기 |
| 🍜 맛집 | 점심부터 든든하게 |

### 타임라인 기능

결과 페이지에서 시작 시간을 설정하면 목적지에 맞는 시간대별 코스를 확인할 수 있습니다.

## 시작하기

```bash
git clone https://github.com/zeroone-2025/zeroone-second.git
cd zeroone-second/frontend
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인

## 기술 스택

| 기술 | 용도 |
|------|------|
| **Next.js 15** | App Router 기반 프레임워크 |
| **TypeScript** | 타입 안전성 |
| **Tailwind CSS v4** | 스타일링 |
| **shadcn/ui** | UI 컴포넌트 |
| **Zustand** | 클라이언트 상태 관리 |

## 폴더 구조

```
zeroone-second/
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── page.tsx          # 메인 (결심 버튼)
│       │   ├── roulette/page.tsx # 룰렛 페이지
│       │   └── result/page.tsx   # 결과 페이지
│       ├── components/
│       │   └── RouletteWheel.tsx # 룰렛 휠 컴포넌트
│       ├── lib/
│       │   ├── destinations.ts   # 목적지 데이터
│       │   ├── excuses.ts        # 변명 데이터
│       │   └── timelines.ts      # 타임라인 데이터
│       └── stores/
│           └── rouletteStore.ts  # 룰렛 상태 관리
└── docs/                         # 기획/개발/마케팅 문서
```

## 배포

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zeroone-2025/zeroone-second&root-directory=frontend)

1. [Vercel](https://vercel.com)에 GitHub 계정으로 로그인
2. "Import Project" → 이 레포 선택
3. **Root Directory**를 `frontend`로 설정
4. "Deploy" 클릭
