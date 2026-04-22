import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface SubPageHeroProps {
  category: string;
  title: string;
  subtitle?: string;
  breadcrumb: { label: string; to?: string }[];
  bgImage?: string;
}

export default function SubPageHero({
  category,
  title,
  subtitle,
  breadcrumb,
  bgImage,
}: SubPageHeroProps) {
  return (
    <section className="relative h-[300px] md:h-[380px] flex items-end overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0">
        {bgImage ? (
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12">
        {/* 브레드크럼 */}
        <div className="flex items-center gap-1.5 text-white/40 text-[11px] mb-4 font-medium tracking-wide">
          <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
          {breadcrumb.map((b, i) => (
            <React.Fragment key={i}>
              <ChevronRight className="w-3 h-3" />
              {b.to ? (
                <Link to={b.to} className="hover:text-white/70 transition-colors">{b.label}</Link>
              ) : (
                <span className="text-white/60">{b.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#a8c5a0] text-[10px] font-black tracking-[0.45em] uppercase mb-2">{category}</p>
          <h1 className="text-3xl md:text-[44px] font-black text-white leading-tight tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-white/60 text-[13px] md:text-sm mt-3 font-normal leading-[1.8] max-w-xl">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
