# 개발자 포트폴리오 웹페이지

## 프로젝트 개요
개발자를 위한 포트폴리오 웹페이지. 깔끔하고 현대적인 디자인으로 기술 스택, 프로젝트, 경력을 효과적으로 보여주는 것이 목표.

## 기술 스택
- **Next.js** (App Router)
- **Tailwind CSS**
- **TypeScript**
- 배포: Vercel

## 페이지 구성
1. **Hero** — 이름, 직함, 한 줄 소개, CTA 버튼 (Contact / Resume)
2. **About** — 간단한 자기소개, 관심 분야
3. **Skills** — 사용 기술 스택 아이콘/뱃지 목록
4. **Projects** — 프로젝트 카드 그리드 (썸네일, 설명, GitHub/Demo 링크)
5. **Contact** — 이메일, GitHub, LinkedIn 등 링크

## 디자인 원칙
- 다크/라이트 모드 지원
- 깔끔한 타이포그래피, 충분한 여백
- 부드러운 스크롤 애니메이션 (Framer Motion 또는 CSS)
- 모바일 반응형 필수

## 코드 규칙
- `app/` 디렉토리 기반 App Router 사용
- 컴포넌트는 `components/` 폴더에 분리
- 콘텐츠 데이터(프로젝트, 스킬 등)는 `data/` 폴더에 별도 관리
- 불필요한 주석, 임시 코드 남기지 않기

## 코드 컨벤션
- 언어: TypeScript 엄격 모드 (`strict: true`)
- 컴포넌트: PascalCase (예: `HeroSection.tsx`)
- 함수/변수: camelCase
- 상수: UPPER_SNAKE_CASE
- CSS: Tailwind 유틸리티 클래스 우선, 커스텀 CSS는 최소화
- 폴더명: kebab-case (예: `components/hero-section/`)
- 줄바꿈: 컴포넌트당 하나의 파일, 100줄 초과 시 분리 고려
- import 순서: 외부 라이브러리 → 내부 모듈 → 스타일

## 디자인 지침 (DESIGN.md 기반)

> 디자인 작업 시 반드시 `DESIGN.md`를 먼저 읽고 아래 규칙을 준수한다.

### 핵심 방향
레트로-디지털 / 사이버펑크 / 픽셀 미학. 날것의 디지털 감각, 강한 타이포그래피, 고채도 컬러 블록.

### 컬러 (변경 금지)
- 배경: `#0a0a0a`
- Primary 블록: `#0033FF` (일렉트릭 블루)
- 포인트: `#00FFAA` (사이버 그린), `#00CFFF` (사이버 시안)
- 텍스트: `#FFFFFF` (주), `#7fa8b8` (보조)
- 그라디언트, 파스텔, 뮤트 컬러 사용 금지

### 폰트
- 기본: `Space Mono` (모노스페이스)
- 픽셀 강조: `VT323` (Google Fonts) — Hero/디스플레이 텍스트에 사용
- Geist, sans-serif 계열 사용 금지

### 컴포넌트 규칙
- 카드/패널: `rounded-none` 직각, `border border-[#0033FF]` 또는 `border-white/30`
- 버튼: `bg-[#0033FF]` 채움형 또는 `cyber-border` 아웃라인형, hover 시 색 반전
- 섹션 레이블: `[ 01 / SECTION ]` 대괄호 터미널 스타일
- 구분선: `border-[#0033FF]`

### 레이아웃
- 섹션마다 배경색 블록으로 강하게 구분 (검정 ↔ 블루 교차)
- 여백: 극대화 또는 최소화, 중간 없음
- UI 프레임 메타포 활용 (터미널 창, ID 카드 등)

### 애니메이션
- glitch, scanline, 타이핑 효과 우선
- 부드러운 fade/blur/gradient 사용 금지
- hover: `duration-75` 즉각 전환
- `backdrop-blur`, `glassmorphism` 사용 금지

### 절대 금지
- `rounded-xl`, `rounded-2xl` 이상 모서리
- `backdrop-blur`, `bg-opacity` 반투명 글래스
- 소프트 그라디언트 배경 또는 그라디언트 텍스트
- 장식적 이모지
