/**
 * 크루 기본 정보와 일정·공지·활동·멤버 미리보기를 구성한다.
 */
import { Pencil, UsersRound } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CREWS, OWNED_CREW_SAMPLE_ID } from "@/data/crews";
import NextCrewRun from "@/components/crew/NextCrewRun";
import LatestCrewNotice from "@/components/crew/LatestCrewNotice";
import RecentCrewActivities from "@/components/crew/RecentCrewActivities";
import CrewMembers from "@/components/crew/CrewMembers";
import CrewMembershipDialog from "@/components/crew/CrewMembershipDialog";
import { getCrewMembershipUiState } from "@/lib/crew";
import { cn } from "@/lib/utils";

export default function CrewDetailPage() {
  const { crewId } = useParams();

  // URL의 ID에 해당하는 크루를 공통 데이터에서 찾는다.
  const crew = CREWS.find((item) => String(item.id) === crewId);

  // 잘못된 ID로 접속하면 상세 정보 대신 안내를 표시한다.
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

  const membershipState = getCrewMembershipUiState(crew);
  const isMember = membershipState === "OWNED" || membershipState === "JOINED";
  const isPending = membershipState === "PENDING";

  return (
    <div className="space-y-5">
      <section
        aria-labelledby="crew-info-title"
        className="bg-app-card rounded-3xl p-5 md:p-6"
      >
        <div className="flex flex-wrap items-center gap-4">
          <div
            aria-hidden="true"
            className="bg-app-text/5 flex size-16 shrink-0 items-center justify-center rounded-2xl text-3xl"
          >
            {crew.emoji}
          </div>
          <div className="min-w-0 flex-1 basis-32">
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
          {crew.id === OWNED_CREW_SAMPLE_ID && (
            <Button
              asChild
              variant="ghost"
              className="bg-app-text/5 rounded-full"
            >
              <Link to={`/crews/${crew.id}/edit`}>
                <Pencil aria-hidden="true" className="size-4" />
                편집
              </Link>
            </Button>
          )}
        </div>
        <p className="text-app-subtext mt-4 text-sm leading-relaxed">
          {crew.description}
        </p>
        {/* 샘플 상태에 맞는 모달 진입만 제공하고 실제 가입 상태는 변경하지 않는다. */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {isMember ? (
            <>
              <span className="bg-app-accent/10 text-app-accent inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
                <span
                  aria-hidden="true"
                  className="bg-app-accent size-2 rounded-full"
                />
                멤버
              </span>
              {membershipState === "JOINED" && (
                <CrewMembershipDialog crew={crew}>
                  <Button
                    type="button"
                    variant="outline"
                    aria-label={`${crew.name} 크루 탈퇴`}
                    className="bg-app-error/10 border-app-error/30 text-app-error h-10 cursor-pointer rounded-full px-4"
                  >
                    크루 탈퇴
                  </Button>
                </CrewMembershipDialog>
              )}
            </>
          ) : (
            <>
              {isPending && (
                <span className="bg-app-accent/10 text-app-accent rounded-full px-4 py-2 text-sm font-semibold">
                  가입 신청 대기 중
                </span>
              )}
              <CrewMembershipDialog crew={crew}>
                <Button
                  type="button"
                  variant={isPending ? "outline" : "default"}
                  aria-label={`${crew.name} ${isPending ? "신청 취소" : "가입 신청"}`}
                  className={cn(
                    "bg-app-accent text-app-bg h-10 cursor-pointer rounded-full",
                    isPending &&
                      "bg-app-error/10 border-app-error/30 text-app-error",
                  )}
                >
                  {isPending ? "신청 취소" : "가입 신청"}
                </Button>
              </CrewMembershipDialog>
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
