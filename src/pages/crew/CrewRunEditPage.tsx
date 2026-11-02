/**
 * 러닝 일정 수정 샘플을 확인하고 기존 값이 담긴 공통 폼 또는 접근 안내를 표시한다.
 */
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CrewRunForm from "@/components/crew/CrewRunForm";
import { CREWS, CREW_RUNS, OWNED_CREW_SAMPLE_ID } from "@/data/crews";

export default function CrewRunEditPage() {
  const { crewId, runId } = useParams();
  const crew = CREWS.find((item) => String(item.id) === crewId);
  const run = CREW_RUNS.find(
    (item) => String(item.id) === runId && item.crewId === crew?.id,
  );

  useEffect(() => {
    // 수정 화면에 진입하거나 대상이 바뀌면 시작 위치를 표시한다.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [crewId, runId]);

  // 실제 권한 검사와 별개로 크루 1의 모든 일정을 수정 UI 샘플로 사용한다.
  const errorTitle = !crew
    ? "크루를 찾을 수 없습니다."
    : !run
      ? "러닝 일정을 찾을 수 없습니다."
      : crew.id !== OWNED_CREW_SAMPLE_ID
        ? "일정 수정 UI 샘플 대상 크루가 아닙니다."
        : "";

  if (errorTitle || !crew || !run) {
    return (
      <section className="mx-auto max-w-2xl py-12 text-center">
        <h1 className="text-xl font-bold">{errorTitle}</h1>
        <p className="text-app-subtext mt-3 text-sm">
          {crew
            ? "해당 크루의 일정 목록을 확인해주세요."
            : "크루 목록에서 다른 크루를 확인해주세요."}
        </p>
        <Button
          asChild
          variant="link"
          className="text-app-accent mt-4 text-base font-bold"
        >
          <Link to={crew ? `/crews/${crew.id}/runs` : "/crews"}>
            {crew ? "크루 일정 목록으로 이동" : "크루 목록으로 이동"}
          </Link>
        </Button>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="run-edit-page-title"
      className="mx-auto max-w-2xl space-y-6"
    >
      <h1 id="run-edit-page-title" className="text-xl font-bold">
        러닝 일정 수정
      </h1>
      <CrewRunForm crew={crew} mode="edit" run={run} />
    </section>
  );
}
