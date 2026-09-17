import { useParams } from 'react-router-dom';
import useAsync from '~/hooks/useAsync';
import type { Droids } from '~/types/types';
import { getAllCreatures, getResourceById } from '~/api/StarWarsAPI';

export default function useDroidsDetail() {
  const { id } = useParams();
  const fetchDroid = () => getResourceById('droids', id || '');

  const { loading, error, data } = useAsync(fetchDroid, [id]);
  const fetchAllDroids = () => getAllCreatures();
  const { data: allDroids } = useAsync<Droids[]>(fetchAllDroids);

  return {
    loading,
    error,
    droids: data,
    allDroids,
  };
}
