/**
 * 다음 러닝 일정 카드 컴포넌트
 */
import { CalendarDays, ChevronRight, Clock3, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import RunParticipationButton from "@/components/common/RunParticipationButton";
import { CREW_RUNS } from "@/data/crewRuns";
import { cn } from "@/lib/utils";

interface NextCrewRunProps {
  crewId: number;
}

export default function NextCrewRun({ crewId }: NextCrewRunProps) {
  // 해당 크루의 예정 일정 중 가장 가까운 일정 하나를 선택한다.
  const now = Date.now();
  const nextRun = CREW_RUNS.filter(
    (run) => run.crewId === crewId && new Date(run.startsAt).getTime() > now,
  ).sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  )[0];

  return (
    <section
      aria-labelledby="next-crew-run-title"
      className="bg-app-card rounded-3xl p-5 md:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="next-crew-run-title"
          className="flex items-center gap-2 text-base font-bold"
        >
          <CalendarDays className="text-app-accent size-4" aria-hidden="true" />
          다음 러닝 일정
        </h2>
        <Button
          type="button"
          variant="link"
          disabled
          className="text-app-accent h-auto cursor-pointer p-0 text-sm font-semibold"
          aria-label="러닝 일정 전체 보기, 준비 중"
        >
          전체 보기
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
      {nextRun ? (
        <div className="bg-app-text/5 mt-4 rounded-2xl p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-lg font-bold">
                {new Intl.DateTimeFormat("ko-KR", {
                  timeZone: "Asia/Seoul",
                  month: "long",
                  day: "numeric",
                  weekday: "short",
                }).format(new Date(nextRun.startsAt))}
              </h3>
              <p className="text-app-subtext mt-3 flex items-center gap-2 text-sm">
                <Clock3 className="size-4 shrink-0" aria-hidden="true" />
                {new Intl.DateTimeFormat("ko-KR", {
                  timeZone: "Asia/Seoul",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }).format(new Date(nextRun.startsAt))}
              </p>
              <p className="text-app-subtext mt-2 flex items-start gap-2 text-sm">
                <MapPin className="size-4 shrink-0" aria-hidden="true" />
                <span>{nextRun.location}</span>
              </p>
              <p className="text-app-subtext mt-3 flex items-center gap-2 text-sm">
                <span>{nextRun.distanceKm}km</span>
                <span aria-hidden="true">·</span>
                <span
                  className={cn(
                    "font-semibold",
                    nextRun.difficulty === "초급" && "text-app-accent",
                    nextRun.difficulty === "중급" && "text-amber-500",
                    nextRun.difficulty === "고급" && "text-app-error",
                  )}
                >
                  {nextRun.difficulty}
                </span>
              </p>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-app-accent text-2xl font-bold">
                {nextRun.participantCount}
                <span className="sr-only">명</span>
              </p>
              <p className="text-app-subtext mt-1 text-xs">참여 예정</p>
            </div>
          </div>
          {/* 참여 상태 변경과 모달은 후속 작업에서 연결한다. */}
          <RunParticipationButton
            disabled
            className="mt-5"
            aria-describedby="run-action-description"
          >
            참여 신청
          </RunParticipationButton>
          <p
            id="run-action-description"
            className="text-app-subtext mt-2 text-xs"
          >
            참여 신청 및 일정 전체 보기 기능은 준비 중입니다.
          </p>
        </div>
      ) : (
        <p className="text-app-subtext py-8 text-center text-sm">
          예정된 러닝이 없습니다.
        </p>
      )}
    </section>
  );
}
