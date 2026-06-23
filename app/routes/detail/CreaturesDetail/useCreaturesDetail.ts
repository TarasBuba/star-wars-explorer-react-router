import useAsync from '~/hooks/useAsync';
import { useParams } from 'react-router';
import type { Creatures } from '~/types/types';
import { getAllCreatures, getResourceById } from '~/api/StarWarsAPI';

export default function useCreaturesDetail() {
  const { id } = useParams();
  const fetchCreature = () => getResourceById('creatures', id || '');

  const { loading, error, data } = useAsync<Creatures>(fetchCreature, id);
  const fetchAllCreatures = () => getAllCreatures();
  const { data: allcreatures } = useAsync<Creatures[]>(fetchAllCreatures);

  return {
    loading,
    error,
    creature: data,
    allcreatures,
  };
}
