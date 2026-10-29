import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RunParticipationButtonProps extends ComponentProps<typeof Button> {
  children: ReactNode;
}

// 러닝 참여 버튼의 스타일을 공유하고 상태와 이벤트는 사용하는 화면에서 전달한다.
export default function RunParticipationButton({
  className,
  type = "button",
  ...props
}: RunParticipationButtonProps) {
  return (
    <Button
      {...props}
      type={type}
      className={cn(
        "bg-app-accent text-app-bg hover:bg-app-accent/90 h-12 w-full cursor-pointer rounded-2xl text-base font-bold",
        className,
      )}
    />
  );
}
