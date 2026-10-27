import { Outlet, useLocation } from "react-router-dom";
import BottomNavigation from "@/components/common/BottomNavigation";
import ProfileButton from "@/components/common/ProfileButton";
import ThemeModeButton from "@/components/common/ThemeModeButton";

export default function MainLayout() {
  const { pathname } = useLocation();
  const showProfileButton = pathname === "/" || pathname === "/feed";

  return (
    <>
      <header className="bg-app-bg fixed inset-x-0 top-0 z-50 flex h-22 items-center justify-between px-6">
        <div>{showProfileButton && <ProfileButton />}</div>
        <ThemeModeButton />
      </header>
      <main className="min-h-dvh px-6 pt-24 pb-[calc(6rem+env(safe-area-inset-bottom))]">
        <Outlet />
      </main>
      <BottomNavigation />
    </>
  );
}
