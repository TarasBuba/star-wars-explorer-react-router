import MainLayout from '~/components/layout/MainLayout';
import useDetails from '~/hooks/useDetails';
import { Link, useParams } from 'react-router';
import Errors from '~/components/Errors';
import Loading from '~/components/Loading';
import parseURL from '~/utils/parseURL';

type Vehicles = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots?: string[];
  films?: string[];
};

export default function VehiclesDetail() {
  const { id } = useParams();
  // console.log(id);
  const {
    data: vehicles,
    loading,
    error,
  } = useDetails<Vehicles>({ resource: 'vehicles', id: id });

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
          <section className="grid place-items-center p-4">
            <h2 className="mb-4 text-2xl font-bold">{vehicles?.name}</h2>
            <div className="grid grid-cols-1 gap-4">
              {vehicles && (
                <article className="flex w-full cursor-pointer flex-col gap-2 rounded-lg border border-gray-300 p-4 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
                  <h2 className="mb-4 text-xl font-bold">
                    Model: {vehicles.model}
                  </h2>
                  <p>Manufacturer: {vehicles.manufacturer}</p>
                  <p>Cost in Credits: {vehicles.cost_in_credits}</p>
                  <p>Length: {vehicles.length}</p>
                  <p>
                    Max Atmosphering Speed: {vehicles.max_atmosphering_speed}
                  </p>
                  <p>Crew: {vehicles.crew}</p>
                  <p>Passengers: {vehicles.passengers}</p>
                  <p>Cargo Capacity: {vehicles.cargo_capacity}</p>
                  <p>Consumables: {vehicles.consumables}</p>
                  <p>Vehicle Class: {vehicles.vehicle_class}</p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {vehicles.pilots && (
                      <div>
                        <h3 className="mb-2 text-xl font-bold">Pilots:</h3>
                        <ul>
                          {vehicles.pilots.map((pilotId) => (
                            <li key={pilotId}>
                              <Link
                                to={`/${parseURL(pilotId).resource}/${parseURL(pilotId).id}`}
                                className="text-blue-500 hover:underline"
                              >
                                {pilotId}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {vehicles.films && (
                      <div>
                        <h3 className="mb-2 text-xl font-bold">Films:</h3>
                        <ul>
                          {vehicles.films.map((filmId) => (
                            <li key={filmId}>
                              <Link
                                to={`/${parseURL(filmId).resource}/${parseURL(filmId).id}`}
                                className="text-blue-500 hover:underline"
                              >
                                {filmId}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </article>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
