/**
 * 회원 ID로 샘플 회원을 찾아 기본 정보를 표시한다.
 */
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ADMIN_MEMBERS } from "@/data/adminMembers";
import { joinedDateFormatter } from "@/lib/date";

export default function AdminMemberDetailPage() {
  const { memberId } = useParams();
  const { search } = useLocation();
  const member = ADMIN_MEMBERS.find((item) => String(item.id) === memberId);

  useEffect(() => {
    // 목록에서 상세로 이동했을 때 화면 시작 위치를 표시한다.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [memberId]);

  const listLink = (
    <Button asChild variant="outline">
      <Link to={{ pathname: "/admin", search }}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        회원 목록으로 이동
      </Link>
    </Button>
  );

  if (!member) {
    return (
      <section className="mx-auto max-w-2xl space-y-4 py-12 text-center">
        <h1 className="text-xl font-bold">회원을 찾을 수 없습니다.</h1>
        <p className="text-app-subtext text-sm">
          회원 목록에서 확인할 회원을 선택해 주세요.
        </p>
        {listLink}
      </section>
    );
  }

  return (
    <section
      aria-labelledby="admin-member-detail-title"
      className="mx-auto max-w-3xl space-y-5"
    >
      {listLink}
      <h1 id="admin-member-detail-title" className="text-xl font-bold">
        회원 상세
      </h1>

      <section
        aria-labelledby="admin-member-info-title"
        className="bg-app-card border-app-border rounded-2xl border p-5"
      >
        <h2 id="admin-member-info-title" className="font-bold">
          기본 정보
        </h2>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-app-subtext">닉네임</dt>
            <dd className="mt-1 font-semibold wrap-anywhere">
              {member.nickname}
            </dd>
          </div>
          <div>
            <dt className="text-app-subtext">이메일</dt>
            <dd className="mt-1 wrap-anywhere">{member.email}</dd>
          </div>
          <div>
            <dt className="text-app-subtext">서비스 가입일</dt>
            <dd className="mt-1">
              <time dateTime={member.joinedAt}>
                {joinedDateFormatter.format(new Date(member.joinedAt))}
              </time>
            </dd>
          </div>
        </dl>
      </section>
    </section>
  );
}
