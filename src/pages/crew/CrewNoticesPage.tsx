/**
 * 크루의 공지사항을 최신순으로 정렬하고 페이지별로 표시한다.
 */
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ViewMoreButton from "@/components/common/ViewMoreButton";
import ListPagination from "@/components/common/ListPagination";
import { Button } from "@/components/ui/button";
import { CREWS, CREW_NOTICES, OWNED_CREW_SAMPLE_ID } from "@/data/crews";
import { dateFormatter } from "@/lib/date";

const PAGE_SIZE = 5;

export default function CrewNoticesPage() {
  const { crewId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const titleRef = useRef<HTMLHeadingElement>(null);

  const crew = CREWS.find((item) => String(item.id) === crewId);

  // 해당 크루의 공지를 최신순으로 정렬하고 같은 시각이면 ID순으로 배치한다.
  const notices = CREW_NOTICES.filter(
    (notice) => notice.crewId === crew?.id,
  ).sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() ||
      a.id - b.id,
  );

  const totalPages = Math.ceil(notices.length / PAGE_SIZE);
  const pageValue = searchParams.get("page");
  const requestedPage = Number(pageValue);
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, Math.max(1, totalPages))
      : 1;

  const visibleNotices = notices.slice(
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
    <section
      aria-labelledby="crew-notices-title"
      className={cn(crew.id === OWNED_CREW_SAMPLE_ID && "pb-16")}
    >
      <div className="flex items-center justify-between gap-3">
        <h1
          id="crew-notices-title"
          ref={titleRef}
          tabIndex={-1}
          className="focus-visible:outline-app-accent min-w-0 rounded text-lg font-bold break-words focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {crew.name} 공지사항
        </h1>
        <span className="text-app-subtext shrink-0 text-sm">
          {notices.length}개
        </span>
      </div>

      {notices.length === 0 ? (
        <p className="text-app-subtext bg-app-card mt-4 rounded-3xl px-5 py-12 text-center text-sm">
          등록된 공지가 없습니다.
        </p>
      ) : (
        <ul className="mt-4 space-y-4">
          {visibleNotices.map((notice) => (
            <li key={notice.id} className="bg-app-card rounded-3xl p-5 md:p-6">
              <article aria-labelledby={`notice-${notice.id}-title`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2
                    id={`notice-${notice.id}-title`}
                    className="min-w-0 text-base font-bold break-words"
                  >
                    {notice.title}
                  </h2>
                  <time
                    dateTime={notice.createdAt}
                    className="text-app-subtext shrink-0 text-xs"
                  >
                    {dateFormatter.format(new Date(notice.createdAt))}
                  </time>
                </div>
                <p className="text-app-subtext mt-3 text-sm leading-relaxed break-words whitespace-pre-wrap">
                  {notice.content}
                </p>
                <div className="border-app-border mt-4 border-t pt-4">
                  <ViewMoreButton
                    to={`/crews/${crew.id}/notices/${notice.id}`}
                    aria-label={`${notice.title} 공지 상세 보기`}
                  >
                    공지 상세 보기
                  </ViewMoreButton>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      <ListPagination
        page={page}
        totalPages={totalPages}
        label="공지사항 페이지"
        onPageChange={changePage}
      />
      {crew.id === OWNED_CREW_SAMPLE_ID && (
        <Button
          asChild
          size="icon"
          className="bg-app-accent hover:bg-app-accent/90 fixed right-6 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-40 size-14 cursor-pointer rounded-full text-white shadow-lg"
        >
          <Link to={`/crews/${crew.id}/notices/new`} aria-label="공지 작성">
            <Plus aria-hidden="true" className="size-6" />
          </Link>
        </Button>
      )}
    </section>
  );
}
