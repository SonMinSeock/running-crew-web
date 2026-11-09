/**
 * 목록의 이전·다음 또는 숫자형 페이지 이동 버튼을 표시한다.
 */
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MAX_VISIBLE_PAGES = 5;

interface ListPaginationProps {
  page: number;
  totalPages: number;
  label: string;
  onPageChange: (page: number) => void;
  variant?: "simple" | "numbered";
}

export default function ListPagination({
  page,
  totalPages,
  label,
  onPageChange,
  variant = "simple",
}: ListPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  if (variant === "numbered") {
    const visiblePageCount = Math.min(totalPages, MAX_VISIBLE_PAGES);
    // 현재 페이지를 가운데에 두되 양 끝에서는 표시 범위를 고정한다.
    const firstVisiblePage = Math.max(
      1,
      Math.min(
        page - Math.floor(visiblePageCount / 2),
        totalPages - visiblePageCount + 1,
      ),
    );
    const visiblePages = Array.from(
      { length: visiblePageCount },
      (_, index) => firstVisiblePage + index,
    );

    return (
      <nav
        aria-label={label}
        className="mt-6 flex flex-wrap items-center justify-center gap-1 sm:gap-2"
      >
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="첫 페이지로 이동"
          disabled={page <= 1}
          onClick={() => onPageChange(1)}
          className="cursor-pointer"
        >
          <ChevronsLeft aria-hidden="true" />
        </Button>
        {visiblePages.map((visiblePage) => (
          <Button
            key={visiblePage}
            type="button"
            variant={visiblePage === page ? "default" : "outline"}
            aria-label={`${visiblePage}페이지`}
            aria-current={visiblePage === page ? "page" : undefined}
            onClick={() => onPageChange(visiblePage)}
            className="min-w-8 cursor-pointer"
          >
            {visiblePage}
          </Button>
        ))}
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="마지막 페이지로 이동"
          disabled={page >= totalPages}
          onClick={() => onPageChange(totalPages)}
          className="cursor-pointer"
        >
          <ChevronsRight aria-hidden="true" />
        </Button>
      </nav>
    );
  }

  return (
    <nav
      aria-label={label}
      className="mt-6 flex items-center justify-center gap-3"
    >
      <Button
        type="button"
        variant="outline"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        이전
      </Button>
      <span role="status" className="text-app-subtext text-sm">
        {page} / {totalPages}
      </span>
      <Button
        type="button"
        variant="outline"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        다음
      </Button>
    </nav>
  );
}
