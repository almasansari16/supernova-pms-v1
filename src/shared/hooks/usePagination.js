import { useEffect, useState } from "react";

/* Client-side paging over `rows`; jumps back to page 1 whenever `resetKeys` change. */
export function usePagination(rows, perPage, resetKeys = []) {
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(rows.length / perPage));
  const view = rows.slice((page - 1) * perPage, page * perPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setPage(1), resetKeys);
  return { page, setPage, pages, view, perPage };
}
