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

const FEATURES = [
  {
    title: '깊은 주름의 정도별 보톡스 맞춤치료 노하우',
    desc: '깊은 주름 부위에 보톡스를 주입하는 시술은 시술 부위에 정확하게 주입하는 노하우가 중요합니다. 닥터제이앤미의원은 시술 전 개인의 근육 움직임과 주름 패임정도를 면밀하게 진단하여 개인에게 가장 적합한 보톡스 시술을 진행하고 있습니다.',
  },
  {
    title: '얼굴 전체의 조화를 고려한 디자인',
    desc: '닥터제이앤미의원의 의료진은 개인의 얼굴 전체의 조화를 고려하여 개인 맞춤 디자인을 통해 만족스러운 페이스 라인 교정을 제공합니다.',
  },
  {
    title: '효능과 안정성이 입증된 정품 보톡스 업선',
    desc: '닥터제이앤미의원에서는 미국 엘러간사의 보톡스, 독일 멀츠사의 제오민, 휴젤의 보톨렉스, 메디톡스의 코어톡스 등 임상적 안정성이 입증된 정품 보툴리눔 톡신 제품만을 사용합니다.',
  },
  {
    title: '특수 제작 나노니들 사용',
    desc: '닥터제이앤미의원은 보톡스 시술 시 시술 자국이 최소화 될 수 있도록 특수 제작된 나노 니들을 사용하고 있습니다.',
  },
];

const PRINCIPLES = [
  '고객의 안전과 위생을 최우선으로 합니다.',
  '1:1 개인별 진단 후 맞춤 디자인 합니다.',
  '과한 시술이 아닌 건강하고 자연스러운 아름다움을 드립니다.',
  '숙련된 노하우와 미적감각으로 진행합니다.',
  '개인의 특성을 살려 가장 어울리는 디자인으로 진행합니다.',
  '끊임없는 학술연구와 함께 실력을 결과로 증명합니다.',
];

const RECOMMEND = [
  '얼굴이나 목에\n주름이 많은 분',
  '사각턱이\n발달한 분',
  '종아리 근육이 발달하여\n고민인 분',
  '승모근이 발달하여\n뭉치는 통증이 있는 분',
  '웨딩·증명사진\n예정인 분',
  '자연스러운\n페이스라인을 원하는 분',
];

// ── 기하학 SVG 아이콘 ─────────────────────────────────────────────────────
function Icon1() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={i}
          cx="40" cy="40" rx="30" ry="14"
          stroke="#b8cfe0" strokeWidth="0.8"
          transform={`rotate(${i * 22.5} 40 40)`}
        />
      ))}
    </svg>
  );
}

function Icon2() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse
          key={i}
          cx="40" cy="40" rx="28" ry="12"
          stroke="#b8cfe0" strokeWidth="0.8"
          transform={`rotate(${i * 30} 40 40)`}
        />
      ))}
    </svg>
  );
}

function Icon3() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="22" stroke="#b8cfe0" strokeWidth="0.8" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x = 40 + 22 * Math.cos(angle);
        const y = 40 + 22 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="4" stroke="#b8cfe0" strokeWidth="0.8" />;
      })}
    </svg>
  );
}

function Icon4() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[0, 60, 120].map((deg, i) => (
        <polygon
          key={i}
          points="40,14 66,58 14,58"
          stroke="#b8cfe0" strokeWidth="0.8"
          transform={`rotate(${deg} 40 40)`}
        />
      ))}
    </svg>
  );
}

const ICONS = [Icon1, Icon2, Icon3, Icon4];

export default function BotoxDetailPage() {
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollSiblings = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  return (
    <>
      {/* ① 히어로 ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #dce8f0 0%, #edf3f8 40%, #f5eff8 70%, #f0eae8 100%)' }}
      >
        {/* 배경 패턴 */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#a0bcd0" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        {/* 우측 SVG 일러스트 */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 hidden lg:block pointer-events-none">
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
            {Array.from({ length: 12 }).map((_, i) => (
              <ellipse key={i} cx="200" cy="200" rx="180" ry="80"
                stroke="#7aaac8" strokeWidth="0.6"
                transform={`rotate(${i * 15} 200 200)`} />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <ellipse key={i + 12} cx="200" cy="200" rx="100" ry="40"
                stroke="#9ab8cc" strokeWidth="0.5"
                transform={`rotate(${i * 22.5} 200 200)`} />
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
            <span className="text-gray-600">보톡스</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[12px] font-light tracking-[0.5em] text-[#8aafc5] uppercase mb-4 italic">
              Botox / Skin booster
            </p>
            <h1 className="text-[48px] md:text-[64px] font-black text-[#2c4a5e] leading-[1.1] tracking-tight mb-6">
              보톡스
            </h1>
            <p className="text-[17px] text-[#5a7a8e] leading-[1.9] font-normal max-w-lg whitespace-pre-line mb-2">
              {'얼굴의 작은 움직임까지 고려하는\n디테일한 맞춤 페이스라인 교정'}
            </p>
            <p className="text-[14px] text-[#8aafc5] leading-[1.8] font-normal max-w-lg whitespace-pre-line">
              {'개인의 얼굴에 맞는 페이스라인 교정\n닥터제이앤미의원에서 확인하세요.'}
            </p>
          </motion.div>
        </div>

        {/* 하단 웨이브 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 64" className="w-full block" preserveAspectRatio="none">
            <path d="M0,64 C360,0 720,48 1080,16 C1260,0 1380,32 1440,24 L1440,64 Z" fill="white" />
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

      {/* ③ 보톡스 소개 ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-[28px] md:text-[36px] font-black text-[#222] tracking-tight leading-snug mb-10">
              닥터제이앤미의원의 <span className="text-[#6b9ab8]">맞춤</span> 보톡스
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <img
              src="http://www.reoneskin.com/theme/reone/img/re03_right_img02_n.png"
              alt="보톡스 제품"
              className="w-auto max-h-64 mx-auto mb-10 object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="text-[15px] text-gray-500 leading-[2.1] font-normal max-w-2xl mx-auto"
          >
            닥터제이앤미의원은 풍부한 보톡스 시술 경험을 통한 노하우를 바탕으로 얼굴 전체의 조화로움을 고려한 맞춤 디자인으로 자연스럽게 페이스라인을 교정합니다.
          </motion.p>
        </div>
      </section>

      {/* ④ 4가지 특징 ────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6">
          {FEATURES.map((feat, i) => {
            const IconComp = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`flex flex-col md:flex-row items-start gap-10 py-12 ${i < FEATURES.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className="flex-1">
                  <p className="text-[11px] font-black tracking-[0.4em] text-[#6b9ab8] uppercase mb-3">
                    0{i + 1}
                  </p>
                  <h3 className="text-[18px] font-black text-[#222] tracking-tight leading-snug mb-4">
                    {feat.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 leading-[2] font-normal">
                    {feat.desc}
                  </p>
                </div>
                <div className="shrink-0 flex items-center justify-center w-[100px]">
                  <IconComp />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ⑤ 클리닉 인테리어 사진 ─────────────────────────────────────────────── */}
      <section className="py-16 bg-[#f9fbfc]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <img
              src="http://www.reoneskin.com/theme/reone/img/re03_right_img01_n.png"
              alt="닥터제이앤미의원 클리닉"
              className="w-full rounded-2xl object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = 'none';
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ⑥ 원칙 불릿 리스트 ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-[24px] md:text-[30px] font-black text-[#222] tracking-tight">
              닥터제이앤미의원의 <span className="text-[#6b9ab8]">보톡스 원칙</span>
            </h2>
          </motion.div>
          <div className="space-y-4">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-center gap-4 bg-[#f5f9fc] rounded-xl px-6 py-4"
              >
                <span className="w-6 h-6 rounded-full bg-[#6b9ab8] text-white text-[10px] font-black flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <p className="text-[13px] text-[#444] font-medium">{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑦ 스킨부스터 섹션 ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#f5f9fc]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[11px] font-black tracking-[0.5em] text-[#6b9ab8] uppercase mb-4">Skin Booster</p>
            <h2 className="text-[24px] md:text-[32px] font-black text-[#222] tracking-tight leading-snug mb-8">
              피부 속부터 건강하게 개선하는 스킨케어 솔루션,{' '}
              <span className="text-[#6b9ab8]">스킨부스터</span>
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <img
              src="http://www.reoneskin.com/theme/reone/img/re03_right_img03_n.png"
              alt="스킨부스터"
              className="w-auto max-h-64 mx-auto mb-10 object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="text-[14px] text-gray-500 leading-[2.1] font-normal max-w-2xl mx-auto"
          >
            닥터제이앤미의원의 스킨부스터는 피부 환경부터 바꾸어 피부 속부터 밝고 건강하게 피부의 근본부터 개선하여 깨끗하고 건강한 피부 환경으로 개선합니다.
          </motion.p>
        </div>
      </section>

      {/* ⑧ 추천 대상 ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[11px] font-black tracking-[0.5em] text-[#6b9ab8] uppercase mb-3">Recommend</p>
            <h2 className="text-[26px] md:text-[32px] font-black text-[#222] tracking-tight">
              이런 분에게 추천드립니다
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-200 mb-12">
            {RECOMMEND.map((r, i) => (
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
