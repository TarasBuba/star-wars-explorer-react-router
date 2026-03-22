import { useState, useEffect } from 'react';

interface Props {
  resource: string;
  id?: string;
}

const useDetails: <T>(props: Props) => {
  data: T | null;
  loading: boolean;
  error: string | null;
} = <T,>({ resource, id }: Props) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          // `https://swapi.dev/api/${resource}/${id ?? ''}/`
          `https://star-wars-api-bi5l.onrender.com/${resource}/${id ?? ''}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // console.log(data);

        setData(data.data || data);
        setLoading(false);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred'
        );
        setData(null);
        setLoading(false);
      }
    };
    fetchData();
  }, [resource, id]);

  return { data, loading, error };
};

export default useDetails;
