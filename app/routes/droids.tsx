import { Link } from 'react-router';
import Card from '~/components/Card';
import usePagination from '~/hooks/usePagination';
import Pagination from '~/components/Pagination';
import type { Droids } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';
import useAsync from '~/hooks/useAsync';
import { useCallback } from 'react';
import StarWarsListAPI from '~/api/StarWarsListAPI';

const Droids = () => {
  const fetchDroids = useCallback(() => {
    return StarWarsListAPI('droids');
  }, []);
  const { data: droids, loading, error } = useAsync<Droids[]>(fetchDroids);
  const { currentPageItems, currentPage, totalPages, goToPage } = usePagination(
    {
      items: droids || [],
      itemsPerPage: 10,
    }
  );

  return (
    <DataWrapper loading={loading} error={error}>
      <h2 className="mb-4 text-center text-2xl font-bold text-amber-500">
        Droids
      </h2>
      <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-2">
        {currentPageItems?.map((droid: Droids) => (
          <Link to={`/droids/${droid.id}`} key={droid.id}>
            <Card
              heading={droid.name}
              image={droid.image}
              fields={[
                { label: 'Model', value: droid.name },
                {
                  label: 'Description',
                  value: droid.description.slice(0, 30) + '...',
                },
              ]}
            />
          </Link>
        ))}
      </section>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        goToPage={goToPage}
      />
    </DataWrapper>
  );
};

export default Droids;
