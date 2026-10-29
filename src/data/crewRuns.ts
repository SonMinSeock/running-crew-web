/**
 * 가입 목록과 상세 화면이 함께 사용할 러닝 일정 데이터
 */

export interface CrewRun {
  id: number;
  crewId: number;
  startsAt: string;
  location: string;
  distanceKm: number;
  difficulty: "초급" | "중급" | "고급";
  participantCount: number;
}

export const CREW_RUNS: CrewRun[] = [
  {
    id: 1,
    crewId: 1,
    startsAt: "2026-11-05T06:00:00+09:00",
    location: "여의도 한강공원",
    distanceKm: 5,
    difficulty: "초급",
    participantCount: 14,
  },
  {
    id: 2,
    crewId: 1,
    startsAt: "2026-11-12T06:00:00+09:00",
    location: "여의도 한강공원",
    distanceKm: 7,
    difficulty: "중급",
    participantCount: 8,
  },
  {
    id: 3,
    crewId: 2,
    startsAt: "2026-11-07T08:00:00+09:00",
    location: "반포 한강공원",
    distanceKm: 7,
    difficulty: "중급",
    participantCount: 10,
  },
];
