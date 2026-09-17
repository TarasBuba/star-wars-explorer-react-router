import { Outlet, NavLink } from 'react-router';
import { useState } from 'react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/characters', label: 'Characters' },
  { to: '/films', label: 'Films' },
  { to: '/planets', label: 'Planets' },
  { to: '/species', label: 'Species' },
  { to: '/starships', label: 'Starships' },
  { to: '/vehicles', label: 'Vehicles' },
  { to: '/organizations', label: 'Orgs' },
  { to: '/weapons', label: 'Weapons' },
  { to: '/droids', label: 'Droids' },
  { to: '/quiz', label: 'Quiz' },
];

const MainLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sw-nav">
        <div className="sw-nav-inner">
          <NavLink
            to="/"
            className="sw-nav-logo"
            onClick={() => setOpen(false)}
          >
            <div className="sw-brand">
              <span className="sw-brand-title">JEDI ARCHIVES</span>
              <span className="sw-brand-subtitle">Data Retrieval System</span>
            </div>
          </NavLink>
          <ul className="sw-nav-links">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    'sw-nav-link' + (isActive ? ' active' : '')
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            className="sw-burger"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span className={`sw-burger-icon${open ? 'open' : ''}`}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>

        {open && (
          <nav className="sw-mobile-menu">
            <ul>
              {links.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      'sw-nav-link-mobile' + (isActive ? ' active' : '')
                    }
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
