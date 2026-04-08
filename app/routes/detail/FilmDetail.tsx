import useDetails from '~/hooks/useDetails';
import useList from '~/hooks/useList';
import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import DataWrapper from '~/components/DataWrapper';
import type {
  FilmDetails,
  Planets,
  Characters,
  Species,
  Organizations,
} from '~/types/types';

export default function FilmDetail() {
  const { id } = useParams();
  const allDataPlanets = useList<Planets[]>({
    resource: 'planets',
  });
  const allDataCharacters = useList<Characters[]>({
    resource: 'characters',
  });
  const allDataSpecies = useList<Species[]>({
    resource: 'species',
  });
  const allDataOrganizations = useList<Organizations[]>({
    resource: 'organizations',
  });
  const {
    data: film,
    loading,
    error,
  } = useDetails<FilmDetails>({ resource: 'films', id: id });

  return (
    <DataWrapper loading={loading} error={error}>
      <div className="p-4">
        {film && (
          <div>
            <h1 className="text-center text-4xl font-bold">{film.title}</h1>
            <h2 className="mb-4 text-center text-2xl font-bold">
              Episode {film.episode_id}
            </h2>
            <div className="mb-4 flex flex-col gap-4 rounded-lg border border-gray-300 p-4 shadow-md">
              <div className="mb-4 flex items-center justify-center gap-4 text-gray-700">
                <p className="mb-4 text-gray-700">Director: {film.director}</p>
                <p className="mb-4 text-gray-700">Producer: {film.producer}</p>
                <p className="mb-4 text-gray-700">
                  Release Date: {film.release_date}
                </p>
              </div>
              <div className="mb-4 flex flex-col items-center justify-center gap-4 text-gray-700">
                <p className="mb-4 text-gray-700">
                  Timeline Date: {film.timeline_date}
                </p>
                <p className="mb-4 text-gray-700">{film.opening_crawl}</p>
              </div>
            </div>

            <section className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-2">
              <article>
                {film.characters && (
                  <div>
                    <h3 className="mb-2 text-xl font-bold">Characters:</h3>
                    <ul>
                      {film.characters.map((character: string) => (
                        <li key={character}>
                          <LinkResolved
                            key={character}
                            value={character}
                            resource="characters"
                            idKey="id"
                            matchKey="id"
                            collection={allDataCharacters.data || []}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>

              <article>
                {film.planets && (
                  <div>
                    <h3 className="mb-2 text-xl font-bold">Planets:</h3>
                    <ul>
                      {film.planets.map((planet: string) => (
                        <li key={planet}>
                          <LinkResolved
                            key={planet}
                            value={planet}
                            resource="planets"
                            idKey="id"
                            matchKey="id"
                            collection={allDataPlanets.data || []}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>

              <article>
                {film.species && (
                  <div>
                    <h3 className="mb-2 text-xl font-bold">Species:</h3>
                    <ul>
                      {film.species.map((specie: string) => (
                        <li key={specie}>
                          <LinkResolved
                            key={specie}
                            value={specie}
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
              </article>

              <article>
                {film.organizations && (
                  <div>
                    <h3 className="mb-2 text-xl font-bold">Organizations:</h3>
                    <ul>
                      {film.organizations.map((org: string) => (
                        <li key={org}>
                          <LinkResolved
                            key={org}
                            value={org}
                            resource="organizations"
                            idKey="id"
                            matchKey="id"
                            collection={allDataOrganizations.data || []}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            </section>
          </div>
        )}
      </div>
    </DataWrapper>
  );
}
