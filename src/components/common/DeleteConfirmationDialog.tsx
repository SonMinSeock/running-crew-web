/**
 * 삭제 대상 요약과 준비 중 안내를 공통 확인 모달로 표시한다.
 */
import type { ReactElement, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteConfirmationDialogProps {
  title: string;
  trigger: ReactElement;
  children: ReactNode;
}

export default function DeleteConfirmationDialog({
  title,
  trigger,
  children,
}: DeleteConfirmationDialogProps) {
  const { key } = useLocation();

  // 상세 페이지나 대상 경로가 바뀌면 모달의 열린 상태를 초기화한다.
  return (
    <AlertDialog key={key}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="bg-app-card text-app-text ring-app-border max-h-[calc(100dvh-3rem)] w-[calc(100%-3rem)] gap-5 overflow-y-auto rounded-3xl p-6 data-[size=default]:max-w-md motion-reduce:animate-none data-[size=default]:sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold break-words">
            {title}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="bg-app-text/5 min-w-0 rounded-2xl p-4">{children}</div>

        <AlertDialogDescription className="text-app-subtext leading-relaxed">
          삭제 기능은 준비 중입니다. 현재는 실제로 삭제되지 않습니다.
        </AlertDialogDescription>

        <AlertDialogFooter className="m-0 flex-col rounded-none border-0 bg-transparent p-0 sm:flex-row">
          <AlertDialogCancel className="bg-app-bg border-app-border text-app-text focus-visible:ring-app-accent h-12 cursor-pointer rounded-2xl px-5">
            닫기
          </AlertDialogCancel>
          <AlertDialogAction
            disabled
            className="bg-app-error h-12 cursor-pointer rounded-2xl px-5 text-white disabled:pointer-events-auto"
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
