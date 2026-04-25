import { Link } from 'react-router';
import Card from '~/components/Card';
import useList from '~/hooks/useList';
import parseURL from '~/utils/parseURL';
import usePagination from '~/hooks/usePagination';
import Pagination from '~/components/Pagination';
import type { Organizations } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';

const Organization = () => {
  const {
    data: organizations,
    loading,
    error,
  } = useList<Organizations[]>({ resource: 'organizations' }) as {
    data: Organizations[];
    loading: boolean;
    error: string | null;
  };

  const { currentPageItems, currentPage, totalPages, goToPage } = usePagination(
    {
      items: organizations || [],
      itemsPerPage: 10,
    }
  );

  return (
    <DataWrapper loading={loading} error={error}>
      <div className="bg-organizations min-h-screen p-4">
        <h2 className="mb-4 text-center text-2xl font-bold text-amber-400">
          Organizations
        </h2>
        <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-2">
          {currentPageItems?.map((organization: Organizations) => (
            <Link
              to={`/${parseURL(organization.url).resource}/${parseURL(organization.url).id}`}
              key={organization.name}
            >
              <Card
                heading={organization.name}
                fields={[
                  {
                    label: 'Force Alignment',
                    value: organization.force_alignment,
                  },
                  { label: 'Type', value: organization.type },
                  {
                    label: 'Status',
                    value: organization.status,
                  },
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
export default Organization;
