import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import type { PlanetsDetails, Organizations, Species } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import StarWarsListAPI from '~/api/StarWarsListAPI';
import useAsync from '~/hooks/useAsync';
import { useCallback } from 'react';

export default function PlanetsDetail() {
  const { id } = useParams();

  const fetchOrganisations = useCallback(() => {
    return StarWarsListAPI('organizations');
  }, []);
  const { data: allDataAffiliated } =
    useAsync<Organizations[]>(fetchOrganisations);

  const fetchSpecies = useCallback(() => {
    return StarWarsListAPI('species');
  }, []);
  const { data: allDataSpecies } = useAsync<Species[]>(fetchSpecies);

  const fetchPlanetDetails = useCallback(() => {
    return StarWarsDetailsAPI('planets', id || '');
  }, [id]);
  const {
    data: planet,
    loading,
    error,
  } = useAsync<PlanetsDetails>(fetchPlanetDetails);

  return (
    <DataWrapper loading={loading} error={error}>
      <div>
        <section className="p-4">
          {planet && (
            <article className="grid cursor-pointer grid-cols-1 gap-4 rounded-lg border border-gray-300 p-4 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
              <h1 className="text-center text-4xl font-bold">{planet.name}</h1>
              <p className="mb-4 text-center text-2xl font-bold">
                Diameter: {planet.diameter}
              </p>
              <p className="mb-4 text-center text-2xl font-bold">
                Climate: {planet.climate}
              </p>
              <p className="mb-4 text-center text-2xl font-bold">
                Population: {planet.population}
              </p>
              <p className="mb-4 text-center text-2xl font-bold">
                Terrain: {planet.terrain}
              </p>
              <p className="mb-4 text-center text-2xl font-bold">
                Rotation Period: {planet.rotation_period}
              </p>
              <p className="mb-4 text-center text-2xl font-bold">
                Orbital Period: {planet.orbital_period}
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  {planet.affiliation && (
                    <div>
                      <h3 className="mb-2 text-xl font-bold">Affiliations:</h3>
                      <ul>
                        {planet.affiliation.map((affiliation) => (
                          <li
                            key={affiliation}
                            className="cursor-pointer text-blue-500 hover:underline"
                          >
                            <LinkResolved
                              value={affiliation}
                              resource="organizations"
                              idKey="id"
                              matchKey="name"
                              collection={allDataAffiliated || []}
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
                              value={species}
                              resource="species"
                              idKey="id"
                              matchKey="id"
                              collection={allDataSpecies || []}
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
    </DataWrapper>
  );
}
