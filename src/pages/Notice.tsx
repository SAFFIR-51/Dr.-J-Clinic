import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, Clock } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArcHero from '../components/ArcHero';
import { ALWAYS, SEASON, type TabKey, type NoticeEvent } from '../data/noticeEvents';
import { useLanguage } from '../contexts/LanguageContext';

const TABS_BASE: { key: TabKey; labelKey: string; icon: React.ElementType; data: NoticeEvent[] }[] = [
  { key: 'always', labelKey: 'notice.tab.always', icon: Tag,   data: ALWAYS },
  { key: 'season', labelKey: 'notice.tab.season', icon: Clock, data: SEASON },
];

function EventCard({ item, index }: { item: NoticeEvent; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link to={`/notice/${item.id}`} className="group relative block overflow-hidden rounded-xl aspect-square bg-gray-100">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* 호버 오버레이 */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center px-4">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#b4cfe4] mb-2 uppercase">{item.subtitle}</p>
          <h3 className="text-white font-black leading-tight" style={{ fontSize: 'clamp(14px, 2vw, 20px)', letterSpacing: '-0.02em' }}>
            {item.title}
          </h3>
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
        <div className="max-w-4xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
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
