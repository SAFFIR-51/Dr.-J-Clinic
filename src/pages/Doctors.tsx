import React from 'react';
import { motion } from 'motion/react';
import ContactSection from '../components/ContactSection';
import ArcHero from '../components/ArcHero';
import { useLanguage } from '../contexts/LanguageContext';

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

export default function Doctors() {
  const { t } = useLanguage();
  return (
    <>
      <ArcHero
        labelSmall={t('doctors.hero.label')}
        titleLarge={t('doctors.hero.title')}
        description={t('doctors.hero.desc')}
        bgImage="/images/hero-doctors.png"
        overlay
      />

      {/* 의료진 — 사진 + 상세 정보 좌우 레이아웃 */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row gap-12 items-start"
          >
            {/* 좌: 사진 */}
            <div className="md:w-[340px] shrink-0">
              <div className="relative overflow-hidden bg-[#f3f1ef] rounded-xl shadow-md" style={{ aspectRatio: '3/4', minHeight: 360 }}>
                <img
                  src={DOCTOR.image}
                  alt={DOCTOR.name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                {/* 하단 이름 오버레이 */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-5">
                  <p className="text-white/70 text-[11px] tracking-[0.2em] mb-1">{DOCTOR.role}</p>
                  <p className="text-white text-[20px] font-bold tracking-[0.1em]">{DOCTOR.name}</p>
                </div>
              </div>
            </div>

            {/* 우: 상세 정보 */}
            <div className="flex-1 pt-2">
              {/* 이름/역할 */}
              <div className="mb-8 pb-8 border-b border-gray-100">
                <p className="text-[16px] font-bold tracking-[0.2em] mb-1" style={{ color: '#6b9ab8' }}>
                  {DOCTOR.role}
                </p>
                <h2 className="text-[32px] font-black text-[#111] tracking-tight">
                  {DOCTOR.name}
                </h2>
              </div>

              {/* 학력 */}
              <div className="mb-7">
                <h3 className="text-[11px] font-black tracking-[0.4em] text-gray-300 uppercase mb-4">{t('doctors.education')}</h3>
                <ul className="space-y-2.5">
                  {DOCTOR.education.map((e, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-gray-600">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#6b9ab8' }} />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 경력 */}
              <div className="mb-7">
                <h3 className="text-[11px] font-black tracking-[0.4em] text-gray-300 uppercase mb-4">{t('doctors.career')}</h3>
                <ul className="space-y-2.5">
                  {DOCTOR.career.map((c, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-gray-600">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#6b9ab8' }} />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 학회 */}
              <div>
                <h3 className="text-[11px] font-black tracking-[0.4em] text-gray-300 uppercase mb-4">{t('doctors.memberships')}</h3>
                <ul className="space-y-2.5">
                  {DOCTOR.memberships.map((m, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-gray-600">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#6b9ab8' }} />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
