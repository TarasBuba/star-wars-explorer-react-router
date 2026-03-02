import { useState, useEffect } from "react";
import { Link } from "react-router";

const Planets = () => {
    const [planets, setPlanets] = useState([]);
      const getID = (url: string) => {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
  }
    useEffect(() => {
        const fetchPlanets = async () => {
            try {
                const response = await fetch("https://swapi.dev/api/planets/");
                if (!response.ok) {
                    throw new Error("Failed to fetch planets");
                }
                const data = await response.json();
                console.log(data);
                setPlanets(data.results);
            } catch (error) {
                console.error("Error fetching planets:", error);
                setPlanets([]);
            }
        };
        fetchPlanets();
    }, []);
    return (
        <div>    
            <h2 className="text-2xl font-bold mb-4 text-center">Planets</h2>
            <section className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 sm:grid-cols-3">
                {planets.map((planet: any) => (
                    <Link to={`/planets/${getID(planet.url)}`} key={planet.name} >
                        <div key={planet.name} className="border p-4 mb-4">
                            <h3 className="text-xl font-semibold">{planet.name}</h3>
                            <p className="text-gray-700">Population: {planet.population}</p>
                            <p className="text-gray-700">Climate: {planet.climate}</p>
                            <p className="text-gray-700">Terrain: {planet.terrain}</p>
                        </div>
                    </Link>
                ))}

            </section>
        </div>
    );
};

export default Planets;