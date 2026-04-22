import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import ArcHero from '../components/ArcHero';

const BASE = 'http://www.reoneskin.com/data/file/equipment/df8dad74ba033b78a7246af8f41e315c_';

const EQUIPMENTS = [
  {
    name: '울쎄라피 프라임',
    category: '리프팅 | 페이스 라인 개선',
    tag: '울쎄라피 프라임 국내 최다 8대',
    image: BASE + 'cpjF8b0G_8a3ba3c5f3ab08ded0a5f1de106eaadf4d2dec8a.png',
  },
  {
    name: '써마지',
    category: '타이트닝 | 콜라겐 생성',
    tag: '써마지FLX 국내 최다 6대 보유',
    image: BASE + 'lodGDZN7_8047a1fddb1c2b88d35b5af6f167cdc46e2f1167.png',
  },
  {
    name: '소프웨이브',
    category: '잔주름, 모공 개선 | 콜라겐 생성',
    tag: '소프웨이브 국내 최다 8대 보유',
    image: BASE + '6UM9REbX_c0bd4cdfe3b84bae7834f595a6c256324d7460ce.png',
  },
  {
    name: '튠페이스',
    category: '리프팅 | 피부 탄력 개선',
    tag: '튠페이스 2대 보유',
    image: BASE + 'Nhysmx9l_a73cd70f6b28d8d964fb60ec897ba3d097a36b86.png',
  },
  {
    name: '티타늄',
    category: '리프팅 | 타이트닝 | 피부톤 개선',
    tag: '복합 리프팅 장비',
    image: BASE + 'faXGiS9t_6aff2705e29442fb9a4127a26b7e3c9b876462b6.png',
  },
  {
    name: '인모드',
    category: '타이트닝 | 리프팅 | 지방 볼륨 감소',
    tag: '바디·페이스 전용',
    image: BASE + 'MXOBou4p_22f2c447657277695cc4e015cbf14ebdfc2a91fe.png',
  },
  {
    name: '오푸스',
    category: '색소 | 타이트닝 | 모공 · 흉터 개선',
    tag: '토탈 스킨케어',
    image: BASE + 'qnoA01EC_503c5cc6843f08c0737d144a28761e1d3a8b7e39.png',
  },
  {
    name: '덴서티',
    category: '타이트닝 | 잔주름개선 | 리프팅',
    tag: '콜라겐 재생',
    image: BASE + 'sY1Hq5z6_741eddd841a5bbc1a2ba94503c3b6bc7aa9c9833.png',
  },
  {
    name: '리니어지',
    category: '리프팅 | 주름 | 탄력',
    tag: '하이푸 리프팅',
    image: BASE + '3IkUVLFC_0e31632debb5dbf528952f92767c1a59ccb17b09.png',
  },
  {
    name: '슈링크',
    category: '탄력 증대 | 윤곽 리프팅',
    tag: '즉각 리프팅',
    image: BASE + 'zq8tbVm9_0335d3b3213d672c63398cb5b1c89d29801f7bdb.png',
  },
  {
    name: '코레지 2.0',
    category: '탄력증가 | 모공 · 주름 완화',
    tag: '피부결 개선',
    image: BASE + 'UQ4MbKID_08c581cd7b076b9105e8f02b2a0cb04f8e4db07f.png',
  },
  {
    name: '레블라이트',
    category: '색소 | 기미 · 잡티 | 피부톤 개선',
    tag: '토탈 색소 케어',
    image: BASE + 'dM7eAczH_7352cf0679547b140fe02130330d40990271caa7.png',
  },
];

const CATEGORIES = ['전체', '리프팅 · 탄력', '타이트닝', '색소 · 피부톤', '모공 · 흉터', '바디 · 항노화'];

export default function Equipment() {
  const [filter, setFilter] = useState('전체');
  const filtered = filter === '전체' ? EQUIPMENTS : EQUIPMENTS.filter(e => e.category === filter);

  return (
    <>
      <ArcHero
        labelSmall="Equipment"
        titleLarge="장비 소개"
        description={"안전하고 효과가 검증된\n닥터제이앤미의원의 시술장비를 소개합니다"}
        bgVariant="silver"
      />

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* 검색바 */}
          <div className="flex justify-end items-center gap-2 mb-10">
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2 text-[13px] border border-gray-200 rounded-full bg-white text-gray-600 focus:outline-none cursor-pointer"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">▾</span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="검색어를 입력해주세요"
                className="pl-4 pr-10 py-2 text-[13px] border border-gray-200 rounded-full w-[220px] focus:outline-none focus:border-gray-400"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* 장비 그리드 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 border-t border-l border-gray-100">
            {filtered.map((eq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group overflow-hidden hover:bg-gray-50 transition-colors duration-200 bg-white cursor-pointer border-r border-b border-gray-100"
              >
                {/* 이미지 영역 — 흰 배경 */}
                <div className="h-[220px] flex items-center justify-center overflow-hidden p-6 bg-white">
                  <img
                    src={eq.image}
                    alt={eq.name}
                    className="h-full w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* 텍스트 */}
                <div className="p-5 text-center">
                  <h3 className="text-[17px] font-bold text-[#111] mb-1 tracking-tight">{eq.name}</h3>
                  <p className="text-[12px] text-gray-400 mb-4">{eq.category}</p>
                  <button
                    className="w-full text-[12px] font-medium text-white py-2.5 rounded-full transition-colors"
                    style={{ backgroundColor: '#7aafc4' }}
                  >
                    {eq.tag}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
