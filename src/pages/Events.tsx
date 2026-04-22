import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import ArcHero from '../components/ArcHero';
import { EVENTS } from '../data/events';

export default function Events() {
  return (
    <>
      <ArcHero
        labelSmall="이벤트 / Event"
        titleLarge="Event"
        description={"닥터제이앤미의원의 특별한 혜택을 만나보세요"}
        bgVariant="marble"
        noArc
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link to={`/events/${event.id}`} className="group block">
                  {/* 썸네일 */}
                  <div className="overflow-hidden rounded-2xl aspect-[4/3] mb-4 bg-gray-100">
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* 뱃지 */}
                  <span className="inline-block px-3 py-1 bg-[#eef4f8] text-[#6b9ab8] text-[11px] font-bold rounded-full mb-3">
                    {event.badge}
                  </span>

                  {/* 제목 */}
                  <h2 className="text-[18px] font-black text-[#111] mb-2 leading-snug tracking-tight group-hover:text-[#6b9ab8] transition-colors">
                    {event.title}
                  </h2>

                  {/* 기간 */}
                  <div className="flex items-center gap-1.5 text-[12px] text-gray-400">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {event.period}
                  </div>

                  {/* 더보기 */}
                  <div className="mt-4 flex items-center gap-1.5 text-[12px] font-bold text-[#6b9ab8] opacity-0 group-hover:opacity-100 transition-opacity">
                    자세히 보기 <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
