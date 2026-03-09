import { Link } from "react-router";
import Card from "~/components/Card";
import Loading from "~/components/Loading";
import Errors from "~/components/Errors";
import useDetails from "~/hooks/useDetails";
import parseURL from "~/utils/parseURL";

const Vehicles = () => {

  const { data: vehicles, loading, error } = useDetails({ resource: "vehicles" }) as { data: any[], loading: boolean, error: string | null };

  return (
    <>
      {loading ? <Loading /> : error ? <Errors message={error} /> : (
        <div className="p-4 bg-vehicles min-h-screen">
          <h2 className="text-2xl font-bold mb-4 text-center text-amber-500">Vehicles</h2>
          <section className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 sm:grid-cols-3">
            {vehicles.map((vehicle: any) => (
              <Link to={`/${parseURL(vehicle.url).resource}/${parseURL(vehicle.url).id}`} key={vehicle.name} >

                <Card heading={vehicle.name} description={`Model: ${vehicle.model}, Manufacturer: ${vehicle.manufacturer}`} />

              </Link >
            ))}
          </section>
        </div>)}
    </>

  );
};

export default Vehicles;