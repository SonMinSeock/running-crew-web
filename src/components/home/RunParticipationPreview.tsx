/**
 * 홈의 참여 확인을 반응형 시트·모달로 표시하고 신청·취소 확인 모달로 전환한다.
 */
import { useRef, useState, useSyncExternalStore } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import RunParticipationButton from "@/components/common/RunParticipationButton";
import ViewMoreButton from "@/components/common/ViewMoreButton";
import RunParticipationSummary from "@/components/crew/RunParticipationSummary";
import RunParticipationDialog from "@/components/crew/RunParticipationDialog";
import type { Crew, CrewRun } from "@/data/crews";
import { getRunParticipationUiState } from "@/lib/run";
import { cn } from "@/lib/utils";

interface RunParticipationPreviewProps {
  crew: Crew;
  run: CrewRun;
}

const desktopQuery = "(min-width: 768px)";

function subscribeToDesktop(onChange: () => void) {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getDesktopSnapshot() {
  return window.matchMedia(desktopQuery).matches;
}

export default function RunParticipationPreview(
  props: RunParticipationPreviewProps,
) {
  const { key } = useLocation();
  const isDesktop = useSyncExternalStore(
    subscribeToDesktop,
    getDesktopSnapshot,
    () => false,
  );

  // 페이지·일정·화면 구성이 바뀌면 모든 열린 상태와 전환 예약을 초기화한다.
  return (
    <RunParticipationPreviewContent
      key={`${key}-${props.crew.id}-${props.run.id}-${isDesktop}`}
      {...props}
      isDesktop={isDesktop}
    />
  );
}

interface RunParticipationPreviewContentProps extends RunParticipationPreviewProps {
  isDesktop: boolean;
}

function RunParticipationPreviewContent({
  crew,
  run,
  isDesktop,
}: RunParticipationPreviewContentProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [state, setState] = useState(() =>
    getRunParticipationUiState(run, Date.now()),
  );
  const pendingConfirm = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const restoreFocus = () => triggerRef.current?.focus();

  const handlePreviewChange = (open: boolean) => {
    if (open) setState(getRunParticipationUiState(run, Date.now()));
    else pendingConfirm.current = false;
    setPreviewOpen(open);
  };

  const requestConfirmation = () => {
    const current = getRunParticipationUiState(run, Date.now());
    setState(current);
    if (current === "ENDED") return;
    pendingConfirm.current = true;
    setPreviewOpen(false);
  };

  const handlePreviewClosed = (event: Event) => {
    event.preventDefault();
    // 시트의 종료 처리가 끝난 뒤 확인 모달을 열어 포커스 관리 충돌을 피한다.
    requestAnimationFrame(() => {
      if (!triggerRef.current?.isConnected) return;
      if (pendingConfirm.current) {
        pendingConfirm.current = false;
        const current = getRunParticipationUiState(run, Date.now());
        setState(current);
        if (current !== "ENDED") {
          setConfirmOpen(true);
          return;
        }
      }
      restoreFocus();
    });
  };

  if (crew.id !== run.crewId) return null;

  const Header = isDesktop ? DialogHeader : DrawerHeader;
  const Title = isDesktop ? DialogTitle : DrawerTitle;
  const Description = isDesktop ? DialogDescription : DrawerDescription;
  const isParticipating = state === "PARTICIPATING";
  const body = (
    <>
      <Header className="p-0 text-left">
        <Title className="text-app-text text-xl font-bold">
          러닝 참여 확인
        </Title>
        <Description className="text-app-subtext text-sm leading-relaxed">
          일정 정보와 참여 상태를 확인해주세요. 실제 참여 내역이 아닌 UI
          샘플입니다.
        </Description>
      </Header>
      <RunParticipationSummary crew={crew} run={run} />
      <p className="text-app-subtext text-sm">
        {state === "ENDED" ? "참여 인원" : "참여 예정"}{" "}
        <span className="text-app-accent font-bold">
          {run.participantCount}명
        </span>
      </p>
      <p role="status" className="text-app-accent text-sm font-semibold">
        {state === "ENDED"
          ? "종료된 러닝입니다."
          : isParticipating
            ? "참여 예정 · UI 샘플"
            : "미참여 · UI 샘플"}
      </p>
      <ViewMoreButton to={`/crews/${crew.id}/runs/${run.id}`}>
        일정 상세 보기
      </ViewMoreButton>
      <div className="flex flex-col gap-2">
        <RunParticipationButton
          disabled={state === "ENDED"}
          variant={isParticipating ? "outline" : "default"}
          onClick={requestConfirmation}
          className={cn(
            isParticipating &&
              "bg-app-error/10 border-app-error/30 text-app-error",
          )}
        >
          {state === "ENDED"
            ? "종료된 러닝"
            : isParticipating
              ? "참여 취소"
              : "참여 신청"}
        </RunParticipationButton>
        <Button
          ref={closeRef}
          type="button"
          variant="outline"
          onClick={() => handlePreviewChange(false)}
          className="bg-app-bg border-app-border text-app-text h-12 rounded-2xl"
        >
          닫기
        </Button>
      </div>
    </>
  );

  return (
    <>
      <RunParticipationButton
        ref={triggerRef}
        className="mt-5"
        aria-haspopup="dialog"
        aria-expanded={previewOpen || confirmOpen}
        onClick={() => handlePreviewChange(true)}
      >
        참여 확인
      </RunParticipationButton>
      {isDesktop ? (
        <Dialog open={previewOpen} onOpenChange={handlePreviewChange}>
          <DialogContent
            showCloseButton={false}
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              closeRef.current?.focus();
            }}
            onCloseAutoFocus={handlePreviewClosed}
            className="bg-app-card text-app-text ring-app-border max-h-[calc(100dvh-3rem)] gap-5 overflow-y-auto rounded-3xl p-6 sm:max-w-md"
          >
            {body}
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          open={previewOpen}
          onOpenChange={handlePreviewChange}
          autoFocus
          shouldScaleBackground={false}
        >
          <DrawerContent
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              closeRef.current?.focus();
            }}
            onCloseAutoFocus={handlePreviewClosed}
            className="bg-app-card text-app-text border-app-border data-[vaul-drawer-direction=bottom]:max-h-[90dvh] data-[vaul-drawer-direction=bottom]:rounded-t-3xl motion-reduce:animate-none motion-reduce:transition-none"
          >
            <div className="flex min-h-0 flex-col gap-5 overflow-y-auto px-6 pt-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
              {body}
            </div>
          </DrawerContent>
        </Drawer>
      )}
      {state !== "ENDED" && (
        <RunParticipationDialog
          crew={crew}
          run={run}
          state={state}
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          onCloseFocus={restoreFocus}
        />
      )}
    </>
  );
}
