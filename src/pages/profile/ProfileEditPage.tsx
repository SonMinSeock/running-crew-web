/**
 * 프로필 정보의 편집 입력 UI를 표시하고 저장 기능은 비활성 상태로 제공한다.
 */
import { useEffect } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { USER_PROFILE } from "@/data/profile";

export default function ProfileEditPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <section
      aria-labelledby="profile-edit-title"
      className="mx-auto max-w-2xl space-y-6"
    >
      <h1 id="profile-edit-title" className="text-xl font-bold">
        프로필 편집
      </h1>
      <div className="flex flex-col items-center gap-3">
        <div
          aria-hidden="true"
          className="bg-app-card flex size-24 items-center justify-center rounded-full text-5xl"
        >
          {USER_PROFILE.emoji}
        </div>
        <Button
          type="button"
          variant="ghost"
          disabled
          aria-describedby="profile-edit-description"
        >
          <Camera aria-hidden="true" className="size-4" />
          프로필 이미지 변경
        </Button>
      </div>
      {/* 입력 UI만 제공하고 변경 내용의 저장과 검증은 후속 작업에서 연결한다. */}
      <div className="space-y-5">
        <div className="flex flex-col gap-3">
          <label htmlFor="profile-nickname" className="text-sm font-semibold">
            닉네임
          </label>
          <Input
            id="profile-nickname"
            defaultValue={USER_PROFILE.nickname}
            className="bg-app-card border-app-border focus-visible:ring-app-accent h-12 rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="profile-region" className="text-sm font-semibold">
            활동 지역
          </label>
          <Input
            id="profile-region"
            defaultValue={USER_PROFILE.region}
            className="bg-app-card border-app-border focus-visible:ring-app-accent h-12 rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="profile-bio" className="text-sm font-semibold">
            자기소개
          </label>
          <textarea
            id="profile-bio"
            defaultValue={USER_PROFILE.bio}
            rows={4}
            className="bg-app-card border-app-border focus-visible:ring-app-accent block w-full resize-y rounded-xl border px-3 py-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
          />
        </div>
      </div>
      <p id="profile-edit-description" className="text-app-subtext text-sm">
        저장과 이미지 변경 기능은 준비 중입니다. 입력한 내용은 저장되지
        않습니다.
      </p>
      <Button
        type="button"
        disabled
        aria-describedby="profile-edit-description"
        className="bg-app-accent text-app-bg h-12 w-full rounded-2xl font-bold"
      >
        저장
      </Button>
    </section>
  );
}
