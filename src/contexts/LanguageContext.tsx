import React, { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'KR' | 'EN';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'KR',
  setLang: () => {},
  t: (key) => key,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

import { ko } from '../translations/ko';
import { en } from '../translations/en';

const TRANSLATIONS: Record<Lang, Record<string, string>> = { KR: ko, EN: en };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('KR');

  const t = (key: string): string => {
    return TRANSLATIONS[lang][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
