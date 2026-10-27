import { UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfileButton() {
  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      aria-label="프로필"
      className="bg-app-card text-app-text hover:bg-app-card hover:text-app-text size-10 cursor-pointer rounded-full"
    >
      <UserRound className="size-5" aria-hidden="true" />
    </Button>
  );
}
