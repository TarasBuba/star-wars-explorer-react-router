import { useState } from 'react';

interface Props<T> {
  items: T[];
  itemsPerPage: number;
}

const usePagination: <T>(props: Props<T>) => {
  currentPageItems: T[];
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
} = <T,>({ items, itemsPerPage }: Props<T>) => {
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
