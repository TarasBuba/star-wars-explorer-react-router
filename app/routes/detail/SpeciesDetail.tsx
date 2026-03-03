
import useDetails from "./detail";
import { Link, useParams } from "react-router";

export default function SpeciesDetail() {
    const {id} = useParams();
    // console.log(id);
    const {data: species, loading, error} = useDetails<Species>('species', id!);

     const getID = (url: string) => {
    const parts = url.split("/").filter(Boolean);
    return {resource: parts[parts.length - 2], id: parts[parts.length - 1]};
  }
    
    type Species = {
        name: string;
        classification: string;
        average_lifespan: string;
        designation: string;
        average_height: string;
        skin_colors: string;
        hair_colors: string;
        eye_colors: string;
        language: string;
        homeworld: string;
        people?: string[];
        films?: string[];
       
    }

    if (loading) {
        return <div className="text-center text-gray-500 text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 text-lg">Error: {error.message}</div>;
    }
    return (
        <div>
            <section className="p-4">
                <h2 className="text-2xl font-bold mb-4">{species?.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {species && (
                    <article className="p-4 cursor-pointer border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                        <h2 className="text-xl font-bold mb-4">Classification: {species.classification}</h2>
                        <p>Average Lifespan: {species.average_lifespan}</p>
                        <p>Designation: {species.designation}</p>
                        <p>Average Height: {species.average_height}</p>
                        <p>Skin Colors: {species.skin_colors}</p>
                        <p>Hair Colors: {species.hair_colors}</p>
                        <p>Eye Colors: {species.eye_colors}</p>
                        <p>Language: {species.language}</p>
                        <p>Homeworld: <a href={`/${getID(species.homeworld).resource}/${getID(species.homeworld).id}`} className="text-blue-500 hover:underline">{species.homeworld}</a></p>
                    </article>
                   )}
                </div>

            </section>

        </div>
        
    )

}



