/**
 * 전체 보기와 더보기에 사용하는 화살표 버튼 또는 링크를 표시한다.
 */
import type { ComponentProps, ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ViewMoreButtonProps extends Omit<
  ComponentProps<typeof Button>,
  "asChild"
> {
  children: ReactNode;
  to?: string;
}

// 이동 주소가 있으면 링크로, 없으면 일반 버튼으로 표시한다.
export default function ViewMoreButton({
  children,
  to,
  className,
  ...props
}: ViewMoreButtonProps) {
  const content = (
    <>
      {children}
      <ChevronRight className="size-4" aria-hidden="true" />
    </>
  );

  const buttonClassName = cn(
    "text-app-accent h-auto cursor-pointer rounded-none bg-transparent p-0 text-sm font-semibold hover:bg-transparent hover:text-app-accent hover:underline",
    className,
  );

  if (to) {
    return (
      <Button {...props} asChild variant="link" className={buttonClassName}>
        <Link to={to}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button type="button" {...props} variant="link" className={buttonClassName}>
      {content}
    </Button>
  );
}
