import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import ArcHero from '../components/ArcHero';
import { useLanguage } from '../contexts/LanguageContext';
import { ALL_EVENTS } from '../data/noticeEvents';

export default function NoticeDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const event = ALL_EVENTS.find(e => e.id === Number(id)) ?? ALL_EVENTS[0];

  return (
    <>
      {/* 목록 페이지와 동일한 히어로 */}
      <ArcHero
        labelSmall={t('notice.hero.label')}
        titleLarge={t('notice.hero.title')}
        description={t('notice.hero.desc')}
        bgImage="/images/hero-notice.png"
        overlay
        noArc
      />

      {/* 이벤트 제목 · 부제 */}
      <section className="bg-white py-14 border-b border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <p className="text-[11px] font-black tracking-[0.4em] text-[#6b9ab8] mb-4 uppercase">
            {event.subtitle}
          </p>
          <h1
            className="text-[#111] mb-4"
            style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.3 }}
          >
            {event.title}
          </h1>
          <div className="w-8 h-[2px] bg-[#b4cfe4] mx-auto" />
        </motion.div>
      </section>

      {/* 내용 이미지 */}
      <section className="bg-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-4">
          {event.contentImages.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt=""
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="w-full h-auto block rounded-xl shadow-sm"
            />
          ))}
        </div>
      </section>

      {/* 목록으로 */}
      <section className="py-14 bg-[#f8f7f5] text-center border-t border-gray-100">
        <Link
          to="/notice"
          className="inline-flex items-center gap-2 text-[13px] font-bold text-[#6b9ab8] hover:text-[#111] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> 이벤트 목록으로
        </Link>
      </section>
    </>
  );
}
