export type TabKey = 'always' | 'season';

export interface NoticeEvent {
  id: number;
  tab: TabKey;
  title: string;
  thumbnail: string;
  contentImages: string[];
  hidden?: boolean;
}

export const ALWAYS: NoticeEvent[] = [
  {
    id: 1, tab: 'always',
    title: '고객맞춤 상시혜택 프로그램',
    thumbnail: '/이벤트/1.png',
    contentImages: ['/이벤트/1.1.png', '/이벤트/1.2.png', '/이벤트/1.3.png'],
  },
  {
    id: 2, tab: 'always',
    title: '제증명 수수료 · 비급여 치료 금액안내',
    thumbnail: '/이벤트/2.png',
    contentImages: ['/이벤트/2.1.png'],
  },
];

export const SEASON: NoticeEvent[] = [
  {
    id: 3, tab: 'season',
    title: '평일 이벤트',
    thumbnail: '/이벤트/3.png',
    contentImages: ['/이벤트/3.1.png'],
    hidden: true,
  },
  {
    id: 4, tab: 'season',
    title: '시즌 이벤트',
    thumbnail: '/이벤트/4.png',
    contentImages: ['/이벤트/4.1.png', '/이벤트/4.2.png', '/이벤트/4.3.png'],
  },
  {
    id: 5, tab: 'season',
    title: '탄력·미백 이벤트',
    thumbnail: '/이벤트/5.png',
    contentImages: ['/이벤트/5.1.jpg'],
  },
  {
    id: 7, tab: 'season',
    title: '가을맞이 피부 이벤트',
    thumbnail: '/이벤트/7.png',
    contentImages: ['/이벤트/7.1.png'],
  },
];

export const ALL_EVENTS = [...ALWAYS, ...SEASON];
