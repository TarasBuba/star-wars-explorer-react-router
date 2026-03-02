import { data, Link } from "react-router";
import { useState, useEffect } from "react";
// import PeopleDetail from "./detail/PeopleDetail";

const Starships = () => {
  const [starships, setStarships] = useState([]);
   const getID = (url: string) => {
    const parts = url.split("/").filter(Boolean);
    // console.log(parts);
    
    return parts[parts.length - 1];
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

        const dataFinal =data.results; 
        
        setStarships(dataFinal)  ;
      } catch (error) {
        console.error("Error fetching starships:", error);
        setStarships([]);
      }
      
    };
    fetchStarships();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Starships</h2>
    <section className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 sm:grid-cols-3">
      {starships.map((starship: any) => (
       <Link to={`/starships/${getID(starship.url)}`} key={starship.name} >
          <div key={starship.name} className="border p-4 mb-4">
            <h3 className="text-xl font-semibold">{starship.name}</h3>
            <p className="text-gray-700">Model: {starship.model}</p>
            <p className="text-gray-700">Manufacturer: {starship.manufacturer}</p>
            <p className="text-gray-700">Cost in Credits: {starship.cost_in_credits}</p>
          </div>
       
       </Link >
      ))}
    </section>
    </div>
  );
};

export default Starships;