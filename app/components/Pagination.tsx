const Pagination = ({
  currentPage,
  totalPages,
  goToPage,
}: {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}) => {
  return (
    <div className="flex items-center justify-center space-x-4 p-4">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md bg-amber-500 px-4 py-2 text-2xl text-white disabled:opacity-50"
      >
        &larr;
      </button>
      <span className="px-4 py-2 text-amber-500">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md bg-amber-500 px-4 py-2 text-2xl text-white disabled:opacity-50"
      >
        &rarr;
      </button>
    </div>
  );
};

export default Pagination;
