/**
 * 크루 수정 샘플 여부를 확인하고 기존 정보로 초기화한 공통 폼을 표시한다.
 */
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CrewForm from "@/components/crew/CrewForm";
import { CREWS, OWNED_CREW_SAMPLE_ID } from "@/data/crews";

export default function CrewEditPage() {
  const { crewId } = useParams();
  const crew = CREWS.find((item) => String(item.id) === crewId);

  useEffect(() => {
    // 수정 대상이 바뀌거나 화면에 진입하면 시작 위치를 표시한다.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [crewId]);

  if (!crew || crew.id !== OWNED_CREW_SAMPLE_ID) {
    return (
      <section className="mx-auto max-w-2xl py-12 text-center">
        <h1 className="text-xl font-bold">
          {crew ? "수정 대상 크루가 아닙니다." : "크루를 찾을 수 없습니다."}
        </h1>
        <p className="text-app-subtext mt-3 text-sm">
          {crew
            ? "이 크루는 편집 UI 확인용 샘플이 아닙니다."
            : "크루 목록에서 다른 크루를 확인해주세요."}
        </p>
        <Button asChild variant="link" className="text-app-accent mt-4">
          <Link to={crew ? `/crews/${crew.id}` : "/crews"}>
            {crew ? "크루 상세로 이동" : "크루 목록으로 이동"}
          </Link>
        </Button>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="crew-edit-title"
      className="mx-auto max-w-2xl space-y-6"
    >
      <h1 id="crew-edit-title" className="text-xl font-bold">
        크루 수정
      </h1>
      <CrewForm key={crew.id} mode="edit" crew={crew} />
    </section>
  );
}
