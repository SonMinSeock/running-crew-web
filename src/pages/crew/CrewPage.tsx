import RecommendedCrews from "@/components/common/RecommendedCrews";
import SearchInput from "@/components/common/SearchInput";
import JoinedCrews from "@/components/crew/JoinedCrews";

export default function CrewPage() {
  return (
    <>
      <SearchInput
        id="crew-search"
        name="crew-search"
        label="크루명, 지역, 거리로 검색"
        placeholder="크루명, 지역, 거리로 검색"
      />
      <JoinedCrews />
      <RecommendedCrews variant="crew" />
    </>
  );
}
