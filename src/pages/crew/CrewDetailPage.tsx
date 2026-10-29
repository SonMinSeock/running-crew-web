import { UsersRound } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CREWS } from "@/data/crews";
import NextCrewRun from "@/components/crew/NextCrewRun";
import LatestCrewNotice from "@/components/crew/LatestCrewNotice";
import RecentCrewActivities from "@/components/crew/RecentCrewActivities";
import CrewMembers from "@/components/crew/CrewMembers";

export default function CrewDetailPage() {
  const { crewId } = useParams();

  // URL의 ID에 해당하는 크루를 공통 데이터에서 찾느다.
  const crew = CREWS.find((item) => String(item.id) === crewId);

  // 잘못된 ID로 접속하면 상세 정보 대신 안내를 표시.
  if (!crew) {
    return (
      <section className="py-12 text-center">
        <h1 className="text-xl font-bold">크루를 찾을 수 없습니다.</h1>
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
    <div className="space-y-5">
      <section
        aria-labelledby="crew-info-title"
        className="bg-app-card rounded-3xl p-5 md:p-6"
      >
        <div className="flex items-center gap-4">
          <div
            aria-hidden="true"
            className="bg-app-text/5 flex size-16 shrink-0 items-center justify-center rounded-2xl text-3xl"
          >
            {crew.emoji}
          </div>
          <div className="min-w-0">
            <h1 id="crew-info-title" className="text-xl font-bold">
              {crew.name}
            </h1>
            <p className="text-app-subtext mt-2 flex flex-wrap items-center gap-2 text-sm">
              <UsersRound
                aria-hidden="true"
                className="text-app-accent size-4"
              />
              <span>{crew.memberCount}명</span>
              <span aria-hidden="true">·</span>
              <span>{crew.region}</span>
            </p>
          </div>
        </div>
        <p className="text-app-subtext mt-4 text-sm leading-relaxed">
          {crew.description}
        </p>
        {/*지금 작업에선 가입 상태를 표시하고 변경하지 않는다.*/}
        <div className="mt-4">
          {crew.isJoined ? (
            <span className="bg-app-accent/10 text-app-accent inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
              <span
                aria-hidden="true"
                className="bg-app-accent size-2 rounded-full"
              />
              멤버
            </span>
          ) : (
            <>
              <Button
                type="button"
                disabled
                className="bg-app-accent text-app-bg rounded-full font-bold"
                aria-describedby="crew-join-description"
              >
                크루 가입
              </Button>
              <p
                id="crew-join-description"
                className="text-app-subtext mt-2 text-xs"
              >
                크루 가입 기능은 준비 중입니다.
              </p>
            </>
          )}
        </div>
      </section>
      <NextCrewRun crewId={crew.id} />
      <LatestCrewNotice crewId={crew.id} />
      <RecentCrewActivities crewId={crew.id} />
      <CrewMembers crewId={crew.id} memberCount={crew.memberCount} />
    </div>
  );
}
