/**
 * 러닝 일정의 입력과 난이도 선택 UI를 제공하고 생성 기능은 비활성 상태로 표시한다.
 */
import { useState } from "react";
import RunDateTimeFields from "./RunDateTimeFields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CrewRun } from "@/data/crews";
import { cn } from "@/lib/utils";

export default function CrewRunCreateForm() {
  const [difficulty, setDifficulty] = useState<CrewRun["difficulty"]>("초급");
  const [description, setDescription] = useState("");
  const [meetingGuide, setMeetingGuide] = useState("");

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
      <p className="text-app-subtext text-xs">
        <span aria-hidden="true" className="text-app-error">
          *
        </span>{" "}
        표시는 필수 입력 항목입니다. 현재는 입력 UI만 제공합니다.
      </p>

      <div className="flex flex-col gap-3">
        <label htmlFor="run-create-title" className="text-sm font-semibold">
          일정 제목{" "}
          <span aria-hidden="true" className="text-app-error">
            *
          </span>
          <span className="sr-only"> (필수)</span>
        </label>
        <Input
          id="run-create-title"
          maxLength={100}
          placeholder="예: 여의도 새벽 5km 러닝"
          className={inputClassName}
        />
      </div>

      <RunDateTimeFields />

      <div className="flex flex-col gap-3">
        <label htmlFor="run-create-location" className="text-sm font-semibold">
          장소{" "}
          <span aria-hidden="true" className="text-app-error">
            *
          </span>
          <span className="sr-only"> (필수)</span>
        </label>
        <Input
          id="run-create-location"
          maxLength={100}
          placeholder="예: 여의도 한강공원"
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="run-create-distance" className="text-sm font-semibold">
          러닝 거리{" "}
          <span aria-hidden="true" className="text-app-error">
            *
          </span>
          <span className="sr-only"> (필수)</span>
        </label>

        <div className="relative">
          <Input
            id="run-create-distance"
            type="text"
            inputMode="decimal"
            placeholder="예: 5"
            aria-describedby="run-create-distance-unit"
            className={cn(inputClassName, "pr-12")}
          />
          <span
            id="run-create-distance-unit"
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
                name="run-create-difficulty"
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
          htmlFor="run-create-description"
          className="text-sm font-semibold"
        >
          러닝 소개
        </label>
        <textarea
          id="run-create-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          maxLength={500}
          rows={5}
          placeholder="어떤 러닝인지 소개해주세요"
          aria-describedby="run-create-description-count"
          className={textareaClassName}
        />
        <p
          id="run-create-description-count"
          className="text-app-subtext text-right text-xs"
        >
          {description.length} / 500자
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="run-create-meeting" className="text-sm font-semibold">
          집결 안내
        </label>
        <textarea
          id="run-create-meeting"
          value={meetingGuide}
          onChange={(event) => setMeetingGuide(event.target.value)}
          maxLength={500}
          rows={5}
          placeholder="집결 위치와 준비사항 등을 안내해주세요"
          aria-describedby="run-create-meeting-count"
          className={textareaClassName}
        />
        <p
          id="run-create-meeting-count"
          className="text-app-subtext text-right text-xs"
        >
          {meetingGuide.length} / 500자
        </p>
      </div>

      <p id="run-create-notice" className="text-app-subtext text-sm">
        일정 생성 기능은 준비 중입니다. 입력한 내용은 저장되지 않습니다.
      </p>

      <Button
        type="submit"
        disabled
        aria-describedby="run-create-notice"
        className="bg-app-accent text-app-bg h-12 w-full rounded-2xl"
      >
        러닝 일정 만들기
      </Button>
    </form>
  );
}
