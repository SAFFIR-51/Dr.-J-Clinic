import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#111111] text-gray-500 py-16 text-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* 로고 */}
          <div className="mb-8">
            <img src="/logo2-1.png" alt="닥터제이앤미의원" className="h-[64px] w-auto mx-auto" />
          </div>

          {/* 사업자 정보 */}
          <div className="flex flex-col gap-1.5 text-[12px] text-gray-600 mb-8 leading-[1.9]">
            <div className="flex flex-wrap justify-center gap-x-3">
              <span>{t('clinic.name')}</span>
              <span className="opacity-20">|</span>
              <span>{t('clinic.address')}</span>
              <span className="opacity-20">|</span>
              <span>대표자 : 이재원</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-3">
              <span>사업자등록번호 : 440-23-01962</span>
            </div>
          </div>

          {/* 저작권 */}
          <div className="border-t border-white/5 pt-8 w-full text-center space-y-2">
            <p className="text-gray-700 text-[11px] font-medium tracking-wide">
              {t('clinic.copyright')}
            </p>
            <p className="text-gray-700 text-[11px] leading-[1.8]">
              {t('clinic.copyright.notice')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
