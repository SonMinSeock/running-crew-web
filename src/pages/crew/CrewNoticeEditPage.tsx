/**
 * 공지 수정 대상 샘플을 확인하고 공통 폼 또는 접근 안내를 표시한다.
 */
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CrewNoticeForm from "@/components/crew/CrewNoticeForm";
import { CREWS, OWNED_CREW_SAMPLE_ID, CREW_NOTICES } from "@/data/crews";

export default function CrewNoticeEditPage() {
  const { crewId, noticeId } = useParams();
  const crew = CREWS.find((item) => String(item.id) === crewId);
  const notice = CREW_NOTICES.find(
    (item) => String(item.id) === noticeId && item.crewId === crew?.id,
  );

  useEffect(() => {
    // 작성·수정 화면에 진입하거나 대상이 바뀌면 시작 위치를 표시한다.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [crewId, noticeId]);

  const errorTitle = !crew
    ? "크루를 찾을 수 없습니다."
    : crew.id !== OWNED_CREW_SAMPLE_ID
      ? "작성·수정 대상 크루가 아닙니다."
      : !notice
        ? "공지를 찾을 수 없습니다."
        : "";

  if (errorTitle || !notice || !crew) {
    return (
      <section className="mx-auto max-w-2xl py-12 text-center">
        <h1 className="text-xl font-bold">{errorTitle}</h1>
        <p className="text-app-subtext mt-3 text-sm">
          {crew
            ? "해당 크루의 공지 목록을 확인해주세요."
            : "크루 목록에서 다른 크루를 확인해주세요."}
        </p>
        <Button asChild variant="link" className="text-app-accent mt-4">
          <Link to={crew ? `/crews/${crew.id}/notices` : "/crews"}>
            {crew ? "공지 목록으로 이동" : "크루 목록으로 이동"}
          </Link>
        </Button>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="notice-edit-title"
      className="mx-auto max-w-2xl space-y-6"
    >
      <h1 id="notice-edit-title" className="text-xl font-bold">
        공지 수정
      </h1>
      <CrewNoticeForm
        key={`${crew.id}-${notice.id}`}
        crew={crew}
        mode="edit"
        notice={notice}
      />
    </section>
  );
}
