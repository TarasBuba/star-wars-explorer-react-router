import MainLayout from '~/components/layout/MainLayout';
import useDetails from '~/hooks/useDetails';
import { Link, useParams } from 'react-router';
import Errors from '~/components/Errors';
import Loading from '~/components/Loading';
import parseURL from '~/utils/parseURL';

type Planets = {
  name: string;
  diameter: string;
  climate: string;
  population: string;
  terrain: string;
  residents: string[];
  films: string[];
  rotation_period: string;
  orbital_period: string;
};

export default function PlanetsDetail() {
  const { id } = useParams();
  // console.log(id);
  const {
    data: planet,
    loading,
    error,
  } = useDetails<Planets>({ resource: 'planets', id: id });

  const getID = (url: string) => {
    const parts = url.split('/').filter(Boolean);
    return { resource: parts[parts.length - 2], id: parts[parts.length - 1] };
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors message={error} />
      ) : (
        <div>
          <section className="p-4">
            {planet && (
              <article className="grid cursor-pointer grid-cols-1 gap-4 rounded-lg border border-gray-300 p-4 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <h1 className="text-center text-4xl font-bold">
                  {planet.name}
                </h1>
                <h2 className="mb-4 text-center text-2xl font-bold">
                  Diameter: {planet.diameter}
                </h2>
                <h2 className="mb-4 text-center text-2xl font-bold">
                  Climate: {planet.climate}
                </h2>
                <h2 className="mb-4 text-center text-2xl font-bold">
                  Population: {planet.population}
                </h2>
                <h2 className="mb-4 text-center text-2xl font-bold">
                  Terrain: {planet.terrain}
                </h2>
                <h2 className="mb-4 text-center text-2xl font-bold">
                  Rotation Period: {planet.rotation_period}
                </h2>
                <h2 className="mb-4 text-center text-2xl font-bold">
                  Orbital Period: {planet.orbital_period}
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    {planet.residents && (
                      <div>
                        <h3 className="mb-2 text-xl font-bold">Residents:</h3>
                        <ul>
                          {planet.residents.map((resident) => (
                            <li
                              key={resident}
                              className="cursor-pointer text-blue-500 hover:underline"
                            >
                              <Link
                                to={`/${parseURL(resident).resource}/${parseURL(resident).id}`}
                              >
                                {resident}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div>
                    {planet.films && (
                      <div>
                        <h3 className="mb-2 text-xl font-bold">Films:</h3>
                        <ul>
                          {planet.films.map((film) => (
                            <li
                              key={film}
                              className="cursor-pointer text-blue-500 hover:underline"
                            >
                              <Link
                                to={`/${parseURL(film).resource}/${parseURL(film).id}`}
                              >
                                {film}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )}
          </section>
        </div>
      )}
    </>
  );
}
