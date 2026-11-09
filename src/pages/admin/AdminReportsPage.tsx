/**
 * 샘플 신고를 최신 접수순으로 정렬해 운영자 콘솔에 표시한다.
 */
import AdminReportList from "@/components/admin/AdminReportList";
import { ADMIN_REPORTS } from "@/data/adminReports";

export default function AdminReportsPage() {
  const reports = [...ADMIN_REPORTS].sort(
    (a, b) =>
      new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime() ||
      a.id - b.id,
  );

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

      {reports.length === 0 ? (
        <p className="bg-app-card text-app-subtext rounded-2xl px-5 py-12 text-center text-sm">
          접수된 신고가 없습니다.
        </p>
      ) : (
        <AdminReportList reports={reports} />
      )}
    </section>
  );
}
