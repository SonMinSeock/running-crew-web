/**
 * 러닝 참여 신청·취소 확인과 일정 요약을 표시하고 확정 동작은 비활성으로 제공한다.
 */
import { useId } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import RunParticipationSummary from "./RunParticipationSummary";
import type { Crew, CrewRun } from "@/data/crews";
import type { RunParticipationUiState } from "@/lib/run";
import { cn } from "@/lib/utils";

interface RunParticipationDialogProps {
  crew: Crew;
  run: CrewRun;
  state: Exclude<RunParticipationUiState, "ENDED">;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseFocus: () => void;
}

export default function RunParticipationDialog({
  crew,
  run,
  state,
  open,
  onOpenChange,
  onCloseFocus,
}: RunParticipationDialogProps) {
  const noticeId = useId();
  const isCancel = state === "PARTICIPATING";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        onCloseAutoFocus={(event) => {
          // 확인 모달을 닫으면 호출한 버튼으로 포커스를 복귀한다.
          event.preventDefault();
          onCloseFocus();
        }}
        className="bg-app-card text-app-text ring-app-border max-h-[calc(100dvh-3rem)] w-[calc(100%-3rem)] gap-5 overflow-y-auto rounded-3xl p-6 data-[size=default]:max-w-md motion-reduce:animate-none data-[size=default]:sm:max-w-md"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold break-words">
            {isCancel ? "러닝 참여를 취소할까요?" : "러닝 참여를 신청할까요?"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-app-subtext leading-relaxed">
            {isCancel
              ? "이 러닝의 참여를 취소하시겠어요?"
              : "이 러닝에 참여를 신청하시겠어요?"}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <RunParticipationSummary crew={crew} run={run} />

        <p id={noticeId} className="text-app-subtext text-sm leading-relaxed">
          {isCancel
            ? "참여 취소 기능은 준비 중입니다. 현재는 실제 참여가 취소되지 않습니다."
            : "참여 신청 기능은 준비 중입니다. 현재는 실제 신청이 접수되지 않습니다."}
        </p>

        <AlertDialogFooter className="m-0 rounded-none border-0 bg-transparent p-0">
          <AlertDialogCancel className="bg-app-bg border-app-border text-app-text focus-visible:ring-app-accent h-12 rounded-2xl px-5">
            닫기
          </AlertDialogCancel>
          <AlertDialogAction
            disabled
            aria-describedby={noticeId}
            className={cn(
              "bg-app-accent text-app-bg h-12 rounded-2xl px-5",
              isCancel && "bg-app-error text-white",
            )}
          >
            {isCancel ? "참여 취소" : "참여 신청"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
