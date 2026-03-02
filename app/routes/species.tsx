import { data, Link } from "react-router";
import { useState, useEffect } from "react";
// import PeopleDetail from "./detail/PeopleDetail";

const Species = () => {
  const [species, setSpecies] = useState([]);
   const getID = (url: string) => {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
  }

useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/species/");
          if (!response.ok) {
            throw new Error("Failed to fetch species");
          }
        const data = await response.json();
        console.log(data);

        const dataFinal =data.results; 
        
        setSpecies(dataFinal)  ;
      } catch (error) {
        console.error("Error fetching species:", error);
        setSpecies([]);
      }
      
    };
    fetchSpecies();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Species</h2>
    <section className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 sm:grid-cols-3">
      {species.map((person: any) => (
       <Link to={`/species/${getID(person.url)}`} key={person.name} >
          <div key={person.name} className="border p-4 mb-4">
            <h3 className="text-xl font-semibold">{person.name}</h3>
           <p className="text-gray-700">{person.classification}</p>
            <p className="text-gray-700">Designation: {person.designation}</p>
            <p className="text-gray-700">Average Height: {person.average_height}</p>
            <p className="text-gray-700">Average Lifespan: {person.average_lifespan}</p>
          </div>
       
       </Link >
      ))}
    </section>
    </div>
  );
};

export default Species;