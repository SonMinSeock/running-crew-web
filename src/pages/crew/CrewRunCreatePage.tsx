/**
 * 해당 크루의 러닝 일정 작성 폼과 잘못된 크루 접근 안내를 표시한다.
 */
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CrewRunForm from "@/components/crew/CrewRunForm";
import { CREWS } from "@/data/crews";

export default function CrewRunCreatePage() {
  const { crewId } = useParams();
  const crew = CREWS.find((item) => String(item.id) === crewId);

  useEffect(() => {
    // 크루가 변경되거나 화면에 진입하면 시작 위치를 표시한다.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [crewId]);

  if (!crew) {
    return (
      <section className="mx-auto max-w-2xl py-12 text-center">
        <h1 className="text-xl font-bold">크루를 찾을 수 없습니다.</h1>
        <p className="text-app-subtext mt-3 text-sm">
          크루 목록에서 다른 크루를 확인해주세요.
        </p>
        <Button asChild variant="link" className="text-app-accent mt-4">
          <Link to="/crews">크루 목록으로 이동</Link>
        </Button>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="run-create-page-title"
      className="mx-auto max-w-2xl space-y-6"
    >
      <h1 id="run-create-page-title" className="text-xl font-bold">
        러닝 일정 만들기
      </h1>
      <CrewRunForm crew={crew} mode="create" />
    </section>
  );
}
