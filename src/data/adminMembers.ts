/**
 * 운영자 콘솔의 회원 목록에 사용할 샘플 데이터를 정의한다.
 */
export interface AdminMember {
  id: number;
  nickname: string;
  email: string;
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
