import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RecommendedCrew {
  id: number;
  emoji: string;
  name: string;
  memberCount: number;
  distanceKm: number;
  difficulty: "초급" | "중급" | "고급";
}

const RECOMMENDED_CREWS: RecommendedCrew[] = [
  {
    id: 1,
    emoji: "🏙️",
    name: "강남 러닝클럽",
    memberCount: 45,
    distanceKm: 5,
    difficulty: "초급",
  },
  {
    id: 2,
    emoji: "🏃",
    name: "마라톤 준비반",
    memberCount: 28,
    distanceKm: 10,
    difficulty: "중급",
  },
  {
    id: 3,
    emoji: "🌙",
    name: "야간 러닝 크루",
    memberCount: 36,
    distanceKm: 7,
    difficulty: "고급",
  },
];

export default function RecommendedCrews() {
  return (
    <section aria-labelledby="recommended-crews-title" className="mt-8">
      <div className="flex items-center justify-between gap-3">
        <h2 id="recommended-crews-title" className="text-lg font-bold">
          추천 크루
        </h2>
        <Button
          type="button"
          variant="link"
          className="text-app-accent h-auto cursor-pointer p-0 text-sm font-semibold"
        >
          전체 보기
        </Button>
      </div>
      <ul className="mt-4 space-y-3">
        {RECOMMENDED_CREWS.map((crew) => (
          <li
            key={crew.id}
            className="bg-app-card border-app-border hover:border-app-accent flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-colors"
          >
            <div
              className="bg-app-text/5 flex size-11 shrink-0 items-center justify-center rounded-full text-2xl"
              aria-hidden="true"
            >
              {crew.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold">{crew.name}</h3>
              <p className="text-app-subtext mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                <span>{crew.memberCount}명</span>
                <span aria-hidden="true">·</span>
                <span>{crew.distanceKm}km</span>
                <span aria-hidden="true">·</span>
                <span
                  className={cn(
                    "font-semibold",
                    crew.difficulty === "초급" && "text-app-accent",
                    crew.difficulty === "중급" && "text-amber-500",
                    crew.difficulty === "고급" && "text-app-error",
                  )}
                >
                  {crew.difficulty}
                </span>
              </p>
            </div>
            <Button
              type="button"
              aria-label={`${crew.name} 참여`}
              className="bg-app-accent text-app-bg hover:bg-app-accent/90 h-8 shrink-0 cursor-pointer rounded-full px-4 text-sm font-bold"
            >
              참여
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
