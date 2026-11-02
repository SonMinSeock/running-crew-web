/**
 * 가입한 크루를 선택하는 피드 필터를 표시한다.
 */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Crew } from "@/data/crews";

interface FeedCrewFilterProps {
  crews: Crew[];
  value: string;
  onValueChange: (value: string) => void;
}

export default function FeedCrewFilter({
  crews,
  value,
  onValueChange,
}: FeedCrewFilterProps) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="feed-crew" className="shrink-0 text-sm font-semibold">
        가입한 크루
      </label>
      <Select
        value={value || "all"}
        onValueChange={(nextValue) =>
          onValueChange(nextValue === "all" ? "" : nextValue)
        }
      >
        <SelectTrigger
          id="feed-crew"
          className="bg-app-card border-app-border text-app-text focus-visible:border-app-accent focus-visible:ring-app-accent/40 h-11 min-w-0 flex-1 rounded-xl px-3 text-sm data-[size=default]:h-11"
        >
          <SelectValue placeholder="전체" />
        </SelectTrigger>
        <SelectContent className="bg-app-card border-app-border text-app-text">
          <SelectItem
            value="all"
            className="focus:bg-app-accent/10 focus:text-app-accent"
          >
            전체
          </SelectItem>
          {crews.map((crew) => (
            <SelectItem
              key={crew.id}
              value={String(crew.id)}
              className="focus:bg-app-accent/10 focus:text-app-accent"
            >
              {crew.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
