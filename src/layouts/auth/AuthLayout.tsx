import { Outlet } from "react-router-dom";
import ThemeModeButton from "@/components/common/ThemeModeButton";

export default function AuthLayout() {
  return (
    <>
      <div className="fixed top-6 right-6 z-50">
        <ThemeModeButton />
      </div>
      <main className="min-h-dvh px-6 py-10">
        <div className="mx-auto w-full max-w-sm">
          <Outlet />
        </div>
      </main>
    </>
  );
}
