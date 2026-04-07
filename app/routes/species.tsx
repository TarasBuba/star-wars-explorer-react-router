import { Link } from 'react-router';
import Card from '~/components/Card';
import Loading from '~/components/Loading';
import Errors from '~/components/Errors';
import useDetails from '~/hooks/useDetails';
import parseURL from '~/utils/parseURL';
import usePagination from '~/hooks/usePagination';
import Pagination from '~/components/Pagination';
import type { Species } from '~/types/types';

const Species = () => {
  const {
    data: species,
    loading,
    error,
  } = useDetails<Species[]>({ resource: 'species' });
  const { currentPageItems, currentPage, totalPages, goToPage } = usePagination(
    {
      items: species || [],
      itemsPerPage: 10,
    }
  );

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
            {currentPageItems?.map((person: Species) => (
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
          />
        </div>
      )}
    </>
  );
};

export default Species;
