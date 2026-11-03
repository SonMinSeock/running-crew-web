/**
 * 가입 UI 샘플 상태에 따라 가입 신청·신청 취소·탈퇴 확인 모달을 표시한다.
 */
import { useId } from "react";
import type { ReactElement } from "react";
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
import type { Crew } from "@/data/crews";
import { getCrewMembershipUiState } from "@/lib/crew";
import { cn } from "@/lib/utils";

interface CrewMembershipDialogProps {
  crew: Crew;
  children: ReactElement;
}

const dialogCopy = {
  NOT_JOINED: {
    title: "크루 가입을 신청할까요?",
    description: "이 크루에 가입을 신청하시겠어요?",
    action: "가입 신청",
    notice:
      "가입 신청 기능은 준비 중입니다. 현재는 실제 신청이 접수되지 않습니다.",
  },
  PENDING: {
    title: "가입 신청을 취소할까요?",
    description: "이 크루의 가입 신청을 취소하시겠어요?",
    action: "신청 취소",
    notice:
      "신청 취소 기능은 준비 중입니다. 현재는 실제 신청이 취소되지 않습니다.",
  },
  JOINED: {
    title: "크루에서 탈퇴할까요?",
    description: "이 크루에서 탈퇴하시겠어요?",
    action: "크루 탈퇴",
    notice:
      "크루 탈퇴 기능은 준비 중입니다. 현재는 실제 탈퇴가 처리되지 않습니다.",
  },
};

export default function CrewMembershipDialog(props: CrewMembershipDialogProps) {
  const { key } = useLocation();

  // 페이지 이동·크루 변경 시 모달을 다시 구성해 열린 상태가 남지 않게 한다.
  return (
    <CrewMembershipDialogContent key={`${key}-${props.crew.id}`} {...props} />
  );
}

function CrewMembershipDialogContent({
  crew,
  children,
}: CrewMembershipDialogProps) {
  const noticeId = useId();
  const state = getCrewMembershipUiState(crew);

  // 실제 탈퇴 정책과 별개로 소유 크루 UI 샘플에는 이번 모달 진입을 제공하지 않는다.
  if (state === "OWNED") return null;

  const copy = dialogCopy[state];

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-app-card text-app-text ring-app-border max-h-[calc(100dvh-3rem)] w-[calc(100%-3rem)] gap-5 overflow-y-auto rounded-3xl p-6 data-[size=default]:max-w-md data-[size=default]:sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold break-words">
            {copy.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-app-subtext leading-relaxed">
            {copy.description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="bg-app-text/5 flex min-w-0 items-center gap-3 rounded-2xl p-4">
          <span aria-hidden="true" className="shrink-0 text-3xl">
            {crew.emoji}
          </span>
          <div className="min-w-0">
            <p className="font-bold break-words">{crew.name}</p>
            <p className="text-app-subtext mt-2 text-sm break-words">
              {crew.region} · {crew.memberCount}명
            </p>
          </div>
        </div>

        <p id={noticeId} className="text-app-subtext text-sm leading-relaxed">
          {copy.notice}
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
              state === "JOINED" && "bg-app-error text-white",
            )}
          >
            {copy.action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
