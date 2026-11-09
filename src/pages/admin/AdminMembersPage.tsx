/**
 * 서비스 회원을 최근 가입순으로 정렬해 운영자 콘솔에 표시한다.
 */
import AdminMemberList from "@/components/admin/AdminMemberList";
import { ADMIN_MEMBERS } from "@/data/adminMembers";

export default function AdminMembersPage() {
  const members = [...ADMIN_MEMBERS].sort(
    (a, b) =>
      new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime() ||
      a.id - b.id,
  );

  return (
    <section aria-labelledby="admin-members-title" className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 id="admin-members-title" className="text-xl font-bold">
          회원 관리
        </h1>
        <span className="text-app-subtext shrink-0 text-sm">
          전체 {members.length}명
        </span>
      </div>

      {members.length === 0 ? (
        <p className="bg-app-card text-app-subtext rounded-2xl px-5 py-12 text-center text-sm">
          등록된 회원이 없습니다.
        </p>
      ) : (
        <AdminMemberList members={members} />
      )}
    </section>
  );
}
