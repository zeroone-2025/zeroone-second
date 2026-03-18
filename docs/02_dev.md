# 🛠️ 개발 문서

> **Claude Code 활용 안내**: `@docs/01_plan.md`를 참조하면 기획 문서의 프로젝트 개요와 MVP 범위를 자동으로 확인할 수 있습니다. 아래 프롬프트를 참고하여 Claude Code에서 자연어로 요청하세요.
>
> **기획자가 확정한 MVP 범위를 벗어나지 않도록 주의하세요.** 범위 변경이 필요하면 기획자와 먼저 논의하세요!

## 기술 스택

| 분류 | 기술 | 용도 |
|------|------|------|
| 프레임워크 | Next.js 15 (App Router) | 풀스택 웹 앱 |
| UI | shadcn/ui + Tailwind CSS | 컴포넌트 & 스타일링 |
| 상태 관리 | Zustand | 룰렛 상태, 결과 저장 |
| 애니메이션 | CSS Animation (기본) | 룰렛 회전, 버튼 이펙트 |
| 유틸 | Math.random() | 랜덤 목적지 선택 |

> **AI 프롬프트** -- 추가 라이브러리 선정
>
> ```
> @docs/01_plan.md 참고해서, 핵심 기능 구현에 필요한 추가 라이브러리를 추천해줘.
> 기본 스택: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Zustand
> 룰렛 애니메이션과 버튼 이펙트 구현에 적합한 것 위주로.
> 2시간 해커톤이라 설정 간단하고 바로 쓸 수 있는 것만.
> ```
>
> **TIP**: 라이브러리는 최소한으로! 애니메이션은 CSS만으로도 충분합니다.

## 화면 구성

| 페이지 | 경로 | 설명 |
|--------|------|------|
| 메인 | `/` | "오늘 안 간다" 빨간 버튼 + 가짜 통계 |
| 룰렛 | `/roulette` | 목적지 뽑기 룰렛 애니메이션 |
| 결과 | `/result` | 선택된 장소 + 변명 + 공유 버튼 |

> **AI 프롬프트** -- App Router 페이지 설계
>
> ```
> @docs/01_plan.md 참고해서, 이 서비스에 필요한 페이지를 설계해줘.
> Next.js 15 App Router 기준으로 페이지 목록(경로, 설명, 주요 UI 요소),
> 파일 경로, 네비게이션 흐름을 표 형식으로 정리해줘.
> 총 3페이지: 메인(/) → 룰렛(/roulette) → 결과(/result) 흐름으로.
> ```
>
> **TIP**: 메인 → 룰렛 → 결과 순서의 단방향 흐름으로 단순하게 유지하세요.

## 컴포넌트 구조

```
src/
├── app/
│   ├── page.tsx                  # 메인 페이지 ("오늘 안 간다" 버튼)
│   ├── roulette/
│   │   └── page.tsx              # 룰렛 페이지
│   └── result/
│       └── page.tsx              # 결과 페이지
├── components/
│   ├── ui/                       # shadcn/ui 컴포넌트
│   ├── MainButton.tsx            # 빨간 "오늘 안 간다" 버튼
│   ├── RouletteWheel.tsx         # 룰렛 애니메이션 컴포넌트
│   ├── ResultCard.tsx            # 결과 카드 (장소 + 메시지)
│   ├── ExcuseBox.tsx             # 변명 생성기
│   └── FakeStats.tsx             # 가짜 통계 표시
├── lib/
│   ├── destinations.ts           # 목적지 데이터 (8종)
│   └── excuses.ts                # 변명 리스트
├── stores/
│   └── rouletteStore.ts          # 선택 결과 Zustand 스토어
└── providers/
    └── index.tsx
```

> **AI 프롬프트** -- 컴포넌트 트리 설계
>
> ```
> @docs/01_plan.md 와 위 화면 구성을 참고해서, 각 페이지별 컴포넌트를 구현해줘.
> shadcn/ui (Button, Card) 활용하고,
> destinations.ts 데이터는 아래 형식으로:
> { name: "카페", emoji: "☕", message: "아아 한 잔의 여유..." }
> TypeScript + Tailwind CSS 사용.
> ```
>
> **TIP**: `RouletteWheel`은 CSS `@keyframes`로 회전 애니메이션 구현하면 외부 라이브러리 없이 빠르게 됩니다.

## 핵심 데이터

```typescript
// src/lib/destinations.ts
export const destinations = [
  { name: "카페", emoji: "☕", message: "아아 한 잔의 여유..." },
  { name: "영화관", emoji: "🎬", message: "오늘 개봉작 뭐 있지?" },
  { name: "PC방", emoji: "🎮", message: "운명이 당신을 PC방으로 이끕니다" },
  { name: "찜질방", emoji: "🧖", message: "계란 두 개요" },
  { name: "한강", emoji: "🌊", message: "치맥이 부른다" },
  { name: "서점", emoji: "📚", message: "인생 책을 만날 수도?" },
  { name: "공원", emoji: "🌳", message: "산책하며 인생 생각하기" },
  { name: "맛집", emoji: "🍜", message: "점심부터 든든하게" },
];

// src/lib/excuses.ts
export const excuses = [
  "지하철이 고장났어요",
  "갑자기 배탈이 났어요",
  "할머니 댁에 급한 일이 생겼어요",
  "고양이가 아파요 (고양이 없어도 됨)",
  "중요한 면접이 잡혔어요",
];
```

## Zustand 스토어

```typescript
// src/stores/rouletteStore.ts
interface RouletteStore {
  selectedDestination: Destination | null;
  selectedExcuse: string | null;
  spin: () => void;
  reset: () => void;
}
```

> **AI 프롬프트** -- Zustand 스토어 생성
>
> ```
> src/stores/rouletteStore.ts 파일을 만들어줘.
> destinations 배열에서 랜덤으로 하나 선택하고,
> excuses 배열에서 랜덤으로 변명 하나 선택하는 spin() 액션 포함.
> TypeScript 타입 정의도 포함해줘.
> ```

## API 설계

> 이 서비스는 외부 DB 없이 클라이언트 사이드에서만 동작합니다. API Route Handler 불필요.
> 모든 데이터(목적지, 변명, 가짜 통계)는 `src/lib/` 내 로컬 데이터로 처리합니다.

| 데이터 | 처리 방식 |
|--------|-----------|
| 목적지 선택 | `Math.random()` + destinations 배열 |
| 변명 생성 | `Math.random()` + excuses 배열 |
| 가짜 통계 | `Math.floor(Math.random() * 100000)` |

## 코드 생성 가이드 & 프롬프트 기록

### 페이지 생성 프롬프트

> **AI 프롬프트** -- 메인 페이지
>
> ```
> src/app/page.tsx 파일을 만들어줘.
> 역할: 자체휴강 결심 유도 랜딩 페이지
> 주요 UI:
>   - 중앙에 큰 빨간 버튼 "오늘 안 간다 🚨" (클릭 시 /roulette로 이동)
>   - 클릭 시 화려한 애니메이션 (흔들림, 색상 변화)
>   - 하단에 가짜 통계: "오늘 N명이 함께 자체휴강했습니다" (랜덤 숫자)
>   - 작은 면책 문구: "이 서비스를 사용한 결과에 대해 책임지지 않습니다"
> TypeScript + Tailwind CSS + shadcn/ui Button 사용, 반응형으로.
> ```

> **AI 프롬프트** -- 룰렛 페이지
>
> ```
> src/app/roulette/page.tsx 와 src/components/RouletteWheel.tsx 를 만들어줘.
> 역할: 목적지 랜덤 뽑기
> 주요 UI:
>   - 8개 목적지가 표시된 룰렛 휠 (CSS animation으로 회전)
>   - "돌려라!" 버튼 클릭 시 3초 회전 후 결과 결정
>   - 결과 결정 후 /result로 자동 이동
> destinations 데이터는 src/lib/destinations.ts에서 import.
> Zustand rouletteStore의 spin() 액션 호출해서 결과 저장.
> ```

> **AI 프롬프트** -- 결과 페이지
>
> ```
> src/app/result/page.tsx 파일을 만들어줘.
> 역할: 선택된 목적지 + 변명 표시
> 주요 UI:
>   - 선택된 목적지 emoji + name + message 크게 표시
>   - 변명 박스: "오늘의 변명: [변명 내용]" 카드 형태
>   - "다시 뽑기" 버튼 → /roulette로
>   - "SNS 공유" 버튼 → navigator.share() 또는 클립보드 복사
>   - 축하 메시지 (confetti 없이 텍스트/이모지로 대체)
> rouletteStore에서 selectedDestination, selectedExcuse 읽어오기.
> ```

### 프롬프트 기록

> 개발 중 사용한 AI 프롬프트를 기록하세요. 심사 시 가산점이 될 수 있습니다.

#### 프롬프트 1
- **목적**: (무엇을 만들려고 했는지)
- **사용 도구**: Claude Code
- **프롬프트 내용**:
```
(실제 사용한 프롬프트)
```
- **결과**: (어떤 결과를 얻었는지)

---

## 다음 단계

개발이 진행되면 아래 문서를 업데이트하세요:

- **마케터** → [03_marketing.md](./03_marketing.md): 개발된 **화면 구성**과 **핵심 기능**을 참고하여 콘텐츠를 기획합니다.
- **발표자** → [04_ppt.md](./04_ppt.md): 완성된 기능을 기반으로 데모 시나리오를 작성합니다.
- **전체 흐름** → [README.md](./README.md): 문서 간 관계와 타임라인을 확인합니다.