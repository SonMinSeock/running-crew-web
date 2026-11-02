/**
 * 크루 기본 정보 입력과 난이도 선택 UI를 제공하고 생성 기능은 비활성 상태로 표시한다.
 */
import { useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Crew } from "@/data/crews";
import { cn } from "@/lib/utils";

export default function CrewCreateForm() {
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<Crew["difficulty"]>("초급");

  return (
    <form onSubmit={(event) => event.preventDefault()} className="space-y-6">
      <div className="flex flex-col items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          disabled
          aria-describedby="crew-image-description"
          className="bg-app-card border-app-border text-app-subtext flex size-28 flex-col gap-2 rounded-3xl border-2 border-dashed"
        >
          <Camera aria-hidden="true" className="size-7" />
          <span className="text-sm">대표 이미지</span>
        </Button>
        <p
          id="crew-image-description"
          className="text-app-subtext text-center text-xs"
        >
          대표 이미지 변경 기능은 준비 중입니다.
        </p>
      </div>
      <p className="text-app-subtext text-xs">
        <span className="text-app-error" aria-hidden="true">
          *
        </span>{" "}
        표시는 필수 입력 항목입니다. 현재는 입력 UI만 제공합니다.
      </p>
      <div className="flex flex-col gap-3">
        <label htmlFor="crew-create-name" className="text-sm font-semibold">
          크루 이름{" "}
          <span aria-hidden="true" className="text-app-error">
            *
          </span>
          <span className="sr-only"> (필수)</span>
        </label>
        <Input
          id="crew-create-name"
          placeholder="크루 이름을 입력해주세요"
          className="bg-app-card border-app-border focus-visible:ring-app-accent h-12 rounded-xl px-3"
        />
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="crew-create-region" className="text-sm font-semibold">
          지역{" "}
          <span aria-hidden="true" className="text-app-error">
            *
          </span>
          <span className="sr-only"> (필수)</span>
        </label>
        <Input
          id="crew-create-region"
          placeholder="주요 러닝 지역 (예: 여의도, 한강)"
          className="bg-app-card border-app-border focus-visible:ring-app-accent h-12 rounded-xl px-3"
        />
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="crew-create-distance" className="text-sm font-semibold">
          주요 러닝 거리
        </label>
        <Input
          id="crew-create-distance"
          placeholder="예: 5km, 10km"
          className="bg-app-card border-app-border focus-visible:ring-app-accent h-12 rounded-xl px-3"
        />
      </div>
      <fieldset className="min-w-0">
        <legend className="mb-3 text-sm font-semibold">난이도</legend>
        <div className="grid grid-cols-3 gap-2">
          {(["초급", "중급", "고급"] as const).map((value) => (
            <label key={value} className="min-w-0 cursor-pointer">
              <input
                type="radio"
                name="crew-create-difficulty"
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
          htmlFor="crew-create-description"
          className="text-sm font-semibold"
        >
          소개글
        </label>
        <textarea
          id="crew-create-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          maxLength={500}
          aria-describedby="crew-create-description-count"
          rows={5}
          placeholder="크루를 소개해주세요"
          className="bg-app-card border-app-border focus-visible:ring-app-accent min-h-36 w-full resize-y rounded-2xl border px-3 py-3 text-base leading-relaxed focus-visible:ring-2 focus-visible:outline-none"
        />
        <p
          id="crew-create-description-count"
          className="text-app-subtext text-right text-xs"
        >
          {description.length} / 500자
        </p>
      </div>
      <p id="crew-create-notice" className="text-app-subtext text-sm">
        크루 생성 기능은 준비 중입니다. 입력한 내용은 저장되지 않습니다.
      </p>
      <Button
        type="submit"
        disabled
        aria-describedby="crew-create-notice"
        className="bg-app-accent text-app-bg h-12 w-full rounded-2xl"
      >
        크루 만들기
      </Button>
    </form>
  );
}
