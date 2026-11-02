/**
 * 러닝 일정의 크루·제목·시각·장소와 거리·난이도·인원 요약을 표시한다.
 */
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import type { Crew, CrewRun } from "@/data/crews";
import { runDetailDateFormatter, timeFormatter } from "@/lib/date";
import { cn } from "@/lib/utils";

interface RunDetailInfoProps {
  crew: Crew;
  run: CrewRun;
  isUpcoming: boolean;
}

export default function RunDetailInfo({
  crew,
  run,
  isUpcoming,
}: RunDetailInfoProps) {
  return (
    <section
      aria-labelledby="run-detail-title"
      className="bg-app-card rounded-3xl p-5 md:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="flex min-w-0 items-start gap-2 text-sm font-semibold">
          <span aria-hidden="true" className="shrink-0">
            {crew.emoji}
          </span>
          <span className="min-w-0 break-words">{crew.name}</span>
        </p>
        <span
          className={cn(
            "shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
            isUpcoming
              ? "bg-app-accent/10 text-app-accent"
              : "bg-app-text/5 text-app-subtext",
          )}
        >
          {isUpcoming ? "예정" : "종료"}
        </span>
      </div>
      <h1 id="run-detail-title" className="mt-4 text-2xl font-bold break-words">
        {run.title}
      </h1>
      <div className="text-app-subtext mt-5 space-y-3 text-sm">
        <p className="flex items-start gap-2">
          <CalendarDays
            aria-hidden="true"
            className="text-app-accent size-4 shrink-0"
          />
          <time dateTime={run.startsAt}>
            {runDetailDateFormatter.format(new Date(run.startsAt))}
          </time>
        </p>
        <p className="flex items-start gap-2">
          <Clock3
            aria-hidden="true"
            className="text-app-accent size-4 shrink-0"
          />
          {timeFormatter.format(new Date(run.startsAt))}
        </p>
        <p className="flex items-start gap-2">
          <MapPin
            aria-hidden="true"
            className="text-app-accent size-4 shrink-0"
          />
          <span className="min-w-0 break-words">{run.location}</span>
        </p>
      </div>
      <dl className="mt-5 grid grid-cols-3 gap-2">
        <div className="bg-app-text/5 min-w-0 rounded-2xl px-2 py-4 text-center">
          <dt className="text-app-subtext text-xs">거리</dt>
          <dd className="mt-2 font-bold break-words">{run.distanceKm}km</dd>
        </div>
        <div className="bg-app-text/5 min-w-0 rounded-2xl px-2 py-4 text-center">
          <dt className="text-app-subtext text-xs">난이도</dt>
          <dd
            className={cn(
              "mt-2 font-bold",
              run.difficulty === "초급" && "text-app-accent",
              run.difficulty === "중급" && "text-amber-500",
              run.difficulty === "고급" && "text-app-error",
            )}
          >
            {run.difficulty}
          </dd>
        </div>
        <div className="bg-app-text/5 min-w-0 rounded-2xl px-2 py-4 text-center">
          <dt className="text-app-subtext text-xs">
            {isUpcoming ? "참여 예정" : "참여 인원"}
          </dt>
          <dd className="text-app-accent mt-2 font-bold break-words">
            {run.participantCount}명
          </dd>
        </div>
      </dl>
    </section>
  );
}
