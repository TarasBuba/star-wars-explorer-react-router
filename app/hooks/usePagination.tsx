import { useState } from 'react';
import type { Pagination } from '~/types/types';

const usePagination: <T>(props: Pagination<T>) => {
  currentPageItems: T[];
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
} = <T,>({ items, itemsPerPage }: Pagination<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageItems = items.slice(startIndex, startIndex + itemsPerPage);
  return { currentPageItems, currentPage, totalPages, goToPage };
};

export default usePagination;
