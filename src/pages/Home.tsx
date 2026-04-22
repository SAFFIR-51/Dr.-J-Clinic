import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import { useLanguage } from '../contexts/LanguageContext';

const FEATURES = [
  {
    num: '01',
    title: '전문의가\n직접 시술합니다',
    desc: '상담부터 시술까지 피부과 전문의가\n직접 진행하여 안전하고 정확한 결과를 드립니다.',
    image: '/images/home6.png',
    bg: '/images/home2.png',
  },
  {
    num: '02',
    title: '합리적인 비용,\n정직한 진료',
    desc: '과도한 권유 없이 꼭 필요한 시술만을\n합리적인 비용으로 제안드립니다.',
    image: '/images/home7.png',
    bg: '/images/home3.png',
  },
  {
    num: '03',
    title: '충분한 시간,\n당신만을 위해',
    desc: '여유로운 진료시간으로 충분히 소통하고\n개인에게 맞는 최적의 솔루션을 설계합니다.',
    image: '/images/home8.png',
    bg: '/images/home4.png',
  },
];

const DOCTOR = {
  name: '이재원',
  role: '대표원장',
  image: '/images/doctor.png',
  education: [
    '순천향대학교 의과대학 졸업',
    '순천향대학교 부속 부천병원 전공의 수료',
    '순천향대학교 부속 부천병원 전문의 취득',
  ],
  career: [
    '現 닥터제이앤미의원 대표원장',
    '現 다시봄날의원 서창점 대표원장',
    '경상북도 의성군 보건소 야간응급의료 전담의',
    '실전진료워크숍 강사',
    '前 더유스의원(구 WS라인의원) 부원장',
    '前 닥터디자이너의원 영등포점 부원장',
    '前 포에버성형외과 강남점 부원장',
  ],
  memberships: [
    '대한레이저미부모발학회 정회원',
    '대한비만미용학회 정회원',
    '대한미용의사회 정회원',
  ],
};

const CLINIC_IMAGES = [
  { src: '/images/clinic/clinic1.png', w: 'w-[300px]' },
  { src: '/images/clinic/clinic3.jpg', w: 'w-[340px]' },
  { src: '/images/clinic/clinic4.jpg', w: 'w-[280px]' },
  { src: '/images/clinic/clinic5.png', w: 'w-[320px]' },
  { src: '/images/clinic/clinic6.png', w: 'w-[260px]' },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        src="/videos/hero.mp4"
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* 오버레이 — 상단 약하게, 하단 강하게 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/60" />

      {/* 텍스트 */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-8 h-px bg-white/40" />
          <span className="text-white/60 text-[11px] tracking-[0.4em] uppercase font-medium">
            {t('home.hero.badge')}
          </span>
          <span className="w-8 h-px bg-white/40" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-white leading-none mb-5"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(52px, 8vw, 100px)',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            fontStyle: 'italic',
          }}
        >
          Your Most<br />Beautiful Self
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-white/60 text-[14px] tracking-[0.15em] mb-10"
        >
          {t('home.hero.subtitle')}
        </motion.p>

        <motion.a
          href="https://pf.kakao.com/_YFJas"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="group flex items-center gap-3 px-8 py-3.5 rounded-full text-[13px] font-medium text-white border border-white/30 backdrop-blur-sm hover:bg-white hover:text-[#111] transition-all duration-500"
        >
          {t('home.hero.cta')}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[9px] tracking-[0.5em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-14 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ─── Intro ────────────────────────────────────────────────────────────────────

function Intro() {
  const { t } = useLanguage();
  return (
    <section className="relative bg-white overflow-hidden">
      {/* 상단 연결선 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-gray-200" />

      <div className="pt-36 pb-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-[11px] font-black tracking-[0.45em] text-gray-300 uppercase mb-8">{t('home.intro.label')}</p>
          <h2
            className="text-[#111] mb-6 leading-tight"
            style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.02em' }}
          >
            {t('home.intro.title')}
          </h2>
          <p className="text-[15px] text-gray-400 leading-[2] max-w-md mx-auto whitespace-pre-line">
            {t('home.intro.desc')}
          </p>
        </motion.div>
      </div>

      {/* 마르퀴 */}
      <div className="pb-20 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1400] }}
          transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
        >
          {Array(6).fill(null).map((_, i) => (
            <span
              key={i}
              className="font-serif italic select-none mx-10"
              style={{
                fontSize: 'clamp(64px, 9vw, 110px)',
                color: i % 2 === 0 ? 'rgba(0,0,0,0.06)' : 'rgba(107,154,184,0.12)',
                fontWeight: 400,
              }}
            >
              Your Most Beautiful Self
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── DoctorsSection ───────────────────────────────────────────────────────────

function DoctorsSection() {
  const { t } = useLanguage();
  return (
    <section className="py-24 md:py-32 bg-[#fdfcfb]">
      <div className="max-w-5xl mx-auto px-6">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#8a7b6c] font-serif italic text-xl block mb-3 leading-none">Medical Team</span>
          <h2 className="text-[25px] md:text-[32px] font-medium text-[#111] mb-4 leading-[1.6] tracking-tight">
            닥터제이앤미의원 의료진
          </h2>
          <p className="text-[14px] text-gray-500 leading-[1.9] max-w-md mx-auto">
            건강하고 자연스러운 아름다움을 추구하는 닥터제이앤미의원에서<br />
            개인별 피부타입에 맞는 최상의 전문가적 상담을 받아보세요.
          </p>
        </motion.div>

        {/* 의사 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row gap-12 items-stretch"
        >
          {/* 좌: 사진 */}
          <div className="md:w-[380px] shrink-0">
            <div className="relative overflow-hidden bg-[#f0efed] rounded-2xl shadow-md h-full min-h-[500px]">
              <img
                src={DOCTOR.image}
                alt={DOCTOR.name}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/65 to-transparent px-6 py-6">
                <p className="text-white/70 text-[10px] tracking-[0.25em] mb-1">{DOCTOR.role}</p>
                <p className="text-white text-[19px] font-bold tracking-wide">{DOCTOR.name}</p>
              </div>
            </div>
          </div>

          {/* 우: 정보 */}
          <div className="flex-1 flex flex-col justify-between py-2">
            <div className="mb-8 pb-8 border-b border-gray-100">
              <p className="text-[16px] font-bold tracking-[0.2em] mb-1" style={{ color: '#6b9ab8' }}>{DOCTOR.role}</p>
              <h3 className="text-[32px] font-black text-[#111] tracking-tight">{DOCTOR.name}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
              <div>
                <p className="text-[10px] font-black tracking-[0.4em] text-gray-300 uppercase mb-4">{t('home.doctors.education')}</p>
                <ul className="space-y-2.5">
                  {DOCTOR.education.map((e, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] text-gray-600 leading-[1.6]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#6b9ab8' }} />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-black tracking-[0.4em] text-gray-300 uppercase mb-4">{t('home.doctors.career')}</p>
                <ul className="space-y-2.5">
                  {DOCTOR.career.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] text-gray-600 leading-[1.6]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#6b9ab8' }} />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-black tracking-[0.4em] text-gray-300 uppercase mb-4">{t('home.doctors.memberships')}</p>
                <ul className="space-y-2.5">
                  {DOCTOR.memberships.map((m, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] text-gray-600 leading-[1.6]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#6b9ab8' }} />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-100">
              <Link
                to="/doctors"
                className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-bold rounded-full border border-[#6b9ab8] text-[#6b9ab8] hover:bg-[#6b9ab8] hover:text-white transition-all duration-300"
              >
                {t('home.doctors.cta')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FeaturesSection ──────────────────────────────────────────────────────────

function FeaturesSection() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const FEATURES_T = [
    { num: '01', title: t('home.features.01.title'), desc: t('home.features.01.desc'), image: '/images/home6.png', bg: '/images/home2.png' },
    { num: '02', title: t('home.features.02.title'), desc: t('home.features.02.desc'), image: '/images/home7.png', bg: '/images/home3.png' },
    { num: '03', title: t('home.features.03.title'), desc: t('home.features.03.desc'), image: '/images/home8.png', bg: '/images/home4.png' },
  ];

  return (
    <section className="relative flex flex-col md:flex-row bg-white">
      {/* 좌측 sticky */}
      <div className="w-full md:w-[45%] h-[50vh] md:h-screen md:sticky top-0 overflow-hidden">
        {FEATURES_T.map((f, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ${active === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
          >
            <img src={f.bg} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
        <div className="relative z-10 h-full flex flex-col justify-between p-10 md:p-14 text-white">
          {/* 상단 */}
          <div>
            <p className="text-[10px] font-black tracking-[0.45em] text-white/40 uppercase mb-3">{t('home.features.label')}</p>
            <h2
              className="leading-tight whitespace-pre-line"
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(34px, 4vw, 52px)',
                fontWeight: 500,
                fontStyle: 'italic',
              }}
            >
              {t('home.features.title')}
            </h2>
          </div>

          {/* 하단 — 진행 도트 */}
          <div>
            <p className="text-[12px] text-white/60 leading-[1.9] mb-8 max-w-[220px] whitespace-pre-line">
              {t('home.features.desc')}
            </p>
            <div className="flex gap-2">
              {FEATURES_T.map((_, i) => (
                <div
                  key={i}
                  className="transition-all duration-500"
                  style={{
                    width: active === i ? 24 : 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: active === i ? 'white' : 'rgba(255,255,255,0.25)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 우측 스크롤 */}
      <div className="w-full md:w-[55%]">
        {FEATURES_T.map((f, i) => (
          <motion.div
            key={i}
            onViewportEnter={() => setActive(i)}
            viewport={{ margin: '-50% 0px -50% 0px' }}
            className="min-h-screen flex flex-col justify-center py-20 px-10 md:px-16 border-b border-gray-100 last:border-0"
          >
            <span
              className="font-serif italic leading-none select-none mb-4"
              style={{ fontSize: 'clamp(80px, 12vw, 130px)', color: 'rgba(0,0,0,0.05)', fontWeight: 300 }}
            >
              {f.num}
            </span>
            <div className="w-10 h-[2px] bg-[#6b9ab8] mb-8" />
            <h3
              className="text-[#111] whitespace-pre-line leading-tight tracking-tight mb-5"
              style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 900 }}
            >
              {f.title}
            </h3>
            <p className="text-[14px] text-gray-400 whitespace-pre-line leading-[2] mb-10">
              {f.desc}
            </p>
            <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: '16/10' }}>
              <motion.img
                src={f.image}
                alt={f.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── SpaceSection ─────────────────────────────────────────────────────────────

function SpaceSection() {
  const { t } = useLanguage();
  return (
    <section className="py-32 md:py-40 bg-[#f8f7f5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <p className="text-[11px] font-black tracking-[0.4em] text-gray-300 uppercase mb-5">{t('home.space.label')}</p>
            <h2
              className="text-[#111] leading-tight tracking-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900 }}
            >
              {t('home.space.title')}<br />
              <span
                className="italic font-light"
                style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: '#6b9ab8' }}
              >
                {t('home.space.subtitle')}
              </span>
            </h2>
          </div>
          <p className="text-[14px] text-gray-500 leading-[2] md:max-w-[260px] whitespace-pre-line">
            {t('home.space.desc')}
          </p>
        </motion.div>
      </div>

      {/* 가로 스크롤 갤러리 */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f8f7f5] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f8f7f5] to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex gap-4 px-4 w-max"
          animate={{ x: [0, -1680] }}
          transition={{ repeat: Infinity, duration: 38, ease: 'linear' }}
        >
          {[...CLINIC_IMAGES, ...CLINIC_IMAGES, ...CLINIC_IMAGES].map((img, i) => (
            <div
              key={i}
              className={`${img.w} shrink-0 overflow-hidden rounded-2xl`}
              style={{ height: 'clamp(360px, 45vw, 560px)' }}
            >
              <img
                src={img.src}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 메인 ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <DoctorsSection />
      <FeaturesSection />
      <SpaceSection />
      <ContactSection />
    </>
  );
}
