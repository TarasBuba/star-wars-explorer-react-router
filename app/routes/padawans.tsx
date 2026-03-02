import { useState, useEffect } from "react";

const Padawans = () => {
  const [padawans, setPadawans] = useState([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/people/")
      .then((response) => response.json())
      .then((data) => setPadawans(data.results));
  }, []);

  return (
    <div>    
      <h2 className="text-2xl font-bold mb-4 text-center">Padawans</h2>
      <section className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 sm:grid-cols-3">
        {padawans.map((padawan: any) => (
          <div key={padawan.name} className="border p-4">
            <h3 className="text-xl font-semibold">{padawan.name}</h3>
            <p className="text-gray-700">Height: {padawan.height}</p>
            <p className="text-gray-700">Mass: {padawan.mass}</p>
            <p className="text-gray-700">Hair Color: {padawan.hair_color}</p>
            <p className="text-gray-700">Skin Color: {padawan.skin_color}</p>
            <p className="text-gray-700">Eye Color: {padawan.eye_color}</p>
            <p className="text-gray-700">Birth Year: {padawan.birth_year}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Padawans