
import useDetails from "./detail";
import { Link, useParams } from "react-router";

export default function StarshipsDetail() {
    const {id} = useParams();
    // console.log(id);
    const {data: starships, loading, error} = useDetails<Starships>('starships', id!);

    const getID = (url: string) => {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
  }
    
    type Starships = {
        name: string;
        model: string;
        manufacturer: string;
        cost_in_credits: string;
        length: string;
        max_atmosphering_speed: string;
        crew: string;
        passengers: string;
        cargo_capacity: string;
        consumables: string;
        hyperdrive_rating: string;
        MGLT: string;
        starship_class: string;
        pilots?: string[];
        films?: string[];
       
    }

    if (loading) {
        return <div className="text-center text-gray-500 text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 text-lg">Error: {error}</div>;
    }
    return (
        <div>
            <section className="p-4 grid place-items-center">
                <h2 className="text-2xl font-bold mb-4">{starships?.name}</h2>
                <div className="grid grid-cols-1 gap-4">
                   {starships && (
                    <article className="p-4 cursor-pointer border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col gap-2 w-full">
                        <h2 className="text-xl font-bold mb-4">Model: {starships.model}</h2>
                        <p>Manufacturer: {starships.manufacturer}</p>
                        <p>Cost in Credits: {starships.cost_in_credits}</p>
                        <p>Length: {starships.length}</p>
                        <p>Max Atmosphering Speed: {starships.max_atmosphering_speed}</p>
                        <p>Crew: {starships.crew}</p>
                        <p>Passengers: {starships.passengers}</p>
                        <p>Cargo Capacity: {starships.cargo_capacity}</p>
                        <p>Consumables: {starships.consumables}</p>
                        <p>Hyperdrive Rating: {starships.hyperdrive_rating}</p>
                        <p>MGLT: {starships.MGLT}</p>
                        <p>Starship Class: {starships.starship_class}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                {starships.pilots && (
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Pilots:</h3>
                                        <ul>
                                            {starships.pilots.map((pilot) => (
                                                <li key={pilot} className=" text-blue-500 hover:underline cursor-pointer">
                                                    <Link to={`/detail/${getID(pilot)}`}>{pilot}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div>
                                {starships.films &&(
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Films:</h3>
                                        <ul>
                                            {starships.films.map((film) => (
                                                <li key={film} className=" text-blue-500 hover:underline cursor-pointer">
                                                    <Link to={`/detail/${getID(film)}`}>{film}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </article>
                   )}
                </div>

            </section>

        </div>
        
    )

}



