/**
 * 운영자 신고 목록에 사용할 샘플 신고와 표시 이름을 정의한다.
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

export interface AdminReport {
  id: number;
  type: keyof typeof REPORT_TYPE_LABELS;
  targetSummary: string;
  reason: string;
  status: keyof typeof REPORT_STATUS_LABELS;
  receivedAt: string;
}

export const ADMIN_REPORTS: AdminReport[] = [
  {
    id: 1,
    type: "post",
    targetSummary: "주말 러닝 모집글에 반복된 홍보 링크",
    reason: "스팸·광고",
    status: "resolved",
    receivedAt: "2026-11-01T09:30:00+09:00",
  },
  {
    id: 2,
    type: "comment",
    targetSummary: "러닝 기록에 남긴 모욕적인 댓글",
    reason: "욕설·괴롭힘",
    status: "reviewing",
    receivedAt: "2026-11-01T18:45:00+09:00",
  },
  {
    id: 3,
    type: "reply",
    targetSummary: "크루 모집 게시글 댓글에 달린 홍보 답글",
    reason: "스팸·광고",
    status: "received",
    receivedAt: "2026-11-02T08:10:00+09:00",
  },
  {
    id: 4,
    type: "member",
    targetSummary: "한강스프린트의 프로필 소개",
    reason: "개인정보 노출",
    status: "resolved",
    receivedAt: "2026-11-02T20:20:00+09:00",
  },
  {
    id: 5,
    type: "post",
    targetSummary: "훈련 기록 캡처가 첨부된 게시글",
    reason: "개인정보 노출",
    status: "reviewing",
    receivedAt: "2026-11-03T10:00:00+09:00",
  },
  {
    id: 6,
    type: "comment",
    targetSummary: "러닝화 후기의 구매 유도 댓글",
    reason: "스팸·광고",
    status: "received",
    receivedAt: "2026-11-04T11:25:00+09:00",
  },
  {
    id: 7,
    type: "reply",
    targetSummary: "기록 비교 댓글에 달린 공격적인 답글",
    reason: "욕설·괴롭힘",
    status: "resolved",
    receivedAt: "2026-11-04T19:50:00+09:00",
  },
  {
    id: 8,
    type: "member",
    targetSummary: "새벽페이스의 프로필 이미지와 소개",
    reason: "기타",
    status: "reviewing",
    receivedAt: "2026-11-05T07:40:00+09:00",
  },
  {
    id: 9,
    type: "post",
    targetSummary: "러닝 행사 참가권 판매 게시글",
    reason: "기타",
    status: "received",
    receivedAt: "2026-11-06T12:15:00+09:00",
  },
  {
    id: 10,
    type: "comment",
    targetSummary: "모임 후기 댓글에 올라온 연락처",
    reason: "개인정보 노출",
    status: "received",
    receivedAt: "2026-11-07T17:30:00+09:00",
  },
  {
    id: 11,
    type: "reply",
    targetSummary: "훈련 일정 질문에 달린 반복 홍보 답글",
    reason: "스팸·광고",
    status: "reviewing",
    receivedAt: "2026-11-08T09:00:00+09:00",
  },
  {
    id: 12,
    type: "member",
    targetSummary: "야간트랙의 프로필 소개",
    reason: "욕설·괴롭힘",
    status: "received",
    receivedAt: "2026-11-08T21:05:00+09:00",
  },
];
