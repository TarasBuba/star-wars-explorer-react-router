import useDetails from '~/hooks/useDetails';
import useList from '~/hooks/useList';
import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import type { PlanetsDetails, Organizations, Species } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';

export default function PlanetsDetail() {
  const { id } = useParams();
  // console.log(id);
  const allDataAffiliated = useList<Organizations[]>({
    resource: 'organizations',
  });

  const allDataSpecies = useList<Species[]>({
    resource: 'species',
  });

  const {
    data: planet,
    loading,
    error,
  } = useDetails<PlanetsDetails>({ resource: 'planets', id: id });

  return (
    <DataWrapper loading={loading} error={error}>
      <div>
        <section className="p-4">
          {planet && (
            <article className="grid cursor-pointer grid-cols-1 gap-4 rounded-lg border border-gray-300 p-4 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
              <h1 className="text-center text-4xl font-bold">{planet.name}</h1>
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
                      <h3 className="mb-2 text-xl font-bold">Affiliations:</h3>
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
    </DataWrapper>
  );
}
