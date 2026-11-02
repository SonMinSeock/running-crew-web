/**
 * 한국 시간 기준 주간 러닝 그래프와 월간 기록을 표시한다.
 */
import { CalendarDays, TrendingUp } from "lucide-react";
import type { PersonalRun } from "@/data/profile";
import { runDateFormatter } from "@/lib/date";
import { cn } from "@/lib/utils";

interface ProfileStatisticsProps {
  runs: PersonalRun[];
  now: number;
}

// 한국 날짜를 UTC 자정 값으로 바꿔 기기 시간대와 무관하게 날짜를 계산한다.
function koreanDay(time: number) {
  const date = new Date(time + 9 * 60 * 60 * 1000);
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

export default function ProfileStatistics({
  runs,
  now,
}: ProfileStatisticsProps) {
  const today = koreanDay(now);
  const dayMs = 24 * 60 * 60 * 1000;
  const monday = today - ((new Date(today).getUTCDay() + 6) % 7) * dayMs;
  const days = ["월", "화", "수", "목", "금", "토", "일"].map(
    (label, index) => {
      const day = monday + index * dayMs;
      const distance = runs
        .filter((run) => koreanDay(Date.parse(run.startsAt)) === day)
        .reduce((sum, run) => sum + run.distanceKm, 0);
      return { label, day, distance };
    },
  );
  const weekTotal = days.reduce((sum, day) => sum + day.distance, 0);
  const maximum = Math.max(1, ...days.map((day) => day.distance));
  const currentMonth = new Date(today).toISOString().slice(0, 7);
  const monthRuns = runs.filter(
    (run) =>
      new Date(koreanDay(Date.parse(run.startsAt)))
        .toISOString()
        .slice(0, 7) === currentMonth,
  );
  const monthTotal = monthRuns.reduce((sum, run) => sum + run.distanceKm, 0);

  return (
    <div className="space-y-5">
      <section
        aria-labelledby="profile-week-title"
        className="bg-app-card rounded-3xl p-5 md:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2
            id="profile-week-title"
            className="flex items-center gap-2 font-bold"
          >
            <TrendingUp aria-hidden="true" className="text-app-accent size-4" />
            이번 주 러닝
          </h2>
          <p className="text-app-accent text-xl font-bold">
            {weekTotal.toFixed(1)} km
          </p>
        </div>
        <p className="text-app-subtext mt-2 text-xs">
          {runDateFormatter.format(new Date(monday))} ~{" "}
          {runDateFormatter.format(new Date(monday + 6 * dayMs))}
        </p>
        {weekTotal === 0 && (
          <p className="text-app-subtext mt-4 text-sm">
            이번 주 러닝 기록이 없습니다.
          </p>
        )}
        <ul
          aria-label="요일별 러닝 거리"
          className="mt-6 grid grid-cols-7 gap-2"
        >
          {days.map((day) => (
            <li key={day.label} className="min-w-0 text-center">
              <div aria-hidden="true" className="flex h-24 items-end">
                <div
                  style={{
                    height: `${Math.max(3, (day.distance / maximum) * 100)}%`,
                  }}
                  className={cn(
                    "w-full rounded-t-md",
                    day.distance === 0
                      ? "bg-app-border"
                      : day.day === today
                        ? "bg-app-accent"
                        : "bg-app-accent/35",
                  )}
                />
              </div>
              <p className="text-app-subtext mt-2 text-xs">
                {day.label}
                <span className="sr-only">요일</span>
              </p>
              <p className="mt-1 text-[10px] sm:text-xs">
                {day.distance.toFixed(1)}
                <span className="sr-only"> km</span>
              </p>
            </li>
          ))}
        </ul>
      </section>
      <section
        aria-labelledby="profile-month-title"
        className="bg-app-card rounded-3xl p-5 md:p-6"
      >
        <h2
          id="profile-month-title"
          className="flex items-center gap-2 font-bold"
        >
          <CalendarDays aria-hidden="true" className="text-app-accent size-4" />
          {new Date(today).getUTCFullYear()}년{" "}
          {new Date(today).getUTCMonth() + 1}월 기록
        </h2>
        <p className="text-app-subtext mt-3 text-sm">
          {monthTotal.toFixed(1)} km · {monthRuns.length}회
        </p>
        {monthRuns.length === 0 ? (
          <p className="text-app-subtext mt-4 text-sm">
            이번 달 러닝 기록이 없습니다.
          </p>
        ) : (
          <ul className="divide-app-border mt-4 divide-y">
            {monthRuns.map((run) => (
              <li
                key={run.id}
                className="flex flex-wrap justify-between gap-2 py-3 text-sm"
              >
                <time dateTime={run.startsAt}>
                  {runDateFormatter.format(new Date(run.startsAt))}
                </time>
                <span className="text-app-accent font-semibold">
                  {run.distanceKm} km
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
