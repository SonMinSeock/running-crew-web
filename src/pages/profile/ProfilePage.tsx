/**
 * 프로필 정보와 개인 러닝 통계·활동 화면을 구성한다.
 */
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import ReportDialog from "@/components/common/ReportDialog";
import { Button } from "@/components/ui/button";
import ProfileOverview from "@/components/profile/ProfileOverview";
import ProfileStatistics from "@/components/profile/ProfileStatistics";
import ProfileActivities from "@/components/profile/ProfileActivities";
import { USER_PROFILE, PERSONAL_RUNS } from "@/data/profile";
import { CREWS, CREW_MEMBERS } from "@/data/crews";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [view, setView] = useState<"statistics" | "activities">("statistics");
  const [searchParams] = useSearchParams();
  const { key: locationKey } = useLocation();
  const memberId = searchParams.get("memberId");
  const isOwnProfile = memberId === null;
  const member = CREW_MEMBERS.find((item) => String(item.id) === memberId);

  const now = Date.now();
  // 미래 기록을 제외한 동일한 개인 데이터로 모든 통계를 계산한다.
  const runs = PERSONAL_RUNS.filter(
    (run) => Date.parse(run.startsAt) <= now,
  ).sort(
    (a, b) => Date.parse(b.startsAt) - Date.parse(a.startsAt) || a.id - b.id,
  );
  const totalDistance = runs.reduce((sum, run) => sum + run.distanceKm, 0);
  const crewCount = CREWS.filter((crew) => crew.isJoined).length;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [memberId]);

  if (!isOwnProfile) {
    if (!member) {
      return (
        <section className="py-12 text-center">
          <h1 className="text-xl font-bold">프로필을 찾을 수 없습니다.</h1>
          <Button asChild variant="link" className="text-app-accent mt-4">
            <Link to="/crews">크루 목록으로 이동</Link>
          </Button>
        </section>
      );
    }

    return (
      <ProfileOverview
        profile={{
          nickname: member.nickname,
          emoji: member.emoji,
          region: "활동 지역 미등록",
          bio: "등록된 자기소개가 없습니다.",
        }}
        isOwnProfile={false}
        memberAction={
          <ReportDialog
            key={`${locationKey}-${member.id}`}
            targetLabel="멤버"
            author={member.nickname}
            avatar={member.emoji}
            reasons={["스팸·광고", "욕설·괴롭힘", "사칭", "기타"]}
            trigger={
              <Button
                type="button"
                variant="ghost"
                aria-label={`${member.nickname} 님 신고`}
                className="bg-app-card text-app-subtext shrink-0 cursor-pointer rounded-full"
              >
                신고
              </Button>
            }
          />
        }
        totalDistance={0}
        runCount={0}
        crewCount={0}
      />
    );
  }

  return (
    <div className="space-y-6">
      <ProfileOverview
        profile={USER_PROFILE}
        isOwnProfile={true}
        totalDistance={totalDistance}
        runCount={runs.length}
        crewCount={crewCount}
      />
      <div
        role="group"
        aria-label="프로필 보기 구분"
        className="grid grid-cols-2 gap-2"
      >
        {(["statistics", "activities"] as const).map((item) => (
          <Button
            key={item}
            type="button"
            variant="ghost"
            aria-pressed={view === item}
            onClick={() => setView(item)}
            className={cn(
              "h-11 cursor-pointer rounded-2xl",
              view === item
                ? "bg-app-accent text-app-bg data-[variant=ghost]:hover:bg-app-accent/90 data-[variant=ghost]:hover:text-app-bg"
                : "bg-app-card text-app-subtext data-[variant=ghost]:hover:bg-app-text/5 data-[variant=ghost]:hover:text-app-text",
            )}
          >
            {item === "statistics" ? "통계" : "활동"}
          </Button>
        ))}
      </div>
      {view === "statistics" ? (
        <ProfileStatistics runs={runs} now={now} />
      ) : (
        <ProfileActivities runs={runs} />
      )}
    </div>
  );
}
