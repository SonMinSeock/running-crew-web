/**
 * 피드 공통 콘텐츠와 상세·크루 활동 링크·기존 댓글 영역을 목록 카드로 구성한다.
 */
import FeedComments from "./FeedComments";
import FeedPostContent from "./FeedPostContent";
import ViewMoreButton from "@/components/common/ViewMoreButton";
import type { Crew, CrewActivity } from "@/data/crews";

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
      aria-labelledby={`feed-${activity.id}-author`}
      className="bg-app-card rounded-3xl p-5 md:p-6"
    >
      <FeedPostContent activity={activity} crew={crew} />

      <div className="border-app-border mt-5 flex flex-wrap items-center justify-between gap-4 border-t pt-4">
        <ViewMoreButton
          to={`/feed/${activity.id}`}
          aria-label={`${activity.nickname} 님의 게시글 상세 보기`}
        >
          게시글 상세 보기
        </ViewMoreButton>
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
