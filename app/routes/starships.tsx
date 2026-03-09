import { Link } from "react-router";
import Card from "~/components/Card";
import Loading from "~/components/Loading";
import Errors from "~/components/Errors";
import useDetails from "~/hooks/useDetails";
import parseURL from "~/utils/parseURL";

const Starships = () => {

  const { data: starships, loading, error } = useDetails({ resource: "starships" }) as { data: any[], loading: boolean, error: string | null };

  return (

   <>
        {loading ? <Loading /> : error ? <Errors message={error} /> : (
    
        <div className="p-4 bg-starships min-h-screen">
          <h2 className="text-2xl font-bold mb-4 text-center text-amber-500">Starships</h2>
          <section className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 sm:grid-cols-3">
            {starships.map((starship: any) => (
              <Link to={`/${parseURL(starship.url).resource}/${parseURL(starship.url).id}`} key={starship.name} >
                <Card heading={starship.name} description={`Model: ${starship.model}, Manufacturer: ${starship.manufacturer}, Cost in Credits: ${starship.cost_in_credits}`} />
              </Link >
            ))}
          </section>
        </div>)}
   </>

  );
};

export default Starships;