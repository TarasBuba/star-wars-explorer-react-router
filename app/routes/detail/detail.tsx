import { useState, useEffect } from "react";

type typeOfResource = 'films' | 'planets' | 'people' |'species' | 'vehicles' | 'starships';
export default function useDetails<T>(resource: typeOfResource, id: string  ) {
    const[data, setDate] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://swapi.dev/api/${resource}/${id}/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                console.log(data);
                setDate(data);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [resource, id]);
    return{data, loading, error};
}

