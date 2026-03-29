import { useState, useEffect } from 'react';

interface Props {
  resource: string;
  id?: string;
  limit?: number;
  page?: number;
}

const useDetails: <T>(props: Props) => {
  data: T | null;
  loading: boolean;
  error: string | null;
  total: number | null;
} = <T,>({ resource, id, limit, page }: Props) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (limit !== undefined && page !== undefined) {
          const response = await fetch(
            `https://star-wars-api-bi5l.onrender.com/${resource}?limit=${limit}&page=${page}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setTotal(data.meta.total || null);
          setData(data.data || data);
          setLoading(false);
          return;
        }
        const response = await fetch(
          `https://star-wars-api-bi5l.onrender.com/${resource}/${id ?? ''}`
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
  }, [resource, id, page, limit]);

  return { data, loading, error, total };
};

export default useDetails;
