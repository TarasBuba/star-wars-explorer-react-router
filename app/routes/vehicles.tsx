import { Link } from 'react-router';
import Card from '~/components/Card';
import Loading from '~/components/Loading';
import Errors from '~/components/Errors';
import useDetails from '~/hooks/useDetails';
import parseURL from '~/utils/parseURL';

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
            {vehicles.map((vehicle: any) => (
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
        </div>
      )}
    </>
  );
};

export default Vehicles;
