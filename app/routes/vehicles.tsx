import { data, Link } from "react-router";
import { useState, useEffect } from "react";
// import PeopleDetail from "./detail/PeopleDetail";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
   const getID = (url: string) => {
    const parts = url.split("/").filter(Boolean);
    // console.log(parts);
    
    return parts[parts.length - 1];
  }

useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/vehicles/");
          if (!response.ok) {
            throw new Error("Failed to fetch vehicles");
          }
        const data = await response.json();
        console.log(data);

        const dataFinal =data.results; 
        
        setVehicles(dataFinal)  ;
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setVehicles([]);
      }
      
    };
    fetchVehicles();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Vehicles</h2>
    <section className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 sm:grid-cols-3">
      {vehicles.map((vehicle: any) => (
       <Link to={`/vehicles/${getID(vehicle.url)}`} key={vehicle.name} >
          <div key={vehicle.name} className="border p-4 mb-4">
            <h3 className="text-xl font-semibold">{vehicle.name}</h3>
            <p className="text-gray-700">Model: {vehicle.model}</p>
            <p className="text-gray-700">Manufacturer: {vehicle.manufacturer}</p>
            <p className="text-gray-700">Cost in Credits: {vehicle.cost_in_credits}</p>
          </div>
       
       </Link >
      ))}
    </section>
    </div>
  );
};

export default Vehicles;