import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import { useParams } from 'react-router';
import { getAllCharacters, getAllOrganizations } from '~/api/StarWarsAPI';
import useAsync from '~/hooks/useAsync';
import type {
  Characters,
  Organizations,
  StarshipsDetails,
} from '~/types/types';

export default function useStarshipsDetail() {
  const { id } = useParams();

  const fetchStarshipDetails = () => StarWarsDetailsAPI('starships', id || '');

  const { data: allDataAffiliations } =
    useAsync<Organizations[]>(getAllOrganizations);
  const { data: allDataPilots } = useAsync<Characters[]>(getAllCharacters);

  const {
    data: starships,
    loading,
    error,
  } = useAsync<StarshipsDetails>(fetchStarshipDetails);
  return {
    starships,
    allDataAffiliations,
    allDataPilots,
    loading,
    error,
  };
}
