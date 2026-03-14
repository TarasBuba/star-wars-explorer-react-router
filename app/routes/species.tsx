import { Link } from 'react-router';
import Card from '~/components/Card';
import Loading from '~/components/Loading';
import Errors from '~/components/Errors';
import useDetails from '~/hooks/useDetails';
import parseURL from '~/utils/parseURL';

interface Species {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  url: string;
}

const Species = () => {
  const {
    data: species,
    loading,
    error,
  } = useDetails<Species[]>({ resource: 'species' });

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors message={error} />
      ) : (
        <div className="bg-species min-h-screen p-4">
          <h2 className="mb-4 text-center text-2xl font-bold text-amber-500">
            Species
          </h2>
          <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-2">
            {species?.map((person: Species) => (
              <Link
                to={`/${parseURL(person.url).resource}/${parseURL(person.url).id}`}
                key={person.name}
              >
                <Card
                  heading={person.name}
                  description={`Classification: ${person.classification}, Designation: ${person.designation}, Average Height: ${person.average_height}, Average Lifespan: ${person.average_lifespan}`}
                />
              </Link>
            ))}
          </section>
        </div>
      )}
    </>
  );
};

export default Species;
