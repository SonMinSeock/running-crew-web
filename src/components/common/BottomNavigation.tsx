import {
  Activity,
  House,
  MessageCircle,
  UserRound,
  UsersRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  { label: "홈", icon: House, to: "/" },
  { label: "크루", icon: UsersRound, to: "/crews" },
  { label: "러닝", icon: Activity, to: "/running" },
  { label: "피드", icon: MessageCircle, to: "/feed" },
  { label: "프로필", icon: UserRound, to: "/profile" },
];

export default function BottomNavigation() {
  return (
    <nav
      aria-label="주요 메뉴"
      className="bg-app-card border-app-border fixed inset-x-0 bottom-0 z-40 border-t pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5">
        {MENU_ITEMS.map(({ label, icon: Icon, to }) => (
          <li key={to} className="flex h-16 items-center justify-center">
            <NavLink
              to={to}
              end
              className={({ isActive }) =>
                cn(
                  "focus-visible:outline-app-accent inline-flex flex-col items-center gap-1 rounded-sm text-xs focus-visible:outline-2 focus-visible:outline-offset-4",
                  isActive
                    ? "text-app-accent"
                    : "text-app-subtext hover:text-app-accent",
                )
              }
            >
              <Icon className="size-5" aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
