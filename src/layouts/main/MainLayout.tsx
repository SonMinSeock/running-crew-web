import { ArrowLeft } from "lucide-react";
import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/common/BottomNavigation";
import ProfileButton from "@/components/common/ProfileButton";
import ThemeModeButton from "@/components/common/ThemeModeButton";
import { Button } from "@/components/ui/button";
import { CREWS } from "@/data/crews";
import { cn } from "@/lib/utils";

export default function MainLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 크루 상세 경로에서만 상세 헤더를 표시한다.
  const crewDetailMatch = useMatch("/crews/:crewId");
  const isCrewDetail = Boolean(crewDetailMatch);

  const crew = CREWS.find(
    (item) => String(item.id) === crewDetailMatch?.params.crewId,
  );

  const showProfileButton = pathname === "/" || pathname === "/feed";

  const handleBack = () => {
    // 앱 안의 이전 기록이 있으면 뒤로, 직접 접속했다면 목록으로 이동한다.
    const historyIndex = window.history.state?.idx;

    if (typeof historyIndex === "number" && historyIndex > 0) {
      navigate(-1);
      return;
    }

    navigate("/crews", { replace: true });
  };

  return (
    <>
      <header
        className={cn(
          "bg-app-bg fixed inset-x-0 top-0 z-50 h-22 items-center px-6",
          isCrewDetail
            ? "grid grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] gap-3"
            : "flex justify-between",
        )}
      >
        {isCrewDetail ? (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="뒤로 가기"
              onClick={handleBack}
              className="bg-app-card hover:bg-app-text/10 focus-visible:ring-app-accent size-10 cursor-pointer rounded-full"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </Button>
            <p className="truncate text-center text-lg font-bold">
              {crew?.name ?? "크루 상세"}
            </p>
            <ThemeModeButton />
          </>
        ) : (
          <>
            <div>
              {showProfileButton && <ProfileButton />}
              {pathname === "/crews" && (
                <h1 className="text-lg font-bold">크루</h1>
              )}
            </div>
            <ThemeModeButton />
          </>
        )}
      </header>
      <main className="min-h-dvh px-6 pt-24 pb-[calc(6rem+env(safe-area-inset-bottom))]">
        <Outlet />
      </main>
      <BottomNavigation />
    </>
  );
}
