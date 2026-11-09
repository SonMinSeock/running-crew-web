/**
 * 운영자 신고 목록과 상세에 사용할 샘플 신고와 표시 이름을 정의한다.
 */
export const REPORT_TYPE_LABELS = {
  post: "게시글",
  comment: "댓글",
  reply: "대댓글",
  member: "멤버",
};

export const REPORT_STATUS_LABELS = {
  received: "접수",
  reviewing: "검토 중",
  resolved: "처리 완료",
};

interface AdminReportHistoryEntry {
  handledAt: string;
  operator: string;
  fromStatus: keyof typeof REPORT_STATUS_LABELS;
  toStatus: keyof typeof REPORT_STATUS_LABELS;
  note: string;
}

export interface AdminReport {
  id: number;
  type: keyof typeof REPORT_TYPE_LABELS;
  targetSummary: string;
  reason: string;
  status: keyof typeof REPORT_STATUS_LABELS;
  receivedAt: string;
  reporter: string;
  targetContent: string;
  history: AdminReportHistoryEntry[];
}

export const ADMIN_REPORTS: AdminReport[] = [
  {
    id: 1,
    type: "post",
    targetSummary: "주말 러닝 모집글에 반복된 홍보 링크",
    reason: "스팸·광고",
    status: "resolved",
    receivedAt: "2026-11-01T09:30:00+09:00",
    reporter: "새벽러너",
    targetContent:
      "주말에 같이 달릴 분을 모집합니다. 러닝용품 할인은 게시글의 홍보 링크를 확인해 주세요.",
    history: [
      {
        handledAt: "2026-11-01T10:30:00+09:00",
        operator: "운영자 김러너",
        fromStatus: "received",
        toStatus: "reviewing",
        note: "신고 대상과 신고 사유를 확인하기 시작했습니다.",
      },
      {
        handledAt: "2026-11-01T11:30:00+09:00",
        operator: "운영자 김러너",
        fromStatus: "reviewing",
        toStatus: "resolved",
        note: "신고 대상과 관련 내용을 검토했습니다.",
      },
    ],
  },
  {
    id: 2,
    type: "comment",
    targetSummary: "러닝 기록에 남긴 모욕적인 댓글",
    reason: "욕설·괴롭힘",
    status: "reviewing",
    receivedAt: "2026-11-01T18:45:00+09:00",
    reporter: "한강페이스",
    targetContent: "이런 기록은 러닝이라고 부르기도 민망하네요.",
    history: [
      {
        handledAt: "2026-11-01T19:45:00+09:00",
        operator: "운영자 김러너",
        fromStatus: "received",
        toStatus: "reviewing",
        note: "신고 대상과 신고 사유를 확인하기 시작했습니다.",
      },
    ],
  },
  {
    id: 3,
    type: "reply",
    targetSummary: "크루 모집 게시글 댓글에 달린 홍보 답글",
    reason: "스팸·광고",
    status: "received",
    receivedAt: "2026-11-02T08:10:00+09:00",
    reporter: "러닝구름",
    targetContent: "크루 가입 전에 제 프로필의 장비 할인 링크부터 눌러 주세요.",
    history: [],
  },
  {
    id: 4,
    type: "member",
    targetSummary: "한강스프린트의 프로필 소개",
    reason: "개인정보 노출",
    status: "resolved",
    receivedAt: "2026-11-02T20:20:00+09:00",
    reporter: "마일메이트",
    targetContent:
      "한강스프린트 · 한강 야간 러닝\n프로필 소개에 다른 회원의 연락처가 포함되어 있습니다.",
    history: [
      {
        handledAt: "2026-11-02T21:20:00+09:00",
        operator: "운영자 김러너",
        fromStatus: "received",
        toStatus: "reviewing",
        note: "신고 대상과 신고 사유를 확인하기 시작했습니다.",
      },
      {
        handledAt: "2026-11-02T22:20:00+09:00",
        operator: "운영자 김러너",
        fromStatus: "reviewing",
        toStatus: "resolved",
        note: "신고 대상과 관련 내용을 검토했습니다.",
      },
    ],
  },
  {
    id: 5,
    type: "post",
    targetSummary: "훈련 기록 캡처가 첨부된 게시글",
    reason: "개인정보 노출",
    status: "reviewing",
    receivedAt: "2026-11-03T10:00:00+09:00",
    reporter: "가을러너",
    targetContent:
      "오늘 훈련 기록을 공유합니다. 첨부한 캡처에 참가자 계정 정보가 보입니다.",
    history: [
      {
        handledAt: "2026-11-03T11:00:00+09:00",
        operator: "운영자 김러너",
        fromStatus: "received",
        toStatus: "reviewing",
        note: "신고 대상과 신고 사유를 확인하기 시작했습니다.",
      },
    ],
  },
  {
    id: 6,
    type: "comment",
    targetSummary: "러닝화 후기의 구매 유도 댓글",
    reason: "스팸·광고",
    status: "received",
    receivedAt: "2026-11-04T11:25:00+09:00",
    reporter: "초록트랙",
    targetContent: "후기 보신 분들은 제 프로필의 구매 페이지를 이용해 주세요.",
    history: [],
  },
  {
    id: 7,
    type: "reply",
    targetSummary: "기록 비교 댓글에 달린 공격적인 답글",
    reason: "욕설·괴롭힘",
    status: "resolved",
    receivedAt: "2026-11-04T19:50:00+09:00",
    reporter: "느린발걸음",
    targetContent: "그 기록이면 다음 모임에는 나오지 마세요.",
    history: [
      {
        handledAt: "2026-11-04T20:50:00+09:00",
        operator: "운영자 김러너",
        fromStatus: "received",
        toStatus: "reviewing",
        note: "신고 대상과 신고 사유를 확인하기 시작했습니다.",
      },
      {
        handledAt: "2026-11-04T21:50:00+09:00",
        operator: "운영자 김러너",
        fromStatus: "reviewing",
        toStatus: "resolved",
        note: "신고 대상과 관련 내용을 검토했습니다.",
      },
    ],
  },
  {
    id: 8,
    type: "member",
    targetSummary: "새벽페이스의 프로필 이미지와 소개",
    reason: "기타",
    status: "reviewing",
    receivedAt: "2026-11-05T07:40:00+09:00",
    reporter: "오후러너",
    targetContent:
      "새벽페이스 · 출근 전 5km\n프로필 이미지에 홍보 문구가 표시되어 있습니다.",
    history: [
      {
        handledAt: "2026-11-05T08:40:00+09:00",
        operator: "운영자 김러너",
        fromStatus: "received",
        toStatus: "reviewing",
        note: "신고 대상과 신고 사유를 확인하기 시작했습니다.",
      },
    ],
  },
  {
    id: 9,
    type: "post",
    targetSummary: "러닝 행사 참가권 판매 게시글",
    reason: "기타",
    status: "received",
    receivedAt: "2026-11-06T12:15:00+09:00",
    reporter: "런앤커피",
    targetContent:
      "이번 주말 러닝 행사 참가권을 판매합니다. 관심 있는 분은 메시지 주세요.",
    history: [],
  },
  {
    id: 10,
    type: "comment",
    targetSummary: "모임 후기 댓글에 올라온 연락처",
    reason: "개인정보 노출",
    status: "received",
    receivedAt: "2026-11-07T17:30:00+09:00",
    reporter: "공원한바퀴",
    targetContent:
      "다음 모임 문의는 지난 참가자의 연락처로 해 주세요. [연락처 가림]",
    history: [],
  },
  {
    id: 11,
    type: "reply",
    targetSummary: "훈련 일정 질문에 달린 반복 홍보 답글",
    reason: "스팸·광고",
    status: "reviewing",
    receivedAt: "2026-11-08T09:00:00+09:00",
    reporter: "토요일조깅",
    targetContent:
      "일정은 잘 모르겠고, 러닝 장비 할인 링크는 제 프로필에서 확인해 주세요.",
    history: [
      {
        handledAt: "2026-11-08T10:00:00+09:00",
        operator: "운영자 김러너",
        fromStatus: "received",
        toStatus: "reviewing",
        note: "신고 대상과 신고 사유를 확인하기 시작했습니다.",
      },
    ],
  },
  {
    id: 12,
    type: "member",
    targetSummary: "야간트랙의 프로필 소개",
    reason: "욕설·괴롭힘",
    status: "received",
    receivedAt: "2026-11-08T21:05:00+09:00",
    reporter: "달빛러너",
    targetContent:
      "야간트랙 · 야간 러닝\n프로필 소개에 특정 회원을 비하하는 문구가 포함되어 있습니다.",
    history: [],
  },
];
