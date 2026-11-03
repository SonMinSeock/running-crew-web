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
  title: string;
  description: string;
  meetingGuide: string;
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
  content: string;
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

// 기존 크루 정보와 더미 데이터 생성에 사용할 목표 인원수를 정의한다.
const CREW_SEEDS: Crew[] = [
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
    title: "여의도 새벽 5km 러닝",
    description:
      "각자의 속도를 존중하며 함께 달리는 러닝입니다.\n개인 물과 편한 러닝화를 준비해주세요.",
    meetingGuide:
      "출발 10분 전까지 집결 장소에 모여주세요. 준비운동 후 함께 출발합니다.",
    crewId: 1,
    startsAt: "2026-11-05T06:00:00+09:00",
    location: "여의도 한강공원",
    distanceKm: 5,
    difficulty: "초급",
    participantCount: 14,
  },
  {
    id: 2,
    title: "여의도 새벽 7km 러닝",
    description:
      "각자의 속도를 존중하며 함께 달리는 러닝입니다.\n개인 물과 편한 러닝화를 준비해주세요.",
    meetingGuide:
      "출발 10분 전까지 집결 장소에 모여주세요. 준비운동 후 함께 출발합니다.",
    crewId: 1,
    startsAt: "2026-11-12T06:00:00+09:00",
    location: "여의도 한강공원",
    distanceKm: 7,
    difficulty: "중급",
    participantCount: 8,
  },
  {
    id: 3,
    title: "반포 주말 7km 러닝",
    description:
      "각자의 속도를 존중하며 함께 달리는 러닝입니다.\n개인 물과 편한 러닝화를 준비해주세요.",
    meetingGuide:
      "출발 10분 전까지 집결 장소에 모여주세요. 준비운동 후 함께 출발합니다.",
    crewId: 2,
    startsAt: "2026-11-07T08:00:00+09:00",
    location: "반포 한강공원",
    distanceKm: 7,
    difficulty: "중급",
    participantCount: 10,
  },
  {
    id: 4,
    title: "여의도 함께 달리는 새벽 러닝",
    description:
      "각자의 속도를 존중하며 함께 달리는 러닝입니다.\n개인 물과 편한 러닝화를 준비해주세요.",
    meetingGuide:
      "출발 10분 전까지 집결 장소에 모여주세요. 준비운동 후 함께 출발합니다.",
    crewId: 1,
    startsAt: "2026-11-19T06:00:00+09:00",
    location: "여의도 한강공원",
    distanceKm: 5,
    difficulty: "초급",
    participantCount: 6,
  },
  {
    id: 5,
    title: "11월 마지막 목요일 러닝",
    description:
      "각자의 속도를 존중하며 함께 달리는 러닝입니다.\n개인 물과 편한 러닝화를 준비해주세요.",
    meetingGuide:
      "출발 10분 전까지 집결 장소에 모여주세요. 준비운동 후 함께 출발합니다.",
    crewId: 1,
    startsAt: "2026-11-26T06:00:00+09:00",
    location: "여의도 한강공원",
    distanceKm: 7,
    difficulty: "중급",
    participantCount: 4,
  },
  {
    id: 6,
    title: "10월 여의도 새벽 러닝",
    description:
      "각자의 속도를 존중하며 함께 달리는 러닝입니다.\n개인 물과 편한 러닝화를 준비해주세요.",
    meetingGuide:
      "출발 10분 전까지 집결 장소에 모여주세요. 준비운동 후 함께 출발합니다.",
    crewId: 1,
    startsAt: "2026-10-29T06:00:00+09:00",
    location: "여의도 한강공원",
    distanceKm: 5,
    difficulty: "초급",
    participantCount: 16,
  },
  {
    id: 7,
    title: "여의도 7km 정기 러닝",
    description:
      "각자의 속도를 존중하며 함께 달리는 러닝입니다.\n개인 물과 편한 러닝화를 준비해주세요.",
    meetingGuide:
      "출발 10분 전까지 집결 장소에 모여주세요. 준비운동 후 함께 출발합니다.",
    crewId: 1,
    startsAt: "2026-10-22T06:00:00+09:00",
    location: "여의도 한강공원",
    distanceKm: 7,
    difficulty: "중급",
    participantCount: 12,
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
  {
    id: 4,
    crewId: 1,
    title: "러닝 전 준비운동 안내",
    createdAt: "2026-10-24T18:00:00+09:00",
    content:
      "출발 전 발목과 무릎을 충분히 풀어주세요. 집결 장소에서 함께 준비운동을 진행한 뒤 달리기를 시작합니다.",
  },
  {
    id: 5,
    crewId: 1,
    title: "개인 물과 안전용품 준비 안내",
    createdAt: "2026-10-23T18:00:00+09:00",
    content:
      "개인 물과 땀을 닦을 수건을 준비해주세요. 새벽에는 주변이 어두우니 밝은 옷이나 반사 용품을 착용해주세요.",
  },
  {
    id: 6,
    crewId: 1,
    title: "함께 달릴 때 지켜주세요",
    createdAt: "2026-10-23T18:00:00+09:00",
    content:
      "보행자와 다른 러너가 안전하게 지나갈 수 있도록 길을 비워주세요. 앞사람과 충분한 간격을 유지하고 방향을 바꿀 때는 주변을 확인해주세요.",
  },
  {
    id: 7,
    crewId: 1,
    title: "10월 러닝을 함께해주셔서 감사합니다",
    createdAt: "2026-10-20T18:00:00+09:00",
    content:
      "이번 달에도 각자의 속도로 함께 달려주셔서 감사합니다.\n\n기록보다 안전과 꾸준함을 먼저 생각하며 다음 러닝에서도 즐겁게 만나요.",
  },
];

export const CREW_ACTIVITIES: CrewActivity[] = [
  {
    id: 1,
    crewId: 1,
    emoji: "🌙",
    nickname: "김새벽",
    distanceKm: 8.2,
    content:
      "오늘은 여의도 한강을 따라 8.2km를 달렸어요.\n\n선선한 바람 덕분에 끝까지 기분 좋게 달릴 수 있었습니다. 함께해주신 러너분들 감사합니다!",
    createdAt: "2026-10-29T18:00:00+09:00",
  },
  {
    id: 2,
    crewId: 1,
    emoji: "🏃",
    nickname: "이러너",
    distanceKm: 5,
    content:
      "바쁜 하루 중에도 잠깐 시간을 내어 5km를 달렸습니다.\n꾸준히 달리는 습관을 만들어가고 있어요.",
    createdAt: "2026-10-29T15:00:00+09:00",
  },
  {
    id: 3,
    crewId: 1,
    emoji: "⚡",
    nickname: "박달리기",
    distanceKm: 6.4,
    content:
      "오늘은 무리하지 않고 편안한 속도로 달렸어요.\n달리기를 마친 뒤 스트레칭까지 하니 몸이 한결 가벼워졌습니다.",
    createdAt: "2026-10-28T19:00:00+09:00",
  },
  {
    id: 4,
    crewId: 1,
    emoji: "🌅",
    nickname: "최크루",
    distanceKm: 4,
    content:
      "아침 햇살을 보며 가볍게 4km를 달렸습니다.\n일찍 일어나기는 어려웠지만 나오길 잘했네요!",
    createdAt: "2026-10-27T07:00:00+09:00",
  },
  {
    id: 5,
    crewId: 2,
    emoji: "🌊",
    nickname: "한강러너",
    distanceKm: 7,
    content:
      "반포 한강공원에서 크루원들과 7km를 함께 달렸어요.\n\n서로 속도를 맞춰주며 달리니 혼자 달릴 때보다 즐거웠습니다. 다음 러닝에서도 만나요!",
    createdAt: "2026-10-29T07:00:00+09:00",
  },
  {
    id: 6,
    crewId: 1,
    emoji: "👟",
    nickname: "정조깅",
    distanceKm: 3.5,
    content:
      "오랜만에 러닝화를 신고 천천히 달렸습니다.\n짧은 거리부터 차근차근 늘려보려고 해요.",
    createdAt: "2026-10-26T07:00:00+09:00",
  },
  {
    id: 7,
    crewId: 1,
    emoji: "🍀",
    nickname: "윤러닝",
    distanceKm: 4.2,
    content:
      "오늘도 내 속도에 맞춰 한 바퀴 완주했습니다.\n함께 달리는 분들의 응원이 큰 힘이 되었어요.",
    createdAt: "2026-10-26T07:00:00+09:00",
  },
];

// 기존 멤버의 ID와 정보를 보존한다.
// distanceKm는 해당 크루 가입 후 누적 거리를 나타낸다.
const EXISTING_CREW_MEMBERS: CrewMember[] = [
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

// 기존 멤버를 유지하고 크루별 목표 인원수만큼 더미 멤버를 보강한다.
export const CREW_MEMBERS: CrewMember[] = CREW_SEEDS.flatMap((crew) => {
  const existingMembers = EXISTING_CREW_MEMBERS.filter(
    (member) => member.crewId === crew.id,
  );
  const remainingCount = Math.max(0, crew.memberCount - existingMembers.length);

  const additionalMembers = Array.from(
    { length: remainingCount },
    (_, index): CrewMember => {
      const memberNumber = existingMembers.length + index + 1;
      const isLeader = existingMembers.length === 0 && index === 0;

      return {
        // 기존 ID와 겹치지 않도록 크루별로 100개의 ID 구간을 사용한다.
        id: 1000 + crew.id * 100 + index,
        crewId: crew.id,
        emoji: crew.emoji,
        nickname: `${crew.name} 러너 ${memberNumber}`,
        isLeader,
        // 한국 시간 오전 9시로 고정하고 월 경계를 자동으로 처리한다.
        joinedAt: new Date(Date.UTC(2026, 9, 2 + index, 0, 0, 0)).toISOString(),
        distanceKm: Math.max(0, Math.round((remainingCount - index) * 2.5)),
      };
    },
  );

  return [...existingMembers, ...additionalMembers];
});

// 화면에 표시하는 인원수는 실제 전체 멤버 데이터에서 산출한다.
export const CREWS: Crew[] = CREW_SEEDS.map((crew) => ({
  ...crew,
  memberCount: CREW_MEMBERS.filter((member) => member.crewId === crew.id)
    .length,
}));

// 실제 소유권 검사와 별개로 크루 편집 UI를 확인할 샘플 ID를 정의한다.
export const OWNED_CREW_SAMPLE_ID = 1;

// 실제 소유권·편집 권한 검사와 별개로 피드 수정 UI를 확인할 활동 ID를 정의한다.
export const FEED_EDIT_SAMPLE_ACTIVITY_ID = 1;

// 실제 가입 신청 내역과 별개로 신청 대기 UI를 확인할 크루 ID를 정의한다.
export const CREW_JOIN_PENDING_SAMPLE_ID = 8;
