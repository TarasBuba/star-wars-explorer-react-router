// import { get } from "http";
import MainLayout from '~/components/layout/MainLayout';
import useDetails from '~/hooks/useDetails';
import { Link, useParams } from 'react-router';
import Errors from '~/components/Errors';
import Loading from '~/components/Loading';
import parseURL from '~/utils/parseURL';

type People = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  skin_color: string;
  films: string[];
  species?: string[];
  starships?: string[];
  vehicles?: string[];
};
export default function PlanetsDetail() {
  const { id } = useParams();
  // console.log(id);
  const {
    data: people,
    loading,
    error,
  } = useDetails<People>({ resource: 'people', id: id });

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors message={error} />
      ) : (
        <div>
          {people && (
            <section className="p-4">
              <article className="grid cursor-pointer grid-cols-1 gap-4 rounded-lg border border-gray-300 p-4 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <h1 className="text-center text-4xl font-bold">
                  {people.name}
                </h1>
                <h2 className="mb-4 text-center text-2xl font-bold">
                  Birth Year: {people.birth_year}
                </h2>
                <h2 className="mb-4 text-center text-2xl font-bold">
                  Eye Color: {people.eye_color}
                </h2>
                <h2 className="mb-4 text-center text-2xl font-bold">
                  Gender: {people.gender}
                </h2>
                <h2 className="mb-4 text-center text-2xl font-bold">
                  Hair Color: {people.hair_color}
                </h2>
                <h2 className="mb-4 text-center text-2xl font-bold">
                  Height: {people.height}
                </h2>
                <h2 className="mb-4 text-center text-2xl font-bold">
                  Mass: {people.mass}
                </h2>
                <h2 className="mb-4 text-center text-2xl font-bold">
                  Homeworld:{' '}
                  <Link
                    to={`/${parseURL(people.homeworld).resource}/${parseURL(people.homeworld).id}`}
                    className="cursor-pointer text-blue-500 hover:underline"
                  >
                    {people.homeworld}
                  </Link>
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <h2 className="mb-4 text-center text-2xl font-bold">
                      Films
                    </h2>
                    <ul className="list-inside list-disc">
                      {people.films.map((film: string) => (
                        <li
                          key={film}
                          className="cursor-pointer text-blue-500 hover:underline"
                        >
                          <Link
                            to={`/${parseURL(film).resource}/${parseURL(film).id}`}
                          >
                            {film}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="mb-4 text-center text-2xl font-bold">
                      Species
                    </h2>
                    <ul className="list-inside list-disc">
                      {people.species?.map((specie: string) => (
                        <li
                          key={specie}
                          className="cursor-pointer text-blue-500 hover:underline"
                        >
                          <Link
                            to={`/${parseURL(specie).resource}/${parseURL(specie).id}`}
                          >
                            {specie}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="mb-4 text-center text-2xl font-bold">
                      Starships
                    </h2>
                    <ul className="list-inside list-disc">
                      {people.starships?.map((starship: string) => (
                        <li
                          key={starship}
                          className="cursor-pointer text-blue-500 hover:underline"
                        >
                          <Link
                            to={`/${parseURL(starship).resource}/${parseURL(starship).id}`}
                          >
                            {starship}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="mb-4 text-center text-2xl font-bold">
                      Vehicles
                    </h2>
                    <ul>
                      {people.vehicles?.map((vehicle: string) => (
                        <li
                          key={vehicle}
                          className="cursor-pointer text-blue-500 hover:underline"
                        >
                          <Link
                            to={`/${parseURL(vehicle).resource}/${parseURL(vehicle).id}`}
                          >
                            {vehicle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </section>
          )}
        </div>
      )}
    </>
  );
}
