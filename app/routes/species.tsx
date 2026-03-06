import { data, Link } from "react-router";
import { useState, useEffect } from "react";
// import PeopleDetail from "./detail/PeopleDetail";
import Card from "~/components/Card";
import MainLayout from "~/components/layout/MainLayout";

const Species = () => {
  const [species, setSpecies] = useState([]);
   const getID = (url: string) => {
    const parts = url.split("/").filter(Boolean);
    return {resource: parts[parts.length - 2], id: parts[parts.length - 1]};
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
    <MainLayout>
      <div className="p-4 bg-species min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-center text-amber-500">Species</h2>
      <section className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 sm:grid-cols-3">
        {species.map((person: any) => (
         <Link to={`/${getID(person.url).resource}/${getID(person.url).id}`} key={person.name} >
          
            <Card name={person.name} description={`Classification: ${person.classification}, Designation: ${person.designation}, Average Height: ${person.average_height}, Average Lifespan: ${person.average_lifespan}`} />
         
         </Link >
        ))}
      </section>
      </div>
    </MainLayout>
  );
};

export default Species;