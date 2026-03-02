import { data, Link } from "react-router";
import { useState, useEffect } from "react";
// import PeopleDetail from "./detail/PeopleDetail";

const People = () => {
  const [people, setPeople] = useState([]);
   const getID = (url: string) => {
    const parts = url.split("/").filter(Boolean);
    // console.log(parts);
    
    return parts[parts.length - 1];
  }

useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/people/");
          if (!response.ok) {
            throw new Error("Failed to fetch people");
          }
        const data = await response.json();
        console.log(data);

        const dataFinal =data.results; 
        
        setPeople(dataFinal)  ;
      } catch (error) {
        console.error("Error fetching people:", error);
        setPeople([]);
      }
      
    };
    fetchPeople();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">People</h2>
    <section className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 sm:grid-cols-3">
      {people.map((person: any) => (
       <Link to={`/people/${getID(person.url)}`} key={person.name} >
          <div key={person.name} className="border p-4 mb-4">
            <h3 className="text-xl font-semibold">{person.name}</h3>
            <p className="text-gray-700">Height: {person.height}</p>
            <p className="text-gray-700">Birth Year: {person.birth_year}</p>
            <p className="text-gray-700">Gender: {person.gender}</p>
          </div>
       
       </Link >
      ))}
    </section>
    </div>
  );
};

export default People;