import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    naver: any;
    navermap_authFailure?: () => void;
  }
}

// 닥터제이앤미의원 좌표 (인천 남동구 서창남로 81, 투엠프라자 7층)
const LAT = 37.42905;
const LNG = 126.73437;

function loadScript(clientId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.naver?.maps) { resolve(); return; }
    const existing = document.querySelector('script[src*="oapi.map.naver.com"]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default function NaverMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const clientId = 'lsh4eg05nz';

    window.navermap_authFailure = () => {
      console.error('Naver Maps 인증 실패: Client ID를 확인해주세요.');
    };

    loadScript(clientId).then(() => {
      if (cancelled || !containerRef.current) return;
      const center = new window.naver.maps.LatLng(LAT, LNG);
      const map = new window.naver.maps.Map(containerRef.current, {
        center,
        zoom: 17,
        mapTypeControl: false,
      });
      new window.naver.maps.Marker({
        position: center,
        map,
        title: '닥터제이앤미의원',
        icon: {
          content: `
            <div style="
              background:#6b9ab8;
              color:white;
              padding:6px 12px;
              border-radius:20px;
              font-size:12px;
              font-weight:700;
              white-space:nowrap;
              box-shadow:0 2px 8px rgba(0,0,0,0.2);
              letter-spacing:-0.02em;
            ">닥터제이앤미의원</div>
          `,
          anchor: new window.naver.maps.Point(60, 16),
        },
      });
    }).catch(() => {
      console.error('Naver Maps 스크립트 로드 실패');
    });

    return () => { cancelled = true; };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
