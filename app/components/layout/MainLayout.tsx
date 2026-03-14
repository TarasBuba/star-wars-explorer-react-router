import { Outlet, Link } from 'react-router';

const MainLayout = () => {
  return (
    <>
      <header>
        <nav>
          <ul className="flex justify-center gap-4 bg-gray-800 p-4 text-amber-400">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/people">People</Link>
            </li>
            <li>
              <Link to="/films">Films</Link>
            </li>
            <li>
              <Link to="/planets">Planets</Link>
            </li>
            <li>
              <Link to="/species">Species</Link>
            </li>
            <li>
              <Link to="/starships">Starships</Link>
            </li>
            <li>
              <Link to="/vehicles">Vehicles</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
