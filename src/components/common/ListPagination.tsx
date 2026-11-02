/**
 * 목록의 현재 페이지와 이전·다음 페이지 이동 버튼을 표시한다.
 */
import { Button } from "@/components/ui/button";

interface ListPaginationProps {
  page: number;
  totalPages: number;
  label: string;
  onPageChange: (page: number) => void;
}

export default function ListPagination({
  page,
  totalPages,
  label,
  onPageChange,
}: ListPaginationProps) {
  if (totalPages <= 1) {
    return null;
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
