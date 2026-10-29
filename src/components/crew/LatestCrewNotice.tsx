import { ChevronRight, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CREW_NOTICES } from "@/data/crewNotices";

interface LatestCrewNoticeProps {
  crewId: number;
}

export default function LatestCrewNotice({ crewId }: LatestCrewNoticeProps) {
  // 해당 크루의 공지를 작성일 내림차순으로 정렬해 최신 공지를 선택한다.
  const latestNotice = CREW_NOTICES.filter(
    (notice) => notice.crewId === crewId,
  ).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )[0];

  return (
    <section
      aria-labelledby="crew-notice-title"
      className="bg-app-card rounded-3xl p-5 md:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="crew-notice-title"
          className="flex items-center gap-2 text-base font-bold"
        >
          <Megaphone className="text-app-accent size-4" aria-hidden="true" />
          공지사항
        </h2>
        <Button
          type="button"
          variant="link"
          disabled
          className="text-app-accent h-auto cursor-pointer p-0 text-sm font-semibold"
          aria-label="공지사항 전체 보기, 준비 중"
        >
          전체 보기
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
      {latestNotice ? (
        <>
          {/* 공지 상세 연결 전까지 일반 콘텐츠로 표시한다. */}
          <article className="bg-app-text/5 mt-4 rounded-2xl p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="min-w-0 text-base font-bold break-words">
                {latestNotice.title}
              </h3>

              <time
                dateTime={latestNotice.createdAt}
                className="text-app-subtext shrink-0 text-xs"
              >
                {new Intl.DateTimeFormat("ko-KR", {
                  timeZone: "Asia/Seoul",
                  month: "long",
                  day: "numeric",
                }).format(new Date(latestNotice.createdAt))}
              </time>
            </div>
            <p className="text-app-subtext mt-3 line-clamp-2 text-sm leading-relaxed break-words">
              {latestNotice.content}
            </p>
          </article>
          <p className="text-app-subtext mt-2 text-xs">
            공지 상세 및 전체 보기 기능은 준비 중입니다.
          </p>
        </>
      ) : (
        <p className="text-app-subtext py-8 text-center text-sm">
          등록된 공지가 없습니다.
        </p>
      )}
    </section>
  );
}
