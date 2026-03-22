import { Link } from 'react-router';
import Card from '~/components/Card';
import Loading from '~/components/Loading';
import Errors from '~/components/Errors';
import useDetails from '~/hooks/useDetails';
import parseURL from '~/utils/parseURL';
// import { p } from 'node_modules/@react-router/dev/dist/routes-CZR-bKRt';

interface Weapons {
  name: string;
  type: string;
  model: string;
  color: string;
  url: string;
}

const Weapons = () => {
  const {
    data: weapons,
    loading,
    error,
  } = useDetails<Weapons[]>({ resource: 'weapons' });

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors message={error} />
      ) : (
        <div className="bg-weapons min-h-screen p-4">
          <h2 className="mb-4 text-center text-2xl font-bold text-amber-400">
            Weapons
          </h2>
          <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-2">
            {weapons?.map((weapon: Weapons) => (
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
        </div>
      )}
    </>
  );
};

export default Weapons;
