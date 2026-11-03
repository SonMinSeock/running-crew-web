/**
 * 일정 시각과 샘플 ID로 러닝 참여 UI 상태를 판별한다.
 */
import { RUN_PARTICIPATION_SAMPLE_ID, type CrewRun } from "@/data/crews";

export type RunParticipationUiState =
  "ENDED" | "PARTICIPATING" | "NOT_PARTICIPATING";

// 실제 권한·참여 내역과 별개로 종료 여부를 우선해 UI 샘플 상태를 반환한다.
export function getRunParticipationUiState(
  run: CrewRun,
  now: number,
): RunParticipationUiState {
  if (!(Date.parse(run.startsAt) > now)) return "ENDED";

  return run.id === RUN_PARTICIPATION_SAMPLE_ID
    ? "PARTICIPATING"
    : "NOT_PARTICIPATING";
}
