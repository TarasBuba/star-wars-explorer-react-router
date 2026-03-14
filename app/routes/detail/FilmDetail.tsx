import MainLayout from '~/components/layout/MainLayout';
import useDetails from '~/hooks/useDetails';
import { useParams } from 'react-router';
import Errors from '~/components/Errors';
import Loading from '~/components/Loading';
import parseURL from '~/utils/parseURL';

type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  vehicles: string[];
  starships: string[];
};
export default function FilmDetail() {
  const { id } = useParams();
  const {
    data: film,
    loading,
    error,
  } = useDetails<Film>({ resource: 'films', id });

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors message={error} />
      ) : (
        <div className="p-4">
          {film && (
            <div>
              <h1 className="text-center text-4xl font-bold">{film.title}</h1>
              <h2 className="mb-4 text-center text-2xl font-bold">
                Episode {film.episode_id}
              </h2>
              <div className="mb-4 flex justify-center gap-4">
                <p className="mb-4 text-gray-700">Director: {film.director}</p>
                <p className="mb-4 text-gray-700">Producer: {film.producer}</p>
                <p className="mb-4 text-gray-700">
                  Release Date: {film.release_date}
                </p>
              </div>
              <p className="mb-4 text-gray-700">{film.opening_crawl}</p>
              <section className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-2">
                <article>
                  {film.vehicles && (
                    <div>
                      <h3 className="mb-2 text-xl font-bold">Vehicles:</h3>
                      <ul>
                        {film.vehicles.map((vehicle: string) => (
                          <li key={vehicle}>
                            <a
                              href={`/${parseURL(vehicle).resource}/${parseURL(vehicle).id}`}
                              className="cursor-pointer text-blue-500 hover:underline"
                            >
                              {vehicle}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
                <article>
                  {film.starships && (
                    <div>
                      <h3 className="mb-2 text-xl font-bold">Starships:</h3>
                      <ul>
                        {film.starships.map((starship: string) => (
                          <li key={starship}>
                            <a
                              href={`/${parseURL(starship).resource}/${parseURL(starship).id}`}
                              className="cursor-pointer text-blue-500 hover:underline"
                            >
                              {starship}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              </section>
            </div>
          )}
        </div>
      )}
    </>
  );
}
