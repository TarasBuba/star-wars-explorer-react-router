import type React from 'react';

const Loading: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        minHeight: '50vh',
      }}
      role="status"
      aria-label="Loading content"
    >
      <div className="sw-spinner" aria-hidden="true" />
      <span
        className="font-display"
        style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--color-sw-gold-dim)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        Loading
      </span>
    </div>
  );
};

export default Loading;
