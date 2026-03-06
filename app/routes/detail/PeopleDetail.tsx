// import { get } from "http";
import MainLayout from "~/components/layout/MainLayout";
import useDetails from "./detail";
import { Link, useParams } from "react-router";
import Errors from "~/components/Errors";
import Loading from "~/components/Loading";
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
  const { data: people, loading, error } = useDetails<People>("people", id!);

    const getID = (url: string) => {
    const parts = url.split("/").filter(Boolean);
    return {resource: parts[parts.length - 2], id: parts[parts.length - 1]};
  }

  return (
    <MainLayout>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors message={error.message} />
      ) : (
      <div>
        {people && (
          <section className="p-4">
            <article className="p-4 cursor-pointer border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out grid grid-cols-1 gap-4">
              <h1 className="text-4xl font-bold text-center">{people.name}</h1>
              <h2 className="text-2xl font-bold mb-4 text-center">
                Birth Year: {people.birth_year}
              </h2>
              <h2 className="text-2xl font-bold mb-4 text-center">
                Eye Color: {people.eye_color}
              </h2>
              <h2 className="text-2xl font-bold mb-4 text-center">
                Gender: {people.gender}
              </h2>
              <h2 className="text-2xl font-bold mb-4 text-center">
                Hair Color: {people.hair_color}
              </h2>
              <h2 className="text-2xl font-bold mb-4 text-center">
                Height: {people.height}
              </h2>
              <h2 className="text-2xl font-bold mb-4 text-center">
                Mass: {people.mass}
              </h2>
              <h2 className="text-2xl font-bold mb-4 text-center">
                Homeworld: <Link to={`/${getID(people.homeworld).resource}/${getID(people.homeworld).id}`} className=" text-blue-500 hover:underline cursor-pointer">{people.homeworld}</Link>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-center">Films</h2>
                  <ul className="list-disc list-inside">
                    {people.films.map((film: string) => (
                      <li
                        key={film}
                        className=" text-blue-500 hover:underline cursor-pointer"
                      >
                        <Link to={`/${getID(film).resource}/${getID(film).id}`}>
                          {film}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-center">Species</h2>
                  <ul className="list-disc list-inside">
                    {people.species?.map((specie: string) => (
                      <li
                        key={specie}
                        className=" text-blue-500 hover:underline cursor-pointer"
                      >
                        <Link to={`/${getID(specie).resource}/${getID(specie).id}`}>
                          {specie}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Starships
                  </h2>
                  <ul className="list-disc list-inside">
                    {people.starships?.map((starship: string) => (
                      <li
                        key={starship}
                        className=" text-blue-500 hover:underline cursor-pointer"
                      >
                        <Link to={`/${getID(starship).resource}/${getID(starship).id}`}>
                          {starship}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Vehicles
                  </h2>
                  <ul>
                    {people.vehicles?.map((vehicle: string) => (
                      <li
                        key={vehicle}
                        className=" text-blue-500 hover:underline cursor-pointer"
                      >
                        <Link to={`/${getID(vehicle).resource}/${getID(vehicle).id}`}>
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
      </div>)}
    </MainLayout>
  );
}
