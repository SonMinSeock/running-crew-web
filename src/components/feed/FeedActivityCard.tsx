import FeedComments from "./FeedComments";
import ViewMoreButton from "@/components/common/ViewMoreButton";
import type { Crew, CrewActivity } from "@/data/crews";
import { dateFormatter } from "@/lib/date";

interface FeedActivityCardProps {
  activity: CrewActivity;
  crew: Crew;
}

export default function FeedActivityCard({
  activity,
  crew,
}: FeedActivityCardProps) {
  return (
    <article
      aria-labelledby={`feed-${activity.id}-title`}
      className="bg-app-card rounded-3xl p-5 md:p-6"
    >
      <div className="flex items-start gap-3">
        <div
          aria-hidden="true"
          className="bg-app-text/5 flex size-10 shrink-0 items-center justify-center rounded-full text-xl"
        >
          {activity.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <h3
            id={`feed-${activity.id}-title`}
            className="text-sm font-bold break-words"
          >
            {activity.nickname}
          </h3>
          <p className="text-app-subtext mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs">
            <span className="min-w-0 break-words">{crew.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={activity.createdAt}>
              {dateFormatter.format(new Date(activity.createdAt))}
            </time>
          </p>
        </div>
      </div>
      {/* 작성자 본문 대신 공통 활동 안내와 해당 활동의 거리를 표시한다. */}
      <div className="mt-5">
        <p className="text-app-subtext text-sm">오늘도 한 걸음 더 달렸어요</p>
        <p className="text-app-accent mt-2 text-3xl font-bold">
          <span className="sr-only">러닝 거리 </span>
          {activity.distanceKm}
          <span className="ml-1 text-base font-semibold">km</span>
        </p>
      </div>
      <div className="border-app-border mt-5 border-t pt-4">
        <ViewMoreButton
          to={`/crews/${crew.id}/activities`}
          aria-label={`${crew.name} 크루 활동 보기`}
        >
          크루 활동 보기
        </ViewMoreButton>
      </div>
      <FeedComments key={activity.id} activityId={activity.id} />
    </article>
  );
}
