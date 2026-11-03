/**
 * 크루 일정 정렬과 가입 UI 샘플 상태 판별을 제공한다.
 */
import {
  CREW_JOIN_PENDING_SAMPLE_ID,
  OWNED_CREW_SAMPLE_ID,
  type Crew,
  type CrewRun,
} from "@/data/crews";

// 기준 시각 이후의 일정을 가까운 순서로 반환한다.
export function getUpcomingCrewRuns(runs: CrewRun[], now: number) {
  return runs
    .filter((run) => new Date(run.startsAt).getTime() > now)
    .sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    );
}

// 실제 권한과 별개로 화면에서 표시할 가입 UI 샘플 상태를 정의한다.
export type CrewMembershipUiState =
  "OWNED" | "JOINED" | "PENDING" | "NOT_JOINED";

// 기존 가입 여부와 샘플 ID를 조합해 목록·상세에 동일한 상태를 제공한다.
export function getCrewMembershipUiState(crew: Crew): CrewMembershipUiState {
  if (crew.id === OWNED_CREW_SAMPLE_ID) return "OWNED";
  if (crew.isJoined) return "JOINED";
  if (crew.id === CREW_JOIN_PENDING_SAMPLE_ID) return "PENDING";

  return "NOT_JOINED";
}
