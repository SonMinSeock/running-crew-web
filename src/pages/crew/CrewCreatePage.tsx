/**
 * 크루 만들기 화면의 제목과 기본 정보 입력 폼을 배치한다.
 */
import { useEffect } from "react";
import CrewCreateForm from "@/components/crew/CrewCreateForm";

export default function CrewCreatePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <section
      aria-labelledby="crew-create-title"
      className="mx-auto max-w-2xl space-y-6"
    >
      <h1 id="crew-create-title" className="sr-only">
        크루 만들기
      </h1>
      <CrewCreateForm />
    </section>
  );
}
