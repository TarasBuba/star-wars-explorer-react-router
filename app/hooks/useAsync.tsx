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

// змінив відповідно до рекомендацій, додав юзеРев, щоб стабілізувати ф-цію, також додав key в масив залежностей, так як при виклику юзеАсинк в юзеКеректДетайлс, залежність від id, який отримується з юзеПараметрс, тому при зміні id, буде викликатися ф-ція для отримання даних по новому id в нашому випадку. якщо говорити про Ліст, де ми рендиримо весь список, то там просто буде key === undefined, тому що ми не передаємо його, і ф-ція буде викликатися тільки при першому рендері.
