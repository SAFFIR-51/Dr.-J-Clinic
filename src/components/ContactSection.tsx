import React from 'react';
import NaverMap from './NaverMap';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="py-24 bg-[#f8f7f5]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* 지도 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden aspect-[4/3] relative"
          >
            <NaverMap />
          </motion.div>

          {/* 정보 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-7"
          >
            <div className="text-center">
              <p className="text-[10px] text-[#515c3e] font-black tracking-[0.45em] uppercase mb-3">Location / Contact</p>
              <p className="text-[15px] font-bold text-[#111] leading-[1.8]">
                인천 남동구 서창남로 81<br />
                투엠프라자 7층 704호
              </p>
              <p className="text-[14px] font-bold text-[#111] mt-2">032-724-8724</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://naver.me/FmfL7fiJ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-[#b4cfe4] text-white text-[13px] font-bold rounded-lg hover:bg-black transition-colors duration-400 group"
              >
                처음 방문하신다면 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://pf.kakao.com/_YFJas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-[#b4cfe4] text-white text-[13px] font-bold rounded-lg hover:bg-black transition-colors duration-400 group"
              >
                상담 · 문의가 필요하시다면 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div>
              <p className="text-[10px] text-gray-400 font-black tracking-[0.45em] uppercase mb-1">TIME</p>
              <p className="text-[12px] text-gray-400 mb-4">진료시간 안내</p>
              <div className="space-y-2 text-[13px]">
                {[
                  { day: '월 · 화 · 목 · 금', time: 'AM 09:30 – PM 07:00' },
                  { day: '수요일',             time: 'AM 11:00 – PM 08:00' },
                  { day: '토요일 (점심시간 없음)', time: 'AM 09:00 – PM 03:00' },
                  { day: '점심시간',           time: 'PM 01:00 – PM 02:00' },
                ].map((row) => (
                  <div key={row.day} className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-500 font-medium">{row.day}</span>
                    <span className="font-bold text-[#111]">{row.time}</span>
                  </div>
                ))}
                <p className="text-red-500 text-[12px] font-bold pt-1">일 · 공휴일 휴진</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
