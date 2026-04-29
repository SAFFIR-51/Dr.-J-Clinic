export type TabKey = 'always' | 'season';

export interface NoticeEvent {
  id: number;
  tab: TabKey;
  title: string;
  subtitle: string;
  thumbnail: string;
  contentImages: string[];
}

export const ALWAYS: NoticeEvent[] = [
  {
    id: 2, tab: 'always',
    title: '프리미엄 패키지',
    subtitle: 'Premium Package',
    thumbnail: '/이벤트/2.png',
    contentImages: ['/이벤트/2.1.png'],
  },
  {
    id: 3, tab: 'always',
    title: '베스트 스킨부스터',
    subtitle: 'Best Skin Booster',
    thumbnail: '/이벤트/3.png',
    contentImages: ['/이벤트/3.1.png'],
  },
  {
    id: 4, tab: 'always',
    title: '피부질환 보험진료',
    subtitle: 'Insurance Treatment',
    thumbnail: '/이벤트/4.png',
    contentImages: ['/이벤트/4.1.png'],
  },
];

export const SEASON: NoticeEvent[] = [
  {
    id: 1, tab: 'season',
    title: '5월 설렘, 봄 이벤트',
    subtitle: 'Spring Special Event',
    thumbnail: '/이벤트/1.png',
    contentImages: ['/이벤트/1.1.png', '/이벤트/1.2.png'],
  },
];

export const ALL_EVENTS = [...ALWAYS, ...SEASON];
