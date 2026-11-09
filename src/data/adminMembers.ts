/**
 * 운영자 콘솔의 샘플 회원과 크루 가입 관계를 정의한다.
 */
export interface AdminMember {
  id: number;
  nickname: string;
  email: string;
  joinedAt: string;
}

interface AdminCrewMembership {
  memberId: number;
  crewId: number;
  isLeader: boolean;
  joinedAt: string;
}

export const ADMIN_MEMBERS: AdminMember[] = [
  {
    id: 1,
    nickname: "새벽러너",
    email: "dawn.runner@example.com",
    joinedAt: "2025-12-29T07:30:00+09:00",
  },
  {
    id: 2,
    nickname: "한강페이스",
    email: "hangang.pace@example.com",
    joinedAt: "2026-09-05T18:20:00+09:00",
  },
  {
    id: 3,
    nickname: "러닝구름",
    email: "running.cloud@example.com",
    joinedAt: "2026-09-12T09:10:00+09:00",
  },
  {
    id: 4,
    nickname: "마일메이트",
    email: "mile.mate@example.com",
    joinedAt: "2026-09-18T13:00:00+09:00",
  },
  {
    id: 5,
    nickname: "가을러너",
    email: "autumn.runner@example.com",
    joinedAt: "2026-09-28T20:45:00+09:00",
  },
  {
    id: 6,
    nickname: "초록트랙",
    email: "green.track@example.com",
    joinedAt: "2026-10-02T06:50:00+09:00",
  },
  {
    id: 7,
    nickname: "느린발걸음",
    email: "steady.stride@example.com",
    joinedAt: "2026-10-08T16:15:00+09:00",
  },
  {
    id: 8,
    nickname: "오후러너",
    email: "afternoon.runner@example.com",
    joinedAt: "2026-10-15T14:00:00+09:00",
  },
  {
    id: 9,
    nickname: "런앤커피",
    email: "run.and.coffee@example.com",
    joinedAt: "2026-10-20T08:30:00+09:00",
  },
  {
    id: 10,
    nickname: "공원한바퀴",
    email: "park.loop@example.com",
    joinedAt: "2026-10-26T19:10:00+09:00",
  },
  {
    id: 11,
    nickname: "토요일조깅",
    email: "saturday.jog@example.com",
    joinedAt: "2026-11-03T10:30:00+09:00",
  },
  {
    id: 12,
    nickname: "달빛러너",
    email: "moonlight.running.crew.member@example.com",
    joinedAt: "2026-11-07T21:00:00+09:00",
  },
];

// 운영자 화면의 샘플 회원 ID와 기존 크루 ID를 연결한다.
export const ADMIN_CREW_MEMBERSHIPS: AdminCrewMembership[] = [
  {
    memberId: 12,
    crewId: 2,
    isLeader: false,
    joinedAt: "2026-11-07T22:30:00+09:00",
  },
  {
    memberId: 12,
    crewId: 8,
    isLeader: true,
    joinedAt: "2026-11-08T19:20:00+09:00",
  },
  {
    memberId: 10,
    crewId: 10,
    isLeader: false,
    joinedAt: "2026-10-29T08:30:00+09:00",
  },
  {
    memberId: 2,
    crewId: 2,
    isLeader: false,
    joinedAt: "2026-09-08T18:30:00+09:00",
  },
  {
    memberId: 1,
    crewId: 1,
    isLeader: false,
    joinedAt: "2026-09-01T09:00:00+09:00",
  },
];
