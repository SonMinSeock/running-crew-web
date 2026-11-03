/**
 * 참여 확인 화면과 신청·취소 모달에서 공통 일정 정보를 표시한다.
 */
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import type { Crew, CrewRun } from "@/data/crews";
import { runDetailDateFormatter, timeFormatter } from "@/lib/date";
import { cn } from "@/lib/utils";

interface RunParticipationSummaryProps {
  crew: Crew;
  run: CrewRun;
}

export default function RunParticipationSummary({
  crew,
  run,
}: RunParticipationSummaryProps) {
  const startsAt = new Date(run.startsAt);

  return (
    <div className="bg-app-text/5 min-w-0 space-y-4 rounded-2xl p-4">
      <p className="flex items-start gap-2 text-sm font-semibold">
        <span aria-hidden="true" className="shrink-0">
          {crew.emoji}
        </span>
        <span className="min-w-0 break-words">{crew.name}</span>
      </p>

      <p className="text-lg font-bold break-words">{run.title}</p>

      <div className="text-app-subtext space-y-3 text-sm">
        <p className="flex items-start gap-2">
          <CalendarDays
            aria-hidden="true"
            className="text-app-accent mt-0.5 size-4 shrink-0"
          />
          <time dateTime={run.startsAt}>
            {runDetailDateFormatter.format(startsAt)}
          </time>
        </p>
        <p className="flex items-start gap-2">
          <Clock3
            aria-hidden="true"
            className="text-app-accent mt-0.5 size-4 shrink-0"
          />
          <span>{timeFormatter.format(startsAt)}</span>
        </p>
        <p className="flex items-start gap-2">
          <MapPin
            aria-hidden="true"
            className="text-app-accent mt-0.5 size-4 shrink-0"
          />
          <span className="min-w-0 break-words">{run.location}</span>
        </p>
      </div>

      <dl className="border-app-border grid grid-cols-2 gap-3 border-t pt-4 text-sm">
        <div className="min-w-0">
          <dt className="text-app-subtext">거리</dt>
          <dd className="mt-1 font-bold break-words">{run.distanceKm}km</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-app-subtext">난이도</dt>
          <dd
            className={cn(
              "mt-1 font-bold",
              run.difficulty === "초급" && "text-app-accent",
              run.difficulty === "중급" && "text-amber-500",
              run.difficulty === "고급" && "text-app-error",
            )}
          >
            {run.difficulty}
          </dd>
        </div>
      </dl>
    </div>
  );
}
