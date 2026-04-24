import { Link } from 'react-router';
import Card from '~/components/Card';
import useAsync from '~/hooks/useAsync';
import usePagination from '~/hooks/usePagination';
import Pagination from '~/components/Pagination';
import type { Characters } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';
import { useCallback } from 'react';
import StarWarsListAPI from '~/api/StarWarsListAPI';

const CharactersList = () => {
  const fetchCharacters = useCallback(() => {
    return StarWarsListAPI('characters');
  }, []);
  const {
    data: characters,
    loading,
    error,
  } = useAsync<Characters[]>(fetchCharacters);

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
            <Link to={`/characters/${character.id}`} key={character.id}>
              <Card
                heading={character.name}
                fields={[
                  { label: 'Birth Year', value: character.birth_year },
                  { label: 'Height', value: character.height },
                  { label: 'Gender', value: character.gender },
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

export default CharactersList;
