/**
 * 홈 헤더에서 프로필 화면으로 이동하는 아이콘 버튼을 표시한다.
 */
import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfileButton() {
  return (
    <Button
      asChild
      size="icon"
      variant="ghost"
      aria-label="프로필"
      className="bg-app-card text-app-text hover:bg-app-card hover:text-app-text size-10 cursor-pointer rounded-full"
    >
      <Link to="/profile">
        <UserRound className="size-5" aria-hidden="true" />
      </Link>
    </Button>
  );
}
