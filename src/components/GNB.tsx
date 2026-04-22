import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LANGUAGES = ['KR', 'EN'];

interface GNBProps {
  open: boolean;
  onClose: () => void;
}

interface SubItem {
  label: string;
  to: string;
  external?: boolean;
}

interface MenuGroup {
  title: string | null;
  items: SubItem[];
}

interface MobileMenuItem {
  label: string;
  to: string | null;
  groups: MenuGroup[] | null;
}

const MOBILE_MENU: MobileMenuItem[] = [
  {
    label: '병원소개',
    to: '/about',
    groups: [
      {
        title: null,
        items: [
          { label: '닥터제이앤미의원 소개', to: '/about' },
          { label: '의료진 소개', to: '/doctors' },
          { label: '진료안내 · 오시는 길', to: '/location' },
        ],
      },
    ],
  },
  {
    label: '시술정보',
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
    label: '이벤트',
    to: '/notice',
    groups: null,
  },
  {
    label: '온라인 상담',
    to: null,
    groups: [
      {
        title: null,
        items: [
          { label: '카카오채널', to: 'https://pf.kakao.com/_YFJas', external: true },
          { label: '네이버 예약', to: 'https://naver.me/FmfL7fiJ', external: true },
          { label: '전화문의', to: 'tel:0327248724', external: true },
        ],
      },
    ],
  },
];

export default function GNB({ open, onClose }: GNBProps) {
  const { lang, setLang, t } = useLanguage();
  const [openSections, setOpenSections] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const toggleSection = (label: string) => {
    setOpenSections((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const handleClose = () => {
    setOpenSections([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-[100] bg-white overflow-y-auto"
        >
          {/* 상단 바 */}
          <div className="flex items-center justify-between px-6 h-[64px] border-b border-gray-100 sticky top-0 bg-white z-10">
            <Link to="/" onClick={handleClose} className="flex items-center">
              <img src="/logo-1.png" alt="닥터제이앤미의원" className="h-[44px] w-auto" />
            </Link>
            <div className="flex items-center gap-3">
              {/* 언어 선택 */}
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4 text-gray-400" />
                {LANGUAGES.map((l, i) => (
                  <React.Fragment key={l}>
                    <button
                      onClick={() => setLang(l as 'KR' | 'EN')}
                      className={`text-[11px] font-semibold px-1 transition-colors ${
                        lang === l ? 'text-[#111]' : 'text-gray-300'
                      }`}
                    >
                      {l}
                    </button>
                    {i < LANGUAGES.length - 1 && (
                      <span className="text-gray-200 text-[10px] select-none">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:opacity-50 transition-opacity"
                aria-label="메뉴 닫기"
              >
                <X className="w-5 h-5 text-[#111]" />
              </button>
            </div>
          </div>

          {/* 메뉴 목록 */}
          <div className="px-6 pb-10">
            {MOBILE_MENU.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
                className="border-b border-gray-100"
              >
                {/* 1단계 메뉴 */}
                {item.to && !item.groups ? (
                  <Link
                    to={item.to}
                    onClick={handleClose}
                    className="flex items-center justify-between py-5 text-[16px] font-bold text-[#111] tracking-tight"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleSection(item.label)}
                    className="w-full flex items-center justify-between py-5 text-[16px] font-bold text-[#111] tracking-tight"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        openSections.includes(item.label) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                )}

                {/* 2단계: 그룹 + 아이템 */}
                <AnimatePresence>
                  {item.groups && openSections.includes(item.label) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 space-y-5">
                        {item.groups.map((group, gi) => (
                          <div key={gi}>
                            {group.title && (
                              <p className="text-[10px] font-black tracking-[0.35em] text-gray-300 uppercase mb-2.5 pl-1">
                                {group.title}
                              </p>
                            )}
                            <ul className="space-y-0.5">
                              {group.items.map((subItem, ii) =>
                                subItem.external ? (
                                  <li key={ii}>
                                    <a
                                      href={subItem.to}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={handleClose}
                                      className="block py-2 pl-3 text-[14px] text-gray-500 hover:text-[#111] font-medium transition-colors"
                                    >
                                      {subItem.label}
                                    </a>
                                  </li>
                                ) : (
                                  <li key={ii}>
                                    <Link
                                      to={subItem.to}
                                      onClick={handleClose}
                                      className="block py-2 pl-3 text-[14px] text-gray-500 hover:text-[#111] font-medium transition-colors"
                                    >
                                      {subItem.label}
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* 하단 연락처 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.28 }}
            className="mx-6 mt-2 mb-8 p-6 bg-[#fafafa] rounded-2xl"
          >
            <p className="text-[10px] font-black tracking-[0.4em] text-gray-300 uppercase mb-4">
              Contact
            </p>
            <p className="text-[22px] font-black text-[#111] tracking-tight mb-1">
              032-724-8724
            </p>
            <div className="mt-3 space-y-1 text-[12px] text-gray-400 leading-relaxed mb-6">
              <p>{t('gnb.hours.mttf')}</p>
              <p>{t('gnb.hours.sat')}</p>
              <p className="text-red-400 font-medium">{t('gnb.hours.closed')}</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="https://pf.kakao.com/_YFJas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center py-3 bg-[#FEE500] text-[#391B1B] text-[13px] font-black rounded-full hover:brightness-95 transition-all"
              >
                {t('gnb.kakao')}
              </a>
              <a
                href="https://naver.me/FmfL7fiJ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center py-3 bg-[#03C75A] text-white text-[13px] font-bold rounded-full hover:bg-[#02b34e] transition-all"
              >
                {t('gnb.naver')}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
