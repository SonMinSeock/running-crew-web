import RecommendedCrews from "@/components/common/RecommendedCrews";
import SearchInput from "@/components/common/SearchInput";
import JoinedCrews from "@/components/crew/JoinedCrews";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CrewPage() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    document.getElementById(hash.slice(1))?.scrollIntoView({
      behavior: "instant",
      block: "start",
    });
  }, [hash, key]);

  return (
    <div className="pb-16">
      <SearchInput
        id="crew-search"
        name="crew-search"
        label="크루명, 지역, 거리로 검색"
        placeholder="크루명, 지역, 거리로 검색"
      />
      <JoinedCrews />
      <RecommendedCrews variant="crew" />
      <Button
        type="button"
        size="icon"
        aria-label="크루 생성"
        className="bg-app-accent hover:bg-app-accent/90 fixed right-6 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-40 size-14 cursor-pointer rounded-full text-white shadow-lg"
      >
        <Plus className="size-6" aria-hidden="true" />
      </Button>
    </div>
  );
}
