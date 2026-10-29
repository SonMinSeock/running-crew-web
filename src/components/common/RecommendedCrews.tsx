import { ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ListPagination from "@/components/common/ListPagination";
import { Link } from "react-router-dom";
import { CREWS } from "@/data/crews";

const RECOMMENDED_CREWS = CREWS.filter((crew) => !crew.isJoined);

const PAGE_SIZE = 5;
interface RecommendedCrewsProps {
  variant?: "home" | "crew";
}

export default function RecommendedCrews({
  variant = "home",
}: RecommendedCrewsProps) {
  const [page, setPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  const totalPages = Math.ceil(RECOMMENDED_CREWS.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;

  const visibleCrews =
    variant === "home"
      ? RECOMMENDED_CREWS.slice(0, 3)
      : RECOMMENDED_CREWS.slice(startIndex, startIndex + PAGE_SIZE);

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    sectionRef.current?.scrollIntoView({
      behavior: "instant",
      block: "start",
    });
  };

  return (
    <section
      id="recommended-crews"
      ref={sectionRef}
      aria-labelledby="recommended-crews-title"
      className="mt-8 scroll-mt-24"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="recommended-crews-title" className="text-lg font-bold">
          추천 크루
        </h2>
        {variant === "crew" ? (
          <span className="text-app-subtext text-sm">
            {RECOMMENDED_CREWS.length}개
          </span>
        ) : (
          <Button
            asChild
            variant="link"
            className="text-app-accent h-auto cursor-pointer p-0 text-sm font-semibold"
          >
            <Link to="/crews#recommended-crews">
              전체 보기
              <ChevronRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        )}
      </div>
      <ul className="mt-4 space-y-3">
        {visibleCrews.map((crew) => (
          <li
            key={crew.id}
            className="bg-app-card border-app-border flex items-center gap-3 rounded-2xl border p-4 has-[a:focus-visible]:ring-1 has-[a:focus-visible]:ring-app-accent has-[a:focus-visible]:ring-inset"
          >
            <Link
              to={`/crews/${crew.id}`}
              className="group flex min-w-0 flex-1 items-center gap-3 rounded-lg focus-visible:outline-none"
            >
              <div
                className="bg-app-text/5 flex size-11 shrink-0 items-center justify-center rounded-full text-2xl"
                aria-hidden="true"
              >
                {crew.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="group-hover:text-app-accent text-sm font-bold transition-colors">
                  {crew.name}
                </h3>
                <p className="text-app-subtext mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                  <span>{crew.memberCount}명</span>

                  {variant === "crew" && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{crew.region}</span>
                    </>
                  )}
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
            </Link>
            <Button
              type="button"
              disabled
              aria-label={`${crew.name} 참여, 준비 중`}
              className="bg-app-accent text-app-bg h-8 shrink-0 rounded-full px-4 text-sm font-bold"
            >
              참여
              <span className="sr-only"> 준비 중</span>
            </Button>
          </li>
        ))}
      </ul>
      {variant === "crew" && (
        <ListPagination
          page={page}
          totalPages={totalPages}
          label="추천 크루 페이지"
          onPageChange={changePage}
        />
      )}
    </section>
  );
}
