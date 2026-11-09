/**
 * 샘플 신고를 최신 접수순으로 정렬하고 필터 결과를 페이지별로 표시한다.
 */
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AdminReportList from "@/components/admin/AdminReportList";
import ListPagination from "@/components/common/ListPagination";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ADMIN_REPORTS,
  REPORT_STATUS_LABELS,
  REPORT_TYPE_LABELS,
} from "@/data/adminReports";

const PAGE_SIZE = 4;
const ALL_REPORTS = "all";

export default function AdminReportsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedType = searchParams.get("type") ?? ALL_REPORTS;
  const requestedStatus = searchParams.get("status") ?? ALL_REPORTS;
  const type = Object.keys(REPORT_TYPE_LABELS).includes(requestedType)
    ? requestedType
    : ALL_REPORTS;
  const status = Object.keys(REPORT_STATUS_LABELS).includes(requestedStatus)
    ? requestedStatus
    : ALL_REPORTS;

  const reports = [...ADMIN_REPORTS].sort(
    (a, b) =>
      new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime() ||
      a.id - b.id,
  );
  const filteredReports = reports.filter(
    (report) =>
      (type === ALL_REPORTS || report.type === type) &&
      (status === ALL_REPORTS || report.status === status),
  );
  const totalPages = Math.ceil(filteredReports.length / PAGE_SIZE);
  const requestedPage = Number(searchParams.get("page"));
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, Math.max(1, totalPages))
      : 1;
  const visibleReports = filteredReports.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  const changeFilter = (key: "type" | "status", value: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value === ALL_REPORTS) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }
    nextParams.delete("page");
    setSearchParams(nextParams);
  };

  const resetFilters = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("type");
    nextParams.delete("status");
    nextParams.delete("page");
    setSearchParams(nextParams);
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
    <section aria-labelledby="admin-reports-title" className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 id="admin-reports-title" className="text-xl font-bold">
          신고 관리
        </h1>
        <span className="text-app-subtext shrink-0 text-sm">
          전체 {reports.length}건
        </span>
      </div>

      <div className="flex flex-wrap items-end gap-2">
        <div className="min-w-32 flex-1 sm:flex-none">
          <label
            htmlFor="admin-report-type"
            className="text-app-subtext mb-1 block text-sm"
          >
            유형
          </label>
          <Select
            value={type}
            onValueChange={(value) => changeFilter("type", value)}
          >
            <SelectTrigger
              id="admin-report-type"
              className="w-full cursor-pointer"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_REPORTS}>전체</SelectItem>
              {Object.entries(REPORT_TYPE_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="min-w-32 flex-1 sm:flex-none">
          <label
            htmlFor="admin-report-status"
            className="text-app-subtext mb-1 block text-sm"
          >
            상태
          </label>
          <Select
            value={status}
            onValueChange={(value) => changeFilter("status", value)}
          >
            <SelectTrigger
              id="admin-report-status"
              className="w-full cursor-pointer"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_REPORTS}>전체</SelectItem>
              {Object.entries(REPORT_STATUS_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={
            !["type", "status", "page"].some((key) => searchParams.has(key))
          }
          onClick={resetFilters}
          className="cursor-pointer"
        >
          초기화
        </Button>
      </div>

      {reports.length === 0 ? (
        <p className="bg-app-card text-app-subtext rounded-2xl px-5 py-12 text-center text-sm">
          접수된 신고가 없습니다.
        </p>
      ) : filteredReports.length === 0 ? (
        <p
          role="status"
          className="bg-app-card text-app-subtext rounded-2xl px-5 py-12 text-center text-sm"
        >
          필터에 맞는 신고가 없습니다.
        </p>
      ) : (
        <AdminReportList reports={visibleReports} />
      )}

      <ListPagination
        page={page}
        totalPages={totalPages}
        label="신고 목록 페이지"
        onPageChange={changePage}
      />
    </section>
  );
}
