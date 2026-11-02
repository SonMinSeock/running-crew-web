import { ArrowLeft } from "lucide-react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import ProfileButton from "@/components/common/ProfileButton";
import ThemeModeButton from "@/components/common/ThemeModeButton";
import { Button } from "@/components/ui/button";
import { CREWS } from "@/data/crews";
import { cn } from "@/lib/utils";

export default function MainHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 생성 화면을 상세 경로와 구분하고 하위 화면에서 뒤로 버튼을 표시한다.
  const isCrewCreate = pathname === "/crews/new";
  const crewDetailMatch = useMatch("/crews/:crewId");
  const crewRunsMatch = useMatch("/crews/:crewId/runs");
  const crewNoticesMatch = useMatch("/crews/:crewId/notices");
  const crewActivitiesMatch = useMatch("/crews/:crewId/activities");
  const crewMembersMatch = useMatch("/crews/:crewId/members");

  const crewListMatch =
    crewRunsMatch ??
    crewNoticesMatch ??
    crewActivitiesMatch ??
    crewMembersMatch;
  const crewMatch = isCrewCreate ? null : (crewDetailMatch ?? crewListMatch);
  const isProfileEdit = pathname === "/profile/edit";
  const isFeedCreate = pathname === "/feed/new";
  const showBackButton =
    Boolean(crewMatch) || isProfileEdit || isFeedCreate || isCrewCreate;

  const crew = CREWS.find(
    (item) => String(item.id) === crewMatch?.params.crewId,
  );

  const headerTitle = isCrewCreate
    ? "크루 만들기"
    : isFeedCreate
      ? "피드 작성"
      : isProfileEdit
        ? "프로필 편집"
        : crewRunsMatch
          ? "러닝 일정"
          : crewNoticesMatch
            ? "공지사항"
            : crewActivitiesMatch
              ? "최근 활동"
              : crewMembersMatch
                ? "멤버"
                : (crew?.name ?? "크루 상세");

  const showProfileButton = pathname === "/";

  const handleBack = () => {
    // 이전 기록이 있으면 뒤로 이동하고 직접 접속했다면 상위 화면으로 이동한다.
    const historyIndex = window.history.state?.idx;

    if (typeof historyIndex === "number" && historyIndex > 0) {
      navigate(-1);
      return;
    }

    navigate(
      isFeedCreate
        ? "/feed"
        : isProfileEdit
          ? "/profile"
          : crewListMatch && crew
            ? `/crews/${crew.id}`
            : "/crews",
      {
        replace: true,
      },
    );
  };

  return (
    <header
      className={cn(
        "bg-app-bg fixed inset-x-0 top-0 z-50 h-22 items-center px-6",
        showBackButton
          ? "grid grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] gap-3"
          : "flex justify-between",
      )}
    >
      {showBackButton ? (
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
            {headerTitle}
          </p>
          <ThemeModeButton />
        </>
      ) : (
        <>
          <div>
            {showProfileButton && <ProfileButton />}
            {pathname === "/profile" && (
              <p className="text-lg font-bold">프로필</p>
            )}
            {pathname === "/feed" && <p className="text-lg font-bold">피드</p>}
            {pathname === "/running" && (
              <p className="text-lg font-bold">러닝</p>
            )}
            {pathname === "/crews" && (
              <h1 className="text-lg font-bold">크루</h1>
            )}
          </div>
          <ThemeModeButton />
        </>
      )}
    </header>
  );
}
