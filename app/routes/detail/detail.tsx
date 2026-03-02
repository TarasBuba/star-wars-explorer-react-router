import { useState, useEffect } from "react";

type typeOfResource = 'films' | 'planets' | 'people' |'masters' | 'padawans';
export default function useDetails<T>(resource: typeOfResource, id: string  ) {
    const[data, setDate] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [resource, id]);
    return{data, loading, error};
}

