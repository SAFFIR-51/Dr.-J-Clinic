import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Car, Bus, TrainFront, Clock, ArrowRight } from 'lucide-react';
import ArcHero from '../components/ArcHero';
import { useLanguage } from '../contexts/LanguageContext';

const HOURS_TIMES = [
  { key: 'contact.hours.mttf', time: 'AM 09:30 – PM 07:00' },
  { key: 'contact.hours.wed',  time: 'AM 11:00 – PM 08:00' },
  { key: 'contact.hours.sat',  time: 'AM 09:00 – PM 03:00' },
  { key: 'contact.hours.lunch', time: 'PM 01:00 – PM 02:00' },
];

export default function Location() {
  const { t } = useLanguage();

  const ACCESS = [
    {
      icon: Car,
      label: t('location.by.car'),
      lines: [t('location.car.line1'), t('location.car.line2')],
    },
    {
      icon: Bus,
      label: t('location.by.bus'),
      lines: [t('location.bus.line1'), t('location.bus.line2'), t('location.bus.line3')],
    },
    {
      icon: TrainFront,
      label: t('location.by.subway'),
      lines: [t('location.subway.line1'), t('location.subway.line2')],
    },
  ];

  const HOURS = HOURS_TIMES.map(h => ({ day: t(h.key), time: h.time }));

  return (
    <>
      <ArcHero
        labelSmall={t('location.hero.label')}
        titleLarge={t('location.hero.title')}
        description={t('location.hero.desc')}
        bgImage="/images/hero-location.png"
        overlay
        noArc
      />

      {/* 지도 — 전폭 크게 */}
      <section className="bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
          style={{ height: '60vh', minHeight: 400 }}
        >
          <iframe
            src="https://maps.google.com/maps?q=인천+남동구+서창남로+81+투엠프라자&output=embed&z=16&hl=ko"
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="닥터제이앤미의원 위치"
          />
          {/* 주소 오버레이 */}
          <div className="absolute bottom-6 left-6 z-10">
            <div className="bg-white/96 backdrop-blur-sm px-5 py-4 rounded-2xl shadow-xl">
              <p className="font-black text-[#111] text-[14px] mb-1">{t('clinic.name')}</p>
              <p className="text-[12px] text-gray-500 leading-relaxed">
                {t('clinic.address')}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 기본 정보 바 */}
      <section className="bg-[#111]">
        <div className="max-w-5xl mx-auto px-6 py-7 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-0 sm:divide-x sm:divide-white/10">
          <div className="flex items-center gap-4 sm:pr-10">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#6b9ab8]" />
            </div>
            <div>
              <p className="text-[11px] text-white/40 font-medium tracking-widest uppercase mb-0.5">Address</p>
              <p className="text-[14px] text-white font-medium">{t('clinic.address')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:pl-10">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-[#6b9ab8]" />
            </div>
            <div>
              <p className="text-[11px] text-white/40 font-medium tracking-widest uppercase mb-0.5">Phone</p>
              <a href="tel:0327248724" className="text-[14px] text-white font-medium hover:text-[#6b9ab8] transition-colors">
                032-724-8724
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 오시는 길 */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-[11px] font-black tracking-[0.4em] text-gray-300 uppercase mb-3">How to get here</p>
            <h2 className="text-[28px] md:text-[34px] font-black text-[#111] tracking-tight">{t('location.directions.title')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ACCESS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#f8f7f5] rounded-2xl px-7 py-8"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-5">
                    <Icon className="w-5 h-5" style={{ color: '#6b9ab8' }} />
                  </div>
                  <h3 className="text-[15px] font-black text-[#111] mb-5">{item.label}</h3>
                  <ul className="space-y-3">
                    {item.lines.map((line, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[13px] text-gray-500 leading-[1.7]">
                        <span className="mt-[7px] w-1 h-1 rounded-full bg-[#6b9ab8] shrink-0" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 진료시간 */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-start">

            {/* 좌: 타이틀 + 안내 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[11px] font-black tracking-[0.4em] text-gray-300 uppercase mb-4">Opening Hours</p>
              <h2 className="text-[28px] md:text-[38px] font-black text-[#111] tracking-tight leading-tight mb-3">
                {t('location.hours.title2')}
              </h2>
              <p className="text-[13px] text-red-400 font-semibold mb-10">{t('location.hours.closed2')}</p>

              {/* 시간표 카드들 */}
              <div className="space-y-3">
                {HOURS.map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className={`flex items-center justify-between px-7 py-5 rounded-2xl ${
                      row.day === '점심시간'
                        ? 'bg-gray-50 border border-dashed border-gray-200'
                        : 'bg-[#f0f5f9]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock
                        className="w-4 h-4 shrink-0"
                        style={{ color: row.day === '점심시간' ? '#ccc' : '#6b9ab8' }}
                      />
                      <span className={`text-[14px] font-bold tracking-wide ${row.day === '점심시간' ? 'text-gray-400' : 'text-[#111]'}`}>
                        {row.day}
                      </span>
                    </div>
                    <span className={`text-[14px] font-black tabular-nums ${row.day === '점심시간' ? 'text-gray-400' : 'text-[#6b9ab8]'}`}>
                      {row.time}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* 예약 버튼 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="https://naver.me/FmfL7fiJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#6b9ab8] text-white text-[13px] font-bold rounded-full hover:bg-[#5a89a7] transition-colors"
                >
                  {t('location.naver')} <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://pf.kakao.com/_YFJas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#6b9ab8] text-[#6b9ab8] text-[13px] font-bold rounded-full hover:bg-[#6b9ab8] hover:text-white transition-colors"
                >
                  {t('location.kakao')} <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>

            {/* 우: 장식 텍스트 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="hidden lg:flex flex-col items-end justify-start pt-16 select-none"
            >
              <p
                className="text-[120px] font-serif italic leading-none text-gray-100 tracking-tight"
                style={{ writingMode: 'horizontal-tb' }}
              >
                Open
              </p>
              <p className="text-[13px] text-gray-300 font-medium tracking-widest mt-2 uppercase">Mon – Sat</p>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
