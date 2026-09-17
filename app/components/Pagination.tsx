const ArrowLeft = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="14"
    height="14"
    aria-hidden="true"
  >
    <polyline points="10 4 6 8 10 12" />
  </svg>
);

const ArrowRight = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="14"
    height="14"
    aria-hidden="true"
  >
    <polyline points="6 4 10 8 6 12" />
  </svg>
);

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
    <nav
      aria-label="Pagination"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '1.5rem 1rem',
      }}
    >
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="sw-pagination-btn"
        aria-label="Previous page"
      >
        <ArrowLeft />
      </button>

      <span className="sw-pagination-info">
        <span style={{ color: 'var(--color-sw-gold)' }}>{currentPage}</span>
        {' / '}
        {totalPages}
      </span>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="sw-pagination-btn"
        aria-label="Next page"
      >
        <ArrowRight />
      </button>
    </nav>
  );
};

export default Pagination;
