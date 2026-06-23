import useAsync from '~/hooks/useAsync';
import { useParams } from 'react-router';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import { getAllCharacters, getAllPlanets } from '~/api/StarWarsAPI';
import type { Planets, Characters, OrganizationsDetails } from '~/types/types';

export default function useOrganizationsDetail() {
  const { id } = useParams();

  const fetchOrganizationDetails = () =>
    StarWarsDetailsAPI('organizations', id || '');

  const { data: allDataHeadquarters } = useAsync<Planets[]>(getAllPlanets);
  const { data: allDataLeader } = useAsync<Characters[]>(getAllCharacters);

  const {
    data: organization,
    loading,
    error,
  } = useAsync<OrganizationsDetails>(fetchOrganizationDetails);

  return {
    data: organization,
    loading,
    error,
    allDataHeadquarters,
    allDataLeader,
  };
}
