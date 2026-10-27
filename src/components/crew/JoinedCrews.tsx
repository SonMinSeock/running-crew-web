import { CalendarDays, ChevronRight, MapPin, UsersRound } from "lucide-react";

interface JoinedCrew {
  id: number;
  emoji: string;
  name: string;
  memberCount: number;
  region: string;
  nextRun: string; // 다음 러닝, ex) 10월 29일 (목) 오전 6:00
}

const JOINED_CREWS: JoinedCrew[] = [
  {
    id: 1,
    emoji: "🌙",
    name: "새벽 러너스",
    memberCount: 24,
    region: "여의도",
    nextRun: "10월 29일 (목) 오전 6:00",
  },
  {
    id: 2,
    emoji: "🌊",
    name: "한강 크루",
    memberCount: 18,
    region: "한강",
    nextRun: "11월 1일 (일) 오전 7:30",
  },
  {
    id: 3,
    emoji: "⛰️",
    name: "주말 러닝",
    memberCount: 32,
    region: "잠실",
    nextRun: "11월 1일 (일) 오전 8:00",
  },
];

export default function JoinedCrews() {
  return (
    <section aria-labelledby="joined-crews-title" className="mt-8">
      <div className="flex items-center justify-between gap-3">
        <h2 id="joined-crews-title" className="text-lg font-bold">
          내가 가입한 크루
        </h2>
        <span className="text-app-subtext text-sm">
          {JOINED_CREWS.length}개
        </span>
      </div>
      <ul className="mt-4 space-y-3">
        {JOINED_CREWS.map((crew) => (
          <li
            key={crew.id}
            className="bg-app-card border-app-border hover:border-app-accent flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-colors"
          >
            <div
              className="bg-app-text/5 flex size-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
              aria-hidden="true"
            >
              {crew.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold">{crew.name}</h3>

              <p className="text-app-subtext mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                <span className="inline-flex items-center gap-1">
                  <UsersRound className="size-3.5" aria-hidden="true" />
                  {crew.memberCount}명
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {crew.region}
                </span>
              </p>
              <p className="text-app-accent mt-2 flex items-start gap-1 text-xs font-semibold">
                <CalendarDays
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>다음 러닝 {crew.nextRun}</span>
              </p>
            </div>
            <ChevronRight
              className="text-app-subtext size-5 shrink-0"
              aria-hidden="true"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
