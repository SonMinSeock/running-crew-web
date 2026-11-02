/**
 * 크루장을 우선으로 멤버를 가입순 정렬하고 페이지별로 표시한다.
 */
import { useEffect, useRef } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ListPagination from "@/components/common/ListPagination";
import { Button } from "@/components/ui/button";
import { CREWS, CREW_MEMBERS } from "@/data/crews";

const PAGE_SIZE = 5;

export default function CrewMembersPage() {
  const { crewId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const titleRef = useRef<HTMLHeadingElement>(null);

  const crew = CREWS.find((item) => String(item.id) === crewId);

  // 크루장을 먼저 표시하고 가입일과 ID 오름차순으로 정렬한다.
  const members = CREW_MEMBERS.filter(
    (member) => member.crewId === crew?.id,
  ).sort(
    (a, b) =>
      Number(b.isLeader) - Number(a.isLeader) ||
      new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime() ||
      a.id - b.id,
  );

  const totalPages = Math.ceil(members.length / PAGE_SIZE);
  const pageValue = searchParams.get("page");
  const requestedPage = Number(pageValue);
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, Math.max(1, totalPages))
      : 1;

  const visibleMembers = members.slice(
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
    <section aria-labelledby="crew-members-title">
      <div className="flex items-center justify-between gap-3">
        <h1
          id="crew-members-title"
          ref={titleRef}
          tabIndex={-1}
          className="focus-visible:outline-app-accent min-w-0 rounded text-lg font-bold break-words focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {crew.name} 멤버
        </h1>
        <span className="text-app-subtext shrink-0 text-sm">
          {members.length}명
        </span>
      </div>

      <p className="text-app-subtext mt-2 text-xs">
        크루 가입 후 누적 거리 기준입니다.
      </p>

      {members.length === 0 ? (
        <p className="text-app-subtext bg-app-card mt-4 rounded-3xl px-5 py-12 text-center text-sm">
          멤버가 없습니다.
        </p>
      ) : (
        <div className="bg-app-card mt-4 rounded-3xl p-5 md:p-6">
          <ul className="divide-app-border divide-y">
            {visibleMembers.map((member) => (
              <li key={member.id} className="flex items-center gap-3 py-4">
                <div
                  aria-hidden="true"
                  className="bg-app-text/5 flex size-10 shrink-0 items-center justify-center rounded-full text-xl"
                >
                  {member.emoji}
                </div>

                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                  <p className="text-sm font-bold break-words">
                    {member.nickname}
                  </p>
                  {member.isLeader && (
                    <span className="bg-app-accent/10 text-app-accent rounded px-2 py-1 text-xs font-semibold">
                      크루장
                    </span>
                  )}
                </div>

                <p className="text-app-subtext shrink-0 text-sm">
                  <span className="sr-only">크루 가입 후 누적 거리 </span>
                  {member.distanceKm}km
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ListPagination
        page={page}
        totalPages={totalPages}
        label="멤버 페이지"
        onPageChange={changePage}
      />
    </section>
  );
}
