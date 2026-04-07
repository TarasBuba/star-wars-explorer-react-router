import { Link } from 'react-router';
import Card from '~/components/Card';
import useDetails from '~/hooks/useDetails';
import usePagination from '~/hooks/usePagination';
import Pagination from '~/components/Pagination';
import type { Characters } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';

const Characters = () => {
  const {
    data: characters,
    loading,
    error,
  } = useDetails<Characters[]>({ resource: 'characters' });

  const { currentPageItems, currentPage, totalPages, goToPage } = usePagination(
    {
      items: characters || [],
      itemsPerPage: 10,
    }
  );

  return (
    <DataWrapper loading={loading} error={error}>
      <div className="bg-people min-h-screen p-4">
        <h2 className="mb-4 text-center text-2xl font-bold text-amber-500">
          People
        </h2>
        <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-2">
          {currentPageItems?.map((character: Characters) => (
            <Link to={`/characters/${character.id}`} key={character.name}>
              <div
                key={character.name}
                className="flex items-center justify-between rounded border border-amber-400 p-4 shadow"
              >
                <Card
                  heading={character.name}
                  description={`Height: ${character.height}, Birth Year: ${character.birth_year}, Gender: ${character.gender}`}
                />
              </div>
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

export default Characters;
