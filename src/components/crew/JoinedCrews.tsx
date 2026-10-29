import { CalendarDays, ChevronRight, MapPin, UsersRound } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ListPagination from "@/components/common/ListPagination";
import { CREWS, CREW_RUNS } from "@/data/crews";
import { runDateTimeFormatter } from "@/lib/date";
import { getUpcomingCrewRuns } from "@/lib/crew";

const JOINED_CREWS = CREWS.filter((crew) => crew.isJoined);

const PAGE_SIZE = 5;

export default function JoinedCrews() {
  const [page, setPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  const totalPages = Math.ceil(JOINED_CREWS.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const visibleCrews = JOINED_CREWS.slice(startIndex, startIndex + PAGE_SIZE);

  // 예정된 일정을 가까운 순서로 가져온다.
  const upcomingRuns = getUpcomingCrewRuns(CREW_RUNS, Date.now());

  const changePage = (nextPage: number) => {
    setPage(nextPage);

    // 페이지 변경 후 해당 목록 시작 위치로 이동한다.
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
        {visibleCrews.map((crew) => {
          // 시간순으로 정렬된 일정에서 해당 크루의 첫 일정을 선택한다.
          const nextRun = upcomingRuns.find((run) => run.crewId === crew.id);

          const nextRunLabel = nextRun
            ? runDateTimeFormatter.format(new Date(nextRun.startsAt))
            : "예정된 러닝이 없습니다.";

          return (
            <li key={crew.id}>
              <Link
                to={`/crews/${crew.id}`}
                className="bg-app-card border-app-border hover:border-app-accent focus-visible:ring-app-accent flex items-center gap-4 rounded-2xl border p-4 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset"
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
                    <span>
                      {nextRun ? `다음 러닝 ${nextRunLabel}` : nextRunLabel}
                    </span>
                  </p>
                </div>
                <ChevronRight
                  className="text-app-subtext size-5 shrink-0"
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
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
