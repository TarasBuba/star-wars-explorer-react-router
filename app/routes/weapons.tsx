import { Link } from 'react-router';
import Card from '~/components/Card';
import useList from '~/hooks/useList';
import parseURL from '~/utils/parseURL';
import usePagination from '~/hooks/usePagination';
import Pagination from '~/components/Pagination';
import type { Weapons } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';

const Weapons = () => {
  const {
    data: weapons,
    loading,
    error,
  } = useList<Weapons[]>({ resource: 'weapons' });
  const { currentPageItems, currentPage, totalPages, goToPage } = usePagination(
    {
      items: weapons || [],
      itemsPerPage: 10,
    }
  );

  return (
    <DataWrapper loading={loading} error={error}>
      <div className="bg-weapons min-h-screen p-4">
        <h2 className="mb-4 text-center text-2xl font-bold text-amber-400">
          Weapons
        </h2>
        <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-2">
          {currentPageItems?.map((weapon: Weapons) => (
            <Link
              to={`/${parseURL(weapon.url).resource}/${parseURL(weapon.url).id}`}
              key={weapon.url}
            >
              <Card
                heading={weapon.name}
                description={`Type: ${weapon.type}, Model: ${weapon.model}, Color: ${weapon.color}`}
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

export default Weapons;
