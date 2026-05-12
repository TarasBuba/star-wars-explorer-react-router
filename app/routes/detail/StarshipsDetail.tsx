import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import DataWrapper from '~/components/DataWrapper';
import type {
  StarshipsDetails,
  Characters,
  Organizations,
} from '~/types/types';
import { useCallback } from 'react';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import useAsync from '~/hooks/useAsync';
import { getAllCharacters, getAllOrganizations } from '~/api/StarWarsAPI';
import Card from '~/components/Card';

export default function StarshipsDetail() {
  const { id } = useParams();

  const fetchStarshipDetails = useCallback(() => {
    return StarWarsDetailsAPI('starships', id || '');
  }, [id]);

  const { data: allDataAffiliations } =
    useAsync<Organizations[]>(getAllOrganizations);
  const { data: allDataPilots } = useAsync<Characters[]>(getAllCharacters);

  const {
    data: starships,
    loading,
    error,
  } = useAsync<StarshipsDetails>(fetchStarshipDetails);

  return (
    <DataWrapper loading={loading} error={error}>
      {/* <div>
        <section className="grid place-items-center p-4">
          <h2 className="mb-4 text-2xl font-bold">{starships?.name}</h2>
          <div className="grid grid-cols-1 gap-4">
            {starships && (
              <article className="flex w-full cursor-pointer flex-col gap-2 rounded-lg border border-gray-300 p-4 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <h2 className="mb-4 text-xl font-bold">
                  Model: {starships.model}
                </h2>
                <p>Manufacturer: {starships.manufacturer}</p>
                <p>Cost in Credits: {starships.cost_in_credits}</p>
                <p>Length: {starships.length}</p>
                <p>
                  Max Atmosphering Speed: {starships.max_atmosphering_speed}
                </p>
                <p>Crew: {starships.crew}</p>
                <p>Passengers: {starships.passengers}</p>
                <p>Cargo Capacity: {starships.cargo_capacity}</p>
                <p>Consumables: {starships.consumables}</p>
                <p>Hyperdrive Rating: {starships.hyperdrive_rating}</p>
                <p>MGLT: {starships.MGLT}</p>
                <p>Starship Class: {starships.starship_class}</p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    {starships.pilots && (
                      <div>
                        <h3 className="mb-2 text-xl font-bold">Pilots:</h3>
                        <ul>
                          {starships.pilots.map((pilot) => (
                            <li
                              key={pilot}
                              className="cursor-pointer text-blue-500 hover:underline"
                            >
                              <LinkResolved
                                key={pilot}
                                value={pilot}
                                resource="characters"
                                matchKey="id"
                                idKey="id"
                                collection={allDataPilots || []}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div>
                    {starships.affiliations && (
                      <div>
                        <h3 className="mb-2 text-xl font-bold">
                          Affiliations:
                        </h3>
                        <ul>
                          {starships.affiliations.map((affiliation) => (
                            <li
                              key={affiliation}
                              className="cursor-pointer text-blue-500 hover:underline"
                            >
                              <LinkResolved
                                key={affiliation}
                                value={affiliation}
                                resource="organizations"
                                matchKey="name"
                                idKey="id"
                                collection={allDataAffiliations || []}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold">Armament:</h3>
                    <ul>
                      {starships.armament.map((weapon, index) => (
                        <li key={index}>{weapon}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            )}
          </div>
        </section>
      </div> */}
      <Card
        heading={starships?.name}
        fields={[
          { label: 'Model', value: starships?.model },
          { label: 'Manufacturer', value: starships?.manufacturer },
          { label: 'Cost in Credits', value: starships?.cost_in_credits },
          { label: 'Length', value: starships?.length },
          {
            label: 'Max Atmosphering Speed',
            value: starships?.max_atmosphering_speed,
          },
          { label: 'Crew', value: starships?.crew },
          { label: 'Passengers', value: starships?.passengers },
          { label: 'Cargo Capacity', value: starships?.cargo_capacity },
          { label: 'Consumables', value: starships?.consumables },
          { label: 'Hyperdrive Rating', value: starships?.hyperdrive_rating },
          { label: 'MGLT', value: starships?.MGLT },
          { label: 'Starship Class', value: starships?.starship_class },
          {
            label: 'Pilots',
            value: starships?.pilots?.map((pilot) => (
              <span key={pilot}>
                <LinkResolved
                  key={pilot}
                  value={pilot}
                  resource="characters"
                  matchKey="id"
                  idKey="id"
                  collection={allDataPilots || []}
                />
                {' | '}
              </span>
            )),
          },
          {
            label: 'Affiliations',
            value: starships?.affiliations?.map((affiliation) => (
              <span key={affiliation}>
                <LinkResolved
                  key={affiliation}
                  value={affiliation}
                  resource="organizations"
                  matchKey="name"
                  idKey="id"
                  collection={allDataAffiliations || []}
                />
                {' | '}
              </span>
            )),
          },
          {
            label: 'Armament',
            value: starships?.armament?.map((weapon, index) => (
              <span key={index}>
                {weapon}
                {' | '}
              </span>
            )),
          },
        ]}
      />
    </DataWrapper>
  );
}
