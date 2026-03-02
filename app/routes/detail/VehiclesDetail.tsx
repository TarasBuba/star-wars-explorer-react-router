
import useDetails from "./detail";
import { Link, useParams } from "react-router";

export default function VehiclesDetail() {
    const {id} = useParams();
    // console.log(id);
    const {data: vehicles, loading, error} = useDetails<Vehicles>('vehicles', id!);

    const getID = (url: string) => {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
  }
    
    type Vehicles = {
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
        vehicle_class: string;
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
                <h2 className="text-2xl font-bold mb-4">{vehicles?.name}</h2>
                <div className="grid grid-cols-1 gap-4">
                   {vehicles && (
                    <article className="p-4 cursor-pointer border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col gap-2 w-full">
                        <h2 className="text-xl font-bold mb-4">Model: {vehicles.model}</h2>
                        <p>Manufacturer: {vehicles.manufacturer}</p>
                        <p>Cost in Credits: {vehicles.cost_in_credits}</p>
                        <p>Length: {vehicles.length}</p>
                        <p>Max Atmosphering Speed: {vehicles.max_atmosphering_speed}</p>
                        <p>Crew: {vehicles.crew}</p>
                        <p>Passengers: {vehicles.passengers}</p>
                        <p>Cargo Capacity: {vehicles.cargo_capacity}</p>
                        <p>Consumables: {vehicles.consumables}</p>
                        <p>Vehicle Class: {vehicles.vehicle_class}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {vehicles.pilots && (
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Pilots:</h3>
                                    <ul>
                                        {vehicles.pilots.map((pilotId) => (
                                            <li key={pilotId}>
                                                <Link to={`/detail/pilots/${getID(pilotId)}`}>{pilotId}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {vehicles.films && (
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Films:</h3>
                                    <ul>
                                        {vehicles.films.map((filmId) => (
                                            <li key={filmId}>
                                                <Link to={`/detail/films/${getID(filmId)}`}>{filmId}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                       
                    </article>
                   )}
                </div>

            </section>

        </div>
        
    )

}



