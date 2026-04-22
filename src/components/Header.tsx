import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Globe } from 'lucide-react';
import GNB from './GNB';
import { useLanguage } from '../contexts/LanguageContext';

const ALWAYS_DARK_PAGES = ['/about'];

interface NavGroup {
  title: string | null;
  items: { label: string; to: string; external?: boolean }[];
}

interface NavItem {
  label: string;
  to: string | null;
  groups: NavGroup[] | null;
}

function getNavMenu(t: (k: string) => string): NavItem[] {
  return [
    {
      label: t('nav.about'),
      to: '/about',
      groups: [
        {
          title: null,
          items: [
            { label: t('nav.about.clinic'), to: '/about' },
            { label: t('nav.about.doctors'), to: '/doctors' },
            { label: t('nav.about.location'), to: '/location' },
          ],
        },
      ],
    },
    {
      label: t('nav.treatments'),
      to: null,
      groups: [
        {
          title: '쁘띠성형',
          items: [
            { label: '보톡스', to: '/botox' },
            { label: '필러', to: '/filler' },
            { label: '하이코 · 코필러', to: '/hyaico' },
            { label: '힐로웨이브', to: '/hilowave' },
            { label: '쥬베룩 / 쥬베룩볼륨', to: '/juvelook' },
            { label: '리쥬란 / 리쥬란HB+', to: '/rejuran' },
            { label: '리쥬란아이', to: '/rejuran-eye' },
            { label: '에버클', to: '/evercl' },
          ],
        },
        {
          title: '리프팅',
          items: [
            { label: '슈링크', to: '/shrink' },
            { label: '인모드', to: '/inmode' },
            { label: '올리지오', to: '/olligio' },
            { label: '더블로골드', to: '/doublo-gold' },
          ],
        },
        {
          title: '색소·레이저',
          items: [
            { label: '피코슈어', to: '/picosure' },
            { label: '시크릿 듀오', to: '/secret-duo' },
            { label: '노블린', to: '/nobelin' },
            { label: '미인레이저', to: '/miiin-laser' },
            { label: '에이톤레이저', to: '/aeton-laser' },
          ],
        },
        {
          title: '스킨케어',
          items: [
            { label: 'IBPS 부스터필', to: '/ibps' },
            { label: '블랙필', to: '/blackpeel' },
            { label: '아쿠아필', to: '/aquapeel' },
            { label: 'PDT', to: '/pdt' },
            { label: '시크릿레이저', to: '/secret-laser' },
            { label: '초음파관리 (LDM)', to: '/ldm' },
            { label: '더마샤인', to: '/dermashine' },
            { label: 'NDA플러스', to: '/nda-plus' },
            { label: '벨로테로 리바이브', to: '/belotero-revive' },
          ],
        },
        {
          title: '바디 · 제모',
          items: [
            { label: '아포지플러스', to: '/apogee-plus' },
            { label: '빨간주사', to: '/red-injection' },
            { label: '노블쉐이프', to: '/nobleshape' },
            { label: '오니코 레이저', to: '/onico-laser' },
          ],
        },
      ],
    },
    {
      label: t('nav.events'),
      to: '/notice',
      groups: [
        {
          title: null,
          items: [
            { label: t('nav.events.always'), to: '/notice?tab=always' },
            { label: t('nav.events.special'), to: '/notice?tab=special' },
            { label: t('nav.events.season'), to: '/notice?tab=season' },
          ],
        },
      ],
    },
  ];
}

const LANGUAGES = ['KR', 'EN'];

export default function Header() {
  const location = useLocation();
  const alwaysDark = ALWAYS_DARK_PAGES.includes(location.pathname);
  const { lang, setLang, t } = useLanguage();
  const [gnbOpen, setGnbOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
    setActiveGroupIndex(0);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const closeNow = () => setActiveMenu(null);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || alwaysDark
            ? 'bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]'
            : 'bg-transparent'
        }`}
      >
        {/* 메인 헤더 바 */}
        <div className="h-[64px] flex items-center justify-between px-8 max-w-[1400px] mx-auto">
          {/* 로고 */}
          <Link to="/" onClick={closeNow} className="shrink-0 flex items-center">
            <img
              src={scrolled || alwaysDark ? '/logo-1.png' : '/logo2-1.png'}
              alt="닥터제이앤미의원"
              className="h-[48px] w-auto"
            />
          </Link>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex items-stretch h-[64px]">
            {getNavMenu(t).map((item) => (
              <div
                key={item.label}
                className="relative flex items-center"
                onMouseEnter={() => openMenu(item.label)}
                onMouseLeave={scheduleClose}
              >
                {item.to && !item.groups ? (
                  <Link
                    to={item.to}
                    className={`px-5 h-full flex items-center text-[13px] font-semibold tracking-wide transition-colors ${
                      activeMenu === item.label
                        ? (scrolled || alwaysDark) ? 'text-[#111]' : 'text-white'
                        : (scrolled || alwaysDark) ? 'text-gray-500 hover:text-[#111]' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className={`px-5 h-full flex items-center gap-1 text-[13px] font-semibold tracking-wide transition-colors ${
                      activeMenu === item.label
                        ? (scrolled || alwaysDark) ? 'text-[#111]' : 'text-white'
                        : (scrolled || alwaysDark) ? 'text-gray-500 hover:text-[#111]' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        activeMenu === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                )}
                {/* 하단 활성 라인 */}
                <span
                  className={`absolute bottom-0 left-3 right-3 h-[2px] transition-all duration-200 ${
                    (scrolled || alwaysDark) ? 'bg-[#111]' : 'bg-white'
                  } ${
                    activeMenu === item.label ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* ── 드롭다운 (각 아이템 바로 아래) ── */}
                {activeMenu === item.label && item.groups && (
                  <div
                    className="absolute top-full left-0 bg-white border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.10)] z-50"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  >
                    {/* 단일 그룹 (이벤트, 병원소개) → 세로 목록 */}
                    {item.groups.length === 1 && (
                      <ul className="py-2 min-w-[180px]">
                        {item.groups[0].items.map((subItem, ii) => (
                          <li key={ii}>
                            <Link
                              to={subItem.to}
                              onClick={closeNow}
                              className="block px-5 py-2.5 text-[13px] font-medium text-gray-500 hover:text-[#111] hover:bg-gray-50 transition-colors"
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* 다중 그룹 (시술정보) → 좌 카테고리 + 우 항목 */}
                    {item.groups.length > 1 && (
                      <div className="flex w-[420px]">
                        {/* 좌: 카테고리 */}
                        <div className="bg-white shrink-0 w-[140px] border-r border-gray-100">
                          {item.groups.map((group, gi) => (
                            <button
                              key={gi}
                              onMouseEnter={() => setActiveGroupIndex(gi)}
                              className={`w-full text-left px-4 py-3.5 text-[12px] font-semibold transition-all duration-150 border-l-[3px] ${
                                activeGroupIndex === gi
                                  ? 'text-[#111] border-[#6b9ab8] bg-gray-50'
                                  : 'text-gray-400 border-transparent hover:text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              {group.title || group.items[0]?.label}
                            </button>
                          ))}
                        </div>

                        {/* 우: 항목 목록 */}
                        <div className="flex-1 py-3 px-4">
                          <ul>
                            {item.groups[activeGroupIndex]?.items.map((subItem, ii) =>
                              subItem.external ? (
                                <li key={ii}>
                                  <a
                                    href={subItem.to}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={closeNow}
                                    className="block py-2 text-[13px] font-medium text-gray-500 hover:text-[#111] hover:pl-1.5 transition-all duration-150"
                                  >
                                    {subItem.label}
                                  </a>
                                </li>
                              ) : (
                                <li key={ii}>
                                  <Link
                                    to={subItem.to}
                                    onClick={closeNow}
                                    className="block py-2 text-[13px] font-medium text-gray-500 hover:text-[#111] hover:pl-1.5 transition-all duration-150"
                                  >
                                    {subItem.label}
                                  </Link>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* 우측: 언어 선택(globe 드롭다운) + 햄버거(모바일만) */}
          <div className="flex items-center gap-3">
            {/* Globe 언어 드롭다운 - 데스크탑만 */}
            <div ref={langRef} className="relative hidden md:block">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className={`flex items-center gap-1.5 p-1.5 transition-colors ${(scrolled || alwaysDark) ? 'text-gray-400 hover:text-[#111]' : 'text-white/70 hover:text-white'}`}
                aria-label="언어 선택"
              >
                <Globe className="w-[18px] h-[18px]" />
                <span className="text-[11px] font-semibold tracking-wide">{lang}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.10)] py-1 min-w-[80px] z-50">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l as 'KR' | 'EN'); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-[12px] font-semibold transition-colors ${
                        lang === l ? 'text-[#111] bg-gray-50' : 'text-gray-400 hover:text-[#111] hover:bg-gray-50'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 모바일 햄버거 - 모바일만 */}
            <button
              onClick={() => setGnbOpen(true)}
              className="md:hidden flex flex-col gap-[5px] p-1.5 -mr-1.5"
              aria-label="메뉴 열기"
            >
              <span className={`block w-[22px] h-[1.5px] ${(scrolled || alwaysDark) ? 'bg-[#111]' : 'bg-white'}`} />
              <span className={`block w-[14px] h-[1.5px] ${(scrolled || alwaysDark) ? 'bg-[#111]' : 'bg-white'}`} />
            </button>
          </div>
        </div>
      </header>

      <GNB open={gnbOpen} onClose={() => setGnbOpen(false)} />
    </>
  );
}
