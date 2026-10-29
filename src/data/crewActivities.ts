export interface CrewActivity {
  id: number;
  crewId: number;
  emoji: string;
  nickname: string;
  distanceKm: number;
  createdAt: string;
}

// 활동은 crewId로 구분하고 기록 시각을 기준으로 최신순으로 표시한다.
export const CREW_ACTIVITIES: CrewActivity[] = [
  {
    id: 1,
    crewId: 1,
    emoji: "🌙",
    nickname: "김새벽",
    distanceKm: 8.2,
    createdAt: "2026-10-29T18:00:00+09:00",
  },
  {
    id: 2,
    crewId: 1,
    emoji: "🏃",
    nickname: "이러너",
    distanceKm: 5,
    createdAt: "2026-10-29T15:00:00+09:00",
  },
  {
    id: 3,
    crewId: 1,
    emoji: "⚡",
    nickname: "박달리기",
    distanceKm: 6.4,
    createdAt: "2026-10-28T19:00:00+09:00",
  },
  {
    id: 4,
    crewId: 1,
    emoji: "🌅",
    nickname: "최크루",
    distanceKm: 4,
    createdAt: "2026-10-27T07:00:00+09:00",
  },
  {
    id: 5,
    crewId: 2,
    emoji: "🌊",
    nickname: "한강러너",
    distanceKm: 7,
    createdAt: "2026-10-29T07:00:00+09:00",
  },
];
