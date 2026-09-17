import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300..600&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '4rem 1rem' }}>
      <h1
        className="font-display"
        style={{
          fontSize: 'var(--text-2xl)',
          color: 'var(--color-sw-gold)',
          marginBottom: '1rem',
        }}
      >
        {message}
      </h1>
      <p style={{ color: 'var(--color-sw-text-muted)', marginBottom: '1rem' }}>
        {details}
      </p>
      {stack && (
        <pre
          style={{
            background: 'var(--color-sw-surface)',
            border: '1px solid var(--color-sw-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            overflowX: 'auto',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-sw-text-muted)',
          }}
        >
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
