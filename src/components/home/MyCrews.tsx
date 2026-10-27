import { Button } from "@/components/ui/button";

interface Crew {
  id: number;
  emoji: string;
  name: string;
  memberCount: number;
}

const MY_CREWS: Crew[] = [
  {
    id: 1,
    emoji: "🌙",
    name: "새벽 러너스",
    memberCount: 24,
  },
  {
    id: 2,
    emoji: "🌊",
    name: "한강 크루",
    memberCount: 18,
  },
  {
    id: 3,
    emoji: "⛰️",
    name: "주말 러닝",
    memberCount: 32,
  },
];

export default function MyCrews() {
  return (
    <section aria-labelledby="my-crews-title" className="mt-8">
      <div className="flex items-center justify-between gap-3">
        <h2 id="my-crews-title" className="text-lg font-bold">
          내 크루
        </h2>
        <Button
          type="button"
          variant="link"
          className="text-app-accent h-auto cursor-pointer p-0 text-sm font-semibold"
        >
          전체 보기
        </Button>
      </div>
      <ul className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {MY_CREWS.map((crew) => (
          <li
            key={crew.id}
            className="bg-app-card border-app-border hover:border-app-accent flex w-28 shrink-0 cursor-pointer flex-col items-center rounded-2xl border px-3 py-4 text-center transition-colors"
          >
            <div
              className="bg-app-text/5 flex size-12 items-center justify-center rounded-full text-2xl"
              aria-hidden="true"
            >
              {crew.emoji}
            </div>
            <h3 className="mt-3 text-sm font-bold">{crew.name}</h3>
            <p className="text-app-subtext mt-1 text-xs">
              {crew.memberCount}명
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
