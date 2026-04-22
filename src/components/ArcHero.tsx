import React from 'react';
import { motion } from 'motion/react';

interface ArcHeroProps {
  labelSmall: string;
  titleLarge: string;
  description: string;
  bgImage?: string;
  bgVariant?: 'cream' | 'silver' | 'marble';
  overlay?: boolean;
  noArc?: boolean;
}

function BgCream() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #f5ede4 0%, #ecddd2 50%, #dfd0c4 100%)' }}
    >
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[560px] rounded-full border-[80px] border-[#e5d4c4]/30" />
      <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-[620px] h-[460px] rounded-full border-[55px] border-[#d9c9b8]/25" />
      <div className="absolute top-[160px] left-1/2 -translate-x-1/2 w-[440px] h-[340px] rounded-full border-[35px] border-[#cdbfad]/20" />
    </div>
  );
}

function BgSilver() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #f2f2f2 0%, #e6e6e6 40%, #dadada 100%)' }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 700" preserveAspectRatio="xMidYMid slice">
        <path d="M-100,350 Q350,100 700,350 Q1050,600 1500,350 L1500,700 L-100,700 Z" fill="rgba(255,255,255,0.18)" />
        <path d="M-100,420 Q350,180 700,420 Q1050,660 1500,420 L1500,700 L-100,700 Z" fill="rgba(255,255,255,0.12)" />
        <path d="M-100,260 Q350,20 700,260 Q1050,500 1500,260 L1500,0 L-100,0 Z" fill="rgba(255,255,255,0.10)" />
      </svg>
    </div>
  );
}

function BgMarble() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f8f7f5 0%, #f0ede8 30%, #e8e3dc 60%, #f0ede8 100%)' }}
    >
      <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 1400 700" preserveAspectRatio="xMidYMid slice">
        <path d="M200,0 Q400,200 300,350 Q200,500 400,700" stroke="#b8b0a5" strokeWidth="1.5" fill="none" />
        <path d="M500,0 Q650,150 600,300 Q550,450 700,700" stroke="#aaa29a" strokeWidth="1" fill="none" />
        <path d="M800,0 Q750,200 900,350 Q1050,500 950,700" stroke="#b8b0a5" strokeWidth="1.5" fill="none" />
        <path d="M1100,0 Q1200,200 1050,400 Q900,600 1100,700" stroke="#aaa29a" strokeWidth="1" fill="none" />
        <path d="M0,200 Q300,175 500,215 Q700,255 1000,195 Q1200,155 1400,175" stroke="#b8b0a5" strokeWidth="0.8" fill="none" />
        <path d="M0,450 Q400,420 700,460 Q1000,500 1400,430" stroke="#aaa29a" strokeWidth="0.8" fill="none" />
      </svg>
    </div>
  );
}

export default function ArcHero({
  labelSmall,
  titleLarge,
  description,
  bgImage,
  bgVariant = 'silver',
  overlay = false,
  noArc = false,
}: ArcHeroProps) {
  // bgImage+overlay → 흰 텍스트 / bgVariant(silver·marble) 단독 → 어두운 텍스트
  const isDarkText = !bgImage && (bgVariant === 'silver' || bgVariant === 'marble');
  const titleColor = isDarkText ? '#111' : 'white';
  const subColor = isDarkText ? '#555' : 'rgba(255,255,255,0.75)';
  const descColor = isDarkText ? '#444' : 'rgba(255,255,255,0.70)';

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: '80vh', minHeight: 520, paddingTop: 64, paddingBottom: 64 }}
    >
      {/* Background */}
      {bgImage ? (
        <div className="absolute inset-0">
          <img src={bgImage} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          {overlay && <div className="absolute inset-0 bg-black/50" />}
        </div>
      ) : bgVariant === 'cream' ? (
        <BgCream />
      ) : bgVariant === 'marble' ? (
        <BgMarble />
      ) : (
        <BgSilver />
      )}

      {/* 텍스트 블록 — 중앙 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* 작은 레이블 */}
        <p
          style={{
            fontSize: 14,
            letterSpacing: '0.08em',
            fontWeight: 400,
            color: subColor,
            marginBottom: 16,
          }}
        >
          {labelSmall}
        </p>

        {/* 큰 타이틀 */}
        <h1
          style={{
            fontFamily: /[\uAC00-\uD7A3]/.test(titleLarge)
              ? '"Pretendard", system-ui, sans-serif'
              : '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(48px, 6vw, 72px)',
            fontWeight: 700,
            letterSpacing: /[\uAC00-\uD7A3]/.test(titleLarge) ? '-0.02em' : '-0.01em',
            lineHeight: 1.1,
            color: titleColor,
            marginBottom: 28,
          }}
        >
          {titleLarge}
        </h1>

        {/* 설명 */}
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.9,
            fontWeight: 400,
            color: descColor,
          }}
          dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br/>') }}
        />
      </motion.div>

      {/* 하단 흰 아크 */}
      {!noArc && (
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: 70 }}>
          <div
            className="absolute bg-white"
            style={{
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120%',
              height: 100,
              borderRadius: '50% 50% 0 0',
            }}
          />
        </div>
      )}
    </section>
  );
}
