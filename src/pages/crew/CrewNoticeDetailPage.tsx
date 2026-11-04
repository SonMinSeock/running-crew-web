/**
 * 크루와 공지 ID를 확인해 공지 상세 또는 잘못된 접근 안내를 구성한다.
 */
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DeleteConfirmationDialog from "@/components/common/DeleteConfirmationDialog";
import ViewMoreButton from "@/components/common/ViewMoreButton";
import NoticeDetailContent from "@/components/crew/NoticeDetailContent";
import { CREWS, CREW_NOTICES, OWNED_CREW_SAMPLE_ID } from "@/data/crews";

export default function CrewNoticeDetailPage() {
  const { crewId, noticeId } = useParams();
  const crew = CREWS.find((item) => String(item.id) === crewId);
  const notice = CREW_NOTICES.find(
    (item) => String(item.id) === noticeId && item.crewId === crew?.id,
  );

  useEffect(() => {
    // 상세에 진입하거나 공지가 바뀌면 화면 시작 위치를 표시한다.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [crewId, noticeId]);

  if (!crew || !notice) {
    return (
      <section className="mx-auto max-w-2xl py-12 text-center">
        <h1 className="text-xl font-bold">
          {crew ? "공지를 찾을 수 없습니다." : "크루를 찾을 수 없습니다."}
        </h1>
        <p className="text-app-subtext mt-3 text-sm">
          {crew
            ? "해당 크루의 공지 목록에서 다른 공지를 확인해주세요."
            : "크루 목록에서 다른 크루를 확인해주세요."}
        </p>
        <Button asChild variant="link" className="text-app-accent mt-4">
          <Link to={crew ? `/crews/${crew.id}/notices` : "/crews"}>
            {crew ? "공지 목록으로 이동" : "크루 목록으로 이동"}
          </Link>
        </Button>
      </section>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {crew.id === OWNED_CREW_SAMPLE_ID && (
        <div className="flex flex-wrap justify-end gap-2">
          <Button
            asChild
            variant="ghost"
            className="bg-app-card h-10 rounded-full px-4"
          >
            <Link to={`/crews/${crew.id}/notices/${notice.id}/edit`}>
              <Pencil aria-hidden="true" className="size-4" />
              편집
            </Link>
          </Button>
          <DeleteConfirmationDialog
            title="공지를 삭제할까요?"
            trigger={
              <Button
                type="button"
                variant="outline"
                aria-label={`${notice.title} 삭제`}
                className="bg-app-error/10 border-app-error/30 text-app-error h-10 cursor-pointer rounded-full px-4"
              >
                <Trash2 aria-hidden="true" className="size-4" />
                삭제
              </Button>
            }
          >
            <p className="font-bold break-words">{notice.title}</p>
            <p className="text-app-subtext mt-2 text-sm break-words">
              {crew.name}
            </p>
          </DeleteConfirmationDialog>
        </div>
      )}
      <NoticeDetailContent crew={crew} notice={notice} />
      <div className="flex justify-end">
        <ViewMoreButton to={`/crews/${crew.id}/notices`}>
          공지 목록 보기
        </ViewMoreButton>
      </div>
    </div>
  );
}
