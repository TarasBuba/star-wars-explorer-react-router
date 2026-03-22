import type { Route } from './+types/home';
import { Link } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Star Wars Universe' },
    {
      name: 'description',
      content: 'Browse People, Padawans and Masters',
    },
  ];
}

export default function Home() {
  return (
    <div className="bg-main flex min-h-screen min-w-full flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-amber-400">
        Welcome to the Star Wars Universe!
      </h1>
      <div className="flex gap-4 text-2xl text-amber-500 shadow-md">
        <Link to="/films" className="hover:underline">
          Films
        </Link>
        <Link to="/planets" className="hover:underline">
          Planets
        </Link>
        <Link to="/characters" className="hover:underline">
          Characters
        </Link>
        <Link to="/species" className="hover:underline">
          Species
        </Link>
        <Link to="/starships" className="hover:underline">
          Starships
        </Link>
        <Link to="/vehicles" className="hover:underline">
          Vehicles
        </Link>
      </div>
    </div>
  );
}
