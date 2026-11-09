/**
 * 운영자 신고 목록을 화면 너비에 따라 표 또는 세로 목록으로 표시한다.
 */
import { Link, useLocation } from "react-router-dom";
import {
  REPORT_STATUS_LABELS,
  REPORT_TYPE_LABELS,
  type AdminReport,
} from "@/data/adminReports";
import { noticeDateTimeFormatter } from "@/lib/date";

const reportLinkClassName =
  "hover:text-app-accent focus-visible:outline-app-accent rounded underline decoration-app-border underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2";

interface AdminReportListProps {
  reports: AdminReport[];
}

export default function AdminReportList({ reports }: AdminReportListProps) {
  const { search } = useLocation();

  return (
    <div className="bg-app-card border-app-border overflow-hidden rounded-2xl border">
      <table className="hidden w-full table-fixed text-left text-sm md:table">
        <caption className="sr-only">신고 목록</caption>
        <thead className="bg-app-text/5 text-app-subtext">
          <tr>
            <th scope="col" className="w-[12%] px-4 py-3">
              유형
            </th>
            <th scope="col" className="w-[32%] px-4 py-3">
              대상 요약
            </th>
            <th scope="col" className="w-[17%] px-4 py-3">
              신고 사유
            </th>
            <th scope="col" className="w-[14%] px-4 py-3">
              상태
            </th>
            <th scope="col" className="w-1/4 px-4 py-3">
              접수일
            </th>
          </tr>
        </thead>
        <tbody className="divide-app-border divide-y">
          {reports.map((report) => (
            <tr key={report.id}>
              <td className="text-app-subtext px-4 py-4">
                {REPORT_TYPE_LABELS[report.type]}
              </td>
              <th scope="row" className="px-4 py-4 font-semibold wrap-anywhere">
                <Link
                  to={{ pathname: `/admin/reports/${report.id}`, search }}
                  className={reportLinkClassName}
                >
                  {report.targetSummary}
                </Link>
              </th>
              <td className="text-app-subtext px-4 py-4">{report.reason}</td>
              <td className="px-4 py-4">
                {REPORT_STATUS_LABELS[report.status]}
              </td>
              <td className="text-app-subtext px-4 py-4">
                <time dateTime={report.receivedAt}>
                  {noticeDateTimeFormatter.format(new Date(report.receivedAt))}
                </time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="divide-app-border divide-y md:hidden">
        {reports.map((report) => (
          <li key={report.id} className="px-4 py-4">
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-app-subtext text-xs">유형</dt>
                <dd className="mt-1">{REPORT_TYPE_LABELS[report.type]}</dd>
              </div>
              <div>
                <dt className="text-app-subtext text-xs">대상 요약</dt>
                <dd className="mt-1 font-semibold wrap-anywhere">
                  <Link
                    to={{ pathname: `/admin/reports/${report.id}`, search }}
                    className={reportLinkClassName}
                  >
                    {report.targetSummary}
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="text-app-subtext text-xs">신고 사유</dt>
                <dd className="mt-1">{report.reason}</dd>
              </div>
              <div>
                <dt className="text-app-subtext text-xs">상태</dt>
                <dd className="mt-1">{REPORT_STATUS_LABELS[report.status]}</dd>
              </div>
              <div>
                <dt className="text-app-subtext text-xs">접수일</dt>
                <dd className="mt-1">
                  <time dateTime={report.receivedAt}>
                    {noticeDateTimeFormatter.format(
                      new Date(report.receivedAt),
                    )}
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
