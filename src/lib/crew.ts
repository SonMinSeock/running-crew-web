import type { CrewRun } from "@/data/crews";

// 기준 시각 이후의 일정을 가까운 순서로 반환한다.
export function getUpcomingCrewRuns(runs: CrewRun[], now: number) {
  return runs
    .filter((run) => new Date(run.startsAt).getTime() > now)
    .sort(
      (a, b) =>
        new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    );
}
