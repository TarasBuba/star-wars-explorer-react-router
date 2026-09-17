import { Link } from 'react-router';
import Card from '~/components/Card';
import parseURL from '~/utils/parseURL';
import usePagination from '~/hooks/usePagination';
import Pagination from '~/components/Pagination';
import type { Vehicles } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';
import useAsync from '~/hooks/useAsync';
import StarWarsListAPI from '~/api/StarWarsListAPI';

const Vehicles = () => {
  const {
    data: vehicles,
    loading,
    error,
  } = useAsync<Vehicles[]>(() => StarWarsListAPI('vehicles'));
  const { currentPageItems, currentPage, totalPages, goToPage } = usePagination(
    {
      items: vehicles || [],
      itemsPerPage: 10,
    }
  );

  return (
    <DataWrapper loading={loading} error={error}>
      <div className="bg-vehicles min-h-screen p-4">
        <h2 className="mb-4 text-center text-2xl font-bold text-amber-500">
          Vehicles
        </h2>
        <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-2">
          {currentPageItems?.map((vehicle: Vehicles) => (
            <Link
              to={`/${parseURL(vehicle.url).resource}/${parseURL(vehicle.url).id}`}
              key={vehicle.name}
            >
              <Card
                heading={vehicle.name}
                image={vehicle.image}
                fields={[
                  { label: 'Model', value: vehicle.model },
                  { label: 'Manufacturer', value: vehicle.manufacturer },
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

export default Vehicles;
