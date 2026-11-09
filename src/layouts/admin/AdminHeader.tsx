/**
 * 운영자 콘솔 제목과 테마 전환·로그아웃 버튼을 표시한다.
 */
import { LogOut, Moon, ShieldCheck, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
}

export default function AdminHeader({
  isDark,
  onToggleTheme,
  onLogout,
}: AdminHeaderProps) {
  const ThemeIcon = isDark ? Sun : Moon;
  const themeLabel = isDark ? "라이트 모드로 전환" : "다크 모드로 전환";

  return (
    <header className="bg-app-card border-app-border border-b">
      <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="bg-app-accent/10 text-app-accent flex size-11 shrink-0 items-center justify-center rounded-xl">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-app-subtext text-xs font-semibold tracking-wider">
              RUNNING CREW
            </p>
            <p className="text-app-text text-base font-bold sm:text-lg">
              운영자 콘솔
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={themeLabel}
            onClick={onToggleTheme}
            className="bg-app-card text-app-text size-10 cursor-pointer rounded-full"
          >
            <ThemeIcon className="size-5" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            aria-label="로그아웃"
            onClick={onLogout}
            className="border-app-border h-10 cursor-pointer gap-2 px-3"
          >
            <LogOut className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">로그아웃</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
