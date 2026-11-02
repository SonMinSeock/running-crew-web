/**
 * 피드 수정 샘플을 확인하고 기존 본문이 담긴 공통 폼 또는 접근 안내를 표시한다.
 */
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeedForm from "@/components/feed/FeedForm";
import {
  CREWS,
  CREW_ACTIVITIES,
  FEED_EDIT_SAMPLE_ACTIVITY_ID,
} from "@/data/crews";

export default function FeedEditPage() {
  const { activityId } = useParams();
  const activity = CREW_ACTIVITIES.find(
    (item) => String(item.id) === activityId,
  );
  const crew = CREWS.find((item) => item.id === activity?.crewId);

  useEffect(() => {
    // 수정에 진입하거나 게시글이 바뀌면 시작 위치를 표시한다.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activityId]);

  // 실제 권한 검사와 별개로 정해진 활동 하나만 수정 UI 샘플로 사용한다.
  const errorTitle =
    !activity || !crew
      ? "게시글을 찾을 수 없습니다."
      : activity.id !== FEED_EDIT_SAMPLE_ACTIVITY_ID
        ? "피드 수정 UI 샘플 대상 게시글이 아닙니다."
        : "";

  if (errorTitle || !activity || !crew) {
    return (
      <section className="mx-auto max-w-2xl py-12 text-center">
        <h1 className="text-xl font-bold">{errorTitle}</h1>
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

  return (
    <section
      aria-labelledby="feed-edit-title"
      className="mx-auto max-w-2xl space-y-6"
    >
      <h1 id="feed-edit-title" className="text-xl font-bold">
        피드 수정
      </h1>
      <FeedForm mode="edit" crew={crew} activity={activity} />
    </section>
  );
}
