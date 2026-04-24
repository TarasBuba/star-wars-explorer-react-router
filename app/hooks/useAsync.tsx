import { useState, useEffect } from 'react';

const useAsync: <T>(fetchFn: () => Promise<T>) => {
  data: T | null;
  loading: boolean;
  error: string | null;
} = <T,>(fetchFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchFn();

        setData(response);
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
  }, [fetchFn]);

  return { data, loading, error };
};

export default useAsync;
