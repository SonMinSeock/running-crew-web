/**
 * 프로필의 로그아웃 버튼과 확인 모달을 표시한다.
 * 로그아웃 기능이 준비될 때까지 모달의 확인 버튼은 비활성화한다.
 */
import { Button } from "@/components/ui/button";
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
import { useLocation } from "react-router-dom";

export default function LogoutConfirmationDialog() {
  const { key } = useLocation();

  return (
    <AlertDialog key={key}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="bg-app-card cursor-pointer rounded-full"
        >
          로그아웃
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-app-card text-app-text ring-app-border max-h-[calc(100dvh-3rem)] w-[calc(100%-3rem)] gap-5 overflow-y-auto rounded-3xl p-6 data-[size=default]:max-w-md motion-reduce:animate-none data-[size=default]:sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold break-words">
            로그아웃할까요?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-app-subtext leading-relaxed">
            로그아웃 기능은 준비 중입니다. 현재는 로그아웃되지 않습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="m-0 flex-col rounded-none border-0 bg-transparent p-0 sm:flex-row">
          <AlertDialogCancel className="bg-app-bg border-app-border text-app-text focus-visible:ring-app-accent h-12 cursor-pointer rounded-2xl px-5">
            닫기
          </AlertDialogCancel>
          <AlertDialogAction
            disabled
            className="bg-app-error h-12 rounded-2xl px-5 text-white"
          >
            로그아웃
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
