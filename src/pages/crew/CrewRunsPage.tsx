/**
 * 크루의 예정·지난 러닝 일정을 정렬하고 페이지별로 표시한다.
 */
import { useEffect, useRef } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Clock3, MapPin, Plus } from "lucide-react";
import ListPagination from "@/components/common/ListPagination";
import ViewMoreButton from "@/components/common/ViewMoreButton";
import RunParticipationButton from "@/components/common/RunParticipationButton";
import { Button } from "@/components/ui/button";
import { CREWS, CREW_RUNS } from "@/data/crews";
import { runDateFormatter, timeFormatter } from "@/lib/date";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 5;

export default function CrewRunsPage() {
  const { crewId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const crew = CREWS.find((item) => String(item.id) === crewId);
  const now = Date.now();

  // 예정 일정은 가까운 순으로, 지난 일정은 최근 순으로 배치한다.
  const runs = CREW_RUNS.filter((run) => run.crewId === crew?.id).sort(
    (a, b) => {
      const aTime = new Date(a.startsAt).getTime();
      const bTime = new Date(b.startsAt).getTime();
      const aUpcoming = aTime > now;
      const bUpcoming = bTime > now;

      if (aUpcoming !== bUpcoming) return aUpcoming ? -1 : 1;
      return (aUpcoming ? aTime - bTime : bTime - aTime) || a.id - b.id;
    },
  );

  const totalPages = Math.ceil(runs.length / PAGE_SIZE);
  const pageValue = searchParams.get("page");
  const requestedPage = Number(pageValue);
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, Math.max(1, totalPages))
      : 1;
  const visibleRuns = runs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (!crew || pageValue === null) return;
    if (pageValue === String(page) && searchParams.getAll("page").length === 1)
      return;

    // 잘못된 페이지 값을 보정하고 중복 쿼리를 정리한다.
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", String(page));
    setSearchParams(nextParams, { replace: true });
  }, [crew, page, pageValue, searchParams, setSearchParams]);

  useEffect(() => {
    // 진입과 페이지 변경 시 제목으로 이동해 새 목록을 확인할 수 있게 한다.
    titleRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [crewId, page]);

  const changePage = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", String(nextPage));
    setSearchParams(nextParams);
  };

  if (!crew) {
    return (
      <section className="py-12 text-center">
        <h1 ref={titleRef} tabIndex={-1} className="text-xl font-bold">
          크루를 찾을 수 없습니다.
        </h1>
        <p className="text-app-subtext mt-3 text-sm">
          크루 목록에서 다른 크루를 확인해주세요.
        </p>
        <Button asChild variant="link" className="text-app-accent mt-4">
          <Link to="/crews">크루 목록으로 이동</Link>
        </Button>
      </section>
    );
  }

  return (
    <section aria-labelledby="crew-runs-title" className="pb-16">
      <div className="flex items-center justify-between gap-3">
        <h1
          id="crew-runs-title"
          ref={titleRef}
          tabIndex={-1}
          className="focus-visible:outline-app-accent min-w-0 rounded text-lg font-bold break-words focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {crew.name} 러닝 일정
        </h1>
        <span className="text-app-subtext shrink-0 text-sm">
          {runs.length}개
        </span>
      </div>
      {runs.length === 0 ? (
        <p className="text-app-subtext bg-app-card mt-4 rounded-3xl px-5 py-12 text-center text-sm">
          등록된 러닝 일정이 없습니다.
        </p>
      ) : (
        <ul className="mt-4 space-y-4">
          {visibleRuns.map((run) => {
            const isUpcoming = new Date(run.startsAt).getTime() > now;

            return (
              <li key={run.id} className="bg-app-card rounded-3xl p-5 md:p-6">
                <article aria-labelledby={`run-${run.id}-title`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2
                      id={`run-${run.id}-title`}
                      className="text-lg font-bold"
                    >
                      <time dateTime={run.startsAt}>
                        {runDateFormatter.format(new Date(run.startsAt))}
                      </time>
                    </h2>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-semibold",
                        isUpcoming
                          ? "bg-app-accent/10 text-app-accent"
                          : "bg-app-text/5 text-app-subtext",
                      )}
                    >
                      {isUpcoming ? "예정" : "종료"}
                    </span>
                  </div>
                  <p className="text-app-subtext mt-3 flex items-center gap-2 text-sm">
                    <Clock3 className="size-4 shrink-0" aria-hidden="true" />
                    {timeFormatter.format(new Date(run.startsAt))}
                  </p>
                  <p className="text-app-subtext mt-2 flex items-start gap-2 text-sm">
                    <MapPin className="size-4 shrink-0" aria-hidden="true" />
                    <span className="min-w-0 break-words">{run.location}</span>
                  </p>
                  <p className="text-app-subtext mt-3 flex flex-wrap items-center gap-2 text-sm">
                    <span>{run.distanceKm}km</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={cn(
                        "font-semibold",
                        run.difficulty === "초급" && "text-app-accent",
                        run.difficulty === "중급" && "text-amber-500",
                        run.difficulty === "고급" && "text-app-error",
                      )}
                    >
                      {run.difficulty}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {isUpcoming ? "참여 예정" : "참여 인원"}{" "}
                      {run.participantCount}명
                    </span>
                  </p>
                  {isUpcoming && (
                    <>
                      <RunParticipationButton
                        disabled
                        className="mt-5"
                        aria-describedby={`run-${run.id}-description`}
                      >
                        참여 신청
                      </RunParticipationButton>
                      <p
                        id={`run-${run.id}-description`}
                        className="text-app-subtext mt-2 text-xs"
                      >
                        참여 신청 기능은 준비 중입니다.
                      </p>
                    </>
                  )}
                  <div className="border-app-border mt-4 border-t pt-4">
                    <ViewMoreButton
                      to={`/crews/${crew.id}/runs/${run.id}`}
                      aria-label={`${run.title} 일정 상세 보기`}
                    >
                      일정 상세 보기
                    </ViewMoreButton>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
      <ListPagination
        page={page}
        totalPages={totalPages}
        label="러닝 일정 페이지"
        onPageChange={changePage}
      />
      <Button
        asChild
        size="icon"
        className="bg-app-accent hover:bg-app-accent/90 fixed right-6 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-40 size-14 cursor-pointer rounded-full text-white shadow-lg"
      >
        <Link to={`/crews/${crew.id}/runs/new`} aria-label="러닝 일정 만들기">
          <Plus className="size-6" aria-hidden="true" />
        </Link>
      </Button>
    </section>
  );
}
