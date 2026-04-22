# 다시봄날의원 서창점 — 페이지 구조

## 헤더 네비게이션

```
로고 (/)
├── 이벤트 (/notice)
│   ├── 상시 이벤트 → /notice?tab=always
│   ├── 특별 이벤트 → /notice?tab=special
│   └── 시즌 이벤트 → /notice?tab=season
│
├── 시술정보
│   ├── 쁘띠성형
│   │   ├── 보톡스 → /botox
│   │   ├── 필러 → /filler
│   │   ├── 하이코·코필러 → /hyaico
│   │   ├── 힐로웨이브 → /hilowave
│   │   ├── 쥬베룩/쥬베룩볼륨 → /juvelook
│   │   ├── 리쥬란/리쥬란HB+ → /rejuran
│   │   ├── 리쥬란아이 → /rejuran-eye
│   │   └── 에버클 → /evercl
│   │
│   ├── 리프팅
│   │   ├── 슈링크 → /shrink
│   │   ├── 인모드 → /inmode
│   │   ├── 올리지오 → /olligio
│   │   └── 더블로골드 → /doublo-gold
│   │
│   ├── 색소·레이저
│   │   ├── 피코슈어 → /picosure
│   │   ├── 시크릿 듀오 → /secret-duo
│   │   ├── 노블린 → /nobelin
│   │   ├── 미인레이저 → /miiin-laser
│   │   └── 에이톤레이저 → /aeton-laser
│   │
│   ├── 스킨케어
│   │   ├── IBPS 부스터필 → /ibps
│   │   ├── 블랙필 → /blackpeel
│   │   ├── 아쿠아필 → /aquapeel
│   │   ├── PDT → /pdt
│   │   ├── 시크릿레이저 → /secret-laser
│   │   ├── 초음파관리(LDM) → /ldm
│   │   ├── 더마샤인 → /dermashine
│   │   ├── NDA플러스 → /nda-plus
│   │   └── 벨로테로 리바이브 → /belotero-revive
│   │
│   └── 바디·제모
│       ├── 아포지플러스 → /apogee-plus
│       ├── 빨간주사 → /red-injection
│       ├── 노블쉐이프 → /nobleshape
│       └── 오니코 레이저 → /onico-laser
│
├── 병원소개
│   ├── 다시봄날의원 서창점 소개 → /about
│   ├── 의료진 소개 → /doctors
│   ├── 장비소개 → /equipment
│   └── 진료안내·오시는 길 → /location
│
└── 온라인 상담 (모바일 전용)
    ├── 카카오채널 (외부 링크)
    ├── 네이버 예약 (외부 링크)
    └── 전화문의 (외부 링크)
```

---

## 주요 페이지별 섹션 구성

### `/` — 홈

| # | 섹션 | 내용 |
|---|------|------|
| 1 | Hero | 슬라이드 캐러셀 (4장), 태그라인, CTA 버튼 |
| 2 | Intro | 인용구 + 마퀴 애니메이션 "Awaken Your Aura" |
| 3 | DoctorsSection | 의료진 소개 (사진 + Education / Career / Memberships 3열 그리드) |
| 4 | FeaturesSection | Sticky 좌측 + 우측 스크롤 (3가지 병원 특장점) |
| 5 | SpaceSection | 시설 공간 가로 스크롤 갤러리 |
| 6 | ProgramsSection | 대표 시술 카드 (소프웨이브·울쎄라·써마지·실리프팅·콜라겐부스터) |
| 7 | ContactSection | 공통 상담 CTA |

---

### `/about` — 병원소개

| # | 섹션 | 내용 |
|---|------|------|
| 1 | Hero | 타이틀 + 그라디언트 배경 |
| 2 | Values | 4가지 병원 철학 (1인 솔루션 / 프리미엄 장비 / 프라이빗 공간 / 시간 관리) |
| 3 | Space Gallery | 공간 갤러리 |
| 4 | ContactSection | 공통 상담 CTA |

---

### `/doctors` — 의료진 소개

| # | 섹션 | 내용 |
|---|------|------|
| 1 | Hero | "다시봄날의원 서창점 의료진" |
| 2 | Doctor Profile | 사진 + 이름/직함 + Education / Career / Memberships |
| 3 | ContactSection | 공통 상담 CTA |

---

### `/equipment` — 장비소개

| # | 섹션 | 내용 |
|---|------|------|
| 1 | ArcHero | 장비 소개 히어로 |
| 2 | Equipment Grid | 장비 카드 목록 (검색 필터 포함) |
| 3 | ContactSection | 공통 상담 CTA |

---

### `/location` — 진료안내·오시는 길

| # | 섹션 | 내용 |
|---|------|------|
| 1 | ArcHero | "Contact Us" |
| 2 | 진료 안내 | 예약 CTA 버튼 + 진료 시간표 |
| 3 | Gallery | 내부 갤러리 (네비게이션 포함) |
| 4 | Map | 주소 + 지도 |
| 5 | ContactSection | 공통 상담 CTA |

---

### `/notice` — 이벤트

| # | 섹션 | 내용 |
|---|------|------|
| 1 | Hero | 이벤트 히어로 |
| 2 | Tab Nav | 상시 / 특별 / 시즌 탭 (`?tab=` 파라미터 제어) |
| 3 | Event Cards | 이벤트 카드 그리드 (배지·제목·기간·이미지) |
| 4 | ContactSection | 공통 상담 CTA |

---

### 시술 페이지 (`/botox`, `/sofwave` 등 39개) — 공통 구조

`TreatmentPage` 컴포넌트로 공통 렌더링, 데이터만 다름.

| # | 섹션 | 내용 |
|---|------|------|
| 1 | Hero | 시술명, 서브타이틀, 태그라인 |
| 2 | Intro | 시술 개요 |
| 3 | Points | 핵심 특장점 |
| 4 | Why Reone | 선택 이유 |
| 5 | Benefits | 효과 |
| 6 | Recommended | 추천 대상 |
| 7 | Category Siblings | 같은 카테고리 시술 카드 캐러셀 |
| 8 | ContactSection | 공통 상담 CTA |

데이터 파일: `src/data/treatments.ts`, `src/data/treatments2.ts`

---

## 컴포넌트 구조

```
src/
├── components/
│   ├── Header.tsx        — 데스크탑 헤더 + 드롭다운 네비
│   ├── GNB.tsx           — 모바일 드로어 메뉴
│   ├── Layout.tsx        — Header + 페이지 콘텐츠 + Footer 래퍼
│   ├── Footer.tsx        — 공통 푸터
│   ├── ContactSection.tsx — 모든 페이지 하단 상담 CTA
│   ├── SubPageHero.tsx   — 서브페이지 공통 히어로
│   ├── ArcHero.tsx       — 아크 디자인 히어로 (equipment, location)
│   ├── FloatingMenu.tsx  — 플로팅 빠른 메뉴
│   └── Popup.tsx         — 팝업/모달
│
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Doctors.tsx
│   ├── Equipment.tsx
│   ├── Location.tsx
│   ├── Notice.tsx
│   └── treatments/
│       └── TreatmentPage.tsx
│
└── data/
    ├── treatments.ts
    └── treatments2.ts
```

---

## 라우터 요약

| 경로 | 페이지 | 비고 |
|------|--------|------|
| `/` | Home | — |
| `/about` | 병원소개 | — |
| `/doctors` | 의료진 소개 | — |
| `/equipment` | 장비소개 | — |
| `/location` | 오시는 길 | — |
| `/notice` | 이벤트 | `?tab=always\|special\|season` |
| `/botox` ~ `/onico-laser` | 시술 (39개) | TreatmentPage 공통 |
| `*` | 404 | — |
