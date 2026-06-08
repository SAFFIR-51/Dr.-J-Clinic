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

// Place 패널 포함 iframe (큰 뷰 - Location 페이지용)
const EMBED_URL =
  `https://map.naver.com/p/entry/place/2086665902?c=${LNG},${LAT},17,0,0,0,dh`;

type Variant = 'embed' | 'api';

interface NaverMapProps {
  variant?: Variant;
}

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.naver?.maps) {
      resolve();
      return;
    }
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

export default function NaverMap({ variant = 'api' }: NaverMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    if (variant !== 'api') return;
    let cancelled = false;

    window.navermap_authFailure = () => {
      if (!cancelled) setAuthFailed(true);
    };

    loadScript()
      .then(() => {
        if (cancelled) return;
        if (!window.naver?.maps?.LatLng) {
          setAuthFailed(true);
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
        if (!cancelled) setAuthFailed(true);
      });

    return () => { cancelled = true; };
  }, [variant]);

  // embed: 항상 iframe (Location 페이지 - 좌측 플레이스 패널 포함)
  if (variant === 'embed') {
    return (
      <iframe
        src={EMBED_URL}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="닥터제이앤미의원 지도"
        allowFullScreen
      />
    );
  }

  // api: 인증 실패 시 iframe fallback 없이 "네이버 지도에서 보기" 링크만
  if (authFailed) {
    return (
      <a
        href={EMBED_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f7fa',
          color: '#6b9ab8',
          fontSize: 13,
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        네이버 지도에서 보기 →
      </a>
    );
  }

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
