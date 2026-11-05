/**
 * 프로필 커버와 기본 정보, 편집 링크 및 러닝 요약을 표시한다.
 */
import { Camera, MapPin, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LogoutConfirmationDialog from "@/components/profile/LogoutConfirmationDialog";
import type { UserProfile } from "@/data/profile";

interface ProfileOverviewProps {
  profile: UserProfile;
  isOwnProfile: boolean;
  totalDistance: number;
  runCount: number;
  crewCount: number;
}

export default function ProfileOverview({
  profile,
  isOwnProfile,
  totalDistance,
  runCount,
  crewCount,
}: ProfileOverviewProps) {
  return (
    <section aria-labelledby="profile-name" className="space-y-5">
      <div
        aria-hidden="true"
        className="from-app-accent/20 to-app-card h-32 rounded-3xl bg-gradient-to-r sm:h-40"
      />
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative shrink-0">
          <div
            aria-hidden="true"
            className="bg-app-card flex size-20 items-center justify-center rounded-full text-4xl"
          >
            {profile.emoji}
          </div>
          {isOwnProfile && (
            <Button
              type="button"
              size="icon"
              disabled
              aria-label="프로필 이미지 변경, 준비 중"
              aria-describedby="profile-image-description"
              className="bg-app-accent text-app-bg absolute -right-1 -bottom-1 size-7 rounded-full"
            >
              <Camera className="size-4" />
            </Button>
          )}
        </div>
        <div className="min-w-0 flex-1 basis-32">
          <h1 id="profile-name" className="text-2xl font-bold break-words">
            {profile.nickname}
          </h1>
          <p className="text-app-subtext mt-2 flex items-start gap-1 text-sm">
            <MapPin
              aria-hidden="true"
              className="text-app-accent size-4 shrink-0"
            />
            <span className="min-w-0 break-words">{profile.region}</span>
          </p>
        </div>
        {isOwnProfile && (
          <div className="flex shrink-0 items-center gap-2">
            <Button
              asChild
              variant="ghost"
              className="bg-app-card rounded-full"
            >
              <Link to="/profile/edit">
                <Pencil aria-hidden="true" className="size-4" />
                편집
              </Link>
            </Button>
            <LogoutConfirmationDialog />
          </div>
        )}
      </div>
      <p className="text-app-subtext text-sm leading-relaxed break-words whitespace-pre-wrap">
        {profile.bio}
      </p>
      {isOwnProfile && (
        <>
          <p
            id="profile-image-description"
            className="text-app-subtext text-xs"
          >
            프로필 이미지 변경 기능은 준비 중입니다.
          </p>
          <dl className="grid grid-cols-3 gap-2 sm:gap-4">
            {[
              {
                value: totalDistance.toLocaleString("ko-KR", {
                  maximumFractionDigits: 1,
                }),
                label: "km 총 거리",
              },
              { value: runCount, label: "회 총 러닝" },
              { value: crewCount, label: "개 가입한 크루" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-app-card flex min-w-0 flex-col-reverse gap-1 rounded-2xl px-2 py-4 text-center sm:px-4"
              >
                <dt className="text-app-subtext text-xs sm:text-sm">
                  {item.label}
                </dt>
                <dd className="text-xl font-bold break-words sm:text-3xl">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </>
      )}
    </section>
  );
}
