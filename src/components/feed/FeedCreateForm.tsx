/**
 * 가입 크루 선택과 본문 입력을 제공하고 등록 기능은 비활성 상태로 표시한다.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Crew } from "@/data/crews";
import type { UserProfile } from "@/data/profile";

interface FeedCreateFormProps {
  crews: Crew[];
  profile: UserProfile;
}

export default function FeedCreateForm({
  crews,
  profile,
}: FeedCreateFormProps) {
  const [crewId, setCrewId] = useState("");
  const [content, setContent] = useState("");

  return (
    <form onSubmit={(event) => event.preventDefault()} className="space-y-6">
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="bg-app-card flex size-12 shrink-0 items-center justify-center rounded-full text-2xl"
        >
          {profile.emoji}
        </div>
        <p className="min-w-0 font-bold break-words">{profile.nickname}</p>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="feed-create-crew" className="text-sm font-semibold">
          공유할 크루
        </label>
        <Select value={crewId} onValueChange={setCrewId}>
          <SelectTrigger
            id="feed-create-crew"
            className="bg-app-card border-app-border text-app-text focus-visible:border-app-accent focus-visible:ring-app-accent/40 w-full min-w-0 rounded-xl px-3 text-sm data-[size=default]:h-12"
          >
            <SelectValue placeholder="크루를 선택해주세요" />
          </SelectTrigger>
          <SelectContent className="bg-app-card border-app-border text-app-text">
            {crews.map((crew) => (
              <SelectItem
                key={crew.id}
                value={String(crew.id)}
                className="focus:bg-app-accent/10 focus:text-app-accent"
              >
                {crew.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="feed-create-content" className="text-sm font-semibold">
          내용
        </label>
        <textarea
          id="feed-create-content"
          maxLength={1000}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={9}
          placeholder="오늘 어디를 달리셨나요? 함께 나누고 싶은 이야기를 작성해주세요."
          aria-describedby="feed-create-count feed-create-description"
          className="bg-app-card border-app-border focus-visible:ring-app-accent min-h-56 w-full resize-y rounded-2xl border px-4 py-4 text-base leading-relaxed focus-visible:ring-2 focus-visible:outline-none"
        />
        <p
          id="feed-create-count"
          className="text-app-subtext text-right text-xs"
        >
          {content.length.toLocaleString("ko-KR")} / 1,000자
        </p>
      </div>
      <p id="feed-create-description" className="text-app-subtext text-sm">
        게시글 등록 기능은 준비 중입니다. 크루 선택과 본문 입력은 가능하며 작성
        내용은 저장되지 않습니다.
      </p>
      <Button
        type="submit"
        disabled
        aria-describedby="feed-create-description"
        className="bg-app-accent text-app-bg h-12 w-full rounded-2xl"
      >
        등록하기
      </Button>
    </form>
  );
}
