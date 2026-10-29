export interface CrewNotice {
  id: number;
  crewId: number;
  title: string;
  createdAt: string;
  content: string;
}

// crewId로 크루를 구분하고 작성일을 기준으로 최신 공지를 선택한다.
export const CREW_NOTICES: CrewNotice[] = [
  {
    id: 1,
    crewId: 1,
    title: "11월 정기런 안내",
    createdAt: "2026-10-29T18:00:00+09:00",
    content:
      "다음 주 목요일 새벽 6시 여의도 한강공원에서 만나요! 가볍게 몸을 풀고 함께 5km를 달릴 예정입니다. 개인 물과 편한 러닝화를 준비해주세요.",
  },
  {
    id: 2,
    crewId: 1,
    title: "새벽 러너스에 오신 것을 환영합니다",
    createdAt: "2026-10-25T09:00:00+09:00",
    content:
      "각자의 속도를 존중하며 즐겁게 달리는 크루입니다. 함께 달릴 때는 안전을 먼저 생각하고 서로 배려해주세요.",
  },
  {
    id: 3,
    crewId: 2,
    title: "반포 러닝 집결 장소 안내",
    createdAt: "2026-10-28T19:00:00+09:00",
    content:
      "이번 러닝은 반포 한강공원에서 시작합니다. 출발 10분 전까지 모여 함께 준비운동을 진행해주세요.",
  },
];
