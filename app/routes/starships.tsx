import { Link } from 'react-router';
import Card from '~/components/Card';
import useList from '~/hooks/useList';
import parseURL from '~/utils/parseURL';
import usePagination from '~/hooks/usePagination';
import Pagination from '~/components/Pagination';
import type { Starships } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';

const Starships = () => {
  const {
    data: starships,
    loading,
    error,
  } = useList<Starships[]>({ resource: 'starships' });
  const { currentPageItems, currentPage, totalPages, goToPage } = usePagination(
    {
      items: starships || [],
      itemsPerPage: 10,
    }
  );

  return (
    <DataWrapper loading={loading} error={error}>
      <div className="bg-starships min-h-screen p-4">
        <h2 className="mb-4 text-center text-2xl font-bold text-amber-500">
          Starships
        </h2>
        <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-2">
          {currentPageItems?.map((starship: Starships) => (
            <Link
              to={`/${parseURL(starship.url).resource}/${parseURL(starship.url).id}`}
              key={starship.name}
            >
              <Card
                heading={starship.name}
                fields={[
                  { label: 'Model', value: starship.model },
                  { label: 'Manufacturer', value: starship.manufacturer },
                  { label: 'Cost in Credits', value: starship.cost_in_credits },
                ]}
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
    </DataWrapper>
  );
};

export default Starships;
