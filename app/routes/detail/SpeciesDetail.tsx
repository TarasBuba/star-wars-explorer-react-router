import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import type { SpeciesDetails, Planets } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';
import { getAllPlanets } from '~/api/StarWarsAPI';
import useAsync from '~/hooks/useAsync';
import { useCallback } from 'react';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';

export default function SpeciesDetail() {
  const { id } = useParams();

  const fetchSpeciesDetails = useCallback(() => {
    return StarWarsDetailsAPI('species', id || '');
  }, [id]);

  const { data: allDataHomeworld } = useAsync<Planets[]>(getAllPlanets);

  const {
    data: species,
    loading,
    error,
  } = useAsync<SpeciesDetails>(fetchSpeciesDetails);

  return (
    <DataWrapper loading={loading} error={error}>
      <div>
        <section className="flex flex-col items-center justify-center gap-4 p-4">
          <h2 className="mb-4 text-2xl font-bold">{species?.name}</h2>
          <div className="grid grid-cols-1 gap-4">
            {species && (
              <article className="cursor-pointer rounded-lg border border-gray-300 p-4 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <h2 className="mb-4 text-xl font-bold">
                  Classification: {species.classification}
                </h2>
                <p>Average Lifespan: {species.average_lifespan}</p>
                <p>Designation: {species.designation}</p>
                <p>Average Height: {species.average_height}</p>
                <p>
                  Skin Colors:{' '}
                  {species.skin_colors.map((color) => (
                    <span key={color}>{color}, </span>
                  ))}
                </p>
                <p>
                  Hair Colors:{' '}
                  {species.hair_colors.map((color) => (
                    <span key={color}>{color}, </span>
                  ))}
                </p>
                <p>
                  Eye Colors:{' '}
                  {species.eye_colors.map((color) => (
                    <span key={color}>{color}, </span>
                  ))}
                </p>
                <p>Language: {species.language}</p>
                <p>
                  Homeworld:{' '}
                  <LinkResolved
                    key={species.homeworld_id}
                    value={species.homeworld_id}
                    resource="planets"
                    matchKey="id"
                    idKey="id"
                    collection={allDataHomeworld || []}
                  />
                </p>
              </article>
            )}
          </div>
        </section>
      </div>
    </DataWrapper>
  );
}
