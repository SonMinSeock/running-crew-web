/**
 * 댓글과 대댓글의 등록 및 인라인 수정 UI를 제공한다.
 */
import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeedCommentCreateFormProps {
  mode?: "create";
  replyTo?: string;
  onSubmit: (content: string) => void;
  onCancel?: () => void;
}

interface FeedCommentEditFormProps {
  mode: "edit";
  initialContent: string;
  isReply: boolean;
  onCancel: () => void;
}

const MAX_COMMENT_LENGTH = 1000;

export default function FeedCommentForm(
  props: FeedCommentCreateFormProps | FeedCommentEditFormProps,
) {
  const isEdit = props.mode === "edit";
  const replyTo = isEdit ? undefined : props.replyTo;
  const [content, setContent] = useState(isEdit ? props.initialContent : "");
  const inputId = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEdit || replyTo) inputRef.current?.focus();
  }, [isEdit, replyTo]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (props.mode === "edit") return;
    const trimmedContent = content.trim();
    if (!trimmedContent) return;
    props.onSubmit(trimmedContent);
    setContent("");
  };

  const label = isEdit
    ? props.isReply
      ? "대댓글 수정"
      : "댓글 수정"
    : replyTo
      ? `${replyTo} 님에게 답글 작성`
      : "댓글 작성";

  return (
    <form onSubmit={submit} className="mt-4 grid gap-2">
      <label htmlFor={inputId} className="mb-1 text-sm font-semibold">
        {label}
      </label>
      <textarea
        id={inputId}
        ref={inputRef}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        maxLength={MAX_COMMENT_LENGTH}
        rows={3}
        placeholder={
          isEdit
            ? undefined
            : replyTo
              ? "응원의 답글을 남겨보세요"
              : "함께 달린 멤버에게 응원을 남겨보세요"
        }
        aria-describedby={`${inputId}-description`}
        className="bg-app-bg border-app-border focus-visible:ring-app-accent block w-full resize-y rounded-xl border px-3 py-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
      />
      <p id={`${inputId}-description`} className="text-app-subtext text-xs">
        {isEdit
          ? `수정 내용은 저장되지 않습니다. ${content.length.toLocaleString("ko-KR")} / 1,000자`
          : "더미 작성자 ‘나’로 등록됩니다. 최대 1,000자"}
      </p>
      <div className="flex justify-end gap-2">
        {props.onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={props.onCancel}
            className="cursor-pointer"
          >
            취소
          </Button>
        )}
        <Button
          type={isEdit ? "button" : "submit"}
          disabled={isEdit || !content.trim()}
          className={cn(
            "bg-app-accent text-app-bg hover:bg-app-accent/90 rounded-xl",
            !isEdit && "cursor-pointer",
          )}
        >
          {isEdit ? "저장" : replyTo ? "답글 등록" : "댓글 등록"}
        </Button>
      </div>
    </form>
  );
}
