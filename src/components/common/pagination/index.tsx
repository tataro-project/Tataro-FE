'use client';

import { useMemo } from 'react';
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { PAGE_GROUP_SIZE } from './constants';

interface PaginationProps {
  totalResults: number;
  currentPage: number;
  setPage: (pageNumber: number) => void;
  perPage?: number;
}

export default function Pagination({
  totalResults,
  currentPage,
  setPage,
  perPage = 9,
}: PaginationProps) {
  const pageGroup = Math.ceil(currentPage / PAGE_GROUP_SIZE);

  const totalPages = useMemo(() => Math.ceil(totalResults / perPage), [totalResults, perPage]);

  const firstPageOfGroup = useMemo(() => (pageGroup - 1) * PAGE_GROUP_SIZE + 1, [pageGroup]);

  const pages = useMemo(
    () => Array.from({ length: PAGE_GROUP_SIZE }, (_, index) => firstPageOfGroup + index),
    [firstPageOfGroup],
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    if ((page === 1 && currentPage === 1) || (page === totalPages && currentPage === totalPages))
      return;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(page);
  };

  const handleGroupChange = (direction: 'prev' | 'next') => {
    const newPage =
      direction === 'prev'
        ? Math.max(1, currentPage - PAGE_GROUP_SIZE)
        : Math.min(totalPages, currentPage + PAGE_GROUP_SIZE);
    handlePageChange(newPage);
  };

  return (
    <div className="flex justify-center items-center gap-4 py-3">
      <button onClick={() => handleGroupChange('prev')} disabled={currentPage === 1}>
        <ChevronsLeft className="w-5 h-5" />
      </button>

      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex gap-6">
        {pages.map(page => (
          <button
            key={page}
            className={clsx(
              'w-2',
              currentPage === page && 'text-deepPink font-gBold',
              page > totalPages && 'hidden',
            )}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <button onClick={() => handleGroupChange('next')} disabled={currentPage === totalPages}>
        <ChevronsRight className="w-5 h-5" />
      </button>
    </div>
  );
}
