/**
 * 신고 ID로 샘플 신고를 찾고 신고 대상과 처리 이력을 표시한다.
 */
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ADMIN_REPORTS,
  REPORT_STATUS_LABELS,
  REPORT_TYPE_LABELS,
} from "@/data/adminReports";
import { noticeDateTimeFormatter } from "@/lib/date";

export default function AdminReportDetailPage() {
  const { reportId } = useParams();
  const { search } = useLocation();
  const report = ADMIN_REPORTS.find((item) => String(item.id) === reportId);

  useEffect(() => {
    // 목록에서 상세로 이동했을 때 화면 시작 위치를 표시한다.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [reportId]);

  const listLink = (
    <Button asChild variant="outline">
      <Link to={{ pathname: "/admin/reports", search }}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        신고 목록으로 이동
      </Link>
    </Button>
  );

  if (!report) {
    return (
      <section className="mx-auto max-w-2xl space-y-4 py-12 text-center">
        <h1 className="text-xl font-bold">신고를 찾을 수 없습니다.</h1>
        <p className="text-app-subtext text-sm">
          신고 목록에서 확인할 신고를 선택해 주세요.
        </p>
        {listLink}
      </section>
    );
  }

  return (
    <section
      aria-labelledby="admin-report-detail-title"
      className="mx-auto max-w-3xl space-y-5"
    >
      {listLink}
      <h1 id="admin-report-detail-title" className="text-xl font-bold">
        신고 상세
      </h1>

      <section
        aria-labelledby="admin-report-info-title"
        className="bg-app-card border-app-border rounded-2xl border p-5"
      >
        <h2 id="admin-report-info-title" className="font-bold">
          신고 정보
        </h2>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-app-subtext">신고자</dt>
            <dd className="mt-1">{report.reporter}</dd>
          </div>
          <div>
            <dt className="text-app-subtext">신고 사유</dt>
            <dd className="mt-1">{report.reason}</dd>
          </div>
          <div>
            <dt className="text-app-subtext">접수일</dt>
            <dd className="mt-1">
              <time dateTime={report.receivedAt}>
                {noticeDateTimeFormatter.format(new Date(report.receivedAt))}
              </time>
            </dd>
          </div>
          <div>
            <dt className="text-app-subtext">현재 상태</dt>
            <dd className="mt-1 font-semibold">
              {REPORT_STATUS_LABELS[report.status]}
            </dd>
          </div>
        </dl>

        <div className="border-app-border mt-5 border-t pt-4">
          <h3 className="font-semibold">
            신고 대상 · {REPORT_TYPE_LABELS[report.type]}
          </h3>
          <p className="text-app-subtext mt-2 text-sm wrap-anywhere">
            {report.targetSummary}
          </p>
          <p className="bg-app-bg mt-3 rounded-xl p-4 text-sm wrap-anywhere whitespace-pre-wrap">
            {report.targetContent}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="admin-report-history-title"
        className="bg-app-card border-app-border rounded-2xl border p-5"
      >
        <h2 id="admin-report-history-title" className="font-bold">
          처리 이력
        </h2>
        {report.history.length === 0 ? (
          <p className="text-app-subtext mt-3 text-sm">처리 이력이 없습니다.</p>
        ) : (
          <ol className="divide-app-border mt-2 divide-y">
            {report.history.map((entry) => (
              <li key={entry.handledAt} className="space-y-2 py-3 text-sm">
                <p className="font-semibold">
                  {REPORT_STATUS_LABELS[entry.fromStatus]} →{" "}
                  {REPORT_STATUS_LABELS[entry.toStatus]}
                </p>
                <p className="text-app-subtext">
                  <time dateTime={entry.handledAt}>
                    {noticeDateTimeFormatter.format(new Date(entry.handledAt))}
                  </time>
                  {" · "}
                  {entry.operator}
                </p>
                <p className="wrap-anywhere whitespace-pre-wrap">
                  {entry.note}
                </p>
              </li>
            ))}
          </ol>
        )}
      </section>
    </section>
  );
}
