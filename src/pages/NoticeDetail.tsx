import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarDays, ArrowLeft } from 'lucide-react';
import { ALL_EVENTS } from '../data/noticeEvents';

export default function NoticeDetail() {
  const { id } = useParams<{ id: string }>();
  const event = ALL_EVENTS.find(e => e.id === Number(id)) ?? ALL_EVENTS[0];

  return (
    <div className="min-h-screen bg-white pt-[64px]">
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* 뒤로가기 */}
        <Link
          to="/notice"
          className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-[#6b9ab8] transition-colors mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> 목록으로
        </Link>

        {/* 헤더 */}
        <div className="pb-6 border-b border-gray-200 mb-8">
          <span className="inline-block px-3 py-1 bg-[#eef4f8] text-[#6b9ab8] text-[11px] font-bold rounded-full mb-4">
            {event.badge}
          </span>
          <h1 className="text-[22px] md:text-[26px] font-black text-[#111] leading-tight mb-3" style={{ letterSpacing: '-0.02em' }}>
            {event.title}
          </h1>
          <div className="flex items-center gap-2 text-[12px] text-gray-400">
            <CalendarDays className="w-3.5 h-3.5" />
            {event.period}
          </div>
        </div>

        {/* 이미지 */}
        {event.detailImage && (
          <div className="mb-8 overflow-hidden rounded-xl">
            <img
              src={event.detailImage}
              alt={event.title}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* 본문 */}
        <div className="text-[14px] text-gray-600 leading-[2] whitespace-pre-line">
          {event.detailText}
        </div>

        {/* 구분선 */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link
            to="/notice"
            className="inline-flex items-center gap-2 text-[13px] font-bold text-[#6b9ab8] hover:text-[#111] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> 이벤트 목록으로
          </Link>
        </div>

      </div>
    </div>
  );
}
