/**
 * 공통 데이터에서 홈 샘플 크루의 가장 가까운 예정 일정과 날짜에 맞는 안내를 표시한다.
 */
import { CalendarDays, UsersRound } from "lucide-react";
import RunParticipationButton from "@/components/common/RunParticipationButton";
import { CREWS, CREW_RUNS, OWNED_CREW_SAMPLE_ID } from "@/data/crews";
import { getUpcomingCrewRuns } from "@/lib/crew";
import {
  isSameSeoulDate,
  runDetailDateFormatter,
  timeFormatter,
} from "@/lib/date";
import { cn } from "@/lib/utils";

export default function TodayRunCard() {
  const now = Date.now();
  // 개인 참여 내역과 별개로 기존 크루 1을 홈 일정 표시용 UI 샘플로 사용한다.
  const crew = CREWS.find((item) => item.id === OWNED_CREW_SAMPLE_ID);
  const run = getUpcomingCrewRuns(CREW_RUNS, now).find(
    (item) => item.crewId === crew?.id,
  );

  if (!crew || !run) {
    return (
      <section aria-labelledby="today-run-title" className="mt-8">
        <h2 id="today-run-title" className="text-lg font-bold">
          다가오는 러닝 일정
        </h2>
        <p className="bg-app-card text-app-subtext mt-4 rounded-3xl px-5 py-8 text-center text-sm">
          예정된 러닝이 없습니다.
        </p>
      </section>
    );
  }

  const startsAt = new Date(run.startsAt);
  const isToday = isSameSeoulDate(startsAt, new Date(now));

  return (
    <section aria-labelledby="today-run-title" className="mt-8">
      <h2 id="today-run-title" className="text-lg font-bold">
        {isToday ? "오늘의 러닝 일정" : "다가오는 러닝 일정"}
      </h2>
      <article className="bg-app-card mt-4 rounded-3xl p-5">
        <div className="flex items-center gap-3">
          <div
            className="bg-app-text/5 flex size-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
            aria-hidden="true"
          >
            {crew.emoji}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold break-words">{crew.name}</h3>
            <p className="text-app-accent mt-1 flex items-center gap-1.5 text-sm font-semibold">
              <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
              <time dateTime={run.startsAt} className="min-w-0 break-words">
                {isToday ? "오늘" : runDetailDateFormatter.format(startsAt)}{" "}
                {timeFormatter.format(startsAt)}
              </time>
            </p>
          </div>
        </div>
        <p className="mt-4 text-lg font-bold break-words">{run.title}</p>
        <dl className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="bg-app-text/5 rounded-2xl p-3">
            <dt className="text-app-subtext text-xs">장소</dt>
            <dd className="mt-1 text-sm font-bold break-words">
              {run.location}
            </dd>
          </div>
          <div className="bg-app-text/5 rounded-2xl p-3">
            <dt className="text-app-subtext text-xs">거리</dt>
            <dd className="mt-1 text-sm font-bold break-words">
              {run.distanceKm}km
            </dd>
          </div>
          <div className="bg-app-text/5 rounded-2xl p-3">
            <dt className="text-app-subtext text-xs">난이도</dt>
            <dd
              className={cn(
                "mt-1 text-sm font-bold",
                run.difficulty === "초급" && "text-app-accent",
                run.difficulty === "중급" && "text-amber-500",
                run.difficulty === "고급" && "text-app-error",
              )}
            >
              {run.difficulty}
            </dd>
          </div>
        </dl>
        <p className="text-app-subtext mt-4 flex items-center gap-1.5 text-sm">
          <UsersRound className="size-4" aria-hidden="true" />
          참여 예정
          <span className="text-app-accent font-bold">
            {run.participantCount}명
          </span>
        </p>
        <RunParticipationButton
          disabled
          className="mt-5"
          aria-describedby="home-run-preview-notice"
        >
          참여 확인
        </RunParticipationButton>
        <p
          id="home-run-preview-notice"
          className="text-app-subtext mt-2 text-xs"
        >
          참여 확인 화면은 준비 중입니다.
        </p>
      </article>
    </section>
  );
}
