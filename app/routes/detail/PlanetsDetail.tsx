import MainLayout from '~/components/layout/MainLayout';
import useDetails from '~/hooks/useDetails';
import { Link, useParams } from 'react-router';
import Errors from '~/components/Errors';
import Loading from '~/components/Loading';
import parseURL from '~/utils/parseURL';
import LinkResolved from '~/utils/link-resolved';

type Planets = {
  name: string;
  diameter: string;
  climate: string;
  terrain: string;
  population: string;
  gravity: string;
  surface_water: string;
  orbital_period: string;
  rotation_period: string;
  region: string;
  sector: string;
  system: string;
  suns: string;
  moons: string;
  affiliation: string[];
  notable_locations: string[];
  native_species: string[];
  canon: boolean;
};

export default function PlanetsDetail() {
  const { id } = useParams();
  // console.log(id);
  const allDataAffiliated = useDetails<Planets[]>({
    resource: 'organizations',
  });
  // const allDataLocations = useDetails<Planets[]>({
  //   resource: 'planets',
  // });
  const allDataSpecies = useDetails<Planets[]>({
    resource: 'species',
  });

  const {
    data: planet,
    loading,
    error,
  } = useDetails<Planets>({ resource: 'planets', id: id });

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
                    {planet.affiliation && (
                      <div>
                        <h3 className="mb-2 text-xl font-bold">
                          Affiliations:
                        </h3>
                        <ul>
                          {planet.affiliation.map((affiliation) => (
                            <li
                              key={affiliation}
                              className="cursor-pointer text-blue-500 hover:underline"
                            >
                              <LinkResolved
                                key={affiliation}
                                value={affiliation}
                                resource="organizations"
                                idKey="id"
                                matchKey="name"
                                collection={allDataAffiliated.data || []}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div>
                    {planet.notable_locations && (
                      <div>
                        <h3 className="mb-2 text-xl font-bold">
                          Notable Locations:
                        </h3>
                        <ul>
                          {planet.notable_locations.map((location) => (
                            <li
                              key={location}
                              className="cursor-pointer text-blue-500 hover:underline"
                            >
                              {location}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div>
                    {planet.native_species && (
                      <div>
                        <h3 className="mb-2 text-xl font-bold">
                          Native Species:
                        </h3>
                        <ul>
                          {planet.native_species.map((species) => (
                            <li
                              key={species}
                              className="cursor-pointer text-blue-500 hover:underline"
                            >
                              <LinkResolved
                                key={species}
                                value={species}
                                resource="species"
                                idKey="id"
                                matchKey="id"
                                collection={allDataSpecies.data || []}
                              />
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
