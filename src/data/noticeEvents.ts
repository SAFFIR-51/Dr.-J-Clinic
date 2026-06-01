export type TabKey = 'always' | 'season';

export interface NoticeEvent {
  id: number;
  tab: TabKey;
  title: string;
  thumbnail: string;
  contentImages: string[];
}

export const ALWAYS: NoticeEvent[] = [
  {
    id: 1, tab: 'always',
    title: '고객맞춤 상시혜택 프로그램',
    thumbnail: '/이벤트/1.png',
    contentImages: ['/이벤트/1.1.png', '/이벤트/1.2.png', '/이벤트/1.3.png'],
  },
  {
    id: 3, tab: 'always',
    title: '평일 이벤트',
    thumbnail: '/이벤트/3.png',
    contentImages: ['/이벤트/3.1.png'],
  },
];

export const SEASON: NoticeEvent[] = [
  {
    id: 2, tab: 'season',
    title: '제증명 수수료 · 비급여 치료 금액안내',
    thumbnail: '/이벤트/2.png',
    contentImages: ['/이벤트/2.1.png'],
  },
];

export const ALL_EVENTS = [...ALWAYS, ...SEASON];
