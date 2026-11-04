/**
 * 크루와 일정 ID를 확인해 러닝 상세 UI 또는 잘못된 접근 안내를 구성한다.
 */
import { useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DeleteConfirmationDialog from "@/components/common/DeleteConfirmationDialog";
import RunParticipationAction from "@/components/crew/RunParticipationAction";
import RunDetailInfo from "@/components/crew/RunDetailInfo";
import RunDetailGuide from "@/components/crew/RunDetailGuide";
import { CREWS, CREW_RUNS, OWNED_CREW_SAMPLE_ID } from "@/data/crews";
import { runDetailDateFormatter, timeFormatter } from "@/lib/date";

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
  // 크루 ID를 기준으로 편집·삭제 UI 샘플의 진입 버튼을 표시한다.
  const isManagementUiSample = crew.id === OWNED_CREW_SAMPLE_ID;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {isManagementUiSample && (
        <div className="flex flex-wrap justify-end gap-2">
          <Button
            asChild
            variant="ghost"
            className="bg-app-card h-10 rounded-full px-4"
          >
            <Link to={`/crews/${crew.id}/runs/${run.id}/edit`}>
              <Pencil aria-hidden="true" className="size-4" />
              편집
            </Link>
          </Button>
          <DeleteConfirmationDialog
            title="러닝 일정을 삭제할까요?"
            trigger={
              <Button
                type="button"
                variant="outline"
                aria-label={`${run.title} 삭제`}
                className="bg-app-error/10 border-app-error/30 text-app-error h-10 cursor-pointer rounded-full px-4"
              >
                <Trash2 aria-hidden="true" className="size-4" />
                삭제
              </Button>
            }
          >
            <p className="font-bold break-words">{run.title}</p>
            <p className="text-app-subtext mt-2 text-sm break-words">
              {crew.name}
            </p>
            <div className="text-app-subtext mt-2 space-y-1 text-sm">
              <p>
                <time dateTime={run.startsAt}>
                  {runDetailDateFormatter.format(new Date(run.startsAt))}{" "}
                  {timeFormatter.format(new Date(run.startsAt))}
                </time>
              </p>
              <p className="break-words">{run.location}</p>
            </div>
          </DeleteConfirmationDialog>
        </div>
      )}
      <RunDetailInfo crew={crew} run={run} isUpcoming={isUpcoming} />
      <RunDetailGuide
        description={run.description}
        meetingGuide={run.meetingGuide}
      />
      <RunParticipationAction crew={crew} run={run} />
    </div>
  );
}
