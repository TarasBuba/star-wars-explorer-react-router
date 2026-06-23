import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import { useParams } from 'react-router';
import { getAllPlanets } from '~/api/StarWarsAPI';
import type Planets from '~/routes/planets';
import useAsync from '~/hooks/useAsync';
import type { SpeciesDetails } from '~/types/types';

export default function useSpeciesDetail() {
  const { id } = useParams();

  const fetchSpeciesDetails = () => StarWarsDetailsAPI('species', id || '');

  const { data: allDataHomeworld } = useAsync<Planets[]>(getAllPlanets);

  const {
    data: species,
    loading,
    error,
  } = useAsync<SpeciesDetails>(fetchSpeciesDetails);

  return {
    species,
    allDataHomeworld,
    loading,
    error,
  };
}
