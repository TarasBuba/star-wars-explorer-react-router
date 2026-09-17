const WarningIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="28"
    height="28"
    aria-hidden="true"
    style={{ color: 'var(--color-sw-gold)', flexShrink: 0 }}
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const Error = ({ message }: { message: string }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '3rem 1rem',
        minHeight: '40vh',
      }}
    >
      <div className="sw-error-card" role="alert">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <WarningIcon />
          <h2
            className="font-display"
            style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 700,
              color: 'var(--color-sw-gold)',
              letterSpacing: '0.06em',
            }}
          >
            System Error
          </h2>
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'var(--color-sw-border)',
          }}
        />

        {/* Message */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-sw-text-muted)',
            lineHeight: 1.6,
          }}
        >
          {message}
        </p>

        {/* Retry */}
        <button
          className="sw-btn-outline"
          onClick={() => window.location.reload()}
          type="button"
        >
          ↺ Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;
