import { useState, useEffect } from 'react';
import type { ListProps } from '~/types/types';

const useList: <T>(props: ListProps) => {
  data: T | null;
  loading: boolean;
  error: string | null;
} = <T,>({ resource }: ListProps) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://star-wars-api-bi5l.onrender.com/${resource}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

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
  }, [resource]);

  return { data, loading, error };
};

export default useList;
