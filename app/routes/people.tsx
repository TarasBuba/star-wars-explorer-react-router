import { data, Link } from "react-router";
import { useState, useEffect } from "react";
// import PeopleDetail from "./detail/PeopleDetail";
import Card from "~/components/Card";
import MainLayout from "~/components/layout/MainLayout";
import Loading from "~/components/Loading";
import Errors from "~/components/Errors";

const People = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [img, setImg] = useState([]);
  const getID = (url: string) => {
    const parts = url.split("/").filter(Boolean);
    return { resource: parts[parts.length - 2], id: parts[parts.length - 1] };
  }

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/people/");
        const responseForImgs = await fetch("https://akabab.github.io/starwars-api/api/all.json");

        if (!response.ok) {
          throw new Error("Failed to fetch people");
        }
        if (!responseForImgs.ok) {
          throw new Error("Failed to fetch imgs");

        }
        const data = await response.json();
        const dataFinal = data.results;
        // console.log(data);
        const dataForImgs = await responseForImgs.json();
        // console.log(dataForImgs);
        

        // console.log(imgData);
        setImg(dataForImgs);
        setPeople(dataFinal);


      } catch (error) {
        console.error("Error fetching people:", error);
        setPeople([]);
        setImg([]);
      }

    };
    fetchPeople();
  }, []);

  return (
    
   <MainLayout>
     
      <div className="p-4 bg-people min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-center text-amber-500">People</h2>
        <section className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 sm:grid-cols-3">
          {people.map((person: any) => (
            <Link to={`/${getID(person.url).resource}/${getID(person.url).id}`} key={person.name} >
              <div key={person.name} className="border border-amber-400 rounded shadow p-4 flex justify-between items-center">
  
                <Card name={person.name} description={`Height: ${person.height}, Birth Year: ${person.birth_year}, Gender: ${person.gender}`} />
  
                {img && img.map((imgData: any) => {
                  if (imgData.name === person.name) {
                    return <img key={imgData.id} src={imgData.image} alt={imgData.name} className="max-w-36 max-h-36 mt-2 rounded" />;
                  }
                  return null;
                })}
                
  
              </div>
  
  
  
  
            </Link >
          ))}
        </section>
      </div>
   </MainLayout>
  );
};

export default People;