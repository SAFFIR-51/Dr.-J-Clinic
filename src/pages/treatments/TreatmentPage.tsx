import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import ContactSection from '../../components/ContactSection';

// ── 전체 카테고리 + 시술 데이터 ───────────────────────────────────────────
const ALL_CATEGORIES = [
  {
    label: '쁘띠성형',
    keys: ['쁘띠성형', '페이스라인 · 쁘띠'],
    items: [
      { label: '보톡스', to: '/botox' },
      { label: '필러', to: '/filler' },
      { label: '하이코 · 코필러', to: '/hyaico' },
      { label: '힐로웨이브', to: '/hilowave' },
      { label: '쥬베룩 / 쥬베룩볼륨', to: '/juvelook' },
      { label: '리쥬란 / 리쥬란HB+', to: '/rejuran' },
      { label: '리쥬란아이', to: '/rejuran-eye' },
      { label: '에버클', to: '/evercl' },
      { label: '벨로테로 리바이브', to: '/belotero-revive' },
    ],
  },
  {
    label: '리프팅',
    keys: ['리프팅'],
    items: [
      { label: '슈링크', to: '/shrink' },
      { label: '인모드', to: '/inmode' },
      { label: '올리지오', to: '/olligio' },
      { label: '더블로골드', to: '/doublo-gold' },
    ],
  },
  {
    label: '색소·레이저',
    keys: ['색소·레이저'],
    items: [
      { label: '피코슈어', to: '/picosure' },
      { label: '시크릿 듀오', to: '/secret-duo' },
      { label: '노블린', to: '/nobelin' },
      { label: '미인레이저', to: '/miiin-laser' },
      { label: '에이톤레이저', to: '/aeton-laser' },
      { label: 'CO2 레이저', to: '/co2-laser' },
    ],
  },
  {
    label: '스킨케어',
    keys: ['스킨케어'],
    items: [
      { label: 'IBPS 부스터필', to: '/ibps' },
      { label: '블랙필', to: '/blackpeel' },
      { label: '아쿠아필', to: '/aquapeel' },
      { label: '초음파관리 (LDM)', to: '/ldm' },
      { label: '더마샤인', to: '/dermashine' },
      { label: 'NDA플러스', to: '/nda-plus' },
    ],
  },
  {
    label: '바디·제모',
    keys: ['바디 · 제모'],
    items: [
      { label: '아포지플러스', to: '/apogee-plus' },
      { label: '빨간주사, HPL', to: '/red-injection' },
      { label: '노블쉐이프', to: '/nobleshape' },
      { label: '오니코 레이저', to: '/onico-laser' },
      { label: '카복시', to: '/carboxy' },
    ],
  },
];

// ── TreatmentData 인터페이스 ──────────────────────────────────────────────
export interface TreatmentData {
  category: string;
  breadcrumbCategory: string;
  en: string;
  ko: string;
  tagline: string;
  subtitle: string;
  heroImage?: string;
  intro: string;
  badges: string[];
  points: { title: string; desc: string }[];
  benefits: string[];
  recommendFor: string[];
  whyReone: { title: string; desc: string; image?: string }[];
  bgImage?: string;
  themeColor?: string;
  themeColorEnd?: string;
  deviceCount?: string;
  deviceLabel?: string;
  concept?: string;
  features?: string[];
  areas?: string[];
  areaDetails?: { title: string; desc: string; image?: string }[];
  process?: { step: string; title: string; desc: string; image?: string }[];
  cautions?: string[];
  faq?: { q: string; a: string }[];
  // 새 필드 (레퍼런스 이미지 매핑)
  deviceImage?: string;   // 메인 장비/제품 풀폭 이미지
  sectionBg?: string;     // 섹션 배경 이미지
  bandBg?: string;        // 띠 배경 이미지
  faceImage?: string;     // 얼굴/시술부위 이미지
  bannerImage?: string;   // 에디토리얼 배너 이미지
}

interface Props {
  data: TreatmentData;
}


// ── FAQ 아코디언 아이템 ────────────────────────────────────────────────────
function FaqItem({ item, tc, index }: { item: { q: string; a: string }; tc: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="border-b border-gray-100"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-[14px] font-bold text-[#111] pr-4">{item.q}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          style={{ color: tc }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-[13px] text-gray-500 leading-[1.9] pb-5 font-normal">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── 메인 페이지 ──────────────────────────────────────────────────────────
export default function TreatmentPage({ data }: Props) {
  const tc = data.themeColor || '#6b9ab8';
  const tcEnd = data.themeColorEnd || '#4a7a98';
  const location = useLocation();
  const navigate = useNavigate();

  const currentCategory = ALL_CATEGORIES.find((c) =>
    c.keys.includes(data.breadcrumbCategory)
  ) ?? ALL_CATEGORIES[0];
  const currentTreatment = currentCategory.items.find((t) => t.to === location.pathname)
    ?? currentCategory.items[0];

  const [catOpen, setCatOpen] = useState(false);
  const [treatOpen, setTreatOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);
  const treatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = `${data.ko} | 닥터제이앤미의원`;
    return () => { document.title = '닥터제이앤미의원 | Dr. J&Me'; };
  }, [data.ko]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
      if (treatRef.current && !treatRef.current.contains(e.target as Node)) setTreatOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      {/* ① 히어로 섹션 ─────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden" style={{ height: '80vh', minHeight: 520 }}>
        {/* 배경 이미지 또는 그라디언트 */}
        {data.heroImage ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${data.heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(160deg, ${tc} 0%, ${tcEnd} 100%)`,
            }}
          />
        )}

        {/* 어두운 오버레이 */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.30)' }} />

        {/* 중앙 텍스트 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        >
          <h1
            className="italic text-white leading-[1.1] mb-6"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(44px, 7vw, 80px)',
              letterSpacing: '-0.01em',
            }}
          >
            {data.en}
          </h1>
          <p className="text-white/80 text-[16px] md:text-[18px] leading-[1.9] mb-3 font-semibold">
            {data.ko}
          </p>
          <p className="text-white/60 text-[14px] leading-[1.9] max-w-md mx-auto whitespace-pre-line">
            {data.tagline}
          </p>
        </motion.div>

      </section>

      {/* ② 시술 선택 sticky 네비바 ──────────────────────────────────────── */}
      <div className="sticky top-[64px] z-30 bg-white border-b border-gray-100 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-center gap-3">

          {/* 카테고리 드롭다운 */}
          <div ref={catRef} className="relative shrink-0">
            <button
              onClick={() => { setCatOpen((v) => !v); setTreatOpen(false); }}
              className="flex items-center gap-2 h-10 px-4 rounded-full border border-gray-200 text-[13px] font-bold text-[#111] hover:border-gray-400 transition-colors"
            >
              {currentCategory.label}
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${catOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {catOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.10)] rounded-xl overflow-hidden min-w-[160px] z-50"
                >
                  {ALL_CATEGORIES.map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => {
                        setCatOpen(false);
                        navigate(cat.items[0].to);
                      }}
                      className={`w-full text-left px-5 py-3 text-[13px] font-semibold transition-colors hover:bg-gray-50 ${
                        cat.label === currentCategory.label ? 'text-[#111]' : 'text-gray-400'
                      }`}
                    >
                      {cat.label}
                      {cat.label === currentCategory.label && (
                        <span className="ml-1.5 text-[10px]" style={{ color: tc }}>●</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <span className="text-gray-300 text-[16px] shrink-0">/</span>

          {/* 시술 드롭다운 */}
          <div ref={treatRef} className="relative shrink-0">
            <button
              onClick={() => { setTreatOpen((v) => !v); setCatOpen(false); }}
              className="flex items-center gap-2 h-10 px-4 rounded-full border text-[13px] font-bold transition-colors"
              style={{ borderColor: tc, color: tc }}
            >
              <span>{currentTreatment.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${treatOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {treatOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.10)] rounded-xl overflow-hidden min-w-[220px] z-50"
                >
                  {currentCategory.items.map((item) => {
                    const isActive = location.pathname === item.to;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setTreatOpen(false)}
                        className={`flex items-center justify-between px-5 py-3 text-[13px] font-semibold transition-colors hover:bg-gray-50 ${
                          isActive ? 'text-[#111]' : 'text-gray-400'
                        }`}
                      >
                        {item.label}
                        {isActive && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: tc }} />}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ③ 시술 소개 ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          {/* 헤딩 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-6 mb-16"
          >
            <svg viewBox="0 0 70 70" width="44" height="44" stroke="currentColor" strokeWidth="0.55" fill="none"
              className="shrink-0 hidden sm:block" style={{ color: `${tc}50` }}>
              {Array.from({ length: 7 }, (_, i) => (
                <ellipse key={i} cx="35" cy="35" rx="30" ry="11" transform={`rotate(${(180 / 7) * i} 35 35)`} />
              ))}
            </svg>
            <div className="text-center">
              <p className="text-[10px] font-black tracking-[0.5em] uppercase text-gray-400 mb-3">닥터제이앤미의원</p>
              <h2 className="text-[#111] leading-[1.15] tracking-tight">
                <span className="block font-black" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}>{data.subtitle}</span>
                <span className="block italic font-light mt-1"
                  style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 'clamp(22px, 3vw, 36px)', color: tc, letterSpacing: '0.02em' }}>
                  {data.en}
                </span>
              </h2>
            </div>
            <svg viewBox="0 0 70 70" width="44" height="44" stroke="currentColor" strokeWidth="0.55" fill="none"
              className="shrink-0 hidden sm:block" style={{ color: `${tc}50` }}>
              {Array.from({ length: 7 }, (_, i) => (
                <ellipse key={i} cx="35" cy="35" rx="30" ry="11" transform={`rotate(${(180 / 7) * i} 35 35)`} />
              ))}
            </svg>
          </motion.div>

          {/* 본문 2-col */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }} className="flex flex-col gap-8">
              <p className="text-[14px] text-gray-500 leading-[2.1] whitespace-pre-line">{data.intro}</p>
              {/* 배지 — pill 태그 */}
              <div>
                <p className="text-[10px] font-black tracking-[0.5em] uppercase text-gray-400 mb-4">{data.en} — Point</p>
                <div className="flex flex-wrap gap-2">
                  {data.badges.map((b, i) => (
                    <span key={i}
                      className="px-4 py-1.5 rounded-full text-[12px] font-bold border"
                      style={{ borderColor: `${tc}40`, color: tc, backgroundColor: `${tc}0a` }}>
                      {b}
                    </span>
                  ))}
                </div>
              </div>
              {data.deviceCount && (
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl self-start"
                  style={{ backgroundColor: `${tc}10` }}>
                  <span className="font-black text-[20px] leading-none" style={{ color: tc }}>{data.deviceCount}대</span>
                  <span className="text-[12px] font-bold text-gray-500">국내 최다 보유</span>
                </div>
              )}
            </motion.div>
            {data.deviceImage && (
              <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                <img src={data.deviceImage} alt={data.ko} className="w-full object-cover" />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ④ Why 섹션 ─────────────────────────────────────────────────────── */}
      {data.whyReone.length > 0 && (
        <section className="py-24" style={{ background: `linear-gradient(160deg, ${tc}15 0%, ${tc}06 100%)` }}>
          <div className="max-w-5xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-16">
              <p className="text-[10px] font-black tracking-[0.5em] uppercase mb-4 text-gray-400">Why Dr. J&Me</p>
              <h2 className="font-black text-[#111] tracking-tight" style={{ fontSize: 'clamp(22px, 3vw, 36px)' }}>
                왜 {data.ko}는<br />
                <span className="italic font-medium"
                  style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: tc, fontSize: '1.08em' }}>
                  닥터제이앤미의원
                </span>
                일까요?
              </h2>
            </motion.div>

            <div className={`grid grid-cols-1 gap-4 ${data.whyReone.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
              {data.whyReone.map((w, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl px-8 py-7 shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] transition-shadow">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${tc}18` }}>
                      {i === 0 && (
                        <svg viewBox="0 0 40 40" width="22" height="22" stroke="currentColor" strokeWidth="0.75" fill="none" style={{ color: tc }}>
                          {Array.from({ length: 13 }, (_, j) => {
                            const y = 6 + j * 2.3;
                            const halfW = ((y - 6) / 28) * 15;
                            return <line key={j} x1={20 - halfW} y1={y} x2={20 + halfW} y2={y} />;
                          })}
                        </svg>
                      )}
                      {i === 1 && (
                        <svg viewBox="0 0 40 40" width="22" height="22" stroke="currentColor" strokeWidth="0.75" fill="none" style={{ color: tc }}>
                          {Array.from({ length: 6 }, (_, j) => (
                            <ellipse key={j} cx="20" cy="20" rx="16" ry="7" transform={`rotate(${30 * j} 20 20)`} />
                          ))}
                        </svg>
                      )}
                      {i === 2 && (
                        <svg viewBox="0 0 40 40" width="22" height="22" stroke="currentColor" strokeWidth="0.75" fill="none" style={{ color: tc }}>
                          {Array.from({ length: 8 }, (_, j) => (
                            <ellipse key={j} cx="20" cy="20" rx="15" ry={1.5 + j * 2.2} />
                          ))}
                        </svg>
                      )}
                      {i === 3 && (
                        <svg viewBox="0 0 40 40" width="22" height="22" stroke="currentColor" strokeWidth="0.75" fill="none" style={{ color: tc }}>
                          {Array.from({ length: 14 }, (_, j) => {
                            const angle = ((180 + j * 7) * Math.PI) / 180;
                            return (
                              <line key={j} x1={34} y1={34} x2={34 + Math.cos(angle) * 34} y2={34 + Math.sin(angle) * 34} />
                            );
                          })}
                        </svg>
                      )}
                    </div>
                    <span className="text-[13px] font-black tracking-widest" style={{ color: `${tc}80` }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-black text-[#111] mb-3 leading-snug">{w.title}</h3>
                  <p className="text-[13px] text-gray-500 leading-[1.9]">{w.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ④-b sectionBg 스플릿 */}
      {data.sectionBg && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col gap-5 px-2 md:px-4 order-2 md:order-1">
                <p className="text-[10px] font-black tracking-[0.5em] uppercase text-gray-400">닥터제이앤미의원</p>
                <h3 className="font-black text-[#111] leading-snug tracking-tight"
                  style={{ fontSize: 'clamp(20px, 2.5vw, 28px)' }}>{data.subtitle}</h3>
                <p className="text-[13px] text-gray-500 leading-[2]">{data.intro.split('\n')[0]}</p>
              </div>
              <div className="rounded-3xl overflow-hidden aspect-[4/3] order-1 md:order-2 shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
                <img src={data.sectionBg} alt={data.ko} className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ⑤ 시술 부위 ─────────────────────────────────────────────────────── */}
      {(data.areaDetails?.length || data.areas?.length) ? (
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-16">
              <p className="text-[10px] font-black tracking-[0.5em] uppercase mb-3 text-gray-400">아무도 모르게 예뻐지는</p>
              <h2 className="text-[26px] md:text-[34px] font-black text-[#111] tracking-tight">
                {data.ko} 시술부위
              </h2>
            </motion.div>

            {/* areaDetails 있으면 번호+설명 카드, 없으면 pill 태그 */}
            {data.areaDetails && data.areaDetails.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-0">
                {data.areaDetails.map((area, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-5 py-6 border-b border-gray-100">
                    <span className="shrink-0 text-[13px] font-black tabular-nums leading-none pt-1"
                      style={{ color: `${tc}70` }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-[15px] font-black text-[#111] mb-1.5 leading-snug">{area.title}</h3>
                      <p className="text-[13px] text-gray-500 leading-[1.85]">{area.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-3">
                {data.areas!.map((area, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2.5 px-5 py-3 rounded-full border"
                    style={{ borderColor: `${tc}35`, backgroundColor: `${tc}08` }}>
                    <span className="text-[10px] font-black tabular-nums" style={{ color: `${tc}80` }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[13px] font-bold text-[#222]">{area}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : null}

      {/* ⑤-b 이런 분들께 추천 ──────────────────────────────────────────────── */}
      {data.recommendFor.length > 0 && (
        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="flex items-center gap-4 mb-8">
              <div className="h-[1px] flex-1 bg-gray-100" />
              <div className="text-center shrink-0">
                <p className="text-[10px] font-black tracking-[0.5em] uppercase text-gray-400">이런 분들께 추천드립니다</p>
              </div>
              <div className="h-[1px] flex-1 bg-gray-100" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {data.recommendFor.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 px-5 py-4 rounded-xl border border-gray-100
                    hover:border-transparent hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] transition-all"
                  style={{ backgroundColor: `${tc}06` }}>
                  <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${tc}20` }}>
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round" style={{ color: tc }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-[13px] font-medium text-[#333] leading-[1.5]">{r}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ⑥ 에디토리얼 배너 — "닥터제이앤미 × Treatment Solution" ──────────── */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${tc}22 0%, ${tc}0e 60%, ${tc}04 100%)` }}>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-[0.06] pointer-events-none z-0">
          <svg viewBox="0 0 300 300" width="100%" height="100%" stroke="currentColor" strokeWidth="0.8" fill="none"
            style={{ color: tc }}>
            {Array.from({ length: 8 }, (_, i) => (
              <ellipse key={i} cx="150" cy="150" rx="130" ry="45" transform={`rotate(${22.5 * i} 150 150)`} />
            ))}
          </svg>
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* 상단: 텍스트 좌 + 이미지 우 */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            {/* 좌: 텍스트 */}
            <div className="flex flex-col gap-6">
              <p className="text-[10px] font-black tracking-[0.5em] uppercase text-gray-400">Dr. J&Me Solution</p>
              <h2 className="leading-[1.15] tracking-tight text-[#111]"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                <span className="block font-black" style={{ fontFamily: 'Pretendard, sans-serif' }}>닥터제이앤미의원</span>
                <span className="block italic font-light mt-1"
                  style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: tc, fontSize: '0.9em' }}>
                  × {data.en} Solution
                </span>
              </h2>
              <p className="text-[14px] text-gray-500 leading-[2]">
                정확한 분석과 검증된 제품, 개인 맞춤 설계로<br />
                닥터제이앤미의원만의 {data.ko} 솔루션을 경험하세요.
              </p>
              <a href="https://pf.kakao.com/_YFJas" target="_blank" rel="noopener noreferrer"
                className="self-start inline-flex items-center gap-2 px-8 py-3.5 text-white text-[13px] font-bold rounded-full
                  shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:opacity-85 transition-opacity"
                style={{ backgroundColor: tc }}>
                상담 신청하기
              </a>
            </div>
            {/* 우: 이미지 */}
            {data.bannerImage ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.15 }}
                className="rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.14)] aspect-[16/9]">
                <img src={data.bannerImage} alt={data.ko} className="w-full h-full object-contain" />
              </motion.div>
            ) : (
              <div className="rounded-3xl aspect-[4/3] flex items-center justify-center"
                style={{ backgroundColor: `${tc}18` }}>
                <svg viewBox="0 0 120 120" width="70" height="70" stroke="currentColor" strokeWidth="0.6" fill="none"
                  style={{ color: `${tc}70` }}>
                  {Array.from({ length: 7 }, (_, i) => (
                    <ellipse key={i} cx="60" cy="60" rx="52" ry="18" transform={`rotate(${(180/7)*i} 60 60)`} />
                  ))}
                </svg>
              </div>
            )}
          </motion.div>

          {/* 하단: 포인트 리스트 3열 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.whyReone.slice(0, 3).map((w, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-6 flex flex-col gap-3">
                <span className="text-[11px] font-black tracking-widest" style={{ color: tc }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[14px] font-black text-[#111] leading-snug">{w.title}</p>
                <p className="text-[12px] text-gray-500 leading-[1.8]">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑦ 시술 과정 — 원형 번호 + 화살표 연결 ───────────────────────────── */}
      {data.process && data.process.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-16">
              <p className="text-[10px] font-black tracking-[0.5em] uppercase mb-3 text-gray-400">Treatment Process</p>
              <h2 className="text-[26px] md:text-[32px] font-black text-[#111] tracking-tight">시술 과정</h2>
            </motion.div>

            <div className={`grid grid-cols-1 gap-4 ${data.process!.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2 md:grid-cols-4'}`}>
              {data.process.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative rounded-2xl px-6 py-7 flex flex-col gap-3 overflow-hidden"
                  style={{ backgroundColor: `${tc}08` }}>
                  {/* 배경 장식 숫자 */}
                  <span className="absolute right-4 top-2 text-[58px] font-black leading-none pointer-events-none select-none"
                    style={{ color: `${tc}18` }}>{p.step}</span>
                  {/* 번호 뱃지 */}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-black shrink-0"
                    style={{ backgroundColor: tc }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-[14px] font-black text-[#111] leading-snug mt-1">{p.title}</h3>
                  <p className="text-[12px] text-gray-500 leading-[1.85]">{p.desc}</p>
                  {/* 하단 연결 화살표 (모바일 숨김) */}
                  {i < data.process!.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" style={{ color: `${tc}60` }}>
                        <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ⑧ 주의사항 ────────────────────────────────────────────────────────── */}
      {data.cautions && data.cautions.length > 0 && (
        <section className="py-20" style={{ background: `${tc}07` }}>
          <div className="max-w-5xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-12">
              <p className="text-[10px] font-black tracking-[0.5em] uppercase mb-3 text-gray-400">Precautions</p>
              <h2 className="text-[26px] md:text-[32px] font-black text-[#111] tracking-tight">시술 후 주의사항</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-0 max-w-3xl mx-auto">
              {data.cautions.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-4 py-4 border-b border-gray-200/60">
                  <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-white mt-0.5"
                    style={{ backgroundColor: tc }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[13px] text-gray-600 leading-[1.8] font-medium">{c}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection />
    </>
  );
}
