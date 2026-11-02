/**
 * 가입한 크루의 러닝 일정을 구분·필터링하고 페이지별로 표시한다.
 */
import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Clock3, MapPin } from "lucide-react";
import ListPagination from "@/components/common/ListPagination";
import ViewMoreButton from "@/components/common/ViewMoreButton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CREWS, CREW_RUNS } from "@/data/crews";
import { runDateFormatter, timeFormatter } from "@/lib/date";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 5;
const JOINED_CREWS = CREWS.filter((crew) => crew.isJoined);

export default function RunningPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const listTitleRef = useRef<HTMLHeadingElement>(null);
  const status = searchParams.get("status") === "past" ? "past" : "upcoming";
  const selectedCrew = JOINED_CREWS.find(
    (crew) => String(crew.id) === searchParams.get("crewId"),
  );
  const selectedCrewId = selectedCrew ? String(selectedCrew.id) : "";
  const isUpcoming = status === "upcoming";
  const now = Date.now();

  // 가입한 크루의 일정을 선택 조건에 따라 필터링하고 시간순으로 정렬한다.
  const runs = CREW_RUNS.filter(
    (run) =>
      JOINED_CREWS.some((crew) => crew.id === run.crewId) &&
      (!selectedCrew || run.crewId === selectedCrew.id) &&
      new Date(run.startsAt).getTime() > now === isUpcoming,
  ).sort((a, b) => {
    const difference =
      new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime();
    return (isUpcoming ? difference : -difference) || a.id - b.id;
  });
  const totalPages = Math.ceil(runs.length / PAGE_SIZE);
  const requestedPage = Number(searchParams.get("page"));
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, Math.max(1, totalPages))
      : 1;
  const visibleRuns = runs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const previousViewRef = useRef({ status, selectedCrewId, page });

  useEffect(() => {
    // 잘못된 쿼리를 보정하고 기본 상태는 쿼리 생략으로 표현한다.
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("status");
    nextParams.delete("crewId");
    nextParams.delete("page");
    if (status === "past") nextParams.set("status", "past");
    if (selectedCrewId) nextParams.set("crewId", selectedCrewId);
    if (page > 1) nextParams.set("page", String(page));
    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [status, selectedCrewId, page, searchParams, setSearchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const previous = previousViewRef.current;
    // 필터 조작의 포커스는 유지하고 페이지 변경 시 목록 제목으로 이동한다.
    if (
      previous.status === status &&
      previous.selectedCrewId === selectedCrewId &&
      previous.page !== page
    ) {
      listTitleRef.current?.focus({ preventScroll: true });
      listTitleRef.current?.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    }
    previousViewRef.current = { status, selectedCrewId, page };
  }, [status, selectedCrewId, page]);

  const changeStatus = (nextStatus: "upcoming" | "past") => {
    if (nextStatus === status) return;
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("status");
    nextParams.delete("page");
    if (nextStatus === "past") nextParams.set("status", "past");
    setSearchParams(nextParams);
  };
  const changeCrew = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("crewId");
    nextParams.delete("page");
    if (value !== "all") nextParams.set("crewId", value);
    setSearchParams(nextParams);
  };
  const changePage = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("page");
    if (nextPage > 1) nextParams.set("page", String(nextPage));
    setSearchParams(nextParams);
  };
  const emptyMessage = isUpcoming
    ? selectedCrew
      ? "이 크루에 예정된 러닝이 없습니다."
      : "예정된 러닝이 없습니다."
    : "지난 러닝 일정이 없습니다.";

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">함께 달릴 일정을 확인해보세요</h1>
        <p className="text-app-subtext mt-3 text-sm">
          가입한 크루의 러닝을 모았어요
        </p>
      </header>
      {JOINED_CREWS.length === 0 ? (
        <section className="bg-app-card rounded-3xl px-5 py-12 text-center">
          <h2 className="text-lg font-bold">아직 가입한 크루가 없습니다.</h2>
          <p className="text-app-subtext mt-3 text-sm">
            함께 달릴 크루를 찾아보세요.
          </p>
          <Button asChild variant="link" className="text-app-accent mt-4">
            <Link to="/crews">크루 목록으로 이동</Link>
          </Button>
        </section>
      ) : (
        <>
          <div className="space-y-4">
            <div
              role="group"
              aria-label="러닝 일정 구분"
              className="bg-app-card grid grid-cols-2 gap-1 rounded-2xl p-1"
            >
              {(["upcoming", "past"] as const).map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant="ghost"
                  aria-pressed={status === value}
                  onClick={() => changeStatus(value)}
                  className={cn(
                    "focus-visible:ring-app-accent h-11 cursor-pointer rounded-xl",
                    status === value
                      ? "bg-app-accent text-app-bg hover:bg-app-accent/90 hover:text-app-bg"
                      : "text-app-subtext hover:bg-app-text/5 hover:text-app-text",
                  )}
                >
                  {value === "upcoming" ? "예정된 러닝" : "지난 러닝"}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <label
                htmlFor="running-crew"
                className="shrink-0 text-sm font-semibold"
              >
                가입한 크루
              </label>
              <Select
                value={selectedCrewId || "all"}
                onValueChange={changeCrew}
              >
                <SelectTrigger
                  id="running-crew"
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
                  {JOINED_CREWS.map((crew) => (
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
          </div>
          <section aria-labelledby="running-list-title">
            <div className="flex items-center justify-between gap-3">
              <h2
                id="running-list-title"
                ref={listTitleRef}
                tabIndex={-1}
                className="focus-visible:outline-app-accent scroll-mt-24 rounded text-lg font-bold focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {isUpcoming ? "예정된 러닝" : "지난 러닝"}
              </h2>
              <span role="status" className="text-app-subtext shrink-0 text-sm">
                <span className="sr-only">검색 결과 </span>
                {runs.length}개
              </span>
            </div>
            {runs.length === 0 ? (
              <p className="text-app-subtext bg-app-card mt-4 rounded-3xl px-5 py-12 text-center text-sm">
                {emptyMessage}
              </p>
            ) : (
              <ul className="mt-4 space-y-4">
                {visibleRuns.map((run) => {
                  const crew = JOINED_CREWS.find(
                    (item) => item.id === run.crewId,
                  );
                  if (!crew) return null;
                  return (
                    <li
                      key={run.id}
                      className="bg-app-card rounded-3xl p-5 md:p-6"
                    >
                      <article aria-labelledby={`running-${run.id}-title`}>
                        <p className="mb-4 flex items-start gap-2 text-sm font-semibold">
                          <span aria-hidden="true" className="shrink-0">
                            {crew.emoji}
                          </span>
                          <span className="min-w-0 break-words">
                            {crew.name}
                          </span>
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h3
                            id={`running-${run.id}-title`}
                            className="text-lg font-bold"
                          >
                            <time dateTime={run.startsAt}>
                              {runDateFormatter.format(new Date(run.startsAt))}
                            </time>
                          </h3>
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
                          <Clock3
                            className="size-4 shrink-0"
                            aria-hidden="true"
                          />
                          {timeFormatter.format(new Date(run.startsAt))}
                        </p>
                        <p className="text-app-subtext mt-2 flex items-start gap-2 text-sm">
                          <MapPin
                            className="size-4 shrink-0"
                            aria-hidden="true"
                          />
                          <span className="min-w-0 break-words">
                            {run.location}
                          </span>
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
                        <div className="border-app-border mt-4 border-t pt-4">
                          <ViewMoreButton
                            to={`/crews/${crew.id}/runs`}
                            aria-label={`${crew.name} 크루 일정 보기`}
                          >
                            크루 일정 보기
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
          </section>
        </>
      )}
    </div>
  );
}
