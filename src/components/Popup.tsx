import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const POPUP_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop',
    alt: '전세계 최다 8대 소프웨이브 보유',
  },
  {
    src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop',
    alt: '울쎄라피 프라임 8대 입고 완료!',
  },
  {
    src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop',
    alt: '마취통증의학과 전문의 상주',
  },
];

const STORAGE_KEY = 'reone_popup_hidden';

export default function Popup() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const val = localStorage.getItem(STORAGE_KEY);
    if (val && Date.now() < Number(val)) {
      // 아직 숨김 기간이 남아 있음
      return;
    }
    if (val) localStorage.removeItem(STORAGE_KEY); // 만료된 값 제거
    setVisible(true);
  }, []);

  const close = () => setVisible(false);

  const hideForDay = () => {
    const expire = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, String(expire));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/40" onClick={close} />

      {/* 팝업 콘텐츠 */}
      <div className="relative w-[90%] max-w-[480px] z-10">
        {/* 이미지 슬라이더 */}
        <div className="relative overflow-hidden">
          <img
            src={POPUP_IMAGES[current].src}
            alt={POPUP_IMAGES[current].alt}
            className="w-full object-cover"
            referrerPolicy="no-referrer"
          />

          {/* 슬라이더 닷 */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {POPUP_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? 'bg-white scale-125' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="bg-black flex items-center justify-between px-4 h-9">
          <button
            onClick={hideForDay}
            className="text-white text-sm hover:opacity-70 transition-opacity"
          >
            하루동안 보지 않기
          </button>
          <button onClick={close} className="text-white hover:opacity-70 transition-opacity">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
