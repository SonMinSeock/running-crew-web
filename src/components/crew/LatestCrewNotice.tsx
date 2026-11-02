/**
 * 크루의 최신 공지 미리보기와 전체 공지 이동 링크를 표시한다.
 */
import { Megaphone } from "lucide-react";
import ViewMoreButton from "@/components/common/ViewMoreButton";
import { CREW_NOTICES } from "@/data/crews";
import { dateFormatter } from "@/lib/date";

interface LatestCrewNoticeProps {
  crewId: number;
}

export default function LatestCrewNotice({ crewId }: LatestCrewNoticeProps) {
  // 해당 크루의 공지를 작성일 내림차순으로 정렬해 최신 공지를 선택한다.
  const latestNotice = CREW_NOTICES.filter(
    (notice) => notice.crewId === crewId,
  ).sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() ||
      a.id - b.id,
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
        <ViewMoreButton
          to={`/crews/${crewId}/notices`}
          aria-label="공지사항 전체 보기"
        >
          전체 보기
        </ViewMoreButton>
      </div>
      {latestNotice ? (
        <>
          {/* 기존 미리보기를 유지하고 별도 링크로 상세 화면에 연결한다. */}
          <article className="bg-app-text/5 mt-4 rounded-2xl p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="min-w-0 text-base font-bold break-words">
                {latestNotice.title}
              </h3>

              <time
                dateTime={latestNotice.createdAt}
                className="text-app-subtext shrink-0 text-xs"
              >
                {dateFormatter.format(new Date(latestNotice.createdAt))}
              </time>
            </div>
            <p className="text-app-subtext mt-3 line-clamp-2 text-sm leading-relaxed break-words">
              {latestNotice.content}
            </p>
            <div className="mt-4">
              <ViewMoreButton
                to={`/crews/${crewId}/notices/${latestNotice.id}`}
                aria-label={`${latestNotice.title} 공지 상세 보기`}
              >
                공지 상세 보기
              </ViewMoreButton>
            </div>
          </article>
        </>
      ) : (
        <p className="text-app-subtext py-8 text-center text-sm">
          등록된 공지가 없습니다.
        </p>
      )}
    </section>
  );
}
