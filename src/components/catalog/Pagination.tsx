import { getPageNumbers } from "../../utils/pagination";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const buttonBase =
  "min-h-11 min-w-11 rounded-full border px-3 font-sans text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40";

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={`${buttonBase} border-line enabled:hover:border-accent enabled:hover:text-accent`}
      >
        ‹
      </button>

      {getPageNumbers(page, totalPages).map((p, index) =>
        p === "..." ? (
          <span key={`dots-${index}`} className="px-1 text-muted">…</span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={`${buttonBase} ${
              p === page
                ? "border-accent bg-accent font-semibold text-on-accent"
                : "border-line hover:border-accent hover:text-accent"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className={`${buttonBase} border-line enabled:hover:border-accent enabled:hover:text-accent`}
      >
        ›
      </button>
    </nav>
  );
}
