// 오늘의 러닝 일정 카드
import { CalendarDays, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TodayRunCard() {
  return (
    <section aria-labelledby="today-run-title" className="mt-8">
      <h2 id="today-run-title" className="text-lg font-bold">
        오늘의 러닝 일정
      </h2>
      <article className="bg-app-card mt-4 rounded-3xl p-5">
        <div className="flex items-center gap-3">
          <div
            className="bg-app-text/5 flex size-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
            aria-hidden="true"
          >
            🌙
          </div>
          <div>
            <h3 className="text-base font-bold">새벽 러너스</h3>
            <p className="text-app-accent mt-1 flex items-center gap-1.5 text-sm font-semibold">
              <CalendarDays className="size-4" aria-hidden="true" />
              오늘 오전 6:00
            </p>
          </div>
        </div>
        <dl className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="bg-app-text/5 rounded-2xl p-3">
            <dt className="text-app-subtext text-xs">장소</dt>
            <dd className="mt-1 text-sm font-bold">여의도 한강공원</dd>
          </div>
          <div className="bg-app-text/5 rounded-2xl p-3">
            <dt className="text-app-subtext text-xs">거리</dt>
            <dd className="mt-1 text-sm font-bold">5km</dd>
          </div>
          <div className="bg-app-text/5 rounded-2xl p-3">
            <dt className="text-app-subtext text-xs">난이도</dt>
            <dd className="text-app-accent mt-1 text-sm font-bold">초급</dd>
          </div>
        </dl>
        <p className="text-app-subtext mt-4 flex items-center gap-1.5 text-sm">
          <UsersRound className="size-4" aria-hidden="true" />
          참여 예정
          <span className="text-app-accent font-bold">14명</span>
        </p>
        <Button
          type="button"
          className="bg-app-accent text-app-bg hover:bg-app-accent/90 mt-5 h-12 w-full cursor-pointer rounded-2xl text-base font-bold"
        >
          참여 확인
        </Button>
      </article>
    </section>
  );
}
