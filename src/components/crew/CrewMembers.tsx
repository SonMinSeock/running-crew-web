/**
 * 크루 멤버 미리보기와 프로필·전체 목록 이동 링크를 표시한다.
 */
import { UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import ViewMoreButton from "@/components/common/ViewMoreButton";
import { CREW_MEMBERS } from "@/data/crews";

interface CrewMembersProps {
  crewId: number;
  memberCount: number;
}

export default function CrewMembers({ crewId, memberCount }: CrewMembersProps) {
  // 크루장을 먼저 표시하고 가입일과 ID 오름차순으로 정렬한다.
  const members = CREW_MEMBERS.filter((member) => member.crewId === crewId)
    .sort(
      (a, b) =>
        Number(b.isLeader) - Number(a.isLeader) ||
        new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime() ||
        a.id - b.id,
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
        <ViewMoreButton
          to={`/crews/${crewId}/members`}
          aria-label="멤버 전체 보기"
        >
          전체 보기
        </ViewMoreButton>
      </div>

      {members.length > 0 ? (
        <>
          <ul className="mt-3">
            {members.map((member) => (
              <li key={member.id}>
                <Link
                  to={`/profile?memberId=${member.id}`}
                  aria-label={`${member.nickname} 프로필 보기`}
                  aria-describedby={
                    member.isLeader
                      ? `member-preview-role-${member.id} member-preview-distance-${member.id}`
                      : `member-preview-distance-${member.id}`
                  }
                  className="hover:bg-app-text/5 focus-visible:outline-app-accent -mx-3 flex items-center gap-3 rounded-xl px-3 py-2 focus-visible:outline-2 focus-visible:-outline-offset-2"
                >
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
                      <span
                        id={`member-preview-role-${member.id}`}
                        className="bg-app-accent/10 text-app-accent rounded px-2 py-1 text-xs font-semibold"
                      >
                        크루장
                      </span>
                    )}
                  </div>
                  <p
                    id={`member-preview-distance-${member.id}`}
                    className="text-app-subtext shrink-0 text-sm"
                  >
                    <span className="sr-only">크루 가입 후 누적 거리 </span>
                    {member.distanceKm}km
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-app-subtext mt-4 text-xs">
            크루 가입 후 누적 거리 기준입니다.
          </p>
        </>
      ) : (
        <p className="text-app-subtext py-8 text-center text-sm">
          멤버가 없습니다.
        </p>
      )}
    </section>
  );
}
