import { Link } from 'react-router';
import Card from '~/components/Card';
import usePagination from '~/hooks/usePagination';
import Pagination from '~/components/Pagination';
import DataWrapper from '~/components/DataWrapper';
import useAsync from '~/hooks/useAsync';
import { useCallback } from 'react';
import StarWarsListAPI from '~/api/StarWarsListAPI';
import type { Creatures } from '~/types/types';

const Creatures = () => {
  const fetchCreatures = useCallback(() => {
    return StarWarsListAPI('creatures');
  }, []);
  const {
    data: creatures,
    loading,
    error,
  } = useAsync<Creatures[]>(fetchCreatures);
  const { currentPageItems, currentPage, totalPages, goToPage } = usePagination(
    {
      items: creatures || [],
      itemsPerPage: 10,
    }
  );

  return (
    <DataWrapper loading={loading} error={error}>
      <h2 className="mb-4 text-center text-2xl font-bold text-amber-500">
        Creatures
      </h2>
      <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-2">
        {currentPageItems?.map((creature: Creatures) => (
          <Link to={`/creatures/${creature.id}`} key={creature.id}>
            <Card
              heading={creature.name}
              image={creature.image}
              fields={[
                { label: 'Name', value: creature.name },
                {
                  label: 'Description',
                  value: creature.description.slice(0, 30) + '...',
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

export default Creatures;
