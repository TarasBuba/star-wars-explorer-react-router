import useAsync from '~/hooks/useAsync';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';

import { getAllSpecies, getAllOrganizations } from '~/api/StarWarsAPI';
import { useParams } from 'react-router-dom';
import type { PlanetsDetails, Organizations, Species } from '~/types/types';

export default function usePlanetsDetail() {
  const { id } = useParams();

  const { data: allDataAffiliated } =
    useAsync<Organizations[]>(getAllOrganizations);

  const { data: allDataSpecies } = useAsync<Species[]>(getAllSpecies);

  const fetchPlanetDetails = () => StarWarsDetailsAPI('planets', id || '');

  const {
    data: planet,
    loading,
    error,
  } = useAsync<PlanetsDetails>(fetchPlanetDetails, id);

  return {
    planet,
    loading,
    error,
    allDataAffiliated,
    allDataSpecies,
  };
}
