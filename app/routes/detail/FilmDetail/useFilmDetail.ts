import { useParams } from 'react-router-dom';
import type {
  FilmDetails,
  Planets,
  Characters,
  Species,
  Organizations,
} from '~/types/types';
import useAsync from '~/hooks/useAsync';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import {
  getAllPlanets,
  getAllCharacters,
  getAllSpecies,
  getAllOrganizations,
} from '~/api/StarWarsAPI';

export default function useCreatureDetail() {
  const { id } = useParams();

  const { data: allDataPlanets } = useAsync<Planets[]>(getAllPlanets);
  const { data: allDataCharacters } = useAsync<Characters[]>(getAllCharacters);
  const { data: allDataSpecies } = useAsync<Species[]>(getAllSpecies);
  const { data: allDataOrganizations } =
    useAsync<Organizations[]>(getAllOrganizations);

  const fetchFilmsDetails = () => StarWarsDetailsAPI('films', id || '');

  const { loading, error, data } = useAsync(fetchFilmsDetails, id);

  return {
    loading,
    error,
    film: data,
    allDataCharacters,
    allDataPlanets,
    allDataSpecies,
    allDataOrganizations,
  };
}
