import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, Clock, Sparkles } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArcHero from '../components/ArcHero';
import { ALWAYS, SPECIAL, SEASON, type TabKey, type NoticeEvent } from '../data/noticeEvents';
import { useLanguage } from '../contexts/LanguageContext';

const TABS_BASE: { key: TabKey; labelKey: string; icon: React.ElementType; data: NoticeEvent[] }[] = [
  { key: 'always',  labelKey: 'notice.tab.always',  icon: Tag,      data: ALWAYS  },
  { key: 'special', labelKey: 'notice.tab.special', icon: Sparkles, data: SPECIAL },
  { key: 'season',  labelKey: 'notice.tab.season',  icon: Clock,    data: SEASON  },
];

function EventCard({ item, index }: { item: NoticeEvent; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link to={`/notice/${item.id}`} className="group block bg-white overflow-hidden flex flex-col" style={{ borderRadius: 4 }}>
        {/* 이미지 */}
        <div className="relative overflow-hidden bg-[#f5f3ef]" style={{ aspectRatio: '4/3' }}>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 p-6"
          />
          {item.hot && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#6b9ab8] text-white text-[10px] font-black rounded-full tracking-widest">HOT</span>
          )}
        </div>

        {/* 텍스트 */}
        <div className="flex flex-col flex-1 p-6 border border-t-0 border-gray-100">
          <span className="text-[11px] text-gray-400 mb-3">{item.period}</span>
          <h3 className="text-[17px] font-bold text-[#111] mb-1.5 leading-tight group-hover:text-[#6b9ab8] transition-colors" style={{ letterSpacing: '-0.02em' }}>
            {item.title}
          </h3>
          <p className="text-[13px] text-gray-400 mb-3 font-medium">{item.subtitle}</p>
          <p className="text-[13px] text-gray-500 leading-[1.8] flex-1">{item.desc}</p>
          <div className="mt-5 text-[12px] font-bold text-[#6b9ab8] flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            자세히 보기 →
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Notice() {
  const { t } = useLanguage();
  const TABS = TABS_BASE.map(tab => ({ ...tab, label: t(tab.labelKey) }));
  const location = useLocation();
  const navigate = useNavigate();

  const getTabFromUrl = (): TabKey => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab') as TabKey;
    return TABS_BASE.some((tb) => tb.key === tab) ? tab : 'always';
  };

  const [activeTab, setActiveTab] = useState<TabKey>(getTabFromUrl);

  useEffect(() => {
    setActiveTab(getTabFromUrl());
  }, [location.search]);

  const handleTabChange = (key: TabKey) => {
    setActiveTab(key);
    navigate(`/notice?tab=${key}`, { replace: true });
  };

  const currentTab = TABS.find((t) => t.key === activeTab)!;

  return (
    <>
      <ArcHero
        labelSmall={t('notice.hero.label')}
        titleLarge={t('notice.hero.title')}
        description={t('notice.hero.desc')}
        bgImage="/images/hero-notice.png"
        overlay
        noArc
      />

      {/* 탭 */}
      <section className="bg-white sticky top-[64px] z-30 border-b border-gray-100">
        <div className="flex items-stretch">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`relative flex-1 flex flex-col items-center justify-center gap-2 py-6 text-[14px] font-semibold transition-all duration-300 border-r border-gray-100 last:border-r-0 ${
                  isActive ? 'text-[#111] bg-white' : 'text-gray-400 hover:text-gray-600 bg-[#fafaf9] hover:bg-white'
                }`}
              >
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#6b9ab8]' : 'text-gray-300'}`} />
                <span className="font-semibold">{tab.label}</span>
                <span className={`absolute bottom-0 left-0 right-0 h-[3px] bg-[#6b9ab8] transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            );
          })}
        </div>
      </section>

      {/* 그리드 */}
      <section className="py-20 bg-[#fafaf9] min-h-[60vh]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentTab.data.map((item, i) => (
                <EventCard key={item.id} item={item} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
