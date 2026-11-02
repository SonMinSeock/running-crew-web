/**
 * 공지 제목과 크루 정보·작성 시각·본문 전체를 표시한다.
 */
import { Megaphone } from "lucide-react";
import type { Crew, CrewNotice } from "@/data/crews";
import { noticeDateTimeFormatter } from "@/lib/date";

interface NoticeDetailContentProps {
  crew: Crew;
  notice: CrewNotice;
}

export default function NoticeDetailContent({
  crew,
  notice,
}: NoticeDetailContentProps) {
  return (
    <article
      aria-labelledby="notice-detail-title"
      className="bg-app-card rounded-3xl p-5 md:p-6"
    >
      <p className="text-app-accent flex items-center gap-2 text-sm font-semibold">
        <Megaphone aria-hidden="true" className="size-4" />
        공지사항
      </p>
      <h1
        id="notice-detail-title"
        className="mt-4 text-2xl font-bold break-words"
      >
        {notice.title}
      </h1>
      <div className="text-app-subtext mt-4 space-y-2 text-sm">
        <p className="flex items-start gap-2">
          <span aria-hidden="true" className="shrink-0">
            {crew.emoji}
          </span>
          <span className="min-w-0 break-words">{crew.name}</span>
        </p>
        <time dateTime={notice.createdAt} className="block">
          {noticeDateTimeFormatter.format(new Date(notice.createdAt))}
        </time>
      </div>
      <p className="text-app-subtext border-app-border mt-5 border-t pt-5 text-base leading-relaxed break-words whitespace-pre-wrap">
        {notice.content}
      </p>
    </article>
  );
}
