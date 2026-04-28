export interface EventBlock {
  type: 'image' | 'text';
  src?: string;
  label?: string;
  title?: string;
  desc?: string;
  note?: string;
}

export interface EventItem {
  id: string;
  badge: string;
  title: string;
  period: string;
  thumbnail: string;
  blocks: EventBlock[];
}

export const EVENTS: EventItem[] = [
  {
    id: '1',
    badge: '5월 이벤트',
    title: '봄맞이 특별 할인',
    period: '2025. 05. 01 – 05. 31',
    thumbnail: '/images/home2.png',
    blocks: [
      { type: 'image', src: '/images/home3.png' },
      {
        type: 'text',
        label: 'EVENT 01',
        title: '보톡스 특가',
        desc: '봄을 맞아 보톡스를 특별한 가격으로 만나보세요.\n이마, 눈가, 미간 등 부위별 맞춤 시술로\n자연스럽고 생기있는 인상을 완성합니다.',
        note: '* 이벤트 기간 내 예약 및 시술 완료 시 적용',
      },
      { type: 'image', src: '/images/home4.png' },
      {
        type: 'text',
        label: 'EVENT 02',
        title: '필러 패키지',
        desc: '코, 입술, 팔자, 이마 등 원하는 부위를\n전문의와 충분한 상담 후 맞춤 설계합니다.\n합리적인 패키지로 더 큰 만족을 경험하세요.',
        note: '* 부위 및 용량에 따라 가격 상이, 상담 필요',
      },
    ],
  },
  {
    id: '2',
    badge: '6월 이벤트',
    title: '여름 피부 집중케어 패키지',
    period: '2025. 06. 01 – 06. 30',
    thumbnail: '/images/home6.png',
    blocks: [
      { type: 'image', src: '/images/home6.png' },
      {
        type: 'text',
        label: 'EVENT 01',
        title: '리쥬란 + 주블룩',
        desc: '여름철 자외선으로 지친 피부에 집중 수분과 탄력을 동시에.\n리쥬란과 주블룩 조합으로 피부 속부터 채워드립니다.',
        note: '* 당일 두 가지 시술 동시 진행 시 적용',
      },
      { type: 'image', src: '/images/home7.png' },
      {
        type: 'text',
        label: 'EVENT 02',
        title: '피부 스킨케어 패키지',
        desc: '물광주사, 더마샤인 등 피부 보습 집중 케어.\n봄·여름 환절기 건조하고 칙칙한 피부에 생기를 더하세요.',
        note: '* 시술 조합에 따라 가격 협의 가능',
      },
    ],
  },
  {
    id: '3',
    badge: '상시 이벤트',
    title: '첫 방문 고객 상담 무료',
    period: '상시 진행',
    thumbnail: '/images/home8.png',
    blocks: [
      { type: 'image', src: '/images/home8.png' },
      {
        type: 'text',
        label: 'EVENT',
        title: '첫 방문 고객 혜택',
        desc: '처음 방문하시는 고객분들께 전문의 피부 상담을 무료로 제공합니다.\n피부 상태 분석 후 가장 적합한 시술 방향을 안내드립니다.',
        note: '* 시술 예약과 무관하게 상담 자체는 무료로 진행됩니다',
      },
      { type: 'image', src: '/images/clinic/clinic4.png' },
      {
        type: 'text',
        label: 'BONUS',
        title: '재방문 시 추가 혜택',
        desc: '첫 방문 이후 시술 진행 고객님께는 재방문 시 특별 혜택을 드립니다.\n자세한 내용은 내원 후 문의해 주세요.',
        note: '* 일부 시술 제외, 내원 시 문의',
      },
    ],
  },
];
