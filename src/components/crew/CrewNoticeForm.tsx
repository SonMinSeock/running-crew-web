/**
 * 공지 작성·수정의 초기값과 입력 UI를 제공하고 등록·저장은 비활성 상태로 표시한다.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Crew, CrewNotice } from "@/data/crews";

interface CrewNoticeFormProps {
  crew: Crew;
  mode: "create" | "edit";
  notice?: CrewNotice;
}

export default function CrewNoticeForm({
  crew,
  mode,
  notice,
}: CrewNoticeFormProps) {
  const isEdit = mode === "edit";
  const [title, setTitle] = useState(isEdit ? (notice?.title ?? "") : "");
  const [content, setContent] = useState(isEdit ? (notice?.content ?? "") : "");

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
        <label htmlFor="crew-notice-title" className="text-sm font-semibold">
          제목{" "}
          <span aria-hidden="true" className="text-app-error">
            *
          </span>
          <span className="sr-only"> (필수)</span>
        </label>
        <Input
          id="crew-notice-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={100}
          placeholder="공지 제목을 입력해주세요"
          aria-describedby="crew-notice-title-count"
          className="bg-app-card border-app-border focus-visible:ring-app-accent h-12 rounded-xl px-3"
        />
        <p
          id="crew-notice-title-count"
          className="text-app-subtext text-right text-xs"
        >
          {title.length} / 100자
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="crew-notice-content" className="text-sm font-semibold">
          내용{" "}
          <span aria-hidden="true" className="text-app-error">
            *
          </span>
          <span className="sr-only"> (필수)</span>
        </label>
        <textarea
          id="crew-notice-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          maxLength={2000}
          rows={10}
          placeholder="크루에 알릴 내용을 작성해주세요"
          aria-describedby="crew-notice-content-count"
          className="bg-app-card border-app-border focus-visible:ring-app-accent min-h-64 w-full resize-y rounded-2xl border px-3 py-3 text-base leading-relaxed focus-visible:ring-2 focus-visible:outline-none"
        />
        <p
          id="crew-notice-content-count"
          className="text-app-subtext text-right text-xs"
        >
          {content.length.toLocaleString("ko-KR")} / 2,000자
        </p>
      </div>
      <p id="crew-notice-form-description" className="text-app-subtext text-sm">
        {isEdit
          ? "공지 수정 기능은 준비 중입니다."
          : "공지 등록 기능은 준비 중입니다."}{" "}
        입력한 내용은 저장되지 않습니다.
      </p>
      <Button
        type="submit"
        disabled
        aria-describedby="crew-notice-form-description"
        className="bg-app-accent text-app-bg h-12 w-full rounded-2xl"
      >
        {isEdit ? "변경사항 저장" : "공지 등록"}
      </Button>
    </form>
  );
}
