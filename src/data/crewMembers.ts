export interface CrewMember {
  id: number;
  crewId: number;
  emoji: string;
  nickname: string;
  isLeader: boolean;
  joinedAt: string;
  distanceKm: number;
}

// distanceKm는 해당 크루 가입 후 누적 거리다.
// 미리보기용 데이터이며 전체 인원은 CREWS의 memberCount를 사용한다.
export const CREW_MEMBERS: CrewMember[] = [
  {
    id: 1,
    crewId: 1,
    emoji: "🌙",
    nickname: "김새벽",
    isLeader: true,
    joinedAt: "2026-09-01T09:00:00+09:00",
    distanceKm: 312,
  },
  {
    id: 2,
    crewId: 1,
    emoji: "🏃",
    nickname: "이러너",
    isLeader: false,
    joinedAt: "2026-09-02T10:00:00+09:00",
    distanceKm: 245,
  },
  {
    id: 3,
    crewId: 1,
    emoji: "⚡",
    nickname: "박달리기",
    isLeader: false,
    joinedAt: "2026-09-05T12:00:00+09:00",
    distanceKm: 198,
  },
  {
    id: 4,
    crewId: 1,
    emoji: "🌅",
    nickname: "최크루",
    isLeader: false,
    joinedAt: "2026-09-10T09:00:00+09:00",
    distanceKm: 176,
  },
  {
    id: 5,
    crewId: 1,
    emoji: "👟",
    nickname: "정조깅",
    isLeader: false,
    joinedAt: "2026-09-15T18:00:00+09:00",
    distanceKm: 134,
  },
  {
    id: 6,
    crewId: 1,
    emoji: "🍀",
    nickname: "윤러닝",
    isLeader: false,
    joinedAt: "2026-10-01T09:00:00+09:00",
    distanceKm: 52,
  },
  {
    id: 7,
    crewId: 2,
    emoji: "🌊",
    nickname: "한강러너",
    isLeader: true,
    joinedAt: "2026-09-01T09:00:00+09:00",
    distanceKm: 210,
  },
];
