import { useState, useEffect } from "react";

const Masters = () => { 
    const [masters, setMasters] = useState([]);
    useEffect(() => {
        const fetchMasters = async () => {
            try {
                const response = await fetch("https://swapi.dev/api/people/");  
                if (!response.ok) {
                    throw new Error("Failed to fetch masters");
                }
                const data = await response.json();
                console.log(data);
                setMasters(data.results);
            } catch (error) {
                console.error("Error fetching masters:", error);
                setMasters([]);
            }
        };
        fetchMasters();
    }, []);
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Masters</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {masters.map((master: any) => (
                    <div key={master.name} className="border p-4">
                        <h2 className="text-xl font-bold">{master.name}</h2>
                        <p>Height: {master.height}</p>
                        <p>Mass: {master.mass}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}   

export default Masters