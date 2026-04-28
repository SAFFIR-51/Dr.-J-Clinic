import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import Location from './pages/Location';
import Notice from './pages/Notice';
import NoticeDetail from './pages/NoticeDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Equipment from './pages/Equipment';
import {
  SofwavePage, UltherapyPage, ThermagePage, TitaniumPage,
  CollagenBoosterPage, ThreadLiftingPage, FacialContourPage, BotoxPage,
  ColorSkinPage, AcnePage, SkinCarePage,
  BodyLiftingPage, BodyShapingPage, PRPPage, IVTherapyPage,
  // 쁘띠성형
  FillerPage, HyaicoPage, HalowavePage, JuvelookPage, RejuranPage, RejuranEyePage, EverclPage,
  // 리프팅
  ShrinkPage, InmodePage, OllagioPage, DoubloGoldPage,
  // 색소
  PicosurePage, SecretDurePage, NobelinPage, MiinLaserPage, AetonLaserPage, Co2LaserPage,
  // 스킨케어
  IbpsPage, BlackpeelPage, AquapeelPage, LdmPage, DermashinePage, NdaPlusPage, BeloteroRevivePage,
  // 바디·제모
  ApogeePlusPage, RedInjectionPage, NobleshapePage, OnicoLaserPage, CarboxyPage,
} from './pages/treatments';

// 페이지 이동 시 스크롤 맨 위로
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* 메인 */}
          <Route path="/" element={<Home />} />

          {/* 리원인사이드 */}
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/location" element={<Location />} />

          {/* 커뮤니티 */}
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />

          {/* 리프팅 · 탄력 */}
          <Route path="/sofwave" element={<SofwavePage />} />
          <Route path="/ultherapy" element={<UltherapyPage />} />
          <Route path="/thermage" element={<ThermagePage />} />
          <Route path="/titanium" element={<TitaniumPage />} />

          {/* 페이스라인 · 쁘띠 */}
          <Route path="/collagen-booster" element={<CollagenBoosterPage />} />
          <Route path="/thread-lifting" element={<ThreadLiftingPage />} />
          <Route path="/facial-contour" element={<FacialContourPage />} />
          <Route path="/botox" element={<BotoxPage />} />

          {/* 토탈 스킨 */}
          <Route path="/color-skin" element={<ColorSkinPage />} />
          <Route path="/acne" element={<AcnePage />} />
          <Route path="/skin-care" element={<SkinCarePage />} />

          {/* 바디 · 항노화 */}
          <Route path="/body-lifting" element={<BodyLiftingPage />} />
          <Route path="/body-shaping" element={<BodyShapingPage />} />
          <Route path="/prp" element={<PRPPage />} />
          <Route path="/iv-therapy" element={<IVTherapyPage />} />

          {/* 쁘띠성형 */}
          <Route path="/filler" element={<FillerPage />} />
          <Route path="/hyaico" element={<HyaicoPage />} />
          <Route path="/hilowave" element={<HalowavePage />} />
          <Route path="/juvelook" element={<JuvelookPage />} />
          <Route path="/rejuran" element={<RejuranPage />} />
          <Route path="/rejuran-eye" element={<RejuranEyePage />} />
          <Route path="/evercl" element={<EverclPage />} />

          {/* 리프팅 */}
          <Route path="/shrink" element={<ShrinkPage />} />
          <Route path="/inmode" element={<InmodePage />} />
          <Route path="/olligio" element={<OllagioPage />} />
          <Route path="/doublo-gold" element={<DoubloGoldPage />} />

          {/* 색소 */}
          <Route path="/picosure" element={<PicosurePage />} />
          <Route path="/secret-duo" element={<SecretDurePage />} />
          <Route path="/nobelin" element={<NobelinPage />} />
          <Route path="/miiin-laser" element={<MiinLaserPage />} />
          <Route path="/aeton-laser" element={<AetonLaserPage />} />
          <Route path="/co2-laser" element={<Co2LaserPage />} />

          {/* 스킨케어 */}
          <Route path="/ibps" element={<IbpsPage />} />
          <Route path="/blackpeel" element={<BlackpeelPage />} />
          <Route path="/aquapeel" element={<AquapeelPage />} />
          <Route path="/ldm" element={<LdmPage />} />
          <Route path="/dermashine" element={<DermashinePage />} />
          <Route path="/nda-plus" element={<NdaPlusPage />} />
          <Route path="/belotero-revive" element={<BeloteroRevivePage />} />

          {/* 바디·제모 */}
          <Route path="/apogee-plus" element={<ApogeePlusPage />} />
          <Route path="/red-injection" element={<RedInjectionPage />} />
          <Route path="/nobleshape" element={<NobleshapePage />} />
          <Route path="/onico-laser" element={<OnicoLaserPage />} />
          <Route path="/carboxy" element={<CarboxyPage />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="h-screen flex items-center justify-center flex-col gap-4">
                <p className="text-6xl font-black text-gray-200">404</p>
                <p className="text-gray-500">페이지를 찾을 수 없습니다.</p>
                <a href="/" className="text-[#515c3e] font-bold hover:underline">홈으로 돌아가기</a>
              </div>
            }
          />
        </Routes>
      </Layout>
      </LanguageProvider>
    </BrowserRouter>
  );
}
