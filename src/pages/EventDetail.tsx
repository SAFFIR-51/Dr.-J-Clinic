import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CalendarDays, ArrowLeft } from 'lucide-react';
import ArcHero from '../components/ArcHero';
import { EVENTS } from '../data/events';

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const event = EVENTS.find(e => e.id === id) ?? EVENTS[0];

  return (
    <>
      <ArcHero
        labelSmall="이벤트 / Event"
        titleLarge="Event"
        description={event.period}
        bgVariant="marble"
        noArc
      />

      {/* 메인 배너 */}
      <section className="bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative w-full overflow-hidden"
          style={{ height: '55vh', minHeight: 360 }}
        >
          <img src={event.thumbnail} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[11px] font-bold tracking-[0.2em] rounded-full mb-5">
              {event.badge}
            </span>
            <h1
              className="text-white"
              style={{
                fontSize: 'clamp(26px, 4vw, 48px)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
              }}
            >
              {event.title}
            </h1>
            <div className="flex items-center gap-2 mt-5 text-white/70 text-[13px]">
              <CalendarDays className="w-4 h-4" />
              {event.period}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 이미지 / 텍스트 블록 */}
      <section className="bg-white">
        {event.blocks.map((block, i) => {
          if (block.type === 'image') {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full overflow-hidden"
                style={{ height: '50vw', maxHeight: 600, minHeight: 260 }}
              >
                <img src={block.src} alt="" className="w-full h-full object-cover" />
              </motion.div>
            );
          }

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto px-6 py-24 text-center"
            >
              <p className="text-[11px] font-black tracking-[0.4em] text-[#6b9ab8] mb-5">{block.label}</p>
              <h2
                className="text-[#111] mb-6"
                style={{
                  fontSize: 'clamp(24px, 3.5vw, 38px)',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.3,
                }}
              >
                {block.title}
              </h2>
              <div className="w-8 h-[2px] bg-[#b4cfe4] mx-auto mb-7" />
              <p className="text-[14px] text-gray-500 whitespace-pre-line leading-[2] mb-5">
                {block.desc}
              </p>
              <p className="text-[12px] text-gray-400">{block.note}</p>
            </motion.div>
          );
        })}
      </section>

      {/* 하단 — 목록으로 */}
      <section className="py-16 bg-[#f8f7f5] text-center border-t border-gray-100">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-[13px] font-bold text-[#6b9ab8] hover:text-[#111] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> 이벤트 목록으로
        </Link>
      </section>
    </>
  );
}
