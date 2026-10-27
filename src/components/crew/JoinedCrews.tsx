import { CalendarDays, ChevronRight, MapPin, UsersRound } from "lucide-react";
import { useRef, useState } from "react";
import ListPagination from "@/components/common/ListPagination";
interface JoinedCrew {
  id: number;
  emoji: string;
  name: string;
  memberCount: number;
  region: string;
  nextRun: string; // 다음 러닝, ex) 10월 29일 (목) 오전 6:00
}

const JOINED_CREWS: JoinedCrew[] = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  emoji: "🌙",
  name: `가입한 크루 ${index + 1}`,
  memberCount: 20 + index,
  region: "여의도",
  nextRun: "10월 29일 (목) 오전 6:00",
}));

const PAGE_SIZE = 5;

export default function JoinedCrews() {
  const [page, setPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  const totalPages = Math.ceil(JOINED_CREWS.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const visibleCrews = JOINED_CREWS.slice(startIndex, startIndex + PAGE_SIZE);

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    sectionRef.current?.scrollIntoView({
      behavior: "instant",
      block: "start",
    });
  };

  return (
    <section
      id="joined-crews"
      ref={sectionRef}
      aria-labelledby="joined-crews-title"
      className="mt-8 scroll-mt-24"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="joined-crews-title" className="text-lg font-bold">
          내가 가입한 크루
        </h2>
        <span className="text-app-subtext text-sm">
          {JOINED_CREWS.length}개
        </span>
      </div>
      <ul className="mt-4 space-y-3">
        {visibleCrews.map((crew) => (
          <li
            key={crew.id}
            className="bg-app-card border-app-border hover:border-app-accent flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-colors"
          >
            <div
              className="bg-app-text/5 flex size-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
              aria-hidden="true"
            >
              {crew.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold">{crew.name}</h3>

              <p className="text-app-subtext mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                <span className="inline-flex items-center gap-1">
                  <UsersRound className="size-3.5" aria-hidden="true" />
                  {crew.memberCount}명
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {crew.region}
                </span>
              </p>
              <p className="text-app-accent mt-2 flex items-start gap-1 text-xs font-semibold">
                <CalendarDays
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>다음 러닝 {crew.nextRun}</span>
              </p>
            </div>
            <ChevronRight
              className="text-app-subtext size-5 shrink-0"
              aria-hidden="true"
            />
          </li>
        ))}
      </ul>
      <ListPagination
        page={page}
        totalPages={totalPages}
        label="내가 가입한 크루 페이지"
        onPageChange={changePage}
      />
    </section>
  );
}
