export type TabKey = 'always' | 'special' | 'season';

export interface NoticeEvent {
  id: number;
  tab: TabKey;
  badge?: string;
  title: string;
  subtitle: string;
  desc: string;
  period: string;
  image: string;
  hot?: boolean;
  // 상세 페이지
  detailImage?: string;
  detailText?: string;
}

export const ALWAYS: NoticeEvent[] = [
  {
    id: 1, tab: 'always', badge: 'ALWAYS ON',
    title: '첫 방문 무료 상담', subtitle: '전문의 1:1 피부 진단',
    desc: '처음 방문하시는 모든 분께 피부과 전문의와의 1:1 맞춤 상담을 무료로 제공합니다.',
    period: '상시 진행',
    image: 'http://www.reoneskin.com/theme/reone/img/re03_right_img01_n.png',
    detailImage: '/images/home2.png',
    detailText: '처음 방문하시는 모든 분께 피부과 전문의와의 1:1 맞춤 상담을 무료로 제공합니다.\n\n피부 타입 분석부터 시술 방향까지 충분한 시간을 드립니다.\n네이버 예약 또는 카카오 채널을 통해 사전 예약 후 방문해 주세요.\n\n※ 상시 진행, 별도 기간 제한 없음',
  },
  {
    id: 2, tab: 'always', badge: 'VIP',
    title: '재방문 고객 VIP 혜택', subtitle: '우선 예약 · 전용 케어',
    desc: '재방문 고객께는 우선 예약권과 개인 맞춤 VIP 전용 혜택을 드립니다.',
    period: '상시 진행', hot: true,
    image: 'http://www.reoneskin.com/theme/reone/img/re03_right_img02_n.png',
    detailImage: '/images/home6.png',
    detailText: '닥터제이앤미의원을 다시 찾아주시는 고객분들께 감사의 마음을 담아 우선 예약권과 VIP 전용 케어 혜택을 드립니다.\n\n· 우선 예약 배정\n· 개인 맞춤 케어 프로그램\n· 시술 시 추가 혜택 적용\n\n※ 혜택 내용은 내원 시 문의 부탁드립니다.',
  },
  {
    id: 3, tab: 'always', badge: 'PACKAGE',
    title: '복합 시술 패키지 할인', subtitle: '2가지 이상 시술 상시 혜택',
    desc: '2가지 이상 시술을 함께 받으시면 특별 패키지 할인을 적용해드립니다.',
    period: '상시 진행',
    image: 'http://www.reoneskin.com/theme/reone/img/re03_right_img03_n.png',
    detailImage: '/images/home8.png',
    detailText: '2가지 이상 시술을 함께 진행하시면 패키지 할인 혜택을 적용해 드립니다.\n상담 시 원하시는 시술을 말씀해 주시면 최적의 조합을 설계해 드립니다.\n\n· 보톡스 + 필러 조합\n· 리프팅 + 스킨케어 조합\n\n※ 조합에 따라 할인율 상이, 상담 시 확인',
  },
  {
    id: 4, tab: 'always', badge: 'ONLINE',
    title: '온라인 예약 특별 할인', subtitle: '네이버 · 카카오 사전 예약',
    desc: '네이버 예약 또는 카카오톡 채널로 사전 예약 시 추가 할인 혜택을 제공합니다.',
    period: '상시 진행',
    image: 'http://www.reoneskin.com/theme/reone/sub/img/s11_half01_img01_n.png',
    detailImage: '/images/clinic/clinic1.png',
    detailText: '네이버 예약 또는 카카오톡 채널을 통해 사전 예약하시면 내원 시 추가 할인 혜택을 드립니다.\n\n· 네이버 예약: 상단 네이버 예약 버튼 클릭\n· 카카오 채널: 카카오톡에서 닥터제이앤미의원 검색\n\n※ 당일 예약은 제외될 수 있음',
  },
  {
    id: 5, tab: 'always', badge: 'BIRTHDAY',
    title: '생일 케어 프로그램', subtitle: '생일 달 내원 스페셜 서비스',
    desc: '생일이 있는 달에 내원하시면 특별 스킨케어 서비스와 선물을 드립니다.',
    period: '상시 진행',
    image: 'http://www.reoneskin.com/theme/reone/sub/img/s11_half03_img01.png',
    detailImage: '/images/home4.png',
    detailText: '생일이 있는 달에 닥터제이앤미의원을 방문해 주시면 특별 스킨케어 서비스와 작은 선물을 준비해 드립니다.\n\n· 당월 내원 시 스킨케어 서비스 1회\n· 소정의 기념 선물 증정\n\n※ 신분증 등 생년월일 확인 가능한 서류 지참 필요',
  },
  {
    id: 6, tab: 'always', badge: 'KAKAO',
    title: '카톡 빠른 상담 이벤트', subtitle: '상담 후 예약 시 추가 혜택',
    desc: '카카오톡 채널로 빠른 상담을 진행하고 예약까지 완료하시면 추가 혜택을 드립니다.',
    period: '상시 진행',
    image: 'http://www.reoneskin.com/theme/reone/sub/img/s11_half02_img01.png',
    detailImage: '/images/clinic/clinic3.jpg',
    detailText: '카카오톡에서 닥터제이앤미의원 채널을 추가하시면 언제든지 빠르게 상담을 받으실 수 있습니다.\n상담 후 예약까지 완료하시면 추가 혜택을 드립니다.\n\n1. 카카오톡 채널 검색: 닥터제이앤미의원\n2. 채널 추가 후 상담 메시지 전송\n3. 상담 완료 후 예약 시 혜택 적용',
  },
];

export const SPECIAL: NoticeEvent[] = [
  {
    id: 10, tab: 'special', badge: 'LAUNCH', hot: true,
    title: '소프웨이브 국내 최다 8대 보유', subtitle: '런칭 기념 한정 이벤트',
    desc: '소프웨이브 국내 최다 8대 보유를 기념하여 특별 한정 패키지를 선보입니다.',
    period: '2026.04.01 ~ 한정',
    image: 'http://www.reoneskin.com/data/file/equipment/df8dad74ba033b78a7246af8f41e315c_6UM9REbX_c0bd4cdfe3b84bae7834f595a6c256324d7460ce.png',
    detailImage: '/images/hero/shrink.png',
    detailText: '닥터제이앤미의원이 소프웨이브 국내 최다 8대를 보유하게 된 것을 기념하여 특별 한정 패키지를 선보입니다.\n\n· 소프웨이브 단독 패키지 특별가\n· 리프팅 복합 패키지 할인\n· 선착순 한정 수량\n\n※ 자세한 가격은 상담 시 안내드립니다.',
  },
  {
    id: 11, tab: 'special', badge: 'NEW',
    title: '울쎄라피 프라임 8대 입고 완료', subtitle: '런칭 기념 특별가 안내',
    desc: '울쎄라피 프라임 8대 신규 입고를 기념한 특별가 이벤트입니다. 선착순 마감.',
    period: '2026.04.01 ~ 한정',
    image: 'http://www.reoneskin.com/data/file/equipment/df8dad74ba033b78a7246af8f41e315c_cpjF8b0G_8a3ba3c5f3ab08ded0a5f1de106eaadf4d2dec8a.png',
    detailImage: '/images/hero/doubloGold.png',
    detailText: '최신 울쎄라피 프라임 8대 신규 입고를 기념하여 런칭 특별가를 제공합니다.\n피부 깊숙이 HIFU 에너지를 전달해 확실한 리프팅 효과를 경험하세요.\n\n· 울쎄라피 단독 런칭가 적용\n· 선착순 한정 이벤트\n\n※ 사전 예약 필수, 당일 현장 적용 불가',
  },
  {
    id: 12, tab: 'special', badge: 'SIGNATURE', hot: true,
    title: '닥터제이앤미의원 시그니처 패키지', subtitle: '개원 기념 스페셜 패키지',
    desc: '닥터제이앤미의원 대표 시술을 한번에 경험하는 시그니처 패키지를 특별가로 제공합니다.',
    period: '2026.06.01 ~ 한정',
    image: 'http://www.reoneskin.com/theme/reone/img/re04_img01.png',
    detailImage: '/images/home7.png',
    detailText: '닥터제이앤미의원을 대표하는 시술들을 한번에 경험할 수 있는 시그니처 패키지입니다.\n\n· 보톡스 (이마 + 눈가 + 미간)\n· 필러 1부위 선택\n· 피부 스킨케어 1회\n\n※ 부위 및 시술 조합은 상담 후 변경 가능',
  },
  {
    id: 13, tab: 'special', badge: 'EVENT',
    title: '써마지 FLX 국내 최다 보유', subtitle: '5대 보유 기념 특별 패키지',
    desc: '써마지 FLX 5대 보유 기념 이벤트. 콜라겐 재생과 탄력 개선을 특별가로 경험하세요.',
    period: '2026.05.01 ~ 한정',
    image: 'http://www.reoneskin.com/data/file/equipment/df8dad74ba033b78a7246af8f41e315c_lodGDZN7_8047a1fddb1c2b88d35b5af6f167cdc46e2f1167.png',
    detailImage: '/images/hero/shrink.png',
    detailText: '써마지 FLX 5대 보유를 기념하여 탄력 집중 패키지를 특별가로 선보입니다.\n콜라겐 재생과 리프팅 효과로 피부 탄력을 되찾으세요.\n\n· 써마지 단독 이벤트가 적용\n· 리프팅 복합 패키지 추가 할인\n\n※ 선착순 마감, 기간 내 사전 예약 필수',
  },
];

export const SEASON: NoticeEvent[] = [
  {
    id: 20, tab: 'season', badge: 'SUMMER', hot: true,
    title: '7·8월 여름 미백·색소 케어', subtitle: '자외선 집중 케어 프로그램',
    desc: '여름철 자외선으로 인한 기미·잡티·색소 집중 케어 프로그램을 특별가로 제공합니다.',
    period: '2026.07.01 ~ 08.31',
    image: 'http://www.reoneskin.com/data/file/equipment/df8dad74ba033b78a7246af8f41e315c_dM7eAczH_7352cf0679547b140fe02130330d40990271caa7.png',
    detailImage: '/images/hero/picosure.png',
    detailText: '자외선이 강한 여름철, 기미·잡티·색소 집중 케어로 맑고 투명한 피부를 만들어드립니다.\n\n· 피코슈어 레이저 특별가\n· 미인레이저 패키지 할인\n· 색소 복합 케어 조합 가능\n\n※ 7~8월 한정, 기간 내 시술 완료 필수',
  },
  {
    id: 21, tab: 'season', badge: 'SUMMER',
    title: '7·8월 바디 제모 패키지', subtitle: '여름 맞이 제모 특별가',
    desc: '여름을 완벽하게 준비하는 레이저 제모 패키지. 전신 부위별 맞춤 가격을 제공합니다.',
    period: '2026.07.01 ~ 08.31',
    image: 'http://www.reoneskin.com/data/file/equipment/df8dad74ba033b78a7246af8f41e315c_UQ4MbKID_08c581cd7b076b9105e8f02b2a0cb04f8e4db07f.png',
    detailImage: '/images/hero/apogeePlus.png',
    detailText: '여름을 자신 있게 맞이하세요. 레이저 제모로 부드럽고 깨끗한 피부를 완성합니다.\n\n· 겨드랑이 패키지\n· 다리 (상·하) 패키지\n· 전신 패키지\n\n※ 부위 및 횟수에 따라 가격 상이, 상담 후 결정',
  },
  {
    id: 22, tab: 'season', badge: 'SPRING',
    title: '5·6월 스킨케어 집중 케어', subtitle: '아쿠아필 · 블랙필 · IBPS',
    desc: '봄철 피부 재생을 위한 스킨케어 집중 프로그램. 모공, 피부결 개선에 최적화된 패키지.',
    period: '2026.05.01 ~ 06.30',
    image: 'http://www.reoneskin.com/data/file/equipment/df8dad74ba033b78a7246af8f41e315c_Nhysmx9l_a73cd70f6b28d8d964fb60ec897ba3d097a36b86.png',
    detailImage: '/images/hero/aquapeel.png',
    detailText: '겨울 동안 건조해진 피부를 봄 환절기에 집중 케어하세요.\n아쿠아필·블랙필·IBPS로 모공과 피부결을 개선합니다.\n\n· 아쿠아필 + IBPS 복합 패키지\n· 블랙필 + 스킨케어 조합\n\n※ 5~6월 한정',
  },
  {
    id: 23, tab: 'season', badge: 'SPRING',
    title: '3·4월 봄 리프팅 패키지', subtitle: '슈링크 · 인모드 · 더블로골드',
    desc: '새봄 맞이 탄력 업! 리프팅 패키지로 겨울 동안 처진 피부를 되살려 드립니다.',
    period: '2026.03.01 ~ 04.30',
    image: 'http://www.reoneskin.com/data/file/equipment/df8dad74ba033b78a7246af8f41e315c_MXOBou4p_22f2c447657277695cc4e015cbf14ebdfc2a91fe.png',
    detailImage: '/images/hero/shrink.png',
    detailText: '겨울 동안 처진 피부를 봄에 되살리세요.\n슈링크·인모드·더블로골드로 탄력을 집중 케어합니다.\n\n· 슈링크 단독 / 복합 패키지\n· 인모드 + 슈링크 조합\n· 더블로골드 특별가\n\n※ 3~4월 한정',
  },
  {
    id: 24, tab: 'season', badge: 'SPRING',
    title: '3·4월 봄 색소 케어', subtitle: '피코슈어 · 미인레이저',
    desc: '봄 환절기 색소 집중 케어. 피코슈어와 미인레이저로 맑고 투명한 피부를 만들어드립니다.',
    period: '2026.03.01 ~ 04.30',
    image: 'http://www.reoneskin.com/data/file/equipment/df8dad74ba033b78a7246af8f41e315c_qnoA01EC_503c5cc6843f08c0737d144a28761e1d3a8b7e39.png',
    detailImage: '/images/hero/picosure.png',
    detailText: '피코슈어와 미인레이저로 봄 환절기 색소를 집중 케어합니다.\n기미, 잡티, 피부 톤 불균형을 개선해 맑고 투명한 피부를 완성하세요.\n\n· 피코슈어 레이저 특별가\n· 미인레이저 패키지\n\n※ 3~4월 한정',
  },
];

export const ALL_EVENTS = [...ALWAYS, ...SPECIAL, ...SEASON];
