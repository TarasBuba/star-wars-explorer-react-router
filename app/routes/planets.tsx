import { useState, useEffect } from "react";
import { Link } from "react-router";
import Card from "~/components/Card";
import MainLayout from "~/components/layout/MainLayout";

const Planets = () => {
    const [planets, setPlanets] = useState([]);
  const getID = (url: string) => {
    const parts = url.split("/").filter(Boolean);
    return {resource: parts[parts.length - 2], id: parts[parts.length - 1]};
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
      <MainLayout>
            <div className="p-4 bg-planets min-h-screen">    
                <h2 className="text-2xl font-bold mb-4 text-center text-amber-500">Planets</h2>
                <section className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 sm:grid-cols-3">
                    {planets.map((planet: any) => (
                        <Link to={`/${getID(planet.url).resource}/${getID(planet.url).id}`} key={planet.name} >
                                       
                                        <Card name={planet.name} description={`Population: ${planet.population}, Climate: ${planet.climate}, Terrain: ${planet.terrain}`} />
                        </Link>
                    ))}
    
                </section>
            </div>
      </MainLayout>
    );
};

export default Planets;