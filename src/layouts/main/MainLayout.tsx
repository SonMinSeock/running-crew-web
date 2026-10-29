import { Outlet } from "react-router-dom";
import BottomNavigation from "@/components/common/BottomNavigation";
import MainHeader from "./MainHeader";

export default function MainLayout() {
  return (
    <>
      <MainHeader />
      <main className="min-h-dvh px-6 pt-24 pb-[calc(6rem+env(safe-area-inset-bottom))]">
        <Outlet />
      </main>
      <BottomNavigation />
    </>
  );
}
