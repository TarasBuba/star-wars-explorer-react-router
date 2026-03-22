import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import Card from '~/components/Card';
import useDetails from '~/hooks/useDetails';
import parseURL from '~/utils/parseURL';
import Loading from '~/components/Loading';
import Errors from '~/components/Errors';

interface Planets {
  name: string;
  population: string;
  climate: string;
  terrain: string;
  url: string;
}

const Planets = () => {
  const {
    data: planets,
    loading,
    error,
  } = useDetails<Planets[]>({ resource: 'planets' });

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors message={error} />
      ) : (
        <div className="bg-planets min-h-screen p-4">
          <h2 className="mb-4 text-center text-2xl font-bold text-amber-500">
            Planets
          </h2>
          <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-2">
            {planets?.map((planet: Planets) => (
              <Link
                to={`/${parseURL(planet.url).resource}/${parseURL(planet.url).id}`}
                key={planet.name}
              >
                <Card
                  heading={planet.name}
                  description={`Population: ${planet.population}, Climate: ${planet.climate}, Terrain: ${planet.terrain}`}
                />
              </Link>
            ))}
          </section>
        </div>
      )}
    </>
  );
};

export default Planets;
