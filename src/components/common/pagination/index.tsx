'use client';

import clsx from 'clsx';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { PaginationProps } from './types';
import { DISABLED_PAGE_BUTTON_STYLES, PAGE_BUTTON_STYLES, PAGE_GROUP_SIZE } from './constants';

export default function Pagination({
  totalResults,
  currentPage,
  setPage,
  perPage,
}: PaginationProps) {
  const lastPage = Math.ceil(totalResults / perPage);

  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(PAGE_GROUP_SIZE / 2), lastPage - PAGE_GROUP_SIZE + 1),
  );
  const endPage = Math.min(lastPage, startPage + PAGE_GROUP_SIZE - 1);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  const handlePageChange = (targetPage: number) => {
    if (targetPage < 1 || targetPage > lastPage || targetPage === currentPage) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(targetPage);
  };

  const handleGroupChange = (direction: 'prev' | 'next') => {
    const newPage =
      direction === 'prev'
        ? Math.max(1, currentPage - PAGE_GROUP_SIZE)
        : Math.min(lastPage, currentPage + PAGE_GROUP_SIZE);
    handlePageChange(newPage);
  };

  return (
    <div className="flex justify-center items-center gap-4 py-3 text-purple select-none">
      <button onClick={() => handleGroupChange('prev')} disabled={currentPage === 1}>
        <ChevronsLeft
          className={clsx(
            PAGE_BUTTON_STYLES,
            currentPage === 1 && DISABLED_PAGE_BUTTON_STYLES,
            'w-5 h-5',
          )}
        />
      </button>

      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft
          className={clsx(
            PAGE_BUTTON_STYLES,
            currentPage === 1 && DISABLED_PAGE_BUTTON_STYLES,
            'w-5 h-5',
          )}
        />
      </button>

      <div className="flex gap-6">
        {pages.map(page => (
          <button
            key={page}
            className={clsx(
              PAGE_BUTTON_STYLES,
              currentPage === page && 'text-deepPink font-gBold',
              page > lastPage && 'hidden',
            )}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === lastPage}>
        <ChevronRight
          className={clsx(
            PAGE_BUTTON_STYLES,
            lastPage === currentPage && DISABLED_PAGE_BUTTON_STYLES,
            'w-5 h-5',
          )}
        />
      </button>

      <button onClick={() => handleGroupChange('next')} disabled={currentPage === lastPage}>
        <ChevronsRight
          className={clsx(
            PAGE_BUTTON_STYLES,
            lastPage === currentPage && DISABLED_PAGE_BUTTON_STYLES,
            'w-5 h-5',
          )}
        />
      </button>
    </div>
  );
}
