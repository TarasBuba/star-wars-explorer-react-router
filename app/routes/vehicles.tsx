import { data, Link } from "react-router";
import { useState, useEffect } from "react";
// import PeopleDetail from "./detail/PeopleDetail";
import Card from "~/components/Card";
import MainLayout from "~/components/layout/MainLayout";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
     const getID = (url: string) => {
    const parts = url.split("/").filter(Boolean);
    return {resource: parts[parts.length - 2], id: parts[parts.length - 1]};
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
   <MainLayout>
      <div className="p-4 bg-vehicles min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-center text-amber-500">Vehicles</h2>
      <section className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 sm:grid-cols-3">
        {vehicles.map((vehicle: any) => (
         <Link to={`/${getID(vehicle.url).resource}/${getID(vehicle.url).id}`} key={vehicle.name} >
           
            <Card name={vehicle.name} description={`Model: ${vehicle.model}`} title={`Manufacturer: ${vehicle.manufacturer}`} />
         
         </Link >
        ))}
      </section>
      </div>
   </MainLayout>
  );
};

export default Vehicles;