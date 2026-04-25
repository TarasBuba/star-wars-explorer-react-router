import useDetails from '~/hooks/useAsync';
import useList from '~/hooks/useList';
import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import DataWrapper from '~/components/DataWrapper';
import type {
  StarshipsDetails,
  Characters,
  Organizations,
} from '~/types/types';

export default function StarshipsDetail() {
  const { id } = useParams();
  const allDataAffiliations = useList<Organizations[]>({
    resource: 'organizations',
  });
  const allDataPilots = useList<Characters[]>({
    resource: 'characters',
  });

  const {
    data: starships,
    loading,
    error,
  } = useDetails<StarshipsDetails>({ resource: 'starships', id: id });

  return (
    <DataWrapper loading={loading} error={error}>
      <div>
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
                                collection={allDataPilots.data || []}
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
                                collection={allDataAffiliations.data || []}
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
      </div>
    </DataWrapper>
  );
}
