import { Link } from "react-router-dom";
import { CREWS } from "@/data/crews";
import ViewMoreButton from "@/components/common/ViewMoreButton";

const MY_CREWS = CREWS.filter((crew) => crew.isJoined);

export default function MyCrews() {
  return (
    <section aria-labelledby="my-crews-title" className="mt-8">
      <div className="flex items-center justify-between gap-3">
        <h2 id="my-crews-title" className="text-lg font-bold">
          내 크루
        </h2>
        <ViewMoreButton to="/crews#joined-crews">전체 보기</ViewMoreButton>
      </div>
      <ul className="mt-4 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3">
        {MY_CREWS.slice(0, 3).map((crew) => (
          <li key={crew.id} className="w-28 shrink-0 md:w-auto">
            <Link
              to={`/crews/${crew.id}`}
              className="bg-app-card border-app-border hover:border-app-accent focus-visible:ring-app-accent flex h-full flex-col items-center rounded-2xl border px-3 py-4 text-center transition-colors focus-visible:ring-1 focus-visible:outline-none focus-visible:ring-inset"
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
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
