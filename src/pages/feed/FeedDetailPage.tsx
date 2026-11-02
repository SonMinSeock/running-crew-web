/**
 * 피드 게시글과 연결된 크루를 확인하고 상세 콘텐츠·편집 진입·댓글을 표시한다.
 */
import { useEffect } from "react";
import { Pencil } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ViewMoreButton from "@/components/common/ViewMoreButton";
import FeedPostContent from "@/components/feed/FeedPostContent";
import FeedComments from "@/components/feed/FeedComments";
import {
  CREWS,
  CREW_ACTIVITIES,
  FEED_EDIT_SAMPLE_ACTIVITY_ID,
} from "@/data/crews";

export default function FeedDetailPage() {
  const { activityId } = useParams();
  const activity = CREW_ACTIVITIES.find(
    (item) => String(item.id) === activityId,
  );
  const crew = CREWS.find((item) => item.id === activity?.crewId);

  useEffect(() => {
    // 상세에 진입하거나 게시글이 바뀌면 시작 위치를 표시한다.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activityId]);

  if (!activity || !crew) {
    return (
      <section className="mx-auto max-w-2xl py-12 text-center">
        <h1 className="text-xl font-bold">게시글을 찾을 수 없습니다.</h1>
        <p className="text-app-subtext mt-3 text-sm">
          피드 목록에서 다른 게시글을 확인해주세요.
        </p>
        <Button
          asChild
          variant="link"
          className="text-app-accent mt-4 text-base font-bold"
        >
          <Link to="/feed">피드 목록으로 이동</Link>
        </Button>
      </section>
    );
  }

  // 실제 소유권·편집 권한과 별개로 편집 UI 샘플의 진입 버튼을 표시한다.
  const isEditSample = activity.id === FEED_EDIT_SAMPLE_ACTIVITY_ID;

  return (
    <section
      aria-labelledby="feed-detail-title"
      className="mx-auto max-w-2xl space-y-5"
    >
      <h1 id="feed-detail-title" className="sr-only">
        피드 상세
      </h1>
      {isEditSample && (
        <div className="flex justify-end">
          <Button asChild variant="ghost" className="bg-app-card rounded-full">
            <Link to={`/feed/${activity.id}/edit`}>
              <Pencil aria-hidden="true" className="size-4" />
              편집
            </Link>
          </Button>
        </div>
      )}
      <article
        aria-labelledby={`feed-${activity.id}-author`}
        className="bg-app-card rounded-3xl p-5 md:p-6"
      >
        <FeedPostContent activity={activity} crew={crew} isDetail />
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
      <div className="flex justify-end">
        <ViewMoreButton to="/feed">피드 목록 보기</ViewMoreButton>
      </div>
    </section>
  );
}
