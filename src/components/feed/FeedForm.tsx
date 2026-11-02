/**
 * 피드 작성·수정의 초기값과 입력 UI를 제공하고 등록·저장은 비활성으로 표시한다.
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
import type { Crew, CrewActivity } from "@/data/crews";
import type { UserProfile } from "@/data/profile";

interface FeedCreateFormProps {
  mode: "create";
  crews: Crew[];
  profile: UserProfile;
}

interface FeedEditFormProps {
  mode: "edit";
  crew: Crew;
  activity: CrewActivity;
}

type FeedFormProps = FeedCreateFormProps | FeedEditFormProps;

export default function FeedForm(props: FeedFormProps) {
  // 모드·게시글이 바뀌면 크루 선택과 본문 입력 상태를 초기화한다.
  return (
    <FeedFormFields
      key={props.mode === "edit" ? `edit-${props.activity.id}` : "create"}
      {...props}
    />
  );
}

function FeedFormFields(props: FeedFormProps) {
  const author = props.mode === "edit" ? props.activity : props.profile;
  const [crewId, setCrewId] = useState("");
  const [content, setContent] = useState(
    props.mode === "edit" ? props.activity.content : "",
  );

  return (
    <form
      noValidate
      onSubmit={(event) => event.preventDefault()}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="bg-app-card flex size-12 shrink-0 items-center justify-center rounded-full text-2xl"
        >
          {author.emoji}
        </div>
        <p className="min-w-0 font-bold break-words">{author.nickname}</p>
      </div>
      {props.mode === "edit" ? (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold">공유한 크루</p>
          <div className="bg-app-card flex items-center gap-3 rounded-2xl p-4">
            <span aria-hidden="true" className="shrink-0 text-2xl">
              {props.crew.emoji}
            </span>
            <p className="min-w-0 font-semibold break-words">
              {props.crew.name}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <label htmlFor="feed-form-crew" className="text-sm font-semibold">
            공유할 크루
          </label>
          <Select value={crewId} onValueChange={setCrewId}>
            <SelectTrigger
              id="feed-form-crew"
              className="bg-app-card border-app-border text-app-text focus-visible:border-app-accent focus-visible:ring-app-accent/40 w-full min-w-0 rounded-xl px-3 text-sm data-[size=default]:h-12"
            >
              <SelectValue placeholder="크루를 선택해주세요" />
            </SelectTrigger>
            <SelectContent className="bg-app-card border-app-border text-app-text">
              {props.crews.map((crew) => (
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
      )}
      <div className="flex flex-col gap-3">
        <label htmlFor="feed-form-content" className="text-sm font-semibold">
          내용
        </label>
        <textarea
          id="feed-form-content"
          maxLength={1000}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={9}
          placeholder="오늘 어디를 달리셨나요? 함께 나누고 싶은 이야기를 작성해주세요."
          aria-describedby="feed-form-count feed-form-description"
          className="bg-app-card border-app-border focus-visible:ring-app-accent min-h-56 w-full resize-y rounded-2xl border px-4 py-4 text-base leading-relaxed focus-visible:ring-2 focus-visible:outline-none"
        />
        <p id="feed-form-count" className="text-app-subtext text-right text-xs">
          {content.length.toLocaleString("ko-KR")} / 1,000자
        </p>
      </div>
      <p id="feed-form-description" className="text-app-subtext text-sm">
        {props.mode === "edit"
          ? "게시글 수정 기능은 준비 중입니다. 본문 입력은 가능하며 입력한 내용은 저장되지 않습니다."
          : "게시글 등록 기능은 준비 중입니다. 크루 선택과 본문 입력은 가능하며 작성 내용은 저장되지 않습니다."}
      </p>
      <Button
        type="submit"
        disabled
        aria-describedby="feed-form-description"
        className="bg-app-accent text-app-bg h-12 w-full rounded-2xl"
      >
        {props.mode === "edit" ? "변경사항 저장" : "등록하기"}
      </Button>
    </form>
  );
}
