/**
 * 공지 작성 대상 샘플을 확인하고 공통 폼 또는 접근 안내를 표시한다.
 */
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CrewNoticeForm from "@/components/crew/CrewNoticeForm";
import { CREWS, OWNED_CREW_SAMPLE_ID } from "@/data/crews";

export default function CrewNoticeCreatePage() {
  const { crewId } = useParams();
  const crew = CREWS.find((item) => String(item.id) === crewId);

  useEffect(() => {
    // 작성·수정 화면에 진입하거나 대상이 바뀌면 시작 위치를 표시한다.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [crewId]);

  const errorTitle = !crew
    ? "크루를 찾을 수 없습니다."
    : crew.id !== OWNED_CREW_SAMPLE_ID
      ? "작성·수정 대상 크루가 아닙니다."
      : "";

  if (errorTitle || !crew) {
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
      aria-labelledby="notice-create-title"
      className="mx-auto max-w-2xl space-y-6"
    >
      <h1 id="notice-create-title" className="text-xl font-bold">
        공지 작성
      </h1>
      <CrewNoticeForm key={crew.id} crew={crew} mode="create" />
    </section>
  );
}
