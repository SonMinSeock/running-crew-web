/**
 * 개인 러닝 활동 목록과 기록이 없는 상태를 표시한다.
 */
import type { PersonalRun } from "@/data/profile";
import { runDateTimeFormatter } from "@/lib/date";

interface ProfileActivitiesProps {
  runs: PersonalRun[];
}

export default function ProfileActivities({ runs }: ProfileActivitiesProps) {
  return (
    <section
      aria-labelledby="profile-activities-title"
      className="bg-app-card rounded-3xl p-5 md:p-6"
    >
      <h2 id="profile-activities-title" className="font-bold">
        내 러닝 활동
      </h2>
      {runs.length === 0 ? (
        <p className="text-app-subtext py-8 text-center text-sm">
          아직 러닝 활동이 없습니다.
        </p>
      ) : (
        <ul className="divide-app-border mt-4 divide-y">
          {runs.map((run) => (
            <li
              key={run.id}
              className="flex flex-wrap items-center justify-between gap-3 py-4"
            >
              <time
                dateTime={run.startsAt}
                className="text-app-subtext text-sm"
              >
                {runDateTimeFormatter.format(new Date(run.startsAt))}
              </time>
              <p className="text-app-accent text-lg font-bold">
                {run.distanceKm} km
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
