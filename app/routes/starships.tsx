import { Link } from 'react-router';
import Card from '~/components/Card';
import Loading from '~/components/Loading';
import Errors from '~/components/Errors';
import useDetails from '~/hooks/useDetails';
import parseURL from '~/utils/parseURL';
import usePagination from '~/hooks/usePagination';
import Pagination from '~/components/Pagination';

const Starships = () => {
  const {
    data: starships,
    loading,
    error,
  } = useDetails({ resource: 'starships' }) as {
    data: any[];
    loading: boolean;
    error: string | null;
  };
  const { currentPageItems, currentPage, totalPages, goToPage } = usePagination(
    {
      items: starships || [],
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
        <div className="bg-starships min-h-screen p-4">
          <h2 className="mb-4 text-center text-2xl font-bold text-amber-500">
            Starships
          </h2>
          <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-2">
            {currentPageItems?.map((starship: any) => (
              <Link
                to={`/${parseURL(starship.url).resource}/${parseURL(starship.url).id}`}
                key={starship.name}
              >
                <Card
                  heading={starship.name}
                  description={`Model: ${starship.model}, Manufacturer: ${starship.manufacturer}, Cost in Credits: ${starship.cost_in_credits}`}
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

export default Starships;
