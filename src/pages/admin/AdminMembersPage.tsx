/**
 * 서비스 회원을 최근 가입순으로 정렬하고 검색 결과를 페이지별로 표시한다.
 */
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import AdminMemberList from "@/components/admin/AdminMemberList";
import ListPagination from "@/components/common/ListPagination";
import SearchInput from "@/components/common/SearchInput";
import { Button } from "@/components/ui/button";
import { ADMIN_MEMBERS } from "@/data/adminMembers";

const PAGE_SIZE = 10;

export default function AdminMembersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") ?? "";
  const searchInputRef = useRef<HTMLInputElement>(null);
  const members = [...ADMIN_MEMBERS].sort(
    (a, b) =>
      new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime() ||
      a.id - b.id,
  );
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredMembers = members.filter(
    (member) =>
      member.nickname.toLowerCase().includes(normalizedSearchTerm) ||
      member.email.toLowerCase().includes(normalizedSearchTerm),
  );
  const totalPages = Math.ceil(filteredMembers.length / PAGE_SIZE);
  const requestedPage = Number(searchParams.get("page"));
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, Math.max(1, totalPages))
      : 1;
  const visibleMembers = filteredMembers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const changeSearchTerm = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value === "") {
      nextParams.delete("q");
    } else {
      nextParams.set("q", value);
    }
    nextParams.delete("page");
    setSearchParams(nextParams, { replace: true });
  };

  const handleReset = () => {
    changeSearchTerm("");
    searchInputRef.current?.focus();
  };

  const changePage = (nextPage: number) => {
    if (nextPage === page) return;

    const nextParams = new URLSearchParams(searchParams);
    if (nextPage === 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(nextPage));
    }
    setSearchParams(nextParams);
  };

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

      <div className="flex flex-wrap items-center gap-2">
        <div className="min-w-0 flex-1">
          <SearchInput
            ref={searchInputRef}
            id="admin-member-search"
            name="admin-member-search"
            label="닉네임 또는 이메일로 회원 검색"
            placeholder="닉네임 또는 이메일"
            value={searchTerm}
            onChange={(event) => changeSearchTerm(event.target.value)}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={searchTerm === ""}
          onClick={handleReset}
          className="h-12 cursor-pointer"
        >
          초기화
        </Button>
      </div>

      {members.length === 0 ? (
        <p className="bg-app-card text-app-subtext rounded-2xl px-5 py-12 text-center text-sm">
          등록된 회원이 없습니다.
        </p>
      ) : filteredMembers.length === 0 ? (
        <p
          role="status"
          className="bg-app-card text-app-subtext rounded-2xl px-5 py-12 text-center text-sm"
        >
          검색 결과가 없습니다.
        </p>
      ) : (
        <AdminMemberList members={visibleMembers} />
      )}

      <ListPagination
        page={page}
        totalPages={totalPages}
        label="회원 목록 페이지"
        onPageChange={changePage}
      />
    </section>
  );
}
