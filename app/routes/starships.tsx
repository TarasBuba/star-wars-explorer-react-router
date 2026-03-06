import { data, Link } from "react-router";
import { useState, useEffect } from "react";
// import PeopleDetail from "./detail/PeopleDetail";
import Card from "~/components/Card";
import MainLayout from "~/components/layout/MainLayout";

const Starships = () => {
  const [starships, setStarships] = useState([]);
  const getID = (url: string) => {
    const parts = url.split("/").filter(Boolean);
    return { resource: parts[parts.length - 2], id: parts[parts.length - 1] };
  }

  useEffect(() => {
    const fetchStarships = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/starships/");
        if (!response.ok) {
          throw new Error("Failed to fetch starships");
        }
        const data = await response.json();
        console.log(data);

        const dataFinal = data.results;

        setStarships(dataFinal);
      } catch (error) {
        console.error("Error fetching starships:", error);
        setStarships([]);
      }

    };
    fetchStarships();
  }, []);

  return (
   <MainLayout>
      <div className="p-4 bg-starships min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-center text-amber-500">Starships</h2>
        <section className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 sm:grid-cols-3">
          {starships.map((starship: any) => (
            <Link to={`/${getID(starship.url).resource}/${getID(starship.url).id}`} key={starship.name} >
              {/* <div key={starship.name} className="border p-4 mb-4">
                <h3 className="text-xl font-semibold">{starship.name}</h3>
                <p className="text-gray-700">Model: {starship.model}</p>
                <p className="text-gray-700">Manufacturer: {starship.manufacturer}</p>
                <p className="text-gray-700">Cost in Credits: {starship.cost_in_credits}</p>
              </div> */}
              <Card name={starship.name} description={`Model: ${starship.model}, Manufacturer: ${starship.manufacturer}, Cost in Credits: ${starship.cost_in_credits}`} />
            </Link >
          ))}
        </section>
      </div>
   </MainLayout>
  );
};

export default Starships;