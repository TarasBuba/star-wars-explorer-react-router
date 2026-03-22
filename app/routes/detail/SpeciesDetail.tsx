import MainLayout from '~/components/layout/MainLayout';
import useDetails from '~/hooks/useDetails';
import { Link, useParams } from 'react-router';
import Errors from '~/components/Errors';
import Loading from '~/components/Loading';
import parseURL from '~/utils/parseURL';
import LinkResolved from '~/utils/link-resolved';

type Species = {
  name: string;
  classification: string;
  designation: string;
  average_lifespan: string;
  average_height: string;
  skin_colors: string[];
  hair_colors: string[];
  eye_colors: string[];
  language: string;
  homeworld_id: string;
  force_sensitive: string;
  canon: boolean;
};

export default function SpeciesDetail() {
  const { id } = useParams();
  const allDataHomeworld = useDetails<Species[]>({
    resource: 'planets',
  });
  // console.log(id);
  const {
    data: species,
    loading,
    error,
  } = useDetails<Species>({ resource: 'species', id: id });

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors message={error} />
      ) : (
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
                      collection={allDataHomeworld.data || []}
                    />
                  </p>
                </article>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
