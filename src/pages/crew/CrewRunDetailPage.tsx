/**
 * 크루와 일정 ID를 확인해 러닝 상세 UI 또는 잘못된 접근 안내를 구성한다.
 */
import { useEffect } from "react";
import { Pencil } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RunParticipationButton from "@/components/common/RunParticipationButton";
import RunDetailInfo from "@/components/crew/RunDetailInfo";
import RunDetailGuide from "@/components/crew/RunDetailGuide";
import { CREWS, CREW_RUNS, OWNED_CREW_SAMPLE_ID } from "@/data/crews";

export default function CrewRunDetailPage() {
  const { crewId, runId } = useParams();
  const crew = CREWS.find((item) => String(item.id) === crewId);
  const run = CREW_RUNS.find(
    (item) => String(item.id) === runId && item.crewId === crew?.id,
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [crewId, runId]);

  if (!crew || !run) {
    return (
      <section className="mx-auto max-w-2xl py-12 text-center">
        <h1 className="text-xl font-bold">
          {crew ? "러닝 일정을 찾을 수 없습니다." : "크루를 찾을 수 없습니다."}
        </h1>
        <p className="text-app-subtext mt-3 text-sm">
          {crew
            ? "해당 크루의 일정 목록에서 다른 일정을 확인해주세요."
            : "크루 목록에서 다른 크루를 확인해주세요."}
        </p>
        <Button asChild variant="link" className="text-app-accent mt-4">
          <Link to={crew ? `/crews/${crew.id}/runs` : "/crews"}>
            {crew ? "크루 일정 목록으로 이동" : "크루 목록으로 이동"}
          </Link>
        </Button>
      </section>
    );
  }

  const isUpcoming = Date.parse(run.startsAt) > Date.now();
  // 실제 편집 권한과 별개로 수정 UI 샘플의 진입 버튼 표시 여부를 결정한다.
  const isEditSample = crew.id === OWNED_CREW_SAMPLE_ID;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {isEditSample && (
        <div className="flex justify-end">
          <Button asChild variant="ghost" className="bg-app-card rounded-full">
            <Link to={`/crews/${crew.id}/runs/${run.id}/edit`}>
              <Pencil aria-hidden="true" className="size-4" />
              편집
            </Link>
          </Button>
        </div>
      )}
      <RunDetailInfo crew={crew} run={run} isUpcoming={isUpcoming} />
      <RunDetailGuide
        description={run.description}
        meetingGuide={run.meetingGuide}
      />
      <div>
        <RunParticipationButton
          disabled
          aria-describedby={
            isUpcoming ? "run-detail-action-description" : undefined
          }
        >
          {isUpcoming ? "참여 신청" : "종료된 러닝"}
        </RunParticipationButton>
        {isUpcoming && (
          <p
            id="run-detail-action-description"
            className="text-app-subtext mt-2 text-xs"
          >
            참여 신청 기능은 준비 중입니다.
          </p>
        )}
      </div>
    </div>
  );
}
