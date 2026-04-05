import { Link } from 'react-router';
import Card from '~/components/Card';
import Loading from '~/components/Loading';
import Errors from '~/components/Errors';
import useDetails from '~/hooks/useDetails';
import parseURL from '~/utils/parseURL';
import usePagination from '~/hooks/usePagination';
import Pagination from '~/components/Pagination';

const Vehicles = () => {
  const {
    data: vehicles,
    loading,
    error,
  } = useDetails({ resource: 'vehicles' }) as {
    data: any[];
    loading: boolean;
    error: string | null;
  };
  const { currentPageItems, currentPage, totalPages, goToPage } = usePagination(
    {
      items: vehicles || [],
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
        <div className="bg-vehicles min-h-screen p-4">
          <h2 className="mb-4 text-center text-2xl font-bold text-amber-500">
            Vehicles
          </h2>
          <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-2">
            {currentPageItems?.map((vehicle: any) => (
              <Link
                to={`/${parseURL(vehicle.url).resource}/${parseURL(vehicle.url).id}`}
                key={vehicle.name}
              >
                <Card
                  heading={vehicle.name}
                  description={`Model: ${vehicle.model}, Manufacturer: ${vehicle.manufacturer}`}
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

export default Vehicles;
