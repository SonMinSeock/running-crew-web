import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CREW_ACTIVITIES } from "@/data/crewActivities";

interface RecentCrewActivitiesProps {
  crewId: number;
}

export default function RecentCrewActivities({
  crewId,
}: RecentCrewActivitiesProps) {
  // 해당 크루의 활동을 최신순으로 정렬하고 최대 3개를 선택한다.
  const activities = CREW_ACTIVITIES.filter(
    (activity) => activity.crewId === crewId,
  )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  return (
    <section
      aria-labelledby="crew-activities-title"
      className="bg-app-card rounded-3xl p-5 md:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="crew-activities-title" className="text-base font-bold">
          최근 활동
        </h2>
        <Button
          type="button"
          variant="link"
          disabled
          className="text-app-accent h-auto cursor-pointer p-0 text-sm font-semibold"
          aria-label="최근 활동 더보기, 준비 중"
        >
          더보기
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
      {activities.length > 0 ? (
        <>
          <ul className="divide-app-border mt-4 divide-y">
            {activities.map((activity) => (
              <li key={activity.id} className="flex items-center gap-3 py-4">
                <div
                  aria-hidden="true"
                  className="bg-app-text/5 flex size-10 shrink-0 items-center justify-center rounded-full text-xl"
                >
                  {activity.emoji}
                </div>
                <p className="text-app-subtext min-w-0 flex-1 text-sm leading-relaxed break-words">
                  <span className="text-app-text font-bold">
                    {activity.nickname}
                  </span>
                  {" 님이 "}
                  <span className="text-app-accent font-bold">
                    {activity.distanceKm}km
                  </span>
                  {" 달렸어요"}
                </p>
                {/* 샘플 데이터가 오래되어도 의미가 명확하도록 날짜로 표시한다. */}
                <time
                  dateTime={activity.createdAt}
                  className="text-app-subtext shrink-0 text-xs"
                >
                  {new Intl.DateTimeFormat("ko-KR", {
                    timeZone: "Asia/Seoul",
                    month: "long",
                    day: "numeric",
                  }).format(new Date(activity.createdAt))}
                </time>
              </li>
            ))}
          </ul>
          <p className="text-app-subtext mt-2 text-xs">
            활동 더보기 기능은 준비 중입니다.
          </p>
        </>
      ) : (
        <p className="text-app-subtext py-8 text-center text-sm">
          최근 활동이 없습니다.
        </p>
      )}
    </section>
  );
}
