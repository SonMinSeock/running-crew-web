/**
 * 러닝 참여 UI 샘플 상태와 신청·취소 모달 진입 또는 종료 버튼을 표시한다.
 */
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import RunParticipationButton from "@/components/common/RunParticipationButton";
import RunParticipationDialog from "./RunParticipationDialog";
import type { Crew, CrewRun } from "@/data/crews";
import { getRunParticipationUiState } from "@/lib/run";
import { cn } from "@/lib/utils";

interface RunParticipationActionProps {
  crew: Crew;
  run: CrewRun;
  className?: string;
}

export default function RunParticipationAction(
  props: RunParticipationActionProps,
) {
  const { key } = useLocation();

  // 페이지·일정 변경 시 열린 모달과 시각 판별 상태를 초기화한다.
  return (
    <RunParticipationActionContent
      key={`${key}-${props.crew.id}-${props.run.id}`}
      {...props}
    />
  );
}

function RunParticipationActionContent({
  crew,
  run,
  className,
}: RunParticipationActionProps) {
  const [state, setState] = useState(() =>
    getRunParticipationUiState(run, Date.now()),
  );
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // 크루와 일정이 일치하는 경우에만 참여 UI를 제공한다.
  if (crew.id !== run.crewId) return null;

  const handleOpen = () => {
    // 화면 진입 후 시간이 경과했을 수 있으므로 열기 직전에 종료 여부를 다시 확인한다.
    const nextState = getRunParticipationUiState(run, Date.now());
    setState(nextState);
    setOpen(nextState !== "ENDED");
  };

  if (state === "ENDED") {
    return (
      <div className={className}>
        <RunParticipationButton disabled>종료된 러닝</RunParticipationButton>
        <p role="status" className="text-app-subtext mt-2 text-xs">
          종료된 일정은 참여 신청·취소 UI를 제공하지 않습니다.
        </p>
      </div>
    );
  }

  const isParticipating = state === "PARTICIPATING";
  const label = isParticipating ? "참여 취소" : "참여 신청";

  return (
    <div className={className}>
      {isParticipating && (
        <p className="text-app-accent mb-3 text-sm font-semibold">참여 예정</p>
      )}
      <RunParticipationButton
        ref={triggerRef}
        variant={isParticipating ? "outline" : "default"}
        aria-label={`${run.title} ${label}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={handleOpen}
        className={cn(
          isParticipating &&
            "bg-app-error/10 border-app-error/30 text-app-error",
        )}
      >
        {label}
      </RunParticipationButton>
      <RunParticipationDialog
        crew={crew}
        run={run}
        state={state}
        open={open}
        onOpenChange={setOpen}
        onCloseFocus={() => triggerRef.current?.focus()}
      />
    </div>
  );
}
