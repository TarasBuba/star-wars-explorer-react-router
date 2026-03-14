import MainLayout from '~/components/layout/MainLayout';
import useDetails from '~/hooks/useDetails';
import { Link, useParams } from 'react-router';
import Errors from '~/components/Errors';
import Loading from '~/components/Loading';
import parseURL from '~/utils/parseURL';

type Species = {
  name: string;
  classification: string;
  average_lifespan: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  language: string;
  homeworld: string;
  people?: string[];
  films?: string[];
};

export default function SpeciesDetail() {
  const { id } = useParams();
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
          <section className="p-4">
            <h2 className="mb-4 text-2xl font-bold">{species?.name}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {species && (
                <article className="cursor-pointer rounded-lg border border-gray-300 p-4 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
                  <h2 className="mb-4 text-xl font-bold">
                    Classification: {species.classification}
                  </h2>
                  <p>Average Lifespan: {species.average_lifespan}</p>
                  <p>Designation: {species.designation}</p>
                  <p>Average Height: {species.average_height}</p>
                  <p>Skin Colors: {species.skin_colors}</p>
                  <p>Hair Colors: {species.hair_colors}</p>
                  <p>Eye Colors: {species.eye_colors}</p>
                  <p>Language: {species.language}</p>
                  <p>
                    Homeworld:{' '}
                    <a
                      href={`/${parseURL(species.homeworld).resource}/${parseURL(species.homeworld).id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {species.homeworld}
                    </a>
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
