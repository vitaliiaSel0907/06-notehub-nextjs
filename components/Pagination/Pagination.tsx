"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={(event: { selected: number }) =>
        onPageChange(event.selected + 1)
      }
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="Prev"
      nextLabel="Next"
      breakLabel="..."
    />
  );
};

export default Pagination;

