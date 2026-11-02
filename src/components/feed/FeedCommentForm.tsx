/**
 * 댓글과 대댓글의 입력 및 등록·취소 UI를 제공한다.
 */
import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";

interface FeedCommentFormProps {
  replyTo?: string;
  onSubmit: (content: string) => void;
  onCancel?: () => void;
}

export default function FeedCommentForm({
  replyTo,
  onSubmit,
  onCancel,
}: FeedCommentFormProps) {
  const [content, setContent] = useState("");
  const inputId = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (replyTo) inputRef.current?.focus();
  }, [replyTo]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedContent = content.trim();
    if (!trimmedContent) return;
    onSubmit(trimmedContent);
    setContent("");
  };

  return (
    <form onSubmit={submit} className="mt-4 space-y-2">
      <label htmlFor={inputId} className="text-sm font-semibold">
        {replyTo ? `${replyTo} 님에게 답글 작성` : "댓글 작성"}
      </label>
      <textarea
        id={inputId}
        ref={inputRef}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        maxLength={1000}
        rows={3}
        placeholder={
          replyTo
            ? "응원의 답글을 남겨보세요"
            : "함께 달린 멤버에게 응원을 남겨보세요"
        }
        aria-describedby={`${inputId}-description`}
        className="bg-app-bg border-app-border focus-visible:ring-app-accent block w-full resize-y rounded-xl border px-3 py-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
      />
      <p id={`${inputId}-description`} className="text-app-subtext text-xs">
        더미 작성자 ‘나’로 등록됩니다. 최대 1,000자
      </p>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            취소
          </Button>
        )}
        <Button
          type="submit"
          disabled={!content.trim()}
          className="bg-app-accent text-app-bg hover:bg-app-accent/90 rounded-xl"
        >
          {replyTo ? "답글 등록" : "댓글 등록"}
        </Button>
      </div>
    </form>
  );
}
