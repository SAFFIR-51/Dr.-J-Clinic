/**
 * Generator-Evaluator 패턴으로 피부과 웹사이트 자동 생성
 *
 * 구조:
 *   [Generator] → 코드 생성
 *       ↓
 *   [Evaluator] → 점수(0-100) + 피드백
 *       ↓
 *   80점 이상? → 완료 / 아니면 피드백 전달 후 반복 (최대 3회)
 */

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';

// .env 파일 로드 (프로젝트 루트 기준)
config({ path: path.join(process.cwd(), '.env') });

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error('❌ ANTHROPIC_API_KEY가 설정되지 않았습니다.');
  console.error('   .env 파일에 ANTHROPIC_API_KEY=sk-ant-... 를 추가하세요.');
  process.exit(1);
}

const client = new Anthropic({ apiKey });
const MODEL = 'claude-sonnet-4-6';

const APP_TSX_PATH = path.join(process.cwd(), 'src/App.tsx');
const BACKUP_PATH = path.join(process.cwd(), 'src/App.tsx.backup');
const LOG_PATH = path.join(process.cwd(), 'scripts/generate.log');
const MAX_ITERATIONS = 3;
const PASS_SCORE = 80;

// ─── 레퍼런스 사이트 분석 ────────────────────────────────────────────────────

const REFERENCE_ANALYSIS = `
# 리원피부과 (RE:ONE Dermatology) 레퍼런스 사이트 분석

## 색상 팔레트
- 주 브랜드 컬러: #515c3e (올리브 다크 그린)
- 배경: 흰색(#fff), 아이보리(#fdfcfb)
- 텍스트: #111 (거의 검정)
- 버튼 기본: 흰색 테두리 or 검정
- 강조/hover: #515c3e

## 폰트
- 한국어: Noto Sans KR (100~900)
- 영문 이탤릭: Ofelia (클래식 세리프)
- 영문 산세리프: 기본 sans-serif

## 전체 페이지 구조 (위→아래)

### 1. 팝업 레이어
- Swiper 슬라이더 (3개 이미지)
- 하단: "하루동안 보지 않기" 버튼 + X 닫기 버튼
- 모바일/PC 버전 각각 별도
- 배경 오버레이(rgba(0,0,0,0.4)) + 가운데 정렬

### 2. 헤더 (fixed, z-index 높음)
- 좌측: RE:ONE 로고 이미지 + KR 언어 선택 (드롭다운 → EN)
- 중앙: "서울대 출신 의료진, 꿈이 현실이 되는 곳 리원 피부과" (볼드 강조)
- 우측: "Major Solution" 드롭다운 (소프웨이브/울쎄라피프라임/써마지) + 햄버거 메뉴
- 스크롤 시 헤더 배경 변화 (투명→흰색)

### 3. 풀스크린 GNB 네비게이션 (햄버거 클릭 시)
- 2컬럼 구조:
  - 좌: Solution 카테고리
    - 리프팅·탄력: 소프웨이브 / 울쎄라피 프라임 / 써마지 / 티타늄·튠페이스·인모드
    - 페이스라인·쁘띠: 콜라겐부스터/쥬베룩 / 실리프팅 / 페이셜컨투어 / 보톡스·스킨부스터
    - 토탈 스킨: 색조·홍조·미백 / 여드름·모공·흉터 / 프리미엄 스킨케어
    - 바디·항노화: 바디 리프팅 / 바디 쉐이핑 / 자가혈 재생주사 / 항산화·면역증강주사
  - 우: RE:ONE 카테고리
    - 리원인사이드: 리원피부과 소개 / 의료진 소개 / 장비소개 / 진료안내·오시는 길
    - 커뮤니티: 공지·이벤트
  - 전화번호: 02 543 0210
- 닫기 버튼 (X)
- 오버레이 배경

### 4. 히어로 섹션
- 풀스크린 동영상 배경 (비디오 없으면 짙은 배경 이미지)
- 텍스트 애니메이션 (split-line, 아래→위 슬라이드):
  - "수많은 아름다움 속 진정한 하나, 당신만의 아우라를 깨우세요"
  - "Awaken Your Aura" (영문 이탤릭)
- "빠르게 문의하기" 버튼
- 하단 물결(wave) 효과

### 5. rection01 - 인트로 텍스트
- 큰 텍스트 메시지 중앙 정렬
- "진정한 아름다움은 수많은 아름다움 속에서 나만의 아우라를 찾는 것에서 시작합니다."
- "빠르게 문의하기" 버튼
- 가로 무한 스크롤 텍스트 배너 (RE:ONE DERMATOLOGY ...)

### 6. rection02 - 리원의 특별함 (3개 특징)
- 특징 1: 프라이빗한 공간 (1,2인실)
- 특징 2: 피부과 전문의와의 밀도 있는 상담
- 특징 3: 최신 리프팅 레이저 장비 보유 국내 1위
- 각 특징: 좌측 텍스트 + 우측 이미지 or 이미지+텍스트 카드

### 7. rection03 - 의료진 소개
- 스크롤 시 텍스트(좌)와 이미지(우)가 교대로 등장
- 문정윤 대표원장 (피부과 전문의, 서울대)
- 이미혜 원장 (피부과 전문의, 서울대)
- 박서민 원장 (마취통증의학과 전문의, 강남차병원)
- "원장단 자세히보기" 버튼

### 8. rection04 - 공간 갤러리
- "프리미엄 그 이상의 프라이빗" 타이틀
- 가로 스크롤 이미지 갤러리 (여러 공간 사진)

### 9. rection05 - 시그니처 프로그램
- 소프웨이브 (대한민국 보유 1위, 8대)
- 울쎄라피 프라임 (대한민국 보유 1위, 8대)
- 써마지 FLX (대한민국 보유 1위, 5대)
- 리스트 형식, hover 시 배경 이미지 등장

### 10. rection06 - 찾아오시는 길 + 진료안내
- 위치: 서울 강남구 도산대로 327 SGF 청담타워 2층 3층
- 지도 이미지
- 진료시간:
  - 평일: 10:00~19:00
  - 토요일: 10:00~16:00
  - 점심: 13:00~14:00
  - 일요일·공휴일 휴진

### 11. 플로팅 퀵 메뉴 (우측 고정)
- 카카오톡 상담 (노란색)
- 네이버 예약 (초록색)
- 전화문의
- 유튜브
- 인스타그램
- 스크롤 시 나타남

### 12. 푸터
- 사업자 정보 (리원피부과의원, 대표자 문정윤, 02.543.0210)
- 비급여수가표, 제증명수가표, 이용약관 링크
- SNS (인스타그램, 블로그, 유튜브)
- 저작권 문구

## 주요 인터랙션
- 헤더: 스크롤 내리면 배경색 변화 + 퀵메뉴 등장
- GNB: 햄버거 토글 → 풀스크린 메뉴 (슬라이드 인)
- 팝업: Swiper 슬라이더 + 쿠키/로컬스토리지로 하루동안 안 보이기
- 히어로: 텍스트 split 애니메이션
- 섹션: 스크롤 시 fade-in/slide-up (whileInView)
- 의료진: 스크롤 위치에 따라 이미지 전환
- 프로그램: hover 시 배경 이미지 fade-in
- 공간 갤러리: 가로 무한 스크롤 (marquee 방식)
`;

// ─── 헬퍼 ───────────────────────────────────────────────────────────────────

function log(msg: string) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_PATH, line + '\n');
}

function stripCodeFences(code: string): string {
  return code
    .replace(/^```(?:tsx?|typescript|jsx?|js)?\n?/m, '')
    .replace(/\n?```\s*$/m, '')
    .trim();
}

// ─── GENERATOR ───────────────────────────────────────────────────────────────

async function runGenerator(
  currentCode: string,
  feedback?: string
): Promise<string> {
  log('🔧 Generator 실행 중...');

  const feedbackSection = feedback
    ? `\n## 이전 Evaluator 피드백 (반드시 반영)\n${feedback}\n`
    : '';

  const prompt = `당신은 최고 수준의 React/TypeScript/Tailwind CSS 프론트엔드 개발자입니다.
아래 레퍼런스 분석을 보고 현재 App.tsx를 개선하여 완전한 코드를 출력하세요.

${REFERENCE_ANALYSIS}
${feedbackSection}
## 현재 App.tsx
\`\`\`tsx
${currentCode}
\`\`\`

## 요구사항
1. 팝업 레이어: localStorage로 "하루동안 보지 않기" 구현 (키: "reone_popup_hidden")
2. 헤더: 스크롤 감지 (scrollY > 0 시 배경 흰색으로), 중앙 텍스트, Major Solution 드롭다운
3. 풀스크린 GNB: 햄버거 클릭 시 전체화면 메뉴 오버레이 (AnimatePresence로 슬라이드)
4. 히어로: 배경 이미지 + 텍스트 애니메이션 (동영상 대신 어두운 그라데이션 배경)
5. 모든 섹션 구현 (rection01~06)
6. 플로팅 퀵 메뉴: 스크롤 시 우측에 나타남
7. motion/react, lucide-react, Tailwind CSS 사용
8. 기존 DOCTORS, FEATURES, PROGRAMS 데이터 활용

## 출력 규칙
- 완전한 App.tsx 코드만 출력 (설명 없음, 코드 블록 없음)
- 반드시 컴파일 가능한 TypeScript/React 코드
- import 누락 없이`;

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    messages: [{ role: 'user', content: prompt }],
  });

  const raw = (response.content[0] as { type: string; text: string }).text;
  return stripCodeFences(raw);
}

// ─── EVALUATOR ───────────────────────────────────────────────────────────────

interface Section {
  name: string;
  score: number;
  issues: string[];
}

interface EvalResult {
  score: number;
  feedback: string;
  sections: Section[];
}

async function runEvaluator(generatedCode: string): Promise<EvalResult> {
  log('📊 Evaluator 실행 중...');

  // 코드가 너무 길면 앞부분만 전달 (토큰 절약)
  const codeSnippet =
    generatedCode.length > 12000
      ? generatedCode.slice(0, 12000) + '\n// ... (truncated)'
      : generatedCode;

  const prompt = `당신은 웹사이트 UI/UX 전문 평가자입니다.
생성된 React 코드가 아래 레퍼런스 기준을 얼마나 충족하는지 평가하세요.

${REFERENCE_ANALYSIS}

## 생성된 코드 (일부)
\`\`\`tsx
${codeSnippet}
\`\`\`

## 평가 기준 (합계 100점)
| 항목 | 배점 |
|------|------|
| 팝업 레이어 (하루동안 보지않기 포함) | 10 |
| 헤더 (스크롤 효과 + 중앙 텍스트 + Major Solution 드롭다운) | 15 |
| 풀스크린 GNB 네비게이션 (전체 메뉴 구조 + 애니메이션) | 15 |
| 히어로 섹션 (배경 + 텍스트 애니메이션 + wave) | 10 |
| 의료진 섹션 (스크롤 인터랙션) | 10 |
| 시그니처 프로그램 섹션 (hover 효과) | 10 |
| 플로팅 퀵 메뉴 (스크롤 표시) | 5 |
| 전체 디자인 충실도 (색상, 폰트, 레이아웃) | 15 |
| 코드 품질 (TypeScript, 컴파일 가능성) | 10 |

반드시 아래 JSON 형식으로만 응답하세요:
{
  "score": <총점 0-100>,
  "feedback": "<다음 Generator에게 전달할 구체적 개선 지시사항 (한국어)>",
  "sections": [
    { "name": "<섹션명>", "score": <0-배점>, "issues": ["<문제점1>", "<문제점2>"] }
  ]
}`;

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  });

  const raw = (response.content[0] as { type: string; text: string }).text;
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) {
    log('⚠️  Evaluator JSON 파싱 실패, 기본값 사용');
    return { score: 50, feedback: '평가 실패 - 기본 개선 진행', sections: [] };
  }

  return JSON.parse(match[0]) as EvalResult;
}

// ─── MAIN LOOP ────────────────────────────────────────────────────────────────

async function main() {
  // 로그 초기화
  fs.writeFileSync(LOG_PATH, '');
  log('='.repeat(60));
  log('Generator-Evaluator 루프 시작');
  log('='.repeat(60));

  // 원본 백업
  const originalCode = fs.readFileSync(APP_TSX_PATH, 'utf-8');
  fs.writeFileSync(BACKUP_PATH, originalCode);
  log(`✓ 원본 백업: ${BACKUP_PATH}`);

  let currentCode = originalCode;
  let bestScore = 0;
  let bestCode = originalCode;
  let lastFeedback: string | undefined;

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    log('');
    log(`${'─'.repeat(50)}`);
    log(`반복 ${i + 1} / ${MAX_ITERATIONS}`);
    log(`${'─'.repeat(50)}`);

    // Generator
    const generatedCode = await runGenerator(currentCode, lastFeedback);
    log(`✓ Generator 완료 (${generatedCode.length}자)`);

    // Evaluator
    const evaluation = await runEvaluator(generatedCode);

    log(`\n📈 점수: ${evaluation.score} / 100`);
    log(`💬 피드백: ${evaluation.feedback}`);
    if (evaluation.sections.length > 0) {
      log('\n섹션별 결과:');
      for (const s of evaluation.sections) {
        log(`  [${s.score}점] ${s.name}`);
        for (const issue of s.issues) log(`        - ${issue}`);
      }
    }

    // 최고 점수 갱신 시 저장
    if (evaluation.score > bestScore) {
      bestScore = evaluation.score;
      bestCode = generatedCode;
      fs.writeFileSync(APP_TSX_PATH, generatedCode);
      log(`\n✓ App.tsx 업데이트 (최고 점수: ${bestScore}/100)`);
    }

    // 목표 점수 달성
    if (evaluation.score >= PASS_SCORE) {
      log(`\n🎉 목표 점수(${PASS_SCORE}) 달성! 루프 종료`);
      break;
    }

    // 다음 반복을 위한 피드백 준비
    lastFeedback = evaluation.feedback;
    currentCode = generatedCode;
  }

  log('');
  log('='.repeat(60));
  log(`완료! 최종 점수: ${bestScore} / 100`);
  log(`App.tsx 업데이트됨: ${APP_TSX_PATH}`);
  log(`원본 백업 위치: ${BACKUP_PATH}`);
  log('='.repeat(60));

  // 최고 코드가 현재 파일과 다르면 덮어쓰기
  const current = fs.readFileSync(APP_TSX_PATH, 'utf-8');
  if (current !== bestCode) {
    fs.writeFileSync(APP_TSX_PATH, bestCode);
    log('✓ 최고 점수 코드로 최종 저장');
  }
}

main().catch((err) => {
  console.error('❌ 오류 발생:', err);
  process.exit(1);
});
