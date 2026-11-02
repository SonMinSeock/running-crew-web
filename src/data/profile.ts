export interface UserProfile {
  nickname: string;
  emoji: string;
  region: string;
  bio: string;
}

export interface PersonalRun {
  id: number;
  startsAt: string;
  distanceKm: number;
}

export const USER_PROFILE: UserProfile = {
  nickname: "속도광",
  emoji: "😊",
  region: "서울 · 한강",
  bio: "한강을 달리는 걸 좋아합니다. 매일 조금씩 더 멀리.",
};

// 크루 활동과 독립적인 개인 기록 더미 데이터를 정의한다.
export const PERSONAL_RUNS: PersonalRun[] = [
  { id: 1, startsAt: "2026-10-20T07:00:00+09:00", distanceKm: 12 },
  { id: 2, startsAt: "2026-10-24T08:00:00+09:00", distanceKm: 7 },
  { id: 3, startsAt: "2026-10-27T06:00:00+09:00", distanceKm: 5 },
  { id: 4, startsAt: "2026-10-28T06:00:00+09:00", distanceKm: 4 },
  { id: 5, startsAt: "2026-10-30T06:00:00+09:00", distanceKm: 6.4 },
  { id: 6, startsAt: "2026-10-31T08:00:00+09:00", distanceKm: 8.2 },
  { id: 7, startsAt: "2026-11-01T08:00:00+09:00", distanceKm: 7.8 },
  { id: 8, startsAt: "2026-11-02T06:00:00+09:00", distanceKm: 5 },
];
