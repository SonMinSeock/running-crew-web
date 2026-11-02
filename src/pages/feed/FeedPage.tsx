/**
 * 가입한 크루의 러닝 활동을 필터링하고 페이지별 피드 화면을 구성한다.
 */
import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ListPagination from "@/components/common/ListPagination";
import FeedCreateButton from "@/components/feed/FeedCreateButton";
import FeedCrewFilter from "@/components/feed/FeedCrewFilter";
import FeedActivityCard from "@/components/feed/FeedActivityCard";
import { Button } from "@/components/ui/button";
import { CREWS, CREW_ACTIVITIES } from "@/data/crews";

const PAGE_SIZE = 5;
const JOINED_CREWS = CREWS.filter((crew) => crew.isJoined);

export default function FeedPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const listTitleRef = useRef<HTMLHeadingElement>(null);
  const selectedCrew = JOINED_CREWS.find(
    (crew) => String(crew.id) === searchParams.get("crewId"),
  );
  const selectedCrewId = selectedCrew ? String(selectedCrew.id) : "";

  // 가입한 크루의 활동을 최신순으로 정렬하고 같은 시각이면 ID순으로 배치한다.
  const activities = CREW_ACTIVITIES.filter(
    (activity) =>
      JOINED_CREWS.some((crew) => crew.id === activity.crewId) &&
      (!selectedCrew || activity.crewId === selectedCrew.id),
  ).sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() ||
      a.id - b.id,
  );
  const totalPages = Math.ceil(activities.length / PAGE_SIZE);
  const requestedPage = Number(searchParams.get("page"));
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, Math.max(1, totalPages))
      : 1;
  const visibleActivities = activities.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );
  const previousViewRef = useRef({ selectedCrewId, page });

  useEffect(() => {
    // 잘못된 쿼리를 보정하고 기본 상태는 쿼리 생략으로 표현한다.
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("crewId");
    nextParams.delete("page");
    if (selectedCrewId) nextParams.set("crewId", selectedCrewId);
    if (page > 1) nextParams.set("page", String(page));
    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [selectedCrewId, page, searchParams, setSearchParams]);

  useEffect(() => {
    // 페이지에 진입하면 화면 시작 위치를 표시한다.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const previous = previousViewRef.current;
    // 필터 조작의 포커스는 유지하고 페이지 변경 시 목록 제목으로 이동한다.
    if (previous.selectedCrewId === selectedCrewId && previous.page !== page) {
      listTitleRef.current?.focus({ preventScroll: true });
      listTitleRef.current?.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    }
    previousViewRef.current = { selectedCrewId, page };
  }, [selectedCrewId, page]);

  const changeCrew = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("crewId");
    nextParams.delete("page");
    if (value) nextParams.set("crewId", value);
    setSearchParams(nextParams);
  };
  const changePage = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("page");
    if (nextPage > 1) nextParams.set("page", String(nextPage));
    setSearchParams(nextParams);
  };

  return (
    <div className="space-y-6 pb-16">
      <header>
        <h1 className="text-2xl font-bold">크루의 러닝 소식을 만나보세요</h1>
        <p className="text-app-subtext mt-3 text-sm">
          함께 달리는 멤버들의 최근 활동
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
          <FeedCrewFilter
            crews={JOINED_CREWS}
            value={selectedCrewId}
            onValueChange={changeCrew}
          />
          <section aria-labelledby="feed-list-title">
            <div className="flex items-center justify-between gap-3">
              <h2
                id="feed-list-title"
                ref={listTitleRef}
                tabIndex={-1}
                className="focus-visible:outline-app-accent scroll-mt-24 rounded text-lg font-bold focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                최근 활동
              </h2>
              <span role="status" className="text-app-subtext shrink-0 text-sm">
                <span className="sr-only">검색 결과 </span>
                {activities.length}개
              </span>
            </div>
            {activities.length === 0 ? (
              <p className="text-app-subtext bg-app-card mt-4 rounded-3xl px-5 py-12 text-center text-sm">
                {selectedCrew
                  ? "이 크루에 등록된 러닝 활동이 없습니다."
                  : "아직 등록된 러닝 활동이 없습니다."}
              </p>
            ) : (
              <ul className="mt-4 space-y-4">
                {visibleActivities.map((activity) => {
                  const crew = JOINED_CREWS.find(
                    (item) => item.id === activity.crewId,
                  );
                  if (!crew) return null;
                  return (
                    <li key={activity.id}>
                      <FeedActivityCard activity={activity} crew={crew} />
                    </li>
                  );
                })}
              </ul>
            )}
            <ListPagination
              page={page}
              totalPages={totalPages}
              label="피드 페이지"
              onPageChange={changePage}
            />
          </section>
        </>
      )}
      <FeedCreateButton />
    </div>
  );
}
