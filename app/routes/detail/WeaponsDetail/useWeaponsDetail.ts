import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import useAsync from '~/hooks/useAsync';
import { useParams } from 'react-router';
import {
  getAllCharacters,
  getAllOrganizations,
  getAllPlanets,
  getAllFilms,
} from '~/api/StarWarsAPI';
import type {
  WeaponsDetails,
  Characters,
  Organizations,
  Planets,
  Films,
} from '~/types/types';

export default function useWeaponsDetail() {
  const { id } = useParams();

  const fetchWeaponDetails = () => StarWarsDetailsAPI('weapons', id || '');

  const { data: allDataOwner } = useAsync<Characters[]>(getAllCharacters);
  const { data: allDataCrystalOrigin } = useAsync<Planets[]>(getAllPlanets);
  const { data: allDataFirstAppearance } = useAsync<Films[]>(getAllFilms);
  const { data: allDataCurrentOwner } =
    useAsync<Characters[]>(getAllCharacters);
  const { data: allDataAffiliations } =
    useAsync<Organizations[]>(getAllOrganizations);

  const {
    data: weapon,
    loading,
    error,
  } = useAsync<WeaponsDetails>(fetchWeaponDetails);
  return {
    weapon,
    allDataOwner,
    allDataCrystalOrigin,
    allDataFirstAppearance,
    allDataAffiliations,
    allDataCurrentOwner,
    loading,
    error,
  };
}
