/**
 * 운영자 로그인을 확인하고 전용 헤더와 메뉴를 배치한다.
 */
import { useEffect, useState } from "react";
import { Flag, UsersRound } from "lucide-react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { hasAdminSession, logoutAdmin } from "@/lib/admin";
import AdminHeader from "./AdminHeader";

const ADMIN_NAV_ITEMS = [
  { to: "/admin", label: "회원 관리", icon: UsersRound, end: true },
  { to: "/admin/reports", label: "신고 관리", icon: Flag, end: false },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const isAuthenticated = hasAdminSession();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;

    // 운영자 레이아웃을 벗어나면 진입 전 테마를 복원한다.
    const root = document.documentElement;
    const previousIsDark = root.classList.contains("dark");

    root.classList.toggle("dark", isDark);

    return () => {
      root.classList.toggle("dark", previousIsDark);
    };
  }, [isAuthenticated, isDark]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleToggleTheme = () => {
    setIsDark((current) => !current);
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-dvh">
      <AdminHeader
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onLogout={handleLogout}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav aria-label="운영자 메뉴" className="border-app-border border-b">
          {ADMIN_NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className="text-app-subtext hover:text-app-text focus-visible:ring-app-accent aria-[current=page]:border-app-accent aria-[current=page]:text-app-text group -mb-px inline-flex min-h-12 items-center gap-2 border-b-2 border-transparent px-3 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
            >
              <Icon
                className="group-aria-[current=page]:text-app-accent size-4 shrink-0"
                aria-hidden="true"
              />
              {label}
            </NavLink>
          ))}
        </nav>

        <main className="py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
