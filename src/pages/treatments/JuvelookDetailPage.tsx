import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ContactSection from '../../components/ContactSection';

const SIBLINGS = [
  { label: '보톡스', to: '/botox' },
  { label: '필러', to: '/filler' },
  { label: '하이코 · 코필러', to: '/hyaico' },
  { label: '힐로웨이브', to: '/hilowave' },
  { label: '쥬베룩 / 쥬베룩볼륨', to: '/juvelook' },
  { label: '리쥬란 / 리쥬란HB+', to: '/rejuran' },
  { label: '리쥬란아이', to: '/rejuran-eye' },
  { label: '에버클', to: '/evercl' },
];

const EFFECTS = [
  '탄력 증대',
  '잔주름 완화',
  '모공 축소',
  '흉터 개선',
  '피부 재생',
  '피부결 개선',
];

const JUVELOOK_PRODUCTS = {
  juvelook: {
    label: '쥬베룩',
    tags: ['콜라겐 재생 촉진', '피부결 개선', '잔주름 개선', '모공 축소', '흉터 개선'],
    desc: '쥬베룩은 고분자 PLA(폴리락타이드)와 HA(히알루론산)을 결합시킨 자가조직 재생 콜라겐 부스터입니다. 안면부 주름에 주입하면 PDLLA 미세입자가 콜라겐 재생을 촉진하여 피하를 채워줌으로 피부결 개선 및 주름 개선에 도움이 됩니다.',
  },
  volume: {
    label: '쥬베룩 볼륨',
    tags: ['자연스러운 볼륨감', '콜라겐 재생', '피부결 개선', '탄력 개선'],
    desc: '쥬베룩 볼륨은 쥬베룩보다 입자 크기가 커 보다 풍부한 볼륨감을 제공합니다. 꺼진 볼 부위, 팔자 주름 등 볼륨이 필요한 부위에 효과적이며 동시에 콜라겐 재생을 통한 피부 개선 효과도 기대할 수 있습니다.',
  },
};

const WHY_LIST = [
  {
    title: '시간이 지날수록 자연스러운 효과',
    desc: '쥬베룩은 자가 콜라겐 재생 촉진으로 시간이 지날수록 더 자연스러운 효과를 확인할 수 있습니다.',
  },
  {
    title: '볼륨과 피부개선 동시에',
    desc: '주름과 볼륨을 동시에 개선하면서 피부결, 모공, 탄력까지 복합적으로 케어합니다.',
  },
  {
    title: '지속적인 콜라겐 생성',
    desc: '시술 후에도 지속적으로 콜라겐이 생성되어 장기적인 피부 개선 효과가 유지됩니다.',
  },
];

const RECOMMEND = [
  '주름과 볼륨을 동시에\n개선하고 싶은분',
  '자연스러운 볼륨개선을\n원하시는 분',
  '거칠어진 피부결과 넓어진\n모공이 고민이신 분',
  '볼륨 시술 시 얼굴에 남는\n이물감이 부담스러우신 분',
  '전반적인 탄력 개선이\n필요하신 분',
];

// ── 효과 아이콘 (원형 추상 패턴) ──────────────────────────────────────────
function EffectIcon({ index }: { index: number }) {
  const patterns = [
    // 탄력 증대 - 동심원
    <svg key={0} width="48" height="48" viewBox="0 0 48 48" fill="none">
      {[8, 14, 20].map((r, i) => (
        <circle key={i} cx="24" cy="24" r={r} stroke="#b8cfe0" strokeWidth="0.8" />
      ))}
      <circle cx="24" cy="24" r="3" fill="#b8cfe0" />
    </svg>,
    // 잔주름 완화 - 물결
    <svg key={1} width="48" height="48" viewBox="0 0 48 48" fill="none">
      {[10, 18, 26, 34].map((y, i) => (
        <path key={i} d={`M8,${y} Q16,${y - 6} 24,${y} Q32,${y + 6} 40,${y}`}
          stroke="#b8cfe0" strokeWidth="0.8" />
      ))}
    </svg>,
    // 모공 축소 - 격자
    <svg key={2} width="48" height="48" viewBox="0 0 48 48" fill="none">
      {[12, 20, 28, 36].map((v, i) => (
        <React.Fragment key={i}>
          <line x1={v} y1="8" x2={v} y2="40" stroke="#b8cfe0" strokeWidth="0.6" />
          <line x1="8" y1={v} x2="40" y2={v} stroke="#b8cfe0" strokeWidth="0.6" />
        </React.Fragment>
      ))}
      <circle cx="24" cy="24" r="8" stroke="#b8cfe0" strokeWidth="0.8" />
    </svg>,
    // 흉터 개선 - 다이아몬드
    <svg key={3} width="48" height="48" viewBox="0 0 48 48" fill="none">
      {[6, 12, 18].map((d, i) => (
        <polygon key={i} points={`24,${24 - d * 1.5} ${24 + d},24 24,${24 + d * 1.5} ${24 - d},24`}
          stroke="#b8cfe0" strokeWidth="0.8" />
      ))}
    </svg>,
    // 피부 재생 - 나선형
    <svg key={4} width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24,24 Q30,18 24,12 Q18,6 12,12 Q6,18 12,24 Q18,30 24,24 Q30,18 36,24 Q42,30 36,36 Q30,42 24,36"
        stroke="#b8cfe0" strokeWidth="0.8" fill="none" />
    </svg>,
    // 피부결 개선 - 별
    <svg key={5} width="48" height="48" viewBox="0 0 48 48" fill="none">
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180;
        return (
          <line key={i} x1="24" y1="24"
            x2={24 + 18 * Math.cos(angle)} y2={24 + 18 * Math.sin(angle)}
            stroke="#b8cfe0" strokeWidth="0.8" />
        );
      })}
      <circle cx="24" cy="24" r="4" stroke="#b8cfe0" strokeWidth="0.8" />
    </svg>,
  ];
  return patterns[index] || patterns[0];
}

// ── Why 섹션 spirograph 아이콘 ────────────────────────────────────────────
function WhyIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="36" cy="36" rx="28" ry="12"
            stroke="#b8cfe0" strokeWidth="0.7"
            transform={`rotate(${i * 22.5} 36 36)`} />
        ))}
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse key={i} cx="36" cy="36" rx="26" ry="10"
            stroke="#b8cfe0" strokeWidth="0.7"
            transform={`rotate(${i * 30} 36 36)`} />
        ))}
      </svg>
    );
  }
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <circle cx="36" cy="36" r="20" stroke="#b8cfe0" strokeWidth="0.7" />
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i * 36 * Math.PI) / 180;
        const x = 36 + 20 * Math.cos(angle);
        const y = 36 + 20 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="3.5" stroke="#b8cfe0" strokeWidth="0.7" />;
      })}
    </svg>
  );
}

export default function JuvelookDetailPage() {
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'juvelook' | 'volume'>('juvelook');

  const scrollSiblings = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  const product = JUVELOOK_PRODUCTS[activeTab];

  return (
    <>
      {/* ① 히어로 ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #d4eaf5 0%, #e8f4fb 40%, #f0f8ff 70%, #eaf3f8 100%)' }}
      >
        {/* 배경 패턴 */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave-dots" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                <circle cx="24" cy="24" r="1" fill="#7ab8d4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-dots)" />
          </svg>
        </div>

        {/* 우측 SVG 일러스트 */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-18 hidden lg:block pointer-events-none">
          <svg width="420" height="420" viewBox="0 0 420 420" fill="none">
            {Array.from({ length: 14 }).map((_, i) => (
              <ellipse key={i} cx="210" cy="210" rx="190" ry="70"
                stroke="#5fa8c8" strokeWidth="0.5"
                transform={`rotate(${i * 12.86} 210 210)`} />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <ellipse key={i + 14} cx="210" cy="210" rx="100" ry="36"
                stroke="#7bbcda" strokeWidth="0.5"
                transform={`rotate(${i * 18} 210 210)`} />
            ))}
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-36 pb-24">
          {/* 브레드크럼 */}
          <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mb-10 font-medium">
            <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span>쁘띠성형</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-600">쥬베룩</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[12px] font-light tracking-[0.5em] text-[#5a9dbf] uppercase mb-4 italic">
              Collagen booster
            </p>
            <h1 className="text-[48px] md:text-[64px] font-black text-[#1e3f5a] leading-[1.1] tracking-tight mb-6">
              쥬베룩
            </h1>
            <p className="text-[17px] text-[#4a7a96] leading-[1.9] font-normal max-w-lg whitespace-pre-line mb-2">
              {'시간이 지날수록 속 부터 느껴지는\n탄력과 자연스러운 볼륨감'}
            </p>
            <p className="text-[14px] text-[#7aafc8] leading-[1.8] font-normal max-w-lg whitespace-pre-line">
              {'닥터제이앤미의원의 콜라겐 부스터가\n자연스러운 슬로우에이징을 선사합니다.'}
            </p>
          </motion.div>
        </div>

        {/* 하단 웨이브 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 64" className="w-full block" preserveAspectRatio="none">
            <path d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ② 형제 시술 sticky 네비바 ─────────────────────────────────────────── */}
      <div className="sticky top-[64px] z-30 bg-white border-b border-gray-100 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <div className="relative flex items-center max-w-6xl mx-auto">
          <button onClick={() => scrollSiblings('left')}
            className="shrink-0 w-9 h-full flex items-center justify-center text-gray-300 hover:text-gray-600 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div ref={scrollRef}
            className="flex items-stretch overflow-x-auto scroll-smooth gap-0 flex-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {SIBLINGS.map((sib) => {
              const isActive = location.pathname === sib.to;
              return (
                <Link key={sib.to} to={sib.to}
                  className={`relative shrink-0 px-5 py-4 text-[12px] font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive ? 'text-[#111]' : 'text-gray-400 hover:text-gray-700'
                  }`}>
                  {sib.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#6b9ab8]" />
                  )}
                </Link>
              );
            })}
          </div>
          <button onClick={() => scrollSiblings('right')}
            className="shrink-0 w-9 h-full flex items-center justify-center text-gray-300 hover:text-gray-600 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ③ 제품 소개 ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-40 h-40 mx-auto mb-10 rounded-2xl overflow-hidden bg-[#eaf4fb] flex items-center justify-center">
              <img
                src="http://www.reoneskin.com/theme/reone/img/re03_right_img02_n.png"
                alt="쥬베룩 제품"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                }}
              />
            </div>
            <h2 className="text-[26px] md:text-[34px] font-black text-[#222] tracking-tight leading-snug mb-8">
              자가 콜라겐 생성으로 시간이 지날수록 자연스럽게,{' '}
              <span className="text-[#6b9ab8]">쥬베룩</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto space-y-4"
          >
            <p className="text-[14px] text-gray-500 leading-[2.1] font-normal">
              쥬베룩은 고분자 PLA와 인체 피부 조직에 존재하는 히알루론산 성분을 결합시킨 콜라겐 부스터로 자가 콜라겐 생성으로 시간이 지날수록 자연스러운 볼륨효과를 확인할 수 있습니다.
            </p>
            <p className="text-[14px] text-gray-500 leading-[2.1] font-normal">
              쥬베룩은 피부 속 콜라겐 재생 촉진으로 피부 본연의 힘을 끌어올려 볼륨 개선과 더불어 피부결 개선, 주름 완화 등의 효과를 동시에 확인할 수 있는 콜라겐 솔루션입니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ④ 효과 아이콘 그리드 ────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#f7fbfe]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-[24px] md:text-[30px] font-black text-[#222] tracking-tight">
              쥬베룩의 <span className="text-[#6b9ab8]">효과</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            {EFFECTS.map((label, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-white border border-[#d4eaf5] shadow-sm flex items-center justify-center">
                  <EffectIcon index={i} />
                </div>
                <p className="text-[12px] font-bold text-[#333] text-center leading-snug">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑤ 쥬베룩 vs 쥬베룩 볼륨 탭 ───────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-[24px] md:text-[30px] font-black text-[#222] tracking-tight">
              쥬베룩과 쥬베룩 볼륨
            </h2>
          </motion.div>

          {/* 탭 버튼 */}
          <div className="flex justify-center gap-3 mb-12">
            {(['juvelook', 'volume'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full text-[13px] font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-[#6b9ab8] text-white shadow-md'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {JUVELOOK_PRODUCTS[tab].label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row gap-12 items-center"
          >
            {/* 제품 이미지 */}
            <div className="shrink-0 w-48 h-48 rounded-2xl bg-[#eaf4fb] flex items-center justify-center overflow-hidden">
              <img
                src="http://www.reoneskin.com/theme/reone/img/re03_right_img02_n.png"
                alt={product.label}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>

            {/* 설명 */}
            <div className="flex-1">
              <h3 className="text-[20px] font-black text-[#222] mb-5">{product.label}</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-[#eaf4fb] text-[#5a8aaa] text-[11px] font-bold">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-[13px] text-gray-500 leading-[2] font-normal">{product.desc}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ⑥ JUVE LOOK 왜 쥬베룩일까요? ───────────────────────────────────────── */}
      <section className="py-24 bg-[#f7fbfe]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[11px] font-black tracking-[0.5em] text-[#6b9ab8] uppercase mb-3">JUVE LOOK</p>
            <h2 className="text-[26px] md:text-[32px] font-black text-[#222] tracking-tight">
              왜 쥬베룩일까요?
            </h2>
          </motion.div>

          <div className="space-y-0">
            {WHY_LIST.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`flex flex-col md:flex-row items-start gap-10 py-12 ${i < WHY_LIST.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className="flex-1">
                  <p className="text-[11px] font-black tracking-[0.4em] text-[#6b9ab8] uppercase mb-3">
                    0{i + 1}
                  </p>
                  <h3 className="text-[18px] font-black text-[#222] tracking-tight leading-snug mb-4">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 leading-[2] font-normal">
                    {item.desc}
                  </p>
                </div>
                <div className="shrink-0 flex items-center justify-center w-[90px]">
                  <WhyIcon index={i} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑦ 추천 대상 (3+2 그리드) ────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[11px] font-black tracking-[0.5em] text-[#6b9ab8] uppercase mb-3">Recommend</p>
            <h2 className="text-[26px] md:text-[32px] font-black text-[#222] tracking-tight">
              이런 분에게 추천드립니다
            </h2>
          </motion.div>

          {/* 3+2 그리드 */}
          <div className="mb-12">
            {/* 첫 번째 행: 3개 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-200 mb-px">
              {RECOMMEND.slice(0, 3).map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="bg-white flex flex-col items-center justify-center text-center py-10 px-6 gap-4"
                >
                  <span className="w-8 h-8 rounded-full border border-[#6b9ab8] text-[#6b9ab8] text-[11px] font-black flex items-center justify-center">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[13px] text-[#333] font-medium leading-[1.8] whitespace-pre-line">{r}</p>
                </motion.div>
              ))}
            </div>
            {/* 두 번째 행: 2개 중앙 정렬 */}
            <div className="grid grid-cols-2 gap-px bg-gray-200 md:grid-cols-2 md:max-w-[66.666%] md:mx-auto">
              {RECOMMEND.slice(3).map((r, i) => (
                <motion.div
                  key={i + 3}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i + 3) * 0.06 }}
                  className="bg-white flex flex-col items-center justify-center text-center py-10 px-6 gap-4"
                >
                  <span className="w-8 h-8 rounded-full border border-[#6b9ab8] text-[#6b9ab8] text-[11px] font-black flex items-center justify-center">
                    {String(i + 4).padStart(2, '0')}
                  </span>
                  <p className="text-[13px] text-[#333] font-medium leading-[1.8] whitespace-pre-line">{r}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://pf.kakao.com/_YFJas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-[#2c2c2c] text-white text-[14px] font-bold rounded-full hover:bg-[#444] transition-colors"
            >
              상담 신청하기
            </a>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
