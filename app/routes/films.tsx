import { Link } from 'react-router';
import Card from '~/components/Card';
import useList from '~/hooks/useList';
import parseURL from '~/utils/parseURL';
import usePagination from '~/hooks/usePagination';
import Pagination from '~/components/Pagination';
import type { Films } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';

const Films = () => {
  const {
    data: films,
    loading,
    error,
  } = useList<Films[]>({ resource: 'films' });
  const { currentPageItems, currentPage, totalPages, goToPage } = usePagination(
    {
      items: films || [],
      itemsPerPage: 10,
    }
  );

  return (
    <DataWrapper loading={loading} error={error}>
      <div className="bg-films min-h-screen p-4 text-amber-500">
        <h2 className="mb-4 text-center text-2xl font-bold">Films</h2>

        {currentPageItems?.map((film: Films) => (
          <Link
            to={`/${parseURL(film.url).resource}/${parseURL(film.url).id}`}
            key={film.episode_id}
          >
            <Card
              heading={film.title}
              description={`Episode ${film.episode_id} `}
            />
          </Link>
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </div>
    </DataWrapper>
  );
};

export default Films;
