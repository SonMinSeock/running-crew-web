import { useEffect, useRef } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ListPagination from "@/components/common/ListPagination";
import { Button } from "@/components/ui/button";
import { CREWS, CREW_ACTIVITIES } from "@/data/crews";
import { dateFormatter } from "@/lib/date";

const PAGE_SIZE = 5;

export default function CrewActivitiesPage() {
  const { crewId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const titleRef = useRef<HTMLHeadingElement>(null);

  const crew = CREWS.find((item) => String(item.id) === crewId);

  // 해당 크루의 활동을 최신순으로 정렬하고 같은 시각이면 ID순으로 배치한다.
  const activities = CREW_ACTIVITIES.filter(
    (activity) => activity.crewId === crew?.id,
  ).sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() ||
      a.id - b.id,
  );

  const totalPages = Math.ceil(activities.length / PAGE_SIZE);
  const pageValue = searchParams.get("page");
  const requestedPage = Number(pageValue);
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, Math.max(1, totalPages))
      : 1;

  const visibleActivities = activities.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  useEffect(() => {
    if (!crew || pageValue === null) return;

    if (
      pageValue === String(page) &&
      searchParams.getAll("page").length === 1
    ) {
      return;
    }

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
        <h1
          ref={titleRef}
          tabIndex={-1}
          className="focus-visible:outline-app-accent rounded text-xl font-bold focus-visible:outline-2 focus-visible:outline-offset-4"
        >
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
    <section aria-labelledby="crew-activities-title">
      <div className="flex items-center justify-between gap-3">
        <h1
          id="crew-activities-title"
          ref={titleRef}
          tabIndex={-1}
          className="focus-visible:outline-app-accent min-w-0 rounded text-lg font-bold break-words focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {crew.name} 최근 활동
        </h1>
        <span className="text-app-subtext shrink-0 text-sm">
          {activities.length}개
        </span>
      </div>

      {activities.length === 0 ? (
        <p className="text-app-subtext bg-app-card mt-4 rounded-3xl px-5 py-12 text-center text-sm">
          최근 활동이 없습니다.
        </p>
      ) : (
        <div className="bg-app-card mt-4 rounded-3xl p-5 md:p-6">
          <ul className="divide-app-border divide-y">
            {visibleActivities.map((activity) => (
              <li key={activity.id} className="flex items-center gap-3 py-4">
                <div
                  aria-hidden="true"
                  className="bg-app-text/5 flex size-10 shrink-0 items-center justify-center rounded-full text-xl"
                >
                  {activity.emoji}
                </div>

                <p className="text-app-subtext min-w-0 flex-1 text-sm leading-relaxed break-words">
                  <span className="text-app-text font-bold">
                    {activity.nickname}
                  </span>
                  {" 님이 "}
                  <span className="text-app-accent font-bold">
                    {activity.distanceKm}km
                  </span>
                  {" 달렸어요"}
                </p>

                <time
                  dateTime={activity.createdAt}
                  className="text-app-subtext shrink-0 text-xs"
                >
                  {dateFormatter.format(new Date(activity.createdAt))}
                </time>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ListPagination
        page={page}
        totalPages={totalPages}
        label="최근 활동 페이지"
        onPageChange={changePage}
      />
    </section>
  );
}
