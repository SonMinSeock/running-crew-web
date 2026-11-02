/**
 * 피드 목록·상세에서 작성자·크루·작성 일시·본문·러닝 거리를 표시한다.
 */
import type { Crew, CrewActivity } from "@/data/crews";
import { dateFormatter, noticeDateTimeFormatter } from "@/lib/date";

interface FeedPostContentProps {
  activity: CrewActivity;
  crew: Crew;
  isDetail?: boolean;
}

export default function FeedPostContent({
  activity,
  crew,
  isDetail = false,
}: FeedPostContentProps) {
  const formatter = isDetail ? noticeDateTimeFormatter : dateFormatter;

  return (
    <div>
      <div className="flex items-start gap-3">
        <div
          aria-hidden="true"
          className="bg-app-text/5 flex size-10 shrink-0 items-center justify-center rounded-full text-xl"
        >
          {activity.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <p
            id={`feed-${activity.id}-author`}
            className="text-sm font-bold break-words"
          >
            {activity.nickname}
          </p>
          <p className="text-app-subtext mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs">
            <span className="min-w-0 break-words">{crew.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={activity.createdAt}>
              {formatter.format(new Date(activity.createdAt))}
            </time>
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed break-words whitespace-pre-wrap">
        {activity.content}
      </p>

      <div className="mt-5">
        <p className="text-app-subtext text-sm">러닝 거리</p>
        <p className="text-app-accent mt-2 text-3xl font-bold">
          {activity.distanceKm}
          <span className="ml-1 text-base font-semibold">km</span>
        </p>
      </div>
    </div>
  );
}
