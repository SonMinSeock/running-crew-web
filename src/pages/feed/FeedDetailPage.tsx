/**
 * 피드 게시글과 연결된 크루를 확인하고 상세 콘텐츠·편집·삭제 진입·댓글을 표시한다.
 */
import { useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DeleteConfirmationDialog from "@/components/common/DeleteConfirmationDialog";
import ViewMoreButton from "@/components/common/ViewMoreButton";
import FeedPostContent from "@/components/feed/FeedPostContent";
import FeedComments from "@/components/feed/FeedComments";
import {
  CREWS,
  CREW_ACTIVITIES,
  FEED_EDIT_SAMPLE_ACTIVITY_ID,
} from "@/data/crews";
import ReportDialog from "@/components/common/ReportDialog";

const FEED_REPORT_SAMPLE_ACTIVITY_ID = 2;

export default function FeedDetailPage() {
  const { key: locationKey } = useLocation();
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

  // 활동 ID를 기준으로 편집·삭제 UI 샘플의 진입 버튼을 표시한다.
  const isManagementUiSample = activity.id === FEED_EDIT_SAMPLE_ACTIVITY_ID;

  return (
    <section
      aria-labelledby="feed-detail-title"
      className="mx-auto max-w-2xl space-y-5"
    >
      <h1 id="feed-detail-title" className="sr-only">
        피드 상세
      </h1>
      {isManagementUiSample && (
        <div className="flex flex-wrap justify-end gap-2">
          <Button
            asChild
            variant="ghost"
            className="bg-app-card h-10 rounded-full px-4"
          >
            <Link to={`/feed/${activity.id}/edit`}>
              <Pencil aria-hidden="true" className="size-4" />
              편집
            </Link>
          </Button>
          <DeleteConfirmationDialog
            title="게시글을 삭제할까요?"
            trigger={
              <Button
                type="button"
                variant="outline"
                aria-label="게시글 삭제"
                className="bg-app-error/10 border-app-error/30 text-app-error h-10 cursor-pointer rounded-full px-4"
              >
                <Trash2 aria-hidden="true" className="size-4" />
                삭제
              </Button>
            }
          >
            <p className="font-bold break-words">{activity.nickname}</p>
            <p className="text-app-subtext mt-2 text-sm break-words">
              {crew.name}
            </p>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed break-words">
              {activity.content}
            </p>
          </DeleteConfirmationDialog>
        </div>
      )}
      {activity.id === FEED_REPORT_SAMPLE_ACTIVITY_ID && (
        <div className="flex justify-end">
          <ReportDialog
            key={`${locationKey}-${activity.id}`}
            targetLabel="게시글"
            author={activity.nickname}
            content={activity.content}
            trigger={
              <Button
                type="button"
                variant="ghost"
                aria-label={`${activity.nickname} 님의 게시글 신고`}
                className="bg-app-card text-app-subtext h-10 cursor-pointer rounded-full px-4"
              >
                신고
              </Button>
            }
          />
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
