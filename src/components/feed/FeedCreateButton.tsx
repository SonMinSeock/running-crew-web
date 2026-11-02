/**
 * 피드 작성 화면으로 이동하는 고정 연필 버튼을 표시한다.
 */
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function FeedCreateButton() {
  return (
    <Button
      asChild
      size="icon"
      className="bg-app-accent hover:bg-app-accent/90 fixed right-6 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-40 size-14 cursor-pointer rounded-full text-white shadow-lg"
    >
      <Link to="/feed/new" aria-label="피드 작성">
        <Pencil className="size-6" aria-hidden="true" />
      </Link>
    </Button>
  );
}
