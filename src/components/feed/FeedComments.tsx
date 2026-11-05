/**
 * 활동별 댓글과 대댓글을 표시하고 브라우저 저장소에 보관한다.
 */
import { useRef, useState } from "react";
import { MessageCircle, UserRound } from "lucide-react";
import { useLocation } from "react-router-dom";
import DeleteConfirmationDialog from "@/components/common/DeleteConfirmationDialog";
import { Button } from "@/components/ui/button";
import FeedCommentForm from "./FeedCommentForm";
import ReportDialog from "@/components/common/ReportDialog";
import { runDateTimeFormatter } from "@/lib/date";

const FEED_COMMENT_MANAGEMENT_SAMPLE_ACTIVITY_ID = 1;
const FEED_COMMENT_REPORT_SAMPLE_ACTIVITY_ID = 2;
const REPORT_SAMPLE_COMMENT_ID = "report-sample-comment";
const REPORT_SAMPLE_REPLY_ID = "report-sample-reply";

interface FeedComment {
  id: string;
  parentId: string | null;
  nickname: string;
  content: string;
  createdAt: string;
}

const REPORT_SAMPLE_COMMENTS: FeedComment[] = [
  {
    id: REPORT_SAMPLE_COMMENT_ID,
    parentId: null,
    nickname: "김새벽",
    content: "바쁜 날에도 5km를 달리셨네요. 응원합니다!",
    createdAt: "2026-10-29T16:00:00+09:00",
  },
  {
    id: REPORT_SAMPLE_REPLY_ID,
    parentId: REPORT_SAMPLE_COMMENT_ID,
    nickname: "박달리기",
    content: "저도 다음 러닝에 함께하고 싶어요.",
    createdAt: "2026-10-29T16:20:00+09:00",
  },
];

interface FeedCommentsProps {
  activityId: number;
}

// 저장된 값의 형태를 검사해 손상된 데이터가 화면을 중단하지 않게 한다.
function readComments(
  key: string,
  sampleComments: FeedComment[],
): FeedComment[] {
  const value: unknown = JSON.parse(localStorage.getItem(key) ?? "[]");
  if (!Array.isArray(value)) throw new Error("Invalid comments");
  const comments = [...sampleComments];
  const ids = new Set(sampleComments.map((comment) => comment.id));
  for (const item of value) {
    if (
      typeof item !== "object" ||
      item === null ||
      typeof item.id !== "string" ||
      ids.has(item.id) ||
      !(item.parentId === null || typeof item.parentId === "string") ||
      typeof item.nickname !== "string" ||
      typeof item.content !== "string" ||
      !item.content.trim() ||
      item.content.length > 1000 ||
      typeof item.createdAt !== "string" ||
      !Number.isFinite(Date.parse(item.createdAt))
    )
      continue;
    ids.add(item.id);
    comments.push(item);
  }
  // 대댓글은 최상위 댓글에만 연결해 한 단계 구조를 유지한다.
  return comments
    .filter(
      (comment) =>
        comment.parentId === null ||
        comments.some(
          (parent) =>
            parent.id === comment.parentId && parent.parentId === null,
        ),
    )
    .sort(
      (a, b) =>
        Date.parse(a.createdAt) - Date.parse(b.createdAt) ||
        a.id.localeCompare(b.id),
    );
}

export default function FeedComments({ activityId }: FeedCommentsProps) {
  const { key: locationKey } = useLocation();
  const storageKey = `running-crew:feed-comments:v1:${activityId}`;
  const reportSamples =
    activityId === FEED_COMMENT_REPORT_SAMPLE_ACTIVITY_ID
      ? REPORT_SAMPLE_COMMENTS
      : [];

  const [initial] = useState(() => {
    try {
      return { comments: readComments(storageKey, reportSamples), error: "" };
    } catch {
      return {
        comments: reportSamples,
        error:
          "저장된 댓글을 읽지 못했습니다. 새 댓글은 이 화면에서 작성할 수 있습니다.",
      };
    }
  });
  const [comments, setComments] = useState(initial.comments);
  const [message, setMessage] = useState(initial.error);
  const [isOpen, setIsOpen] = useState(false);
  const [replyId, setReplyId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const replyButtons = useRef(new Map<string, HTMLButtonElement>());
  const editButtons = useRef(new Map<string, HTMLButtonElement>());
  const panelId = `feed-comments-${activityId}`;
  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null,
  );
  const isSampleActivity =
    activityId === FEED_COMMENT_MANAGEMENT_SAMPLE_ACTIVITY_ID;
  const firstCommentId = isSampleActivity ? topLevelComments[0]?.id : undefined;
  const firstParentWithReplies = isSampleActivity
    ? topLevelComments.find((comment) =>
        comments.some((reply) => reply.parentId === comment.id),
      )
    : undefined;
  const firstReplyId = firstParentWithReplies
    ? comments.find((reply) => reply.parentId === firstParentWithReplies.id)?.id
    : undefined;

  // 샘플에서 벗어난 수정 폼을 닫고 초안을 초기화한다.
  if (
    editingId !== null &&
    editingId !== firstCommentId &&
    editingId !== firstReplyId
  ) {
    setEditingId(null);
  }

  const addComment = (content: string, parentId: string | null = null) => {
    if (
      parentId &&
      !comments.some(
        (comment) => comment.id === parentId && comment.parentId === null,
      )
    )
      return;
    const comment: FeedComment = {
      id: crypto.randomUUID(),
      parentId,
      nickname: "나",
      content,
      createdAt: new Date().toISOString(),
    };
    const nextComments = [...comments, comment];
    setComments(nextComments);
    try {
      const storedComments = nextComments.filter(
        (item) => !reportSamples.some((sample) => sample.id === item.id),
      );
      localStorage.setItem(storageKey, JSON.stringify(storedComments));
      setMessage(parentId ? "답글을 등록했습니다." : "댓글을 등록했습니다.");
    } catch {
      setMessage(
        "브라우저에 저장하지 못했습니다. 작성한 내용은 이 화면에서만 유지됩니다.",
      );
    }
  };

  const closeReply = (id: string) => {
    setReplyId(null);
    replyButtons.current.get(id)?.focus();
  };

  const renderReportAction = (comment: FeedComment) => {
    if (!isOpen || !reportSamples.some((sample) => sample.id === comment.id)) {
      return null;
    }

    const targetLabel = comment.parentId === null ? "댓글" : "대댓글";

    return (
      <ReportDialog
        key={`${locationKey}-${comment.id}`}
        targetLabel={targetLabel}
        author={comment.nickname}
        content={comment.content}
        trigger={
          <Button
            type="button"
            variant="link"
            aria-label={`${comment.nickname} 님의 ${targetLabel} 신고`}
            className="text-app-subtext mt-1 cursor-pointer px-0"
          >
            신고
          </Button>
        }
      />
    );
  };

  const renderCommentActions = (comment: FeedComment) => {
    if (comment.id !== firstCommentId && comment.id !== firstReplyId)
      return null;

    const isReply = comment.parentId !== null;
    const targetLabel = isReply ? "대댓글" : "댓글";

    return (
      <>
        <Button
          type="button"
          variant="link"
          aria-label={`${comment.nickname} 님의 ${targetLabel} 수정`}
          aria-expanded={editingId === comment.id}
          ref={(element) => {
            if (element) editButtons.current.set(comment.id, element);
            else editButtons.current.delete(comment.id);
          }}
          onClick={() => setEditingId(comment.id)}
          className="text-app-accent mt-1 cursor-pointer px-0"
        >
          수정
        </Button>
        {isOpen && (
          <DeleteConfirmationDialog
            title={isReply ? "대댓글을 삭제할까요?" : "댓글을 삭제할까요?"}
            trigger={
              <Button
                type="button"
                variant="link"
                aria-label={`${comment.nickname} 님의 ${targetLabel} 삭제`}
                className="text-app-error mt-1 cursor-pointer px-0"
              >
                삭제
              </Button>
            }
          >
            <p className="font-bold break-words">{comment.nickname}</p>
            <time
              dateTime={comment.createdAt}
              className="text-app-subtext mt-2 block text-sm"
            >
              {runDateTimeFormatter.format(new Date(comment.createdAt))}
            </time>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed break-words">
              {comment.content}
            </p>
          </DeleteConfirmationDialog>
        )}
      </>
    );
  };

  const commentBody = (comment: FeedComment) => (
    <div className="flex items-start gap-3">
      <div
        aria-hidden="true"
        className="bg-app-text/5 text-app-subtext flex size-8 shrink-0 items-center justify-center rounded-full"
      >
        <UserRound className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <p className="text-sm font-bold break-words">{comment.nickname}</p>
          <time
            dateTime={comment.createdAt}
            className="text-app-subtext text-xs"
          >
            {runDateTimeFormatter.format(new Date(comment.createdAt))}
          </time>
        </div>
        {editingId === comment.id ? (
          <FeedCommentForm
            key={comment.id}
            mode="edit"
            initialContent={comment.content}
            isReply={comment.parentId !== null}
            onCancel={() => {
              setEditingId(null);
              editButtons.current.get(comment.id)?.focus();
            }}
          />
        ) : (
          <p className="mt-2 text-sm leading-relaxed break-words whitespace-pre-wrap">
            {comment.content}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-3 empty:hidden">
          {comment.parentId === null && (
            <Button
              type="button"
              variant="link"
              aria-label={`${comment.nickname} 님의 댓글에 답글 작성`}
              aria-expanded={replyId === comment.id}
              ref={(element) => {
                if (element)
                  replyButtons.current.set(comment.id, element);
                else replyButtons.current.delete(comment.id);
              }}
              onClick={() =>
                replyId === comment.id
                  ? closeReply(comment.id)
                  : setReplyId(comment.id)
              }
              className="text-app-accent mt-1 cursor-pointer px-0"
            >
              답글
            </Button>
          )}
          {renderCommentActions(comment)}
          {renderReportAction(comment)}
        </div>
        {replyId === comment.id && (
          <FeedCommentForm
            key={comment.id}
            replyTo={comment.nickname}
            onSubmit={(content) => {
              addComment(content, comment.id);
              closeReply(comment.id);
            }}
            onCancel={() => closeReply(comment.id)}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="border-app-border mt-4 border-t pt-4">
      <Button
        type="button"
        variant="ghost"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => {
          if (isOpen) setEditingId(null);
          setIsOpen(!isOpen);
        }}
        className="text-app-subtext hover:text-app-accent max-w-full cursor-pointer gap-2 rounded-xl"
      >
        <MessageCircle aria-hidden="true" className="size-4" />
        댓글 {comments.length}개 · {isOpen ? "접기" : "보기"}
      </Button>
      <div id={panelId} hidden={!isOpen}>
        {comments.length === 0 ? (
          <p className="text-app-subtext mt-4 text-sm">
            첫 응원 댓글을 남겨보세요.
          </p>
        ) : (
          <ul className="divide-app-border mt-3 divide-y">
            {topLevelComments.map((comment) => (
              <li key={comment.id} className="min-w-0 py-4">
                {commentBody(comment)}
                {comments.some((reply) => reply.parentId === comment.id) && (
                  <ul
                    aria-label={`${comment.nickname} 님의 댓글에 달린 답글`}
                    className="border-app-border mt-3 space-y-5 border-l-2 pl-3 sm:pl-4"
                  >
                    {comments
                      .filter((reply) => reply.parentId === comment.id)
                      .map((reply) => (
                        <li key={reply.id} className="min-w-0">
                          {commentBody(reply)}
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
        <FeedCommentForm onSubmit={(content) => addComment(content)} />
        <p role="status" className="text-app-subtext mt-2 text-xs">
          {message}
        </p>
      </div>
    </div>
  );
}
