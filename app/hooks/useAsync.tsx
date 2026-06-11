import { useState, useEffect, useRef } from 'react';

const useAsync: <T>(
  fetchFn: () => Promise<T>,
  key?: string
) => {
  data: T | null;
  loading: boolean;
  error: string | null;
} = <T,>(fetchFn: () => Promise<T>, key?: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRef = useRef(fetchFn);
  fetchRef.current = fetchFn;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchRef.current();

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
  }, [key]);

  return { data, loading, error };
};

export default useAsync;
