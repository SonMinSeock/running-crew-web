/**
 * 신고 대상 요약과 사유 선택 UI를 표시한다.
 * 신고 접수 기능이 준비될 때까지 확정 버튼은 비활성화한다.
 */
import { useId, useRef, useState, type ReactElement } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const REPORT_REASONS = ["스팸·광고", "욕설·괴롭힘", "개인정보 노출", "기타"];

interface ReportDialogProps {
  targetLabel: "게시글" | "댓글" | "대댓글" | "멤버";
  author: string;
  avatar?: string;
  content?: string;
  reasons?: readonly string[];
  trigger: ReactElement;
}

export default function ReportDialog({
  targetLabel,
  author,
  avatar,
  content,
  reasons = REPORT_REASONS,
  trigger,
}: ReportDialogProps) {
  const groupName = useId();
  const firstReasonRef = useRef<HTMLInputElement>(null);
  const [reason, setReason] = useState("");

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setReason("");
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          firstReasonRef.current?.focus();
        }}
        onInteractOutside={(event) => event.preventDefault()}
        className="bg-app-card text-app-text ring-app-border max-h-[calc(100dvh-3rem)] gap-5 overflow-y-auto rounded-3xl p-6 sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {targetLabel} 신고
          </DialogTitle>
          <DialogDescription className="text-app-subtext">
            신고 기능은 준비 중입니다. 현재는 신고가 접수되지 않습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-app-text/5 min-w-0 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            {avatar && (
              <span aria-hidden="true" className="text-xl">
                {avatar}
              </span>
            )}
            <p className="min-w-0 font-bold break-words">{author}</p>
          </div>
          {content && (
            <p className="mt-2 line-clamp-3 text-sm break-words whitespace-pre-wrap">
              {content}
            </p>
          )}
        </div>

        <fieldset className="min-w-0 space-y-2">
          <legend className="mb-2 font-semibold">신고 사유</legend>
          {reasons.map((option, index) => (
            <label
              key={option}
              className="border-app-border flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2"
            >
              <input
                ref={index === 0 ? firstReasonRef : undefined}
                type="radio"
                name={groupName}
                value={option}
                checked={reason === option}
                onChange={() => setReason(option)}
                className="accent-app-accent focus-visible:outline-app-accent size-4 focus-visible:outline-2 focus-visible:outline-offset-2"
              />
              {option}
            </label>
          ))}
        </fieldset>

        <DialogFooter className="m-0 flex-col rounded-none border-0 bg-transparent p-0 sm:flex-row">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="h-12 rounded-2xl"
            >
              취소
            </Button>
          </DialogClose>
          <Button type="button" disabled className="h-12 rounded-2xl">
            신고하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
