import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BLUE = '#6b9ab8';

const CLINIC_IMAGES = [
  { src: '/images/clinic/clinic1.png', w: 'w-[300px]' },
  { src: '/images/clinic/clinic3.jpg', w: 'w-[340px]' },
  { src: '/images/clinic/clinic4.png', w: 'w-[280px]' },
  { src: '/images/clinic/clinic5.png', w: 'w-[320px]' },
  { src: '/images/clinic/clinic6.png', w: 'w-[260px]' },
];


export default function About() {
  const { t } = useLanguage();

  const BRAND_POINTS_T = [
    { label: t('about.promise.01.label'), desc: t('about.promise.01.desc') },
    { label: t('about.promise.02.label'), desc: t('about.promise.02.desc') },
    { label: t('about.promise.03.label'), desc: t('about.promise.03.desc') },
    { label: t('about.promise.04.label'), desc: t('about.promise.04.desc') },
  ];

  const DEVICES_T = [
    { name: '피코슈어', img: '/images/device/picosure.png', tag: 'Pigmentation · Rejuvenation', desc: t('about.device.picosure') || '미국 FDA 승인 피코초 레이저. 기존 레이저 대비 압도적으로 짧은 조사 시간으로 색소·잡티·모공을 정밀하게 개선합니다.' },
    { name: '슈링크', img: '/images/device/shrink.png', tag: 'HIFU Lifting', desc: t('about.device.shrink') || '집속형 초음파(HIFU)로 피부 깊은 층 SMAS까지 에너지를 전달해 자연스러운 리프팅과 탄력을 회복시킵니다.' },
    { name: '인모드', img: '/images/device/inmode.png', tag: 'RF · Body Contouring', desc: t('about.device.inmode') || '차세대 라디오주파수 장비로 얼굴 리프팅부터 바디 윤곽까지. 열에너지로 콜라겐 생성을 촉진합니다.' },
    { name: '더블로골드', img: '/images/device/doubloGold.png', tag: 'Dual HIFU', desc: t('about.device.doublo') || '이중 초음파로 피부 표면과 심부층을 동시에 케어. 탁월한 리프팅 효과와 높은 안전성으로 검증된 장비입니다.' },
    { name: '올리지오', img: '/images/device/ollagio.png', tag: 'RF Skin Tightening', desc: t('about.device.olligio') || '25개 핀을 통한 균일한 RF 에너지 전달로 통증은 최소화하고 피부 탄력 개선 효과는 극대화합니다.' },
    { name: '노블쉐이프', img: '/images/device/nobleshape.png', tag: 'Body · Fat Reduction', desc: t('about.device.nobleshape') || '고강도 집속 초음파로 지방세포를 직접 파괴하고 근육을 강화. 탄탄한 바디 라인을 설계합니다.' },
    { name: '미인레이저', img: '/images/device/miinLaser.png', tag: 'Pigmentation · Toning', desc: '1064nm Nd:YAG 토닝 레이저로 기미·색소침착을 균일하게 개선하고 전체적인 피부 톤을 밝혀줍니다.' },
    { name: '노블린', img: '/images/device/nobelin.png', tag: 'Dual Wavelength Laser', desc: '1064nm+755nm 듀얼 파장으로 표피·진피의 색소와 혈관 병변을 한 번에 복합 치료합니다.' },
    { name: '시크릿 듀오', img: '/images/device/secretDure.png', tag: 'Fractional Laser · RF', desc: '1540nm 프락셔널 레이저와 마이크로니들 고주파가 결합된 장비로 모공·탄력·색소침착을 복합적으로 개선합니다.' },
    { name: '에이톤레이저', img: '/images/device/aetonLaser.png', tag: 'Vascular · Pigmentation', desc: '혈관 확장·홍조·색소 병변에 특화된 레이저로 다양한 피부 트러블을 정밀하게 치료합니다.' },
    { name: '아포지플러스', img: '/images/device/apogeePlus.png', tag: 'Laser Hair Removal', desc: '755nm 알렉산드라이트 레이저로 제모와 혈관 치료를 안전하고 효과적으로 진행합니다.' },
    { name: 'LDM', img: '/images/device/ldm.png', tag: 'Ultrasound Skin Care', desc: '고밀도 초음파 진동으로 세포를 활성화하고 유효 성분을 진피 깊은 층까지 침투시키는 무자극 스킨케어 장비입니다.' },
    { name: '오니코 레이저', img: '/images/device/onicoLaser.png', tag: 'Nail · Fungus', desc: '손·발톱 진균증(무좀)에 특화된 레이저로 항진균제 없이 균을 직접 제거합니다.' },
    { name: '더마샤인 프로', img: '/images/device/dermashine.png', tag: 'Micro-needle · Hydration', desc: '음압 전동식 자동주사 방식으로 9개 미세 니들이 진피층에 주사제 성분을 균일하게 주입합니다.' },
    { name: '마크뷰', img: '/images/device/markview.png', tag: 'Skin Analysis', desc: '피부 상태를 정밀하게 분석하는 진단 장비로 시술 전·후 피부 변화를 객관적으로 확인합니다.' },
    { name: '리쥬메이트', img: '/images/device/rejumate.png', tag: 'Skin Booster', desc: '피부 재생과 수분 공급에 특화된 장비로 피부 탄력과 윤기를 효과적으로 개선합니다.' },
    { name: '이온토손', img: '/images/device/iontoson.png', tag: 'Electroporation', desc: '이온토포레시스 기술로 유효 성분을 피부 깊은 층까지 침투시켜 피부 재생을 촉진합니다.' },
    { name: '크라이오셀', img: '/images/device/cryocell.png', tag: 'Cryotherapy', desc: '냉각 에너지를 활용하여 지방세포를 감소시키고 피부 진정과 탄력 개선에 효과적입니다.' },
    { name: '리포덤', img: '/images/device/lipoderm.png', tag: 'Body Contouring', desc: '지방 분해와 바디 윤곽 개선에 특화된 장비로 탄력 있는 바디 라인을 완성합니다.' },
  ];

  return (
    <div className="bg-white">

      {/* ① Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: '100vh', paddingTop: 64 }}
      >
        <img src="/images/clinic/clinic5.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'rgba(248,246,244,0.82)' }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-6"
        >
          <p className="text-[11px] tracking-[0.5em] uppercase mb-8" style={{ color: BLUE }}>
            {t('about.hero.label')}
          </p>
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(34px, 4vw, 56px)',
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: '#111',
            }}
          >
            {t('about.hero.title')}<br />
            <span style={{ color: BLUE, fontStyle: 'italic' }}>{t('about.hero.title.accent')}</span>
          </h1>
          <div className="w-10 h-px bg-gray-300 mx-auto my-10" />
          <p className="text-[14px] text-gray-500 leading-[2] max-w-xs mx-auto whitespace-pre-line">
            {t('about.hero.desc')}
          </p>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <p className="text-[9px] tracking-[0.4em] uppercase text-gray-400">Scroll</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent"
          />
        </div>
      </section>

      {/* ② 핵심 지표 */}
      <section className="py-16 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 text-center divide-x divide-gray-100">
            {[
              { num: t('about.metrics.11'), label: t('about.metrics.11.label') },
              { num: t('about.metrics.100'), label: t('about.metrics.100.label') },
              { num: t('about.metrics.0'), label: t('about.metrics.0.label') },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="py-4"
              >
                <p
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: 'clamp(32px, 4vw, 48px)',
                    fontWeight: 500,
                    color: BLUE,
                    lineHeight: 1,
                    marginBottom: 10,
                  }}
                >
                  {item.num}
                </p>
                <p className="text-[11px] text-gray-400 tracking-[0.08em]">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ③ 원장 인사말 */}
      <section className="py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:w-[340px] shrink-0"
            >
              <div className="relative overflow-hidden rounded-xl shadow-md" style={{ aspectRatio: '3/4' }}>
                <img
                  src="/images/doctor.png"
                  alt="이재원 대표원장"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-6">
                  <p className="text-white/60 text-[10px] tracking-[0.2em] mb-0.5">대표원장</p>
                  <p className="text-white text-[20px] font-black">이재원</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 pt-2 md:pt-8"
            >
              <p className="text-[10px] font-black tracking-[0.45em] uppercase mb-5" style={{ color: `${BLUE}80` }}>
                {t('about.greeting.label')}
              </p>
              <h2
                className="mb-7 leading-tight whitespace-pre-line"
                style={{
                  fontSize: 'clamp(22px, 2.5vw, 30px)',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  color: '#111',
                }}
              >
                {t('about.greeting.title')}
              </h2>
              <div className="w-8 h-[2px] mb-7" style={{ backgroundColor: BLUE }} />
              <p className="text-[14px] text-gray-500 leading-[2.2] mb-8 whitespace-pre-line">
                {t('about.greeting.desc')}
              </p>
              <Link
                to="/doctors"
                className="inline-flex items-center gap-2 text-[13px] font-bold transition-colors group"
                style={{ color: BLUE }}
              >
                {t('about.greeting.cta')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ④ 브랜드 약속 */}
      <section className="bg-[#f8f7f5] py-28">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-[10px] font-black tracking-[0.5em] uppercase mb-5 text-gray-300">
              {t('about.promise.label')}
            </p>
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#111',
                lineHeight: 1.3,
              }}
            >
              {t('about.promise.title').split('\n').map((line, i, arr) => (
                <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
              ))}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
            {BRAND_POINTS_T.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-[#f8f7f5] p-10"
              >
                <p className="text-[10px] font-black tracking-[0.4em] uppercase mb-4" style={{ color: BLUE }}>
                  0{i + 1}
                </p>
                <p className="text-[17px] font-bold text-[#111] mb-3">{point.label}</p>
                <p className="text-[13px] text-gray-400 leading-[1.9]">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑤ 주요 장비 */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-[10px] font-black tracking-[0.5em] uppercase mb-4 text-gray-300">{t('about.equipment.label')}</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2
                className="text-[#111] leading-tight tracking-tight whitespace-pre-line"
                style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 900 }}
              >
                {t('about.equipment.title')}
              </h2>
              <p className="text-[13px] text-gray-400 leading-[2] md:max-w-[280px] whitespace-pre-line">
                {t('about.equipment.desc')}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {DEVICES_T.map((device, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group bg-[#fafafa] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={device.img}
                    alt={device.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-semibold tracking-[0.15em] mb-2" style={{ color: BLUE }}>
                    {device.tag}
                  </p>
                  <p className="text-[16px] font-black text-[#111]">{device.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑥ Our Space — 가로 무한 스크롤 갤러리 */}
      <section className="py-32 md:py-40 bg-[#f8f7f5] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <div>
              <p className="text-[11px] font-black tracking-[0.4em] text-gray-300 uppercase mb-5">{t('about.space.label')}</p>
              <h2
                className="text-[#111] leading-tight tracking-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900 }}
              >
                {t('about.space.title')}<br />
                <span
                  className="italic font-light"
                  style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: BLUE }}
                >
                  {t('about.space.subtitle')}
                </span>
              </h2>
            </div>
            <p className="text-[14px] text-gray-500 leading-[2] md:max-w-[260px] whitespace-pre-line">
              {t('about.space.desc')}
            </p>
          </motion.div>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f8f7f5] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f8f7f5] to-transparent z-10 pointer-events-none" />
          <motion.div
            className="flex gap-4 px-4 w-max"
            animate={{ x: [0, -1680] }}
            transition={{ repeat: Infinity, duration: 38, ease: 'linear' }}
          >
            {[...CLINIC_IMAGES, ...CLINIC_IMAGES, ...CLINIC_IMAGES].map((img, i) => (
              <div
                key={i}
                className={`${img.w} shrink-0 overflow-hidden rounded-2xl`}
                style={{ height: 'clamp(360px, 45vw, 560px)' }}
              >
                <img
                  src={img.src}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ⑦ 클로징 */}
      <section className="py-32 text-center bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-6"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-gray-300 mb-6">{t('about.closing.label')}</p>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(30px, 4vw, 56px)',
              fontWeight: 400,
              letterSpacing: '0.02em',
              color: '#111',
              lineHeight: 1.2,
            }}
          >
            {t('about.closing.title')}
          </h2>
        </motion.div>
      </section>

    </div>
  );
}
