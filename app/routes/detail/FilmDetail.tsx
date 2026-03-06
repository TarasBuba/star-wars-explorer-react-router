
import MainLayout from "~/components/layout/MainLayout";
import useDetails from "./detail";
import { useParams } from "react-router";
import Errors from "~/components/Errors";
import Loading from "~/components/Loading";

type Film = {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    vehicles: string[];
    starships: string[];
}
export default function FilmDetail() {
    const { id } = useParams();
    console.log(id);
    const { data: film, loading, error } = useDetails<Film>('films', id!);

    const getID = (url: string) => {
        const parts = url.split("/").filter(Boolean);
        return { resource: parts[parts.length - 2], id: parts[parts.length - 1] };
    }



    return (


        <MainLayout>

            {loading ? (
                <Loading />
            ) : error ? (
                <Errors message={error.message} />
            ) : (



                <div className="p-4">
                    {film && (
                        <div>
                            <h1 className="text-4xl font-bold text-center">{film.title}</h1>
                            <h2 className="text-2xl font-bold mb-4 text-center">Episode {film.episode_id}</h2>
                            <div className="mb-4 flex justify-center gap-4 ">
                                <p className="text-gray-700 mb-4">Director: {film.director}</p>
                                <p className="text-gray-700 mb-4">Producer: {film.producer}</p>
                                <p className="text-gray-700 mb-4">Release Date: {film.release_date}</p>
                            </div>
                            <p className="text-gray-700 mb-4">{film.opening_crawl}</p>
                            <section className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
                                <article >
                                    {film.vehicles && (
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Vehicles:</h3>
                                            <ul>
                                                {film.vehicles.map((vehicle: string) => (
                                                    <li key={vehicle}><a href={`/${getID(vehicle).resource}/${getID(vehicle).id}`} className="text-blue-500 hover:underline cursor-pointer">{vehicle}</a></li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                </article>
                                <article>
                                    {film.starships && (
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Starships:</h3>
                                            <ul>
                                                {film.starships.map((starship: string) => (
                                                    <li key={starship}><a href={`/${getID(starship).resource}/${getID(starship).id}`} className="text-blue-500 hover:underline cursor-pointer">{starship}</a></li>
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


                </MainLayout>

    )

}

