/**
 * 러닝 일정 생성·수정의 초기값과 입력 UI를 제공하고 생성·저장은 비활성 상태로 표시한다.
 */
import { useState } from "react";
import RunDateTimeFields from "./RunDateTimeFields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Crew, CrewRun } from "@/data/crews";
import { cn } from "@/lib/utils";

interface CrewRunFormProps {
  crew: Crew;
  mode: "create" | "edit";
  run?: CrewRun;
}

export default function CrewRunForm(props: CrewRunFormProps) {
  // 모드·크루·일정이 바뀌면 날짜·시간을 포함한 모든 입력 상태를 초기화한다.
  return (
    <CrewRunFormFields
      key={`${props.mode}-${props.crew.id}-${props.run?.id ?? "new"}`}
      {...props}
    />
  );
}

function CrewRunFormFields({ crew, mode, run }: CrewRunFormProps) {
  const isEdit = mode === "edit";
  const initialRun = isEdit ? run : undefined;
  const [title, setTitle] = useState(initialRun?.title ?? "");
  const [location, setLocation] = useState(initialRun?.location ?? "");
  const [distance, setDistance] = useState(
    initialRun ? String(initialRun.distanceKm) : "",
  );
  const [difficulty, setDifficulty] = useState<CrewRun["difficulty"]>(
    initialRun?.difficulty ?? "초급",
  );
  const [description, setDescription] = useState(initialRun?.description ?? "");
  const [meetingGuide, setMeetingGuide] = useState(initialRun?.meetingGuide ?? "");

  const inputClassName =
    "bg-app-card border-app-border focus-visible:ring-app-accent h-12 min-w-0 rounded-xl px-3";

  const textareaClassName =
    "bg-app-card border-app-border focus-visible:ring-app-accent min-h-36 w-full resize-y rounded-2xl border px-3 py-3 text-base leading-relaxed focus-visible:ring-2 focus-visible:outline-none";

  return (
    <form
      noValidate
      onSubmit={(event) => event.preventDefault()}
      className="space-y-6"
    >
      <div className="bg-app-card flex items-center gap-3 rounded-2xl p-4">
        <span aria-hidden="true" className="shrink-0 text-2xl">
          {crew.emoji}
        </span>
        <p className="min-w-0 font-semibold break-words">{crew.name}</p>
      </div>
      <p className="text-app-subtext text-xs">
        <span aria-hidden="true" className="text-app-error">
          *
        </span>{" "}
        표시는 필수 입력 항목입니다. 현재는 입력 UI만 제공합니다.
      </p>

      <div className="flex flex-col gap-3">
        <label htmlFor="run-form-title" className="text-sm font-semibold">
          일정 제목{" "}
          <span aria-hidden="true" className="text-app-error">
            *
          </span>
          <span className="sr-only"> (필수)</span>
        </label>
        <Input
          id="run-form-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={100}
          placeholder="예: 여의도 새벽 5km 러닝"
          className={inputClassName}
        />
      </div>

      <RunDateTimeFields initialStartsAt={initialRun?.startsAt} />

      <div className="flex flex-col gap-3">
        <label htmlFor="run-form-location" className="text-sm font-semibold">
          장소{" "}
          <span aria-hidden="true" className="text-app-error">
            *
          </span>
          <span className="sr-only"> (필수)</span>
        </label>
        <Input
          id="run-form-location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          maxLength={100}
          placeholder="예: 여의도 한강공원"
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="run-form-distance" className="text-sm font-semibold">
          러닝 거리{" "}
          <span aria-hidden="true" className="text-app-error">
            *
          </span>
          <span className="sr-only"> (필수)</span>
        </label>

        <div className="relative">
          <Input
            id="run-form-distance"
            value={distance}
            onChange={(event) => setDistance(event.target.value)}
            type="text"
            inputMode="decimal"
            placeholder="예: 5"
            aria-describedby="run-form-distance-unit"
            className={cn(inputClassName, "pr-12")}
          />
          <span
            id="run-form-distance-unit"
            className="text-app-subtext pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm"
          >
            km
          </span>
        </div>
      </div>

      <fieldset className="min-w-0">
        <legend className="mb-3 text-sm font-semibold">난이도</legend>
        <div className="grid grid-cols-3 gap-2">
          {(["초급", "중급", "고급"] as const).map((value) => (
            <label key={value} className="min-w-0 cursor-pointer">
              <input
                type="radio"
                name="run-form-difficulty"
                value={value}
                checked={difficulty === value}
                onChange={() => setDifficulty(value)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "peer-focus-visible:ring-app-accent peer-focus-visible:ring-offset-app-bg hover:bg-app-accent/90 hover:text-app-bg flex h-12 items-center justify-center rounded-2xl border text-base font-bold transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
                  difficulty === value
                    ? "bg-app-accent border-app-accent text-app-bg"
                    : "bg-app-card border-app-border text-app-subtext",
                )}
              >
                {value}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3">
        <label
          htmlFor="run-form-description"
          className="text-sm font-semibold"
        >
          러닝 소개
        </label>
        <textarea
          id="run-form-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          maxLength={500}
          rows={5}
          placeholder="어떤 러닝인지 소개해주세요"
          aria-describedby="run-form-description-count"
          className={textareaClassName}
        />
        <p
          id="run-form-description-count"
          className="text-app-subtext text-right text-xs"
        >
          {description.length} / 500자
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="run-form-meeting" className="text-sm font-semibold">
          집결 안내
        </label>
        <textarea
          id="run-form-meeting"
          value={meetingGuide}
          onChange={(event) => setMeetingGuide(event.target.value)}
          maxLength={500}
          rows={5}
          placeholder="집결 위치와 준비사항 등을 안내해주세요"
          aria-describedby="run-form-meeting-count"
          className={textareaClassName}
        />
        <p
          id="run-form-meeting-count"
          className="text-app-subtext text-right text-xs"
        >
          {meetingGuide.length} / 500자
        </p>
      </div>

      <p id="run-form-notice" className="text-app-subtext text-sm">
        {isEdit
          ? "일정 수정 기능은 준비 중입니다."
          : "일정 생성 기능은 준비 중입니다."}{" "}
        입력한 내용은 저장되지 않습니다.
      </p>

      <Button
        type="submit"
        disabled
        aria-describedby="run-form-notice"
        className="bg-app-accent text-app-bg h-12 w-full rounded-2xl"
      >
        {isEdit ? "변경사항 저장" : "러닝 일정 만들기"}
      </Button>
    </form>
  );
}
