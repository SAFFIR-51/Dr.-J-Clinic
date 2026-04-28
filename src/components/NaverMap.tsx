import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    naver: any;
    navermap_authFailure?: () => void;
  }
}

const LAT = 37.4262867;
const LNG = 126.7480493;
const CLIENT_ID = 'lsh4eg05nz';

// 인증 실패 또는 스크립트 오류 시 보여줄 iframe (Naver Maps 검색 임베드)
const FALLBACK_URL =
  `https://map.naver.com/p/search/다시봄날의원 서창점?c=${LNG},${LAT},17,0,0,0,dh`;

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src*="oapi.map.naver.com"]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${CLIENT_ID}`;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default function NaverMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    window.navermap_authFailure = () => {
      if (!cancelled) setUseFallback(true);
    };

    loadScript()
      .then(() => {
        if (cancelled) return;
        // 인증 실패 시 naver.maps 는 null
        if (!window.naver?.maps?.LatLng) {
          setUseFallback(true);
          return;
        }
        if (!containerRef.current) return;
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
      })
      .catch(() => {
        if (!cancelled) setUseFallback(true);
      });

    return () => { cancelled = true; };
  }, []);

  if (useFallback) {
    return (
      <iframe
        src={FALLBACK_URL}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="닥터제이앤미의원 지도"
        allowFullScreen
      />
    );
  }

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
