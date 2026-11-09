/**
 * 운영자 회원 목록을 화면 너비에 따라 표 또는 세로 목록으로 표시한다.
 */
import type { AdminMember } from "@/data/adminMembers";

const joinedDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "long",
  day: "numeric",
});

interface AdminMemberListProps {
  members: AdminMember[];
}

export default function AdminMemberList({ members }: AdminMemberListProps) {
  return (
    <div className="bg-app-card border-app-border overflow-hidden rounded-2xl border">
      <table className="hidden w-full table-fixed text-left text-sm md:table">
        <caption className="sr-only">회원 목록</caption>
        <thead className="bg-app-text/5 text-app-subtext">
          <tr>
            <th scope="col" className="w-1/4 px-5 py-3">
              닉네임
            </th>
            <th scope="col" className="w-1/2 px-5 py-3">
              이메일
            </th>
            <th scope="col" className="w-1/4 px-5 py-3">
              가입일
            </th>
          </tr>
        </thead>
        <tbody className="divide-app-border divide-y">
          {members.map((member) => (
            <tr key={member.id}>
              <th scope="row" className="px-5 py-4 font-semibold wrap-anywhere">
                {member.nickname}
              </th>
              <td className="text-app-subtext px-5 py-4 wrap-anywhere">
                {member.email}
              </td>
              <td className="text-app-subtext px-5 py-4">
                <time dateTime={member.joinedAt}>
                  {joinedDateFormatter.format(new Date(member.joinedAt))}
                </time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="divide-app-border divide-y md:hidden">
        {members.map((member) => (
          <li key={member.id} className="px-4 py-4">
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-app-subtext text-xs">닉네임</dt>
                <dd className="mt-1 font-semibold wrap-anywhere">
                  {member.nickname}
                </dd>
              </div>
              <div>
                <dt className="text-app-subtext text-xs">이메일</dt>
                <dd className="mt-1 wrap-anywhere">{member.email}</dd>
              </div>
              <div>
                <dt className="text-app-subtext text-xs">가입일</dt>
                <dd className="mt-1">
                  <time dateTime={member.joinedAt}>
                    {joinedDateFormatter.format(new Date(member.joinedAt))}
                  </time>
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
