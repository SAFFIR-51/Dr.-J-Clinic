import React, { useState, useEffect } from 'react';
import { Phone, MapPin, MessageCircle, Calendar, ChevronUp, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const LINKS = [
  {
    icon: Phone,
    label: '전화문의',
    href: 'tel:0327248724',
    color: '#9dbcd4',
    external: false,
  },
  {
    icon: MapPin,
    label: '오시는길',
    to: '/location',
    color: '#7a9e7a',
    external: false,
    isRoute: true,
  },
  {
    icon: MessageCircle,
    label: '카카오톡상담',
    href: 'https://pf.kakao.com/_YFJas',
    color: '#FEE500',
    textColor: '#391B1B',
    external: true,
  },
  {
    icon: Calendar,
    label: '네이버예약',
    href: 'https://naver.me/FmfL7fiJ',
    color: '#03C75A',
    textColor: '#fff',
    external: true,
  },
  {
    icon: Instagram,
    label: '인스타그램',
    href: 'https://www.instagram.com/springday.jw?igsh=MTlheGhmcnB4a3owbw%3D%3D',
    color: '#E1306C',
    textColor: '#fff',
    external: true,
  },
];

export default function FloatingMenu() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* ── 데스크탑: 우측 고정 플로팅 ──────────────────────── */}
      <div className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-2">
        {LINKS.map((item, i) => {
          const Icon = item.icon;
          const content = (
            <>
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: item.color }}
              >
                <Icon className="w-4 h-4" style={{ color: item.textColor ?? '#fff' }} />
              </span>
              <span className="text-[12px] font-semibold text-[#111]">{item.label}</span>
            </>
          );

          if ((item as any).isRoute) {
            return (
              <Link
                key={i}
                to={(item as any).to}
                className="flex items-center gap-2.5 pl-2 pr-4 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-md border border-gray-100 hover:shadow-lg hover:-translate-x-1 transition-all duration-200"
              >
                {content}
              </Link>
            );
          }
          return (
            <a
              key={i}
              href={(item as any).href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-2.5 pl-2 pr-4 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-md border border-gray-100 hover:shadow-lg hover:-translate-x-1 transition-all duration-200"
            >
              {content}
            </a>
          );
        })}
      </div>

      {/* ── 데스크탑: 스크롤 상단 버튼 ──────────────────────── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={scrollToTop}
            className="hidden md:flex fixed right-5 bottom-8 z-40 w-[48px] h-[48px] rounded-full bg-[#9dbcd4] text-white shadow-lg items-center justify-center hover:bg-[#111] transition-colors duration-300"
            aria-label="맨 위로"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── 모바일: 하단 탭바 ────────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex">
        {LINKS.map((item, i) => {
          const Icon = item.icon;
          const inner = (
            <>
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center mb-1"
                style={{ backgroundColor: item.color + '22' }}
              >
                <Icon className="w-5 h-5" style={{ color: item.color === '#FEE500' ? '#9a6400' : item.color }} />
              </span>
              <span className="text-[10px] font-semibold text-[#444] leading-none">{item.label}</span>
            </>
          );

          if ((item as any).isRoute) {
            return (
              <Link
                key={i}
                to={(item as any).to}
                className="flex-1 flex flex-col items-center justify-center py-2 active:bg-gray-50"
              >
                {inner}
              </Link>
            );
          }
          return (
            <a
              key={i}
              href={(item as any).href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="flex-1 flex flex-col items-center justify-center py-2 active:bg-gray-50"
            >
              {inner}
            </a>
          );
        })}
      </div>
    </>
  );
}
