import { ChevronRight, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CREW_MEMBERS } from "@/data/crewMembers";

interface CrewMembersProps {
  crewId: number;
  memberCount: number;
}

export default function CrewMembers({ crewId, memberCount }: CrewMembersProps) {
  // 크루장을 먼저 배치하고 같은 역할의 멤버는 가입순으로 정렬한다.
  const members = CREW_MEMBERS.filter((member) => member.crewId === crewId)
    .sort(
      (a, b) =>
        Number(b.isLeader) - Number(a.isLeader) ||
        new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime(),
    )
    .slice(0, 5);

  return (
    <section
      aria-labelledby="crew-members-title"
      className="bg-app-card rounded-3xl p-5 md:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="crew-members-title"
          className="flex items-center gap-2 text-base font-bold"
        >
          <UsersRound className="text-app-accent size-4" aria-hidden="true" />
          멤버
          <span className="text-app-accent">
            {memberCount}
            <span className="sr-only">명</span>
          </span>
        </h2>
        <Button
          type="button"
          variant="link"
          disabled
          className="text-app-accent h-auto cursor-pointer p-0 text-sm font-semibold"
          aria-label="멤버 전체 보기, 준비 중"
        >
          전체 보기
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
      {members.length > 0 ? (
        <>
          <ul className="mt-4 space-y-4">
            {members.map((member) => (
              <li key={member.id} className="flex items-center gap-3">
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
          <p className="text-app-subtext mt-4 text-xs">
            크루 가입 후 누적 거리 기준입니다. 멤버 전체 보기는 준비 중입니다.
          </p>
        </>
      ) : (
        <p className="text-app-subtext py-8 text-center text-sm">
          {memberCount === 0
            ? "멤버가 없습니다."
            : "멤버 미리보기 데이터가 준비되지 않았습니다."}
        </p>
      )}
    </section>
  );
}
