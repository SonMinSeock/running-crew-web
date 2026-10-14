import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="min-h-dvh px-6 py-10">
      <div className="mx-auto w-full max-w-sm">
        <Outlet />
      </div>
    </main>
  );
}
