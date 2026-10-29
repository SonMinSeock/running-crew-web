export interface Crew {
  id: number;
  emoji: string;
  name: string;
  memberCount: number;
  region: string;
  description: string;
  distanceKm: number;
  difficulty: "초급" | "중급" | "고급";
  isJoined: boolean;
}

export interface CrewRun {
  id: number;
  crewId: number;
  startsAt: string;
  location: string;
  distanceKm: number;
  difficulty: "초급" | "중급" | "고급";
  participantCount: number;
}

export interface CrewNotice {
  id: number;
  crewId: number;
  title: string;
  createdAt: string;
  content: string;
}

export interface CrewActivity {
  id: number;
  crewId: number;
  emoji: string;
  nickname: string;
  distanceKm: number;
  createdAt: string;
}

export interface CrewMember {
  id: number;
  crewId: number;
  emoji: string;
  nickname: string;
  isLeader: boolean;
  joinedAt: string;
  distanceKm: number;
}

export const CREWS: Crew[] = [
  {
    id: 1,
    emoji: "🌙",
    name: "새벽 러너스",
    memberCount: 24,
    region: "여의도",
    description: "상쾌한 새벽, 한강을 함께 달리는 크루입니다.",
    distanceKm: 5,
    difficulty: "초급",
    isJoined: true,
  },
  {
    id: 2,
    emoji: "🌊",
    name: "한강 크루",
    memberCount: 18,
    region: "반포",
    description: "한강의 풍경을 즐기며 꾸준히 달립니다.",
    distanceKm: 7,
    difficulty: "중급",
    isJoined: true,
  },
  {
    id: 3,
    emoji: "⛰️",
    name: "주말 러닝",
    memberCount: 32,
    region: "남산",
    description: "주말 아침을 함께 달리며 시작합니다.",
    distanceKm: 10,
    difficulty: "고급",
    isJoined: true,
  },
  {
    id: 4,
    emoji: "🌳",
    name: "서울숲 러너스",
    memberCount: 16,
    region: "서울숲",
    description: "나무 사이를 달리며 일상의 활력을 찾습니다.",
    distanceKm: 5,
    difficulty: "초급",
    isJoined: true,
  },
  {
    id: 5,
    emoji: "🌃",
    name: "퇴근 후 러닝",
    memberCount: 21,
    region: "잠실",
    description: "퇴근 후 가볍게 달리며 하루를 마무리합니다.",
    distanceKm: 6,
    difficulty: "중급",
    isJoined: true,
  },
  {
    id: 6,
    emoji: "☀️",
    name: "모닝 페이스",
    memberCount: 12,
    region: "광교",
    description: "각자의 속도로 즐겁게 아침을 달립니다.",
    distanceKm: 4,
    difficulty: "초급",
    isJoined: true,
  },
  {
    id: 7,
    emoji: "🏃",
    name: "첫걸음 러닝",
    memberCount: 20,
    region: "망원",
    description: "러닝을 처음 시작하는 분들과 함께합니다.",
    distanceKm: 3,
    difficulty: "초급",
    isJoined: false,
  },
  {
    id: 8,
    emoji: "🌉",
    name: "반포 나이트런",
    memberCount: 28,
    region: "반포",
    description: "반포의 야경과 함께 저녁 러닝을 즐깁니다.",
    distanceKm: 7,
    difficulty: "중급",
    isJoined: false,
  },
  {
    id: 9,
    emoji: "⚡",
    name: "페이스 업",
    memberCount: 15,
    region: "잠실",
    description: "꾸준한 훈련으로 함께 기록을 높여갑니다.",
    distanceKm: 10,
    difficulty: "고급",
    isJoined: false,
  },
  {
    id: 10,
    emoji: "🍀",
    name: "공원 한 바퀴",
    memberCount: 14,
    region: "올림픽공원",
    description: "부담 없이 공원을 달리는 러닝 크루입니다.",
    distanceKm: 4,
    difficulty: "초급",
    isJoined: false,
  },
  {
    id: 11,
    emoji: "🌅",
    name: "노을 러너스",
    memberCount: 22,
    region: "상암",
    description: "노을을 바라보며 기분 좋게 달립니다.",
    distanceKm: 6,
    difficulty: "중급",
    isJoined: false,
  },
  {
    id: 12,
    emoji: "🔥",
    name: "롱런 메이트",
    memberCount: 17,
    region: "뚝섬",
    description: "장거리 러닝을 함께하며 지구력을 기릅니다.",
    distanceKm: 15,
    difficulty: "고급",
    isJoined: false,
  },
];

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
