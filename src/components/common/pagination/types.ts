export type PaginationProps = {
  totalResults: number;
  currentPage: number;
  setPage: (pageNumber: number) => void;
  perPage: number;
};
